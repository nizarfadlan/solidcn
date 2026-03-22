import { resolve } from "node:path";
import { Command } from "commander";
import pc from "picocolors";
import { Fetcher } from "../registry/fetcher.js";
import { loadConfig } from "../schema/config.js";
import type { RegistryIndex } from "../schema/registry.js";

export const searchCommand = new Command("search")
  .description("Search for components across configured registries")
  .argument("<query>", "Search query")
  .option("--cwd <path>", "Working directory", process.cwd())
  .action(async (query: string, opts: { cwd: string }) => {
    const cwd = resolve(opts.cwd);
    const config = await loadConfig(cwd);
    const fetcher = new Fetcher(config);

    const registries = Object.keys(config.registries ?? {});
    const defaultLabel = "solidcn";

    const allRegistries = [defaultLabel, ...registries];
    const results: Array<{ registry: string; name: string; type: string; description?: string }> =
      [];

    for (const reg of allRegistries) {
      try {
        const index: RegistryIndex = await fetcher.fetchIndex(
          reg === defaultLabel ? undefined : reg,
        );
        const matches = index.items.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase()),
        );
        for (const m of matches) {
          results.push({ registry: reg, name: m.name, type: m.type });
        }
      } catch {
        // skip unreachable registries
      }
    }

    if (results.length === 0) {
      console.log(pc.dim(`No components found matching "${query}"`));
      return;
    }

    console.log(`\n${pc.bold(`Results for "${query}"`)}\n`);
    for (const r of results) {
      const prefix = r.registry === defaultLabel ? "" : `${pc.cyan(r.registry)}/`;
      console.log(`  ${prefix}${pc.white(r.name)}  ${pc.dim(r.type)}`);
    }
    console.log();
  });
