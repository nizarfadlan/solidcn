import { resolve } from "node:path";
import fsExtra from "fs-extra";
import {
  createBuiltinTailwindBaseItem,
  type ProjectFramework,
} from "../registry/builtin.js";
import type { Installer } from "../registry/installer.js";
import type { SolidcnConfig } from "../schema/config.js";
import { DEFAULT_CONFIG } from "../schema/config.js";
import {
  ensureTailwindCssSetup,
  ensureTailwindPluginSetup,
  inspectTailwindPluginSetup,
} from "./tailwind.js";

export interface PreflightState {
  hasConfig: boolean;
  hasCssFile: boolean;
  hasTailwindImport: boolean;
  hasTailwindPluginConfig: boolean;
  hasTsconfigAlias: boolean;
}

export interface SetupRunResult {
  cssChanged: boolean;
  cssCreated: boolean;
  pluginChanged: boolean;
  aliasChanged: boolean;
  pluginManualStep?: string;
  installedBaseline: boolean;
}

export async function detectProjectFramework(cwd: string): Promise<ProjectFramework> {
  if (await fsExtra.pathExists(resolve(cwd, "app.config.ts"))) return "solidstart";
  if (await fsExtra.pathExists(resolve(cwd, "app.config.js"))) return "solidstart";
  if (await fsExtra.pathExists(resolve(cwd, "vite.config.ts"))) return "vite";
  if (await fsExtra.pathExists(resolve(cwd, "vite.config.js"))) return "vite";
  return "unknown";
}

async function findTsconfigPath(cwd: string): Promise<string | null> {
  const candidates = ["tsconfig.json", "tsconfig.app.json"];
  for (const candidate of candidates) {
    const path = resolve(cwd, candidate);
    if (await fsExtra.pathExists(path)) return path;
  }
  return null;
}

export async function ensureTsconfigAlias(
  cwd: string,
  dryRun: boolean,
): Promise<{ changed: boolean }> {
  const tsconfigPath = await findTsconfigPath(cwd);
  if (!tsconfigPath) return { changed: false };

  const tsconfig = await fsExtra.readJson(tsconfigPath);
  const compilerOptions = (tsconfig.compilerOptions ?? {}) as Record<string, unknown>;
  const paths = (compilerOptions.paths ?? {}) as Record<string, unknown>;

  const current = paths["~/*"];
  const hasAlias = Array.isArray(current) && current.includes("./src/*");
  if (hasAlias) return { changed: false };

  const next = {
    ...tsconfig,
    compilerOptions: {
      ...compilerOptions,
      baseUrl: typeof compilerOptions.baseUrl === "string" ? compilerOptions.baseUrl : ".",
      paths: {
        ...paths,
        "~/*": ["./src/*"],
      },
    },
  };

  if (!dryRun) {
    await fsExtra.writeJson(tsconfigPath, next, { spaces: 2 });
    await fsExtra.appendFile(tsconfigPath, "\n");
  }

  return { changed: true };
}

export async function getPreflightState(
  cwd: string,
  config: SolidcnConfig,
): Promise<PreflightState> {
  const configPath = resolve(cwd, "solidcn.json");
  const cssPath = resolve(cwd, config.tailwind?.css ?? DEFAULT_CONFIG.tailwind.css);

  const hasConfig = await fsExtra.pathExists(configPath);
  const hasCssFile = await fsExtra.pathExists(cssPath);
  let hasTailwindImport = false;

  if (hasCssFile) {
    const cssContent = await fsExtra.readFile(cssPath, "utf-8");
    hasTailwindImport = /@import\s+["']tailwindcss["'];/.test(cssContent);
  }

  const pluginState = await inspectTailwindPluginSetup(cwd);

  const tsconfigPath = await findTsconfigPath(cwd);
  let hasTsconfigAlias = false;
  if (tsconfigPath) {
    const tsconfig = await fsExtra.readJson(tsconfigPath);
    const alias = tsconfig?.compilerOptions?.paths?.["~/*"];
    hasTsconfigAlias = Array.isArray(alias) && alias.includes("./src/*");
  }

  return {
    hasConfig,
    hasCssFile,
    hasTailwindImport,
    hasTailwindPluginConfig:
      pluginState.hasConfig && pluginState.hasImport && pluginState.hasPlugin,
    hasTsconfigAlias,
  };
}

export function needsSetup(state: PreflightState): boolean {
  return (
    !state.hasConfig ||
    !state.hasCssFile ||
    !state.hasTailwindImport ||
    !state.hasTailwindPluginConfig ||
    !state.hasTsconfigAlias
  );
}

export async function runProjectSetup(
  cwd: string,
  config: SolidcnConfig,
  installer: Installer,
  dryRun: boolean,
  skipInstall: boolean,
): Promise<SetupRunResult> {
  let installedBaseline = false;

  const framework = await detectProjectFramework(cwd);

  if (!skipInstall) {
    const baseline = createBuiltinTailwindBaseItem(framework);
    await installer.install(baseline);
    installedBaseline = true;
  }

  const cssResult = await ensureTailwindCssSetup(
    cwd,
    config.tailwind?.css ?? DEFAULT_CONFIG.tailwind.css,
    dryRun,
  );

  const pluginResult = await ensureTailwindPluginSetup(cwd, dryRun);
  const aliasResult = await ensureTsconfigAlias(cwd, dryRun);

  return {
    cssChanged: cssResult.changed,
    cssCreated: cssResult.created,
    pluginChanged: pluginResult.changed,
    aliasChanged: aliasResult.changed,
    ...(pluginResult.manualStep ? { pluginManualStep: pluginResult.manualStep } : {}),
    installedBaseline,
  };
}
