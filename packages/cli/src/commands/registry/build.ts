import { glob } from "node:fs/promises";
import { basename, relative, resolve, sep } from "node:path";
import { outro, spinner } from "@clack/prompts";
import { Command } from "commander";
import fsExtra from "fs-extra";
import pc from "picocolors";
import type { RegistryItem } from "../../schema/registry.js";
import { RegistryItemSchema } from "../../schema/registry.js";

function shouldIncludeSourceFile(path: string): boolean {
  const p = path.replaceAll("\\", "/");
  const base = p.split("/").pop() ?? p;

  if (p.includes("/__tests__/")) return false;
  if (p.includes("/__test__/")) return false;
  if (p.includes("/__mocks__/")) return false;
  if (p.includes("/__fixtures__/")) return false;

  if (base.includes(".test.")) return false;
  if (base.includes(".spec.")) return false;
  if (base.includes(".stories.")) return false;
  if (base.includes(".story.")) return false;
  if (base.includes(".demo.")) return false;

  return true;
}

type RegistryMetaOverride = Partial<
  Pick<
    RegistryItem,
    | "type"
    | "title"
    | "description"
    | "dependencies"
    | "devDependencies"
    | "registryDependencies"
    | "cssVars"
    | "meta"
  >
> & {
  include?: string[];
  exclude?: string[];
};

