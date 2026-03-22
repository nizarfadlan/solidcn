import { resolve } from "node:path";
import { intro, outro, spinner, text } from "@clack/prompts";
import { Command } from "commander";
import fsExtra from "fs-extra";
import pc from "picocolors";

export const registryCreateCommand = new Command("create")
  .description("Scaffold a new registry project")
  .argument("[name]", "Registry project name")
  .option("--cwd <path>", "Parent directory", process.cwd())
  .action(async (nameArg: string | undefined, opts: { cwd: string }) => {
    intro("solidcn registry create");

    const name =
      nameArg ??
      ((await text({
        message: "Registry name:",
        placeholder: "my-registry",
        validate: (v) => (!v ? "Name is required" : undefined),
      })) as string);

    const dir = resolve(opts.cwd, name);

    const s = spinner();
    s.start(`Scaffolding ${name}`);

    await fsExtra.ensureDir(`${dir}/registry/items`);
    await fsExtra.ensureDir(`${dir}/public/r`);

    await fsExtra.writeFile(
      `${dir}/registry.json`,
      `${JSON.stringify(
        {
          $schema: "https://solidcn.dev/schema/registry.json",
          name,
          homepage: "",
          items: [],
        },
        null,
        2,
      )}\n`,
    );

    await fsExtra.writeFile(
      `${dir}/package.json`,
      `${JSON.stringify(
        {
          name,
          private: true,
          scripts: {
            "registry:build": "solidcn registry build",
            "registry:validate": "solidcn registry validate",
          },
          devDependencies: {
            solidcn: "latest",
          },
        },
        null,
        2,
      )}\n`,
    );

    await fsExtra.writeFile(
      `${dir}/registry/items/example.tsx`,
      `// Example component — replace with your own\nimport type { Component } from "solid-js";\n\nexport const Example: Component = () => {\n  return <div class="rounded-md bg-card p-4">Hello from your registry!</div>;\n};\n`,
    );

    s.stop(`Created ${name}`);

    console.log(`\n${pc.bold("Next steps:")}`);
    console.log(`  cd ${name}`);
    console.log("  pnpm install");
    console.log("  pnpm registry:build");
    console.log("  # Deploy public/ to your hosting provider");
    console.log(`  # Then others can: npx solidcn@latest add @${name}/example\n`);

    outro("Done!");
  });
