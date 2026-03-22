import { resolve } from "node:path";
import { intro, outro, spinner } from "@clack/prompts";
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
  .action(async (components: string[], opts: { cwd: string; yes: boolean; overwrite: boolean }) => {
    const cwd = resolve(opts.cwd);

    intro("solidcn add");

    const config = await loadConfig(cwd);
    const fetcher = new Fetcher(config);
    const resolver = new Resolver(fetcher, config);
    const installer = new Installer(cwd, config, opts.overwrite);

    for (const component of components) {
      const s = spinner();
      s.start(`Resolving ${component}`);

      const items = await resolver.resolve(component);
      s.stop(`Resolved ${items.length} item(s) for ${component}`);

      for (const item of items) {
        const s2 = spinner();
        s2.start(`Installing ${item.name}`);
        await installer.install(item);
        s2.stop(`Installed ${item.name}`);
      }
    }

    outro("Done!");
  });
