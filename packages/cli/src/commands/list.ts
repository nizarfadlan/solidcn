import { resolve } from "node:path";
import { Command } from "commander";
import pc from "picocolors";
import { Fetcher } from "../registry/fetcher.js";
import { loadConfig } from "../schema/config.js";

export const listCommand = new Command("list")
  .description("List all available components")
  .argument("[registry]", "Registry namespace (e.g. @acme)")
  .option("--cwd <path>", "Working directory", process.cwd())
  .option("--type <type>", "Filter by type: ui, block, hook")
  .action(async (registry: string | undefined, opts: { cwd: string; type?: string }) => {
    const cwd = resolve(opts.cwd);
    const config = await loadConfig(cwd);
    const fetcher = new Fetcher(config);

    const index = await fetcher.fetchIndex(registry);
    const items = opts.type
      ? index.items.filter((i) => i.type === `registry:${opts.type}`)
      : index.items;

    const prefix = registry ? `${pc.cyan(registry)}/` : "";
    console.log(`\n${pc.bold(`Components${registry ? ` from ${registry}` : ""}`)}\n`);

    for (const item of items) {
      console.log(`  ${prefix}${pc.white(item.name)}  ${pc.dim(item.type)}`);
    }

    console.log(`\n${pc.dim(`${items.length} component(s)`)}\n`);
  });
