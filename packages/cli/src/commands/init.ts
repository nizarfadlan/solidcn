import { resolve } from "node:path";
import { cancel, confirm, intro, outro, select, spinner, text } from "@clack/prompts";
import { Command } from "commander";
import fsExtra from "fs-extra";
import pc from "picocolors";
import type { SolidcnConfig } from "../schema/config.js";
import { DEFAULT_CONFIG, loadConfig } from "../schema/config.js";
import { Fetcher } from "../registry/fetcher.js";
import { Installer } from "../registry/installer.js";
import { Resolver } from "../registry/resolver.js";

export const initCommand = new Command("init")
  .description("Initialize solidcn in your project")
  .option("-y, --yes", "Skip confirmation prompts", false)
  .option("--skip-install", "Skip package installation", false)
  .option("--dry-run", "Show what would be installed, without writing files", false)
  .option("--cwd <path>", "Working directory", process.cwd())
  .action(async (opts: { yes: boolean; skipInstall: boolean; dryRun: boolean; cwd: string }) => {
    const cwd = resolve(opts.cwd);
    const configPath = resolve(cwd, "solidcn.json");

    intro("solidcn init");

    if (await fsExtra.pathExists(configPath)) {
      const overwrite = opts.yes
        ? true
        : await confirm({ message: "solidcn.json already exists. Overwrite?" });

      if (!overwrite) {
        cancel("Cancelled.");
        process.exit(0);
      }
    }

    const style = opts.yes
      ? "default"
      : await select({
          message: "Which style would you like to use?",
          options: [
            { value: "default", label: "Default" },
            { value: "new-york", label: "New York" },
          ],
        });

    const baseColor = opts.yes
      ? "slate"
      : await select({
          message: "Which base color would you like to use?",
          options: [
            { value: "slate", label: "Slate" },
            { value: "zinc", label: "Zinc" },
            { value: "stone", label: "Stone" },
            { value: "gray", label: "Gray" },
            { value: "neutral", label: "Neutral" },
          ],
        });

    const tailwindCss = opts.yes
      ? "src/app.css"
      : await text({
          message: "Where is your global CSS file?",
          placeholder: "src/app.css",
          initialValue: "src/app.css",
        });

    const componentsAlias = opts.yes
      ? "~/components/ui"
      : await text({
          message: "Configure the import alias for components:",
          placeholder: "~/components/ui",
          initialValue: "~/components/ui",
        });

    const config: SolidcnConfig = {
      ...DEFAULT_CONFIG,
      style: style as string,
      tailwind: {
        css: tailwindCss as string,
        baseColor: baseColor as string,
      },
      aliases: {
        ...DEFAULT_CONFIG.aliases,
        components: componentsAlias as string,
      },
    };

    const s = spinner();
    s.start("Writing solidcn.json");
    await fsExtra.writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`);
    s.stop("solidcn.json created");

    if (!opts.skipInstall) {
      let resolveSpinner: ReturnType<typeof spinner> | null = null;
      try {
        const loadedConfig = await loadConfig(cwd);
        const fetcher = new Fetcher(loadedConfig);
        const resolver = new Resolver(fetcher, loadedConfig);
        const installer = new Installer(cwd, loadedConfig, false, opts.dryRun, false);

        resolveSpinner = spinner();
        resolveSpinner.start("Resolving required packages");

        const items = await resolver.resolve("tailwind-base");
        resolveSpinner.stop(`Resolved ${items.length} item(s)`);

        if (!opts.yes) {
          const allDeps = items.flatMap((i) => [...(i.dependencies ?? []), ...(i.devDependencies ?? [])]);
          const uniqueDeps = Array.from(new Set(allDeps));

          const ok = await confirm({
            message: `Install required packages?\n  packages: ${uniqueDeps.join(", ")}`,
            initialValue: true,
          });

          if (!ok) {
            outro(pc.yellow("Skipped package installation"));
            return;
          }
        }

        const installSpinner = spinner();
        installSpinner.start(`${opts.dryRun ? "Planning" : "Installing"} packages`);
        for (const item of items) {
          await installer.install(item);
        }
        installSpinner.stop(`${opts.dryRun ? "Planned" : "Installed"} packages`);

        outro(pc.green("Done! You can now run `solidcn add <component>` to add components."));
      } catch (error) {
        if (resolveSpinner) {
          resolveSpinner.stop("Installation skipped");
        }
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.log("");
        console.log(pc.yellow("⚠  Warning: Could not install packages automatically"));

        if (errorMessage.includes("not valid JSON") || errorMessage.includes("404") || errorMessage.includes("ECONNREFUSED")) {
          console.log("The registry is currently unavailable. This may happen if:");
          console.log("  • You're using a development build (use --skip-install for now)");
          console.log("  • Network connectivity issues");
        }

        console.log(
          "\nYou can manually install required packages by running:\n" +
            pc.dim(
              "  pnpm add -D tailwindcss postcss autoprefixer\n" +
              "  pnpm add clsx tailwind-merge class-variance-authority lucide-solid\n",
            ),
        );
        console.log(pc.dim("Then run: solidcn add <component>\n"));
      }
    } else {
      outro("Done! You can now run `solidcn add <component>` to add components.");
    }
  });
