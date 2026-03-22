import { dirname, resolve } from "node:path";
import { ensureDir, pathExists, writeFile } from "fs-extra";
import pc from "picocolors";
import type { SolidcnConfig } from "../schema/config.js";
import type { RegistryItem } from "../schema/registry.js";

export class Installer {
  constructor(
    private readonly cwd: string,
    private readonly config: SolidcnConfig,
    private readonly overwrite: boolean,
  ) {}

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

  async install(item: RegistryItem): Promise<void> {
    for (const file of item.files ?? []) {
      if (!file.content) continue;

      const targetPath = this.resolveAlias(file.path);
      const dir = dirname(targetPath);

      await ensureDir(dir);

      if (!this.overwrite && (await pathExists(targetPath))) {
        console.log(pc.yellow(`  skip  ${file.path} (already exists)`));
        continue;
      }

      await writeFile(targetPath, file.content);
      console.log(pc.green(`  write ${file.path}`));
    }
  }
}
