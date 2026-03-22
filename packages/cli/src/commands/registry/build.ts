import { glob } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { outro, spinner } from "@clack/prompts";
import { Command } from "commander";
import { ensureDir, pathExists, readFile, readJson, writeFile } from "fs-extra";
import pc from "picocolors";
import type { RegistryItem } from "../../schema/registry.js";

export const registryBuildCommand = new Command("build")
  .description("Build registry JSON from source components")
  .option("--cwd <path>", "Working directory", process.cwd())
  .option("--input <dir>", "Source directory", "registry/items")
  .option("--output <dir>", "Output directory", "public/r")
  .action(async (opts: { cwd: string; input: string; output: string }) => {
    const cwd = resolve(opts.cwd);
    const inputDir = resolve(cwd, opts.input);
    const outputDir = resolve(cwd, opts.output);

    if (!(await pathExists(inputDir))) {
      console.error(pc.red(`Input directory not found: ${inputDir}`));
      process.exit(1);
    }

    await ensureDir(outputDir);

    const s = spinner();
    s.start("Building registry...");

    const registryJson = resolve(cwd, "registry.json");
    const registryMeta = (await pathExists(registryJson))
      ? await readJson(registryJson)
      : { name: basename(cwd), homepage: "", items: [] };

    const generatedItems: Array<{ name: string; type: string }> = [];
    const files = glob(`${inputDir}/*.{tsx,ts,json}`);

    for await (const file of files) {
      const content = await readFile(file, "utf-8");
      const name = basename(file).replace(/\.(tsx|ts|json)$/, "");

      const item: RegistryItem = {
        $schema: "https://solidcn.dev/schema/registry-item.json",
        name,
        type: "registry:ui",
        title: name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        description: `${name} component for SolidJS`,
        dependencies: [],
        devDependencies: [],
        registryDependencies: [],
        files: [
          {
            path: `components/ui/${name}.tsx`,
            type: "registry:ui",
            content,
          },
        ],
      };

      await writeFile(resolve(outputDir, `${name}.json`), `${JSON.stringify(item, null, 2)}\n`);
      generatedItems.push({ name, type: item.type });
    }

    const outputRegistry = {
      $schema: "https://solidcn.dev/schema/registry.json",
      ...registryMeta,
      items: generatedItems,
    };

    await writeFile(
      resolve(outputDir, "registry.json"),
      `${JSON.stringify(outputRegistry, null, 2)}\n`,
    );

    s.stop(`Built ${generatedItems.length} component(s) → ${opts.output}`);
    outro("Registry build complete.");
  });
