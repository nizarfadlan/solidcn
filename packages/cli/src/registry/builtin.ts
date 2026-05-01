import type { SolidcnConfig } from "../schema/config.js";
import type { RegistryItem } from "../schema/registry.js";

export const BASELINE_DEPENDENCIES = [
  "clsx",
  "tailwind-merge",
  "class-variance-authority",
  "lucide-solid",
] as const;

export const BASELINE_DEV_DEPENDENCIES = ["tailwindcss", "postcss", "autoprefixer"] as const;

export function getBuiltinRegistryItem(name: string, _config?: SolidcnConfig): RegistryItem | null {
  if (name === "tailwind-base") {
    return {
      $schema: "https://solidcn.dev/schema/registry-item.json",
      name: "tailwind-base",
      type: "registry:base",
      title: "Tailwind Base Setup",
      description: "Core Tailwind CSS packages and utilities required for solidcn",
      dependencies: [...BASELINE_DEPENDENCIES],
      devDependencies: [...BASELINE_DEV_DEPENDENCIES],
      registryDependencies: [],
      files: [],
    };
  }

  return null;
}

export function isPlainRegistryName(nameOrUrl: string): boolean {
  if (nameOrUrl.startsWith("http://") || nameOrUrl.startsWith("https://")) return false;
  if (nameOrUrl.startsWith("@")) return false;
  return true;
}
