import { readFile, readdir } from "node:fs/promises";
import { dirname, isAbsolute, resolve } from "node:path";
import { outro } from "@clack/prompts";
import { Command } from "commander";
import pc from "picocolors";
import { isValidRegistryIndex, isValidRegistryItem } from "../../registry/validator.js";

export const registryValidateCommand = new Command("validate")
  .description("Validate registry index JSON (schema check)")
  .option("--cwd <path>", "Working directory", process.cwd())
  .option("--registry <file>", "Path to registry.json (default: <cwd>/public/r/registry.json)")
  .action(async (opts: { cwd: string; registry?: string }) => {
    const cwd = resolve(opts.cwd);
    const registryPath = opts.registry
      ? isAbsolute(opts.registry)
        ? opts.registry
        : resolve(cwd, opts.registry)
      : resolve(cwd, "public/r/registry.json");

    let raw: string;
    try {
      raw = await readFile(registryPath, "utf-8");
    } catch {
      console.error(pc.red(`Cannot read ${registryPath}`));
      process.exit(1);
    }

    let data: unknown;
    try {
      data = JSON.parse(raw) as unknown;
    } catch {
      console.error(pc.red("Invalid JSON"));
      process.exit(1);
    }

    if (!isValidRegistryIndex(data)) {
      console.error(pc.red("registry.json does not match the registry index schema"));
      process.exit(1);
    }

    const index = data;
    const registryDir = dirname(registryPath);
    const itemFiles = new Set(
      (await readdir(registryDir))
        .filter((name) => name.endsWith(".json") && name !== "registry.json")
        .map((name) => name.replace(/\.json$/, "")),
    );

    const indexNames = new Set(index.items.map((i) => i.name));
    const graph = new Map<string, string[]>();
    const filePathOwners = new Map<string, string>();

    for (const item of index.items) {
      const itemPath = resolve(registryDir, `${item.name}.json`);
      let itemRaw = "";
      try {
        itemRaw = await readFile(itemPath, "utf-8");
      } catch {
        console.error(pc.red(`Missing item file for "${item.name}": ${itemPath}`));
        process.exit(1);
      }

      let parsedItem: unknown;
      try {
        parsedItem = JSON.parse(itemRaw);
      } catch {
        console.error(pc.red(`Invalid JSON in item file: ${itemPath}`));
        process.exit(1);
      }

      if (!isValidRegistryItem(parsedItem)) {
        console.error(pc.red(`Item file does not match schema: ${itemPath}`));
        process.exit(1);
      }

      for (const dep of parsedItem.registryDependencies ?? []) {
        if (!indexNames.has(dep)) {
          console.error(pc.red(`"${item.name}" depends on missing registry item "${dep}"`));
          process.exit(1);
        }
      }

      graph.set(item.name, parsedItem.registryDependencies ?? []);

      for (const f of parsedItem.files ?? []) {
        const owner = filePathOwners.get(f.path);
        if (owner && owner !== item.name) {
          console.error(
            pc.red(`File path collision: "${f.path}" is emitted by "${owner}" and "${item.name}"`),
          );
          process.exit(1);
        }
        filePathOwners.set(f.path, item.name);
      }

      itemFiles.delete(item.name);
    }

    const visited = new Set<string>();
    const stack = new Set<string>();
    const visit = (node: string) => {
      if (stack.has(node)) {
        console.error(pc.red(`Cycle detected in registryDependencies at "${node}"`));
        process.exit(1);
      }
      if (visited.has(node)) return;
      visited.add(node);
      stack.add(node);
      for (const dep of graph.get(node) ?? []) visit(dep);
      stack.delete(node);
    };

    for (const name of indexNames) visit(name);

    if (itemFiles.size > 0) {
      console.error(
        pc.red(
          `Orphan item files not listed in registry.json: ${Array.from(itemFiles).join(", ")}`,
        ),
      );
      process.exit(1);
    }

    outro(pc.green("registry.json is valid"));
  });
