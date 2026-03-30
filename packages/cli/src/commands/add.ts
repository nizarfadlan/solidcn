import { resolve } from "node:path";
import { confirm, intro, outro, spinner } from "@clack/prompts";
import { Command } from "commander";
import { Fetcher } from "../registry/fetcher.js";
import { Installer } from "../registry/installer.js";
import { Resolver } from "../registry/resolver.js";
import { loadConfig } from "../schema/config.js";

export const addCommand = new Command("add")
  .description("Add a component to your project")
  .argument("<components...>", "Component name(s) or URL(s)")
  .option("--cwd <path>", "Working directory", process.cwd())
  .option("-y, --yes", "Skip confirmation prompts", false)
  .option("--overwrite", "Overwrite existing files", false)
  .option("--dry-run", "Show what would be installed, without writing files", false)
  .action(
    async (
      components: string[],
      opts: { cwd: string; yes: boolean; overwrite: boolean; dryRun: boolean },
    ) => {
      const cwd = resolve(opts.cwd);

      intro("solidcn add");

      const config = await loadConfig(cwd);
      const fetcher = new Fetcher(config);
      const resolver = new Resolver(fetcher, config);
      const installer = new Installer(cwd, config, opts.overwrite, opts.dryRun, false);

      for (const component of components) {
        const s = spinner();
        s.start(`Resolving ${component}`);

        const items = await resolver.resolve(component);
        s.stop(`Resolved ${items.length} item(s) for ${component}`);

        for (const item of items) {
          if (!opts.yes) {
            const deps = (item.dependencies ?? []).join(", ");
            const regDeps = (item.registryDependencies ?? []).join(", ");
            const files = (item.files ?? []).map((f) => `- ${f.path}`).join("\n");

            const ok = await confirm({
              message: `Install ${item.name}?${deps ? `\n  deps: ${deps}` : ""}${
                regDeps ? `\n  registry deps: ${regDeps}` : ""
              }${files ? `\n  files:\n${files}` : ""}`,
              initialValue: true,
            });

            if (!ok) continue;
          }

          const s2 = spinner();
          s2.start(`${opts.dryRun ? "Planning" : "Installing"} ${item.name}`);
          await installer.install(item);
          s2.stop(`${opts.dryRun ? "Planned" : "Installed"} ${item.name}`);
        }
      }

      outro("Done!");
    },
  );