async function readRegistryMetaOverride(
  componentFolder: string,
): Promise<RegistryMetaOverride | null> {
  const metaPath = resolve(componentFolder, "registry.meta.json");
  if (!(await fsExtra.pathExists(metaPath))) return null;

  try {
    const raw = await fsExtra.readFile(metaPath, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    const obj =
      typeof parsed === "object" && parsed !== null ? (parsed as Record<string, unknown>) : null;
    if (!obj) return null;

    const { include, exclude, ...rest } = obj;
    RegistryItemSchema.partial().parse(rest);

    const result: RegistryMetaOverride = {
      ...(rest as RegistryMetaOverride),
      ...(Array.isArray(include) ? { include: include.filter((s) => typeof s === "string") } : {}),
      ...(Array.isArray(exclude) ? { exclude: exclude.filter((s) => typeof s === "string") } : {}),
    };

    return result;
  } catch {
    return null;
  }
}

function mergeUniqueStrings(base: string[], override?: string[]): string[] {
  if (!override) return base;
  const set = new Set(base);
  for (const v of override) set.add(v);
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function toPackageName(specifier: string): string | null {
  if (
    specifier.startsWith(".") ||
    specifier.startsWith("/") ||
    specifier.startsWith("~/") ||
    specifier.startsWith("node:")
  ) {
    return null;
  }

  if (specifier === "typescript") return null;

  if (specifier.startsWith("@")) {
    const [scope, name] = specifier.split("/");
    if (!scope || !name) return null;
    return `${scope}/${name}`;
  }

  const [name] = specifier.split("/");
  return name ?? null;
}

function collectImportSpecifiers(contents: string[]): string[] {
  const specifiers = new Set<string>();

  const re =
    /\b(?:import|export)\s+[^;]*?\sfrom\s+["']([^"']+)["']|\bimport\s*\(\s*["']([^"']+)["']\s*\)/g;

  for (const content of contents) {
    re.lastIndex = 0;
    for (;;) {
      const m = re.exec(content);
      if (m === null) break;
      const spec = m[1] ?? m[2];
      if (!spec) continue;
      specifiers.add(spec);
    }
  }

  return Array.from(specifiers);
}

function normalizeComponentNameFromImport(specifier: string): string | null {
  if (!specifier.startsWith("~/components/ui/")) return null;
  const tail = specifier.replace("~/components/ui/", "");
  const noExt = tail.replace(/\.(ts|tsx|js|jsx)$/, "");
  const first = noExt.split("/")[0];
  return first || null;
}

function normalizeComponentNameFromRelativeImport(specifier: string): string | null {
  if (!specifier.startsWith("../")) return null;
  const tail = specifier.replace(/^..\//, "");
  const noExt = tail.replace(/\.(ts|tsx|js|jsx)$/, "");
  const first = noExt.split("/")[0];
  return first || null;
}

function transformRegistryContent(content: string): string {
  const normalized = content
    .replaceAll("~/lib/cn.js", "~/lib/utils")
    .replaceAll("~/lib/cn", "~/lib/utils");

  // Registry output should be extension-less for local TS imports,
  // matching consumer project conventions (shadcn-like output).
  return normalized.replace(
    /\b(from\s+["'])([^"']+?)(\.(?:js|ts|jsx|tsx))(["'])/g,
    (_m, p1: string, path: string, _ext: string, p4: string) => `${p1}${path}${p4}`,
  );
}

function collectDependencyBuckets(
  contents: string[],
  itemName: string,
  knownRegistryItems: Set<string>,
): { dependencies: string[]; registryDependencies: string[] } {
  const deps = new Set<string>();
  const registryDeps = new Set<string>();

  for (const specifier of collectImportSpecifiers(contents)) {
    const internalComponent = normalizeComponentNameFromImport(specifier);
    if (
      internalComponent &&
      internalComponent !== itemName &&
      knownRegistryItems.has(internalComponent)
    ) {
      registryDeps.add(internalComponent);
      continue;
    }

    const relativeComponent = normalizeComponentNameFromRelativeImport(specifier);
    if (
      relativeComponent &&
      relativeComponent !== itemName &&
      knownRegistryItems.has(relativeComponent)
    ) {
      registryDeps.add(relativeComponent);
      continue;
    }

    if (specifier.startsWith("~/lib/")) {
      registryDeps.add("utils");
      continue;
    }

    const pkg = toPackageName(specifier);
    if (pkg) deps.add(pkg);
  }

  deps.delete("solid-js");
  deps.delete("solid-js/web");

  return {
    dependencies: Array.from(deps).sort((a, b) => a.localeCompare(b)),
    registryDependencies: Array.from(registryDeps).sort((a, b) => a.localeCompare(b)),
  };
}

export const registryBuildCommand = new Command("build")
  .description("Build registry JSON from source components")
  .option("--cwd <path>", "Working directory", process.cwd())
  .option("--input <dir>", "Source directory", "registry/items")
  .option("--output <dir>", "Output directory", "public/r")
  .action(async (opts: { cwd: string; input: string; output: string }) => {
    const cwd = resolve(opts.cwd);
    const inputDir = resolve(cwd, opts.input);
    const outputDir = resolve(cwd, opts.output);

    if (!(await fsExtra.pathExists(inputDir))) {
      console.error(pc.red(`Input directory not found: ${inputDir}`));
      process.exit(1);
    }

    await fsExtra.ensureDir(outputDir);
    await fsExtra.emptyDir(outputDir);

    const s = spinner();
    s.start("Building registry...");

    const registryJson = resolve(cwd, "registry.json");
    const registryMeta = (await fsExtra.pathExists(registryJson))
      ? await fsExtra.readJson(registryJson)
      : { name: basename(cwd), homepage: "", items: [] };

    const generatedItems: Array<{ name: string; type: string }> = [];
    const files = glob(`${inputDir}/**/*.{tsx,ts,json}`);

    for await (const file of files) {
      const rel = relative(inputDir, file);
      const parts = rel.split(sep);
      const isNested = parts.length > 1;

      if (isNested) continue;

      const rawContent = await fsExtra.readFile(file, "utf-8");
      const content = transformRegistryContent(rawContent);
      const name = basename(file).replace(/\.(tsx|ts|json)$/, "");

      const buckets = collectDependencyBuckets([content], name, new Set());
      const item: RegistryItem = {
        $schema: "https://solidcn.nizarfadlan.dev/schema/registry-item.json",
        name,
        type: "registry:ui",
        title: name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        description: `${name} component for SolidJS`,
        dependencies: buckets.dependencies,
        devDependencies: [],
        registryDependencies: buckets.registryDependencies,
        files: [
          {
            path: `components/ui/${name}.tsx`,
            type: "registry:ui",
            content,
          },
        ],
      };

      await fsExtra.writeFile(
        resolve(outputDir, `${name}.json`),
        `${JSON.stringify(item, null, 2)}\n`,
      );
      generatedItems.push({ name, type: item.type });
    }

    const componentFolders = await fsExtra.readdir(inputDir).then((entries) =>
      entries
        .filter((e) => !e.startsWith("."))
        .map((e) => resolve(inputDir, e))
        .filter((p) => fsExtra.statSync(p).isDirectory()),
    );

    componentFolders.sort((a, b) => basename(a).localeCompare(basename(b)));

    const knownRegistryItems = new Set(componentFolders.map((f) => basename(f)));
    knownRegistryItems.add("utils");

    for (const folder of componentFolders) {
      const name = basename(folder);
      const override = await readRegistryMetaOverride(folder);
      const folderFiles = [];
      for await (const f of glob(`${folder}/**/*.{ts,tsx}`)) {
        const base = basename(f);
        if (base.startsWith(".")) continue;
        if (base.endsWith(".d.ts")) continue;
        if (!shouldIncludeSourceFile(f)) continue;
        folderFiles.push(f);
      }

      if (folderFiles.length === 0) continue;

      const filesOut: RegistryItem["files"] = [];
      const hasSinglePrimary =
        folderFiles.some((f) => basename(f) === `${name}.tsx`) && folderFiles.length === 1;

      for (const f of folderFiles) {
        const rawContent = await fsExtra.readFile(f, "utf-8");
        const content = transformRegistryContent(rawContent);
        const outPath = hasSinglePrimary
          ? `components/ui/${name}.tsx`
          : `components/ui/${name}/${relative(folder, f).split(sep).join("/")}`;

        filesOut.push({
          path: outPath,
          type: "registry:ui",
          content,
        });
      }

      if (override?.exclude?.length) {
        const exc = override.exclude ?? [];
        for (let i = filesOut.length - 1; i >= 0; i--) {
          const file = filesOut[i];
          if (!file) continue;
          if (exc.some((s) => file.path.includes(s))) filesOut.splice(i, 1);
        }
      }

      filesOut.sort((a, b) => a.path.localeCompare(b.path));

      const buckets = collectDependencyBuckets(
        filesOut.map((f) => f.content ?? ""),
        name,
        knownRegistryItems,
      );

      const itemType = override?.type ?? "registry:ui";
      const itemTitle =
        override?.title ?? name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      const itemDescription = override?.description ?? `${name} component for SolidJS`;

      const deps = mergeUniqueStrings(buckets.dependencies, override?.dependencies);
      const devDeps = mergeUniqueStrings([], override?.devDependencies);
      const regDeps = mergeUniqueStrings(
        buckets.registryDependencies,
        override?.registryDependencies,
      );

      const item: RegistryItem = {
        $schema: "https://solidcn.nizarfadlan.dev/schema/registry-item.json",
        name,
        type: itemType,
        title: itemTitle,
        description: itemDescription,
        dependencies: deps,
        devDependencies: devDeps,
        registryDependencies: regDeps,
        files: filesOut,
        ...(override?.cssVars ? { cssVars: override.cssVars } : {}),
        ...(override?.meta ? { meta: override.meta } : {}),
      };

      await fsExtra.writeFile(
        resolve(outputDir, `${name}.json`),
        `${JSON.stringify(item, null, 2)}\n`,
      );
      generatedItems.push({ name, type: item.type });
    }

    const cnPath = resolve(inputDir, "..", "lib", "cn.ts");
    if (await fsExtra.pathExists(cnPath)) {
      const rawCnContent = await fsExtra.readFile(cnPath, "utf-8");
      const cnContent = transformRegistryContent(rawCnContent);
      const utilsItem: RegistryItem = {
        $schema: "https://solidcn.nizarfadlan.dev/schema/registry-item.json",
        name: "utils",
        type: "registry:lib",
        title: "Utils",
        description: "Shared utility helpers for solidcn components",
        dependencies: ["clsx", "tailwind-merge"],
        devDependencies: [],
        registryDependencies: [],
        files: [
          {
            path: "lib/utils.ts",
            type: "registry:lib",
            content: cnContent,
          },
        ],
      };

      await fsExtra.writeFile(
        resolve(outputDir, "utils.json"),
        `${JSON.stringify(utilsItem, null, 2)}\n`,
      );
      generatedItems.push({ name: "utils", type: "registry:lib" });
    }

    generatedItems.sort((a, b) => a.name.localeCompare(b.name));

    const outputRegistry = {
      $schema: "https://solidcn.nizarfadlan.dev/schema/registry.json",
      ...registryMeta,
      items: generatedItems,
    };

    await fsExtra.writeFile(
      resolve(outputDir, "registry.json"),
      `${JSON.stringify(outputRegistry, null, 2)}\n`,
    );

    s.stop(`Built ${generatedItems.length} component(s) → ${opts.output}`);
    outro("Registry build complete.");
  });
