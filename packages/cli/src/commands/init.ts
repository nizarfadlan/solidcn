import { resolve } from "node:path";
import { cancel, confirm, intro, outro, select, spinner, text } from "@clack/prompts";
import { Command } from "commander";
import fsExtra from "fs-extra";
import type { SolidcnConfig } from "../schema/config.js";
import { DEFAULT_CONFIG } from "../schema/config.js";

export const initCommand = new Command("init")
  .description("Initialize solidcn in your project")
  .option("-y, --yes", "Skip confirmation prompts", false)
  .option("--cwd <path>", "Working directory", process.cwd())
  .action(async (opts: { yes: boolean; cwd: string }) => {
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

    outro("Done! You can now run `solidcn add <component>` to add components.");
  });
