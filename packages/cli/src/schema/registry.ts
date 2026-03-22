import { z } from "zod";

export const RegistryFileSchema = z.object({
  path: z.string(),
  type: z.string(),
  content: z.string().optional(),
  target: z.string().optional(),
});

export const RegistryItemSchema = z.object({
  $schema: z.string().optional(),
  name: z.string(),
  type: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  dependencies: z.array(z.string()).default([]),
  devDependencies: z.array(z.string()).default([]),
  registryDependencies: z.array(z.string()).default([]),
  files: z.array(RegistryFileSchema).default([]),
  cssVars: z
    .object({
      light: z.record(z.string()).optional(),
      dark: z.record(z.string()).optional(),
    })
    .optional(),
  meta: z.record(z.unknown()).optional(),
});

export const RegistryIndexItemSchema = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string().optional(),
});

export const RegistryIndexSchema = z.object({
  $schema: z.string().optional(),
  name: z.string(),
  homepage: z.string().optional(),
  items: z.array(RegistryIndexItemSchema).default([]),
});

export type RegistryFile = z.infer<typeof RegistryFileSchema>;
export type RegistryItem = z.infer<typeof RegistryItemSchema>;
export type RegistryIndex = z.infer<typeof RegistryIndexSchema>;
