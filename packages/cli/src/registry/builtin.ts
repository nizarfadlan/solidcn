import type { SolidcnConfig } from "../schema/config.js";
import type { RegistryItem } from "../schema/registry.js";

export type ProjectFramework = "solidstart" | "vite" | "unknown";

export const BASELINE_DEPENDENCIES = [
  "clsx",
  "tailwind-merge",
  "class-variance-authority",
  "lucide-solid",
] as const;

export const BASELINE_DEV_DEPENDENCIES_LEGACY = ["tailwindcss", "postcss", "autoprefixer"] as const;
export const BASELINE_DEV_DEPENDENCIES_VITE = ["tailwindcss", "@tailwindcss/vite"] as const;

export function createBuiltinTailwindBaseItem(framework: ProjectFramework): RegistryItem {
  const devDependencies =
    framework === "solidstart" || framework === "vite"
      ? [...BASELINE_DEV_DEPENDENCIES_VITE]
      : [...BASELINE_DEV_DEPENDENCIES_LEGACY];

  return {
    $schema: "https://solidcn.dev/schema/registry-item.json",
    name: "tailwind-base",
    type: "registry:base",
    title: "Tailwind Base Setup",
    description: "Core Tailwind CSS packages and utilities required for solidcn",
    dependencies: [...BASELINE_DEPENDENCIES],
    devDependencies,
    registryDependencies: [],
    files: [],
  };
}

export function getBuiltinRegistryItem(name: string, _config?: SolidcnConfig): RegistryItem | null {
  if (name === "tailwind-base") {
    return createBuiltinTailwindBaseItem("unknown");
  }

  return null;
}

export function getTailwindBasePackages(framework: ProjectFramework): string[] {
  const item = createBuiltinTailwindBaseItem(framework);
  return [...(item.devDependencies ?? []), ...(item.dependencies ?? [])];
}

export function isPlainRegistryName(nameOrUrl: string): boolean {
  if (nameOrUrl.startsWith("http://") || nameOrUrl.startsWith("https://")) return false;
  if (nameOrUrl.startsWith("@")) return false;
  return true;
}
