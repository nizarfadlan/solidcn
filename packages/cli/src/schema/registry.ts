import { z } from "zod";

export const RegistryFileSchema = z.object({
  path: z.string(),
  type: z.enum([
    "registry:lib",
    "registry:block",
    "registry:component",
    "registry:ui",
    "registry:hook",
    "registry:theme",
    "registry:page",
    "registry:file",
    "registry:style",
    "registry:base",
    "registry:font",
    "registry:item",
  ]),
  content: z.string().optional(),
  target: z.string().optional(),
});

export const RegistryItemSchema = z.object({
  $schema: z.string().optional(),
  name: z.string(),
  type: z.enum([
    "registry:lib",
    "registry:block",
    "registry:component",
    "registry:ui",
    "registry:hook",
    "registry:theme",
    "registry:page",
    "registry:file",
    "registry:style",
    "registry:base",
    "registry:font",
    "registry:item",
  ]),
  title: z.string().optional(),
  description: z.string().optional(),
  author: z.string().optional(),
  dependencies: z.array(z.string()).default([]),
  devDependencies: z.array(z.string()).default([]),
  registryDependencies: z.array(z.string()).default([]),
  files: z.array(RegistryFileSchema).default([]),
  cssVars: z
    .object({
      theme: z.record(z.string()).optional(),
      light: z.record(z.string()).optional(),
      dark: z.record(z.string()).optional(),
    })
    .optional(),
  css: z.record(z.unknown()).optional(),
  tailwind: z
    .object({
      config: z
        .object({
          content: z.array(z.string()).optional(),
          theme: z.record(z.unknown()).optional(),
          plugins: z.array(z.string()).optional(),
        })
        .optional(),
    })
    .optional(),
  envVars: z.record(z.string()).optional(),
  meta: z.record(z.unknown()).optional(),
  docs: z.string().optional(),
  categories: z.array(z.string()).optional(),
  iconLibrary: z.string().optional(),
  baseColor: z.string().optional(),
  extends: z.string().optional(),
  style: z.string().optional(),
  theme: z.string().optional(),
  font: z
    .object({
      family: z.string(),
      provider: z.enum(["google"]),
      import: z.string(),
      variable: z.string(),
      weight: z.array(z.string()).optional(),
      subsets: z.array(z.string()).optional(),
      selector: z.string().optional(),
      dependency: z.string().optional(),
    })
    .optional(),
});

export const RegistryIndexItemSchema = z.object({
  name: z.string(),
  type: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
});

export const RegistryIndexSchema = z.object({
  $schema: z.string().optional(),
  name: z.string(),
  homepage: z.string().optional(),
  items: z.array(RegistryIndexItemSchema).default([]),
});

export const RegistryEntrySchema = z.object({
  name: z.string(),
  homepage: z.string().optional(),
  url: z.string(),
  description: z.string().optional(),
});

export const RegistriesSchema = z.array(RegistryEntrySchema);

export type RegistryFile = z.infer<typeof RegistryFileSchema>;
export type RegistryItem = z.infer<typeof RegistryItemSchema>;
export type RegistryIndex = z.infer<typeof RegistryIndexSchema>;
export type RegistryEntry = z.infer<typeof RegistryEntrySchema>;
