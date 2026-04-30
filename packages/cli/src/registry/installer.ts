import { dirname, posix, resolve } from "node:path";
import { execa } from "execa";
import fsExtra from "fs-extra";
import pc from "picocolors";
import type { SolidcnConfig } from "../schema/config.js";
import type { RegistryItem } from "../schema/registry.js";

export interface PlannedFileWrite {
  sourcePath: string;
  targetPath: string;
  outputPath: string;
  content: string;
  exists: boolean;
  same: boolean;
  currentContent?: string;
}

export class Installer {
  private readonly installedDeps = new Set<string>();
  private readonly installedDevDeps = new Set<string>();

  constructor(
    private readonly cwd: string,
    private readonly config: SolidcnConfig,
    private readonly overwrite: boolean,
    private readonly dryRun: boolean,
    private readonly onlyModified: boolean = false,
  ) {}

  private async detectPackageManager(): Promise<"pnpm" | "npm" | "yarn" | "bun"> {
    if (await fsExtra.pathExists(resolve(this.cwd, "pnpm-lock.yaml"))) return "pnpm";
    if (await fsExtra.pathExists(resolve(this.cwd, "yarn.lock"))) return "yarn";
    if (await fsExtra.pathExists(resolve(this.cwd, "bun.lockb"))) return "bun";
    if (await fsExtra.pathExists(resolve(this.cwd, "bun.lock"))) return "bun";
    return "npm";
  }

  private async installDependencies(
    dependencies: string[] = [],
    devDependencies: string[] = [],
  ): Promise<void> {
    if (this.dryRun) return;
    const depsToInstall = dependencies.filter((dep) => !this.installedDeps.has(dep));
    const devDepsToInstall = devDependencies.filter((dep) => !this.installedDevDeps.has(dep));

    if (depsToInstall.length === 0 && devDepsToInstall.length === 0) return;

    const pm = await this.detectPackageManager();

    if (depsToInstall.length > 0) {
      const runtimeCmd =
        pm === "pnpm"
          ? ["add", ...depsToInstall]
          : pm === "yarn"
            ? ["add", ...depsToInstall]
            : pm === "bun"
              ? ["add", ...depsToInstall]
              : ["install", ...depsToInstall];
      await execa(pm, runtimeCmd, { cwd: this.cwd, stdio: "inherit" });
      for (const dep of depsToInstall) this.installedDeps.add(dep);
      console.log(pc.green(`  deps  ${depsToInstall.join(", ")}`));
    }

    if (devDepsToInstall.length > 0) {
      const devCmd =
        pm === "pnpm"
          ? ["add", "-D", ...devDepsToInstall]
          : pm === "yarn"
            ? ["add", "-D", ...devDepsToInstall]
            : pm === "bun"
              ? ["add", "-d", ...devDepsToInstall]
              : ["install", "-D", ...devDepsToInstall];
      await execa(pm, devCmd, { cwd: this.cwd, stdio: "inherit" });
      for (const dep of devDepsToInstall) this.installedDevDeps.add(dep);
      console.log(pc.green(`  dev   ${devDepsToInstall.join(", ")}`));
    }
  }

  private resolveAlias(path: string): string {
    const { components, utils, hooks } = this.config.aliases ?? {};

    const _replace = (_alias: string, target: string) =>
      path.startsWith("components/ui/")
        ? path.replace("components/ui", this.toAbsolute(target))
        : path;

    if (path.startsWith("components/ui/")) {
      return resolve(
        this.cwd,
        path.replace("components/ui", this.stripAlias(components ?? "~/components/ui")),
      );
    }
    if (path.startsWith("lib/utils")) {
      return resolve(this.cwd, path.replace("lib/utils", this.stripAlias(utils ?? "~/lib/utils")));
    }
    if (path.startsWith("hooks/")) {
      return resolve(this.cwd, path.replace("hooks", this.stripAlias(hooks ?? "~/hooks")));
    }

    return resolve(this.cwd, "src", path);
  }

