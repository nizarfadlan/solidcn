import { dirname, resolve } from "node:path";
import fsExtra from "fs-extra";

export const SOLIDCN_TAILWIND_MARKER_START = "/* solidcn-tailwind-base:start */";
export const SOLIDCN_TAILWIND_MARKER_END = "/* solidcn-tailwind-base:end */";

const SOLIDCN_TAILWIND_BASE_BLOCK = `${SOLIDCN_TAILWIND_MARKER_START}
@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --radius: var(--radius-val, 0.5rem);
}

:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 10% 3.9%;
  --radius-val: 0.5rem;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 240 10% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --secondary: 240 3.7% 15.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --accent: 240 3.7% 15.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --ring: 240 4.9% 83.9%;
}
${SOLIDCN_TAILWIND_MARKER_END}`;

const CONFIG_CANDIDATES = [
  "app.config.ts",
  "app.config.js",
  "app.config.mjs",
  "app.config.cjs",
  "vite.config.ts",
  "vite.config.js",
  "vite.config.mjs",
  "vite.config.cjs",
] as const;

export async function ensureTailwindCssSetup(
  cwd: string,
  cssRelativePath: string,
  dryRun: boolean,
): Promise<{ changed: boolean; created: boolean; path: string }> {
  const cssPath = resolve(cwd, cssRelativePath);
  const exists = await fsExtra.pathExists(cssPath);

  if (!exists) {
    if (!dryRun) {
      await fsExtra.ensureDir(dirname(cssPath));
      await fsExtra.writeFile(
        cssPath,
        `@import "tailwindcss";\n\n${SOLIDCN_TAILWIND_BASE_BLOCK}\n`,
      );
    }
    return { changed: true, created: true, path: cssPath };
  }

  let content = await fsExtra.readFile(cssPath, "utf-8");
  let changed = false;

  if (!/@import\s+["']tailwindcss["'];/.test(content)) {
    content = `@import "tailwindcss";\n${content}`;
    changed = true;
  }

  if (!content.includes(SOLIDCN_TAILWIND_MARKER_START)) {
    content = `${content.trimEnd()}\n\n${SOLIDCN_TAILWIND_BASE_BLOCK}\n`;
    changed = true;
  }

  if (changed && !dryRun) {
    await fsExtra.writeFile(cssPath, content);
  }

  return { changed, created: false, path: cssPath };
}

export async function inspectTailwindPluginSetup(
  cwd: string,
): Promise<{ hasConfig: boolean; hasImport: boolean; hasPlugin: boolean; configPath?: string }> {
  for (const candidate of CONFIG_CANDIDATES) {
    const path = resolve(cwd, candidate);
    if (!(await fsExtra.pathExists(path))) continue;

    const content = await fsExtra.readFile(path, "utf-8");
    return {
      hasConfig: true,
      hasImport: content.includes("@tailwindcss/vite"),
      hasPlugin: content.includes("tailwindcss()"),
      configPath: path,
    };
  }

  return { hasConfig: false, hasImport: false, hasPlugin: false };
}

export async function ensureTailwindPluginSetup(
  cwd: string,
  dryRun: boolean,
): Promise<{ changed: boolean; manualStep?: string; configPath?: string }> {
  for (const candidate of CONFIG_CANDIDATES) {
    const path = resolve(cwd, candidate);
    if (!(await fsExtra.pathExists(path))) continue;

    let content = await fsExtra.readFile(path, "utf-8");
    let changed = false;

    if (!content.includes("@tailwindcss/vite")) {
      content = `import tailwindcss from "@tailwindcss/vite";\n${content}`;
      changed = true;
    }

    if (!content.includes("tailwindcss()")) {
      const pluginsMatch = content.match(/plugins\s*:\s*\[([\s\S]*?)\]/m);
      if (pluginsMatch && typeof pluginsMatch.index === "number") {
        const whole = pluginsMatch[0];
        const inside = pluginsMatch[1]?.trim();
        const replacement = inside
          ? `plugins: [tailwindcss(), ${inside}]`
          : "plugins: [tailwindcss()]";
        content = content.replace(whole, replacement);
        changed = true;
      } else {
        return {
          changed,
          configPath: path,
          manualStep: `Could not patch ${candidate} automatically. Add import \"@tailwindcss/vite\" and tailwindcss() in plugins manually.`,
        };
      }
    }

    if (changed && !dryRun) {
      await fsExtra.writeFile(path, content);
    }

    return { changed, configPath: path };
  }

  return {
    changed: false,
    manualStep:
      "No app.config.* or vite.config.* found. Add @tailwindcss/vite and tailwindcss() plugin manually.",
  };
}
