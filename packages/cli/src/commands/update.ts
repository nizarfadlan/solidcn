import { resolve } from "node:path";
import { confirm, intro, outro, spinner } from "@clack/prompts";
import { Command } from "commander";
import pc from "picocolors";
import { Fetcher } from "../registry/fetcher.js";
import { Installer } from "../registry/installer.js";
import { Resolver } from "../registry/resolver.js";
import { loadConfig } from "../schema/config.js";

export const updateCommand = new Command("update")
  .description("Update existing component files from registry")
  .argument("<components...>", "Component name(s) or URL(s)")
  .option("--cwd <path>", "Working directory", process.cwd())
  .option("-y, --yes", "Skip confirmation prompts", false)
  .option("--dry-run", "Show what would be updated, without writing files", false)
  .option("--only-modified", "Only write files that actually changed", false)
  .action(
    async (
      components: string[],
      opts: { cwd: string; yes: boolean; dryRun: boolean; onlyModified: boolean },
    ) => {
      try {
        const cwd = resolve(opts.cwd);
        intro("solidcn update");

        const config = await loadConfig(cwd);
        const fetcher = new Fetcher(config);
        const resolver = new Resolver(fetcher, config);
        // update should overwrite existing files with latest registry content
        const installer = new Installer(cwd, config, true, opts.dryRun, opts.onlyModified);

        for (const component of components) {
          const s = spinner();
          s.start(`Resolving ${component}`);
          const items = await resolver.resolve(component);
          s.stop(`Resolved ${items.length} item(s)`);

          for (const item of items) {
            const plans = await installer.plan(item);
            const adds = plans.filter((p) => !p.exists).length;
            const mods = plans.filter((p) => p.exists && !p.same).length;
            const same = plans.filter((p) => p.same).length;

            if (adds === 0 && mods === 0) {
              console.log(pc.dim(`No changes for ${item.name} (${same} same file(s))`));
              continue;
            }

            if (!opts.yes) {
              const ok = await confirm({
                message: `Update ${item.name}?${mods ? `\n  modify: ${mods}` : ""}${
                  adds ? `\n  add: ${adds}` : ""
                }${same ? `\n  unchanged: ${same}` : ""}`,
                initialValue: true,
              });
              if (!ok) continue;
            }

            const s2 = spinner();
            s2.start(`${opts.dryRun ? "Planning" : "Updating"} ${item.name}`);
            await installer.install(item);
            s2.stop(`${opts.dryRun ? "Planned" : "Updated"} ${item.name}`);
          }
        }

        outro("Done!");
      } catch (err) {
        console.error(pc.red(err instanceof Error ? err.message : String(err)));
        process.exit(1);
      }
    },
  );
