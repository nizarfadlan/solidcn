#!/usr/bin/env node
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import * as p from "@clack/prompts";
import { execa } from "execa";
import { copy, outputJSON } from "fs-extra";
import pc from "picocolors";

const TEMPLATES_DIR = new URL("../templates", import.meta.url).pathname;

async function main() {
  console.log();
  p.intro(pc.bgCyan(pc.black(" create-solidcn-app ")));

  const projectName = await p.text({
    message: "Project name",
    placeholder: "my-solidcn-app",
    validate(v) {
      if (!v) return "Please enter a project name";
      if (!/^[a-z0-9-_]+$/i.test(v)) return "Use only letters, numbers, hyphens, and underscores";
    },
  });
  if (p.isCancel(projectName)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  const template = await p.select({
    message: "Template",
    options: [
      { value: "default", label: "Default", hint: "SolidStart + solidcn + Tailwind v4" },
      { value: "minimal", label: "Minimal", hint: "Bare minimum — only essential components" },
    ],
  });
  if (p.isCancel(template)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  const baseColor = await p.select({
    message: "Base color theme",
    options: [
      { value: "default", label: "Default" },
      { value: "slate", label: "Slate" },
      { value: "zinc", label: "Zinc" },
      { value: "rose", label: "Rose" },
      { value: "blue", label: "Blue" },
      { value: "green", label: "Green" },
      { value: "orange", label: "Orange" },
    ],
  });
  if (p.isCancel(baseColor)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  const packageManager = await p.select({
    message: "Package manager",
    options: [
      { value: "npm", label: "npm" },
      { value: "pnpm", label: "pnpm" },
      { value: "bun", label: "bun" },
    ],
  });
  if (p.isCancel(packageManager)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  const targetDir = resolve(process.cwd(), projectName as string);

  if (existsSync(targetDir)) {
    const overwrite = await p.confirm({
      message: `Directory "${projectName}" already exists. Overwrite?`,
      initialValue: false,
    });
    if (!overwrite || p.isCancel(overwrite)) {
      p.cancel("Cancelled.");
      process.exit(0);
    }
  }

  const spin = p.spinner();

  // Copy template
  spin.start("Scaffolding project...");
  await copy(resolve(TEMPLATES_DIR, template as string), targetDir);

  // Write solidcn.json
  await outputJSON(
    resolve(targetDir, "solidcn.json"),
    {
      $schema: "https://solidcn.dev/schema/config.json",
      style: "default",
      tailwind: { css: "src/app.css", baseColor },
      aliases: { components: "~/components/ui", utils: "~/lib/utils" },
    },
    { spaces: 2 },
  );

  // Write package.json name
  const pkgPath = resolve(targetDir, "package.json");
  const pkg = (await import(pkgPath, { assert: { type: "json" } })).default as Record<
    string,
    unknown
  >;
  pkg.name = projectName as string;
  await outputJSON(pkgPath, pkg, { spaces: 2 });

  spin.stop("Project scaffolded!");

  // Install dependencies
  const shouldInstall = await p.confirm({
    message: "Install dependencies now?",
    initialValue: true,
  });

  if (shouldInstall && !p.isCancel(shouldInstall)) {
    spin.start("Installing dependencies...");
    await execa(packageManager as string, ["install"], { cwd: targetDir });
    spin.stop("Dependencies installed!");
  }

  p.outro(
    [
      pc.green("✓ Project created!"),
      "",
      `  cd ${projectName}`,
      shouldInstall
        ? `  ${packageManager} run dev`
        : `  ${packageManager} install && ${packageManager} run dev`,
      "",
      "  Then add components:",
      "  npx solidcn@latest add button dialog",
    ].join("\n"),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
