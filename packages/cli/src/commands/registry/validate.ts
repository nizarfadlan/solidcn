import { readFile } from "node:fs/promises";
import { isAbsolute, resolve } from "node:path";
import { outro } from "@clack/prompts";
import { Command } from "commander";
import pc from "picocolors";
import { isValidRegistryIndex } from "../../registry/validator.js";

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

    outro(pc.green("registry.json is valid"));
  });
