import { resolve } from "node:path";
import fsExtra from "fs-extra";
import { getBuiltinRegistryItem } from "../registry/builtin.js";
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
}

export interface SetupRunResult {
  cssChanged: boolean;
  cssCreated: boolean;
  pluginChanged: boolean;
  pluginManualStep?: string;
  installedBaseline: boolean;
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

  return {
    hasConfig,
    hasCssFile,
    hasTailwindImport,
    hasTailwindPluginConfig:
      pluginState.hasConfig && pluginState.hasImport && pluginState.hasPlugin,
  };
}

export function needsSetup(state: PreflightState): boolean {
  return (
    !state.hasConfig ||
    !state.hasCssFile ||
    !state.hasTailwindImport ||
    !state.hasTailwindPluginConfig
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

  if (!skipInstall) {
    const baseline = getBuiltinRegistryItem("tailwind-base", config);
    if (baseline) {
      await installer.install(baseline);
      installedBaseline = true;
    }
  }

  const cssResult = await ensureTailwindCssSetup(
    cwd,
    config.tailwind?.css ?? DEFAULT_CONFIG.tailwind.css,
    dryRun,
  );

  const pluginResult = await ensureTailwindPluginSetup(cwd, dryRun);

  return {
    cssChanged: cssResult.changed,
    cssCreated: cssResult.created,
    pluginChanged: pluginResult.changed,
    ...(pluginResult.manualStep ? { pluginManualStep: pluginResult.manualStep } : {}),
    installedBaseline,
  };
}
