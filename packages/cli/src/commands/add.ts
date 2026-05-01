import { resolve } from "node:path";
import { confirm, intro, outro, spinner } from "@clack/prompts";
import { Command } from "commander";
import fsExtra from "fs-extra";
import { Fetcher } from "../registry/fetcher.js";
import { Installer } from "../registry/installer.js";
import { Resolver } from "../registry/resolver.js";
import { DEFAULT_CONFIG, loadConfig } from "../schema/config.js";
import { getPreflightState, needsSetup, runProjectSetup } from "../setup/preflight.js";

export const addCommand = new Command("add")
  .description("Add a component to your project")
  .argument("<components...>", "Component name(s) or URL(s)")
  .option("--cwd <path>", "Working directory", process.cwd())
  .option("-y, --yes", "Skip confirmation prompts", false)
  .option("--overwrite", "Overwrite existing files", false)
  .option("--dry-run", "Show what would be installed, without writing files", false)
  .option("--skip-preflight", "Skip project setup preflight checks", false)
  .action(
    async (
      components: string[],
      opts: {
        cwd: string;
        yes: boolean;
        overwrite: boolean;
        dryRun: boolean;
        skipPreflight: boolean;
      },
    ) => {
      const cwd = resolve(opts.cwd);

      intro("solidcn add");

      const hasConfig = await fsExtra.pathExists(resolve(cwd, "solidcn.json"));
      const config = hasConfig ? await loadConfig(cwd) : DEFAULT_CONFIG;
      const fetcher = new Fetcher(config);
      const resolver = new Resolver(fetcher, config);
      const installer = new Installer(cwd, config, opts.overwrite, opts.dryRun, false);

      if (!opts.skipPreflight) {
        const state = await getPreflightState(cwd, config);
        if (needsSetup(state)) {
          let shouldSetup = opts.yes;

          if (!opts.yes) {
            const answer = await confirm({
              message:
                "Project setup incomplete (solidcn/tailwind). Auto-fix now before adding components?",
              initialValue: true,
            });
            shouldSetup = answer === true;
          }

          if (shouldSetup) {
            if (!hasConfig && !opts.dryRun) {
              await fsExtra.writeFile(
                resolve(cwd, "solidcn.json"),
                `${JSON.stringify(DEFAULT_CONFIG, null, 2)}\n`,
              );
            }

            const effectiveConfig = await loadConfig(cwd);
            const setupInstaller = new Installer(cwd, effectiveConfig, false, opts.dryRun, false);
            const setupSpinner = spinner();
            setupSpinner.start(`${opts.dryRun ? "Planning" : "Applying"} project setup`);
            const setup = await runProjectSetup(
              cwd,
              effectiveConfig,
              setupInstaller,
              opts.dryRun,
              false,
            );
            setupSpinner.stop(`${opts.dryRun ? "Planned" : "Applied"} project setup`);

            if (setup.pluginManualStep) {
              console.log(`\n⚠ ${setup.pluginManualStep}\n`);
            }
          }
        }
      }

      const effectiveConfig = (await fsExtra.pathExists(resolve(cwd, "solidcn.json")))
        ? await loadConfig(cwd)
        : config;
      const effectiveFetcher = new Fetcher(effectiveConfig);
      const effectiveResolver = new Resolver(effectiveFetcher, effectiveConfig);
      const effectiveInstaller = new Installer(
        cwd,
        effectiveConfig,
        opts.overwrite,
        opts.dryRun,
        false,
      );

      for (const component of components) {
        const s = spinner();
        s.start(`Resolving ${component}`);

        const items = await effectiveResolver.resolve(component);
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
          await effectiveInstaller.install(item);
          s2.stop(`${opts.dryRun ? "Planned" : "Installed"} ${item.name}`);
        }
      }

      outro("Done!");
    },
  );
