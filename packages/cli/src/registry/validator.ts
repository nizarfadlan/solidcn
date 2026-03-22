import { RegistryIndexSchema, RegistryItemSchema } from "../schema/registry.js";
import type { RegistryIndex, RegistryItem } from "../schema/registry.js";

export function validateRegistryItem(data: unknown): RegistryItem {
  return RegistryItemSchema.parse(data);
}

export function validateRegistryIndex(data: unknown): RegistryIndex {
  return RegistryIndexSchema.parse(data);
}

export function isValidRegistryItem(data: unknown): data is RegistryItem {
  return RegistryItemSchema.safeParse(data).success;
}

export function isValidRegistryIndex(data: unknown): data is RegistryIndex {
  return RegistryIndexSchema.safeParse(data).success;
}
