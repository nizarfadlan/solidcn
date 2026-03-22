import { existsSync } from "node:fs";
import { basename, extname, resolve } from "node:path";
import { intro, outro, select, spinner, text } from "@clack/prompts";
import { Command } from "commander";
import { ensureDir, pathExists, readJson, writeFile } from "fs-extra";
import pc from "picocolors";

const ITEM_TYPES = [
  { value: "registry:ui", label: "UI Component" },
  { value: "registry:block", label: "Block (composite layout)" },
  { value: "registry:hook", label: "Hook / utility" },
  { value: "registry:lib", label: "Library / helper" },
  { value: "registry:page", label: "Full page" },
] as const;

export const registryAddCommand = new Command("add")
  .description("Add a component to the local registry")
  .argument("[name]", "Component name (slug)")
  .option("--cwd <path>", "Working directory", process.cwd())
  .option("--input <dir>", "Items directory", "registry/items")
  .option(
    "--type <type>",
    "Item type (registry:ui | registry:block | registry:hook | registry:lib | registry:page)",
  )
  .action(
    async (nameArg: string | undefined, opts: { cwd: string; input: string; type?: string }) => {
      intro("solidcn registry add");

      const cwd = resolve(opts.cwd);
      const itemsDir = resolve(cwd, opts.input);
      const registryJsonPath = resolve(cwd, "registry.json");

      if (!(await pathExists(itemsDir))) {
        console.error(
          pc.red(
            `Items directory not found: ${itemsDir}\n` +
              `Run ${pc.bold("solidcn registry create")} first to scaffold a registry project.`,
          ),
        );
        process.exit(1);
      }

      // Resolve name
      const rawName =
        nameArg ??
        ((await text({
          message: "Component name (slug):",
          placeholder: "my-button",
          validate: (v) => {
            if (!v) return "Name is required";
            if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(v))
              return "Use lowercase letters, numbers, and hyphens only";
          },
        })) as string);

      const name = rawName.toLowerCase().replace(/\s+/g, "-");

      // Resolve type
      const type =
        opts.type ??
        ((await select({
          message: "Item type:",
          options: ITEM_TYPES as unknown as Array<{ value: string; label: string }>,
        })) as string);

      // Look for an existing source file
      const extensions = [".tsx", ".ts", ".jsx", ".js"];
      let sourcePath: string | null = null;
      for (const ext of extensions) {
        const candidate = resolve(itemsDir, `${name}${ext}`);
        if (existsSync(candidate)) {
          sourcePath = candidate;
          break;
        }
      }

      const s = spinner();

      if (!sourcePath) {
        // Create a placeholder file
        s.start(`Creating ${name}.tsx`);
        await ensureDir(itemsDir);
        const placeholder = `import type { Component } from "solid-js";
import { cn } from "~/lib/utils";

interface ${toPascalCase(name)}Props {
  class?: string;
}

export const ${toPascalCase(name)}: Component<${toPascalCase(name)}Props> = (props) => {
  return (
    <div class={cn("rounded-md bg-card p-4", props.class)}>
      {/* TODO: implement ${name} */}
    </div>
  );
};
`;
        sourcePath = resolve(itemsDir, `${name}.tsx`);
        await writeFile(sourcePath, placeholder, "utf-8");
        s.stop(`Created ${opts.input}/${name}.tsx`);
      } else {
        s.message(`Found existing source: ${opts.input}/${basename(sourcePath)}`);
        s.stop();
      }

      // Update registry.json
      let registryMeta: {
        $schema: string;
        name: string;
        homepage: string;
        items: Array<{ name: string; type: string }>;
      } = {
        $schema: "https://solidcn.dev/schema/registry.json",
        name: basename(cwd),
        homepage: "",
        items: [],
      };

      if (await pathExists(registryJsonPath)) {
        registryMeta = await readJson(registryJsonPath);
      }

      const alreadyListed = registryMeta.items.some((i) => i.name === name);
      if (!alreadyListed) {
        registryMeta.items.push({ name, type });
        await writeFile(registryJsonPath, `${JSON.stringify(registryMeta, null, 2)}\n`, "utf-8");
        console.log(pc.green(`  ✓ Added "${name}" to registry.json`));
      } else {
        console.log(pc.yellow(`  ⚠ "${name}" is already listed in registry.json`));
      }

      outro(
        [
          pc.bold("Next steps:"),
          `  Edit ${opts.input}/${name}${extname(sourcePath)}`,
          `  Run ${pc.cyan("solidcn registry build")} to generate JSON`,
        ].join("\n"),
      );
    },
  );

function toPascalCase(str: string): string {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}