  private stripAlias(alias: string): string {
    return alias.replace(/^~\//, "src/").replace(/^@\//, "src/");
  }

  private toAbsolute(alias: string): string {
    return this.stripAlias(alias);
  }

  private getAliasPath(alias: string): string {
    return alias;
  }

  private rewriteImports(content: string, sourcePath: string): string {
    const aliases = this.config.aliases ?? {};
    const componentsAlias = this.getAliasPath(aliases.components ?? "~/components/ui");
    const utilsAlias = this.getAliasPath(aliases.utils ?? "~/lib/utils");
    const hooksAlias = this.getAliasPath(aliases.hooks ?? "~/hooks");

    const sourcePosix = sourcePath.split("\\").join("/");
    const sourceDir = posix.dirname(sourcePosix);

    return content.replace(
      /\b(from\s+["']|import\s*\(\s*["'])([^"']+)(["'])/g,
      (_m, prefix: string, specifier: string, suffix: string) => {
        if (specifier.startsWith("~/components/ui")) {
          return `${prefix}${specifier.replace("~/components/ui", componentsAlias)}${suffix}`;
        }
        if (specifier.startsWith("~/lib/utils") || specifier.startsWith("~/lib/cn")) {
          return `${prefix}${specifier.replace(/^~\/lib\/(utils|cn)/, utilsAlias)}${suffix}`;
        }
        if (specifier.startsWith("~/hooks")) {
          return `${prefix}${specifier.replace("~/hooks", hooksAlias)}${suffix}`;
        }

        if (specifier.startsWith("../") || specifier.startsWith("./")) {
          const resolved = posix.normalize(posix.join(sourceDir, specifier));

          const getComponentDir = (p: string) => {
            const dir = p.split("/").slice(0, -1).join("/");
            const parts = dir.split("/");
            if (parts[0] === "components" && parts[1] === "ui") {
              return parts.slice(0, 3).join("/");
            }
            return parts.slice(0, 1).join("/");
          };

          if (getComponentDir(resolved) === getComponentDir(sourcePosix)) {
            return `${prefix}${specifier}${suffix}`;
          }

          if (resolved.startsWith("components/ui/")) {
            const tail = resolved.slice("components/ui/".length);
            const noExt = tail.replace(/\.(ts|tsx|js|jsx)$/, "");
            return `${prefix}${componentsAlias}/${noExt}${suffix}`;
          }
          if (resolved.startsWith("hooks/")) {
            const tail = resolved.slice("hooks/".length);
            const noExt = tail.replace(/\.(ts|tsx|js|jsx)$/, "");
            return `${prefix}${hooksAlias}/${noExt}${suffix}`;
          }
          if (resolved.startsWith("lib/")) {
            const tail = resolved.slice("lib/".length);
            const noExt = tail.replace(/\.(ts|tsx|js|jsx)$/, "");
            return `${prefix}${utilsAlias.replace(/\/utils$/, "")}/${noExt}${suffix}`;
          }
        }

        return `${prefix}${specifier}${suffix}`;
      },
    );
  }

  async plan(item: RegistryItem): Promise<PlannedFileWrite[]> {
    const plans: PlannedFileWrite[] = [];

    for (const file of item.files ?? []) {
      if (!file.content) continue;

      const targetPath = this.resolveAlias(file.path);
      const rewritten = this.rewriteImports(file.content, file.path);
      const exists = await fsExtra.pathExists(targetPath);
      const current = exists ? await fsExtra.readFile(targetPath, "utf-8") : null;
      const same = current !== null && current === rewritten;

      plans.push({
        sourcePath: file.path,
        targetPath,
        outputPath: file.path,
        content: rewritten,
        exists,
        same,
        ...(current !== null ? { currentContent: current } : {}),
      });
    }

    return plans;
  }

  async install(item: RegistryItem): Promise<void> {
    await this.installDependencies(item.dependencies, item.devDependencies);

    for (const file of item.files ?? []) {
      if (!file.content) continue;

      const targetPath = this.resolveAlias(file.path);
      const dir = dirname(targetPath);

      if (!this.dryRun) {
        await fsExtra.ensureDir(dir);
      }

      if (!this.overwrite && (await fsExtra.pathExists(targetPath))) {
        console.log(pc.yellow(`  skip  ${file.path} (already exists)`));
        continue;
      }

      if (this.onlyModified && (await fsExtra.pathExists(targetPath))) {
        const rewritten = this.rewriteImports(file.content, file.path);
        const current = await fsExtra.readFile(targetPath, "utf-8");
        if (current === rewritten) {
          console.log(pc.dim(`  skip  ${file.path} (unchanged)`));
          continue;
        }
      }

      if (this.dryRun) {
        console.log(pc.cyan(`  plan  ${file.path}`));
      } else {
        const rewritten = this.rewriteImports(file.content, file.path);
        await fsExtra.writeFile(targetPath, rewritten);
        console.log(pc.green(`  write ${file.path}`));
      }
    }
  }
}
