import { resolve } from "node:path";
import { Command } from "commander";
import pc from "picocolors";
import { Fetcher } from "../registry/fetcher.js";
import { loadConfig } from "../schema/config.js";

export const viewCommand = new Command("view")
  .description("Preview a component before installing")
  .argument("<component>", "Component name or URL")
  .option("--cwd <path>", "Working directory", process.cwd())
  .action(async (component: string, opts: { cwd: string }) => {
    const cwd = resolve(opts.cwd);
    const config = await loadConfig(cwd);
    const fetcher = new Fetcher(config);

    const item = await fetcher.fetchItem(component);

    console.log(`\n${pc.bold(item.title ?? item.name)}`);
    if (item.description) {
      console.log(pc.dim(item.description));
    }
    console.log();

    if (item.dependencies?.length) {
      console.log(pc.cyan("Dependencies:"), item.dependencies.join(", "));
    }
    if (item.registryDependencies?.length) {
      console.log(pc.cyan("Registry deps:"), item.registryDependencies.join(", "));
    }

    console.log();
    for (const file of item.files ?? []) {
      console.log(pc.bold(`── ${file.path}`));
      console.log(pc.dim(file.content ?? "(no content preview)"));
      console.log();
    }
  });
