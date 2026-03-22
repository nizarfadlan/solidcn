#!/usr/bin/env node
/**
 * Validates apps/docs/public/r/registry.json using the CLI's Zod schemas.
 * Run from repo root after `pnpm --filter solidcn build` and registry:build.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = join(root, "apps/docs/public/r/registry.json");
const validatorUrl = new URL("../packages/cli/dist/registry/validator.js", import.meta.url);

const { isValidRegistryIndex } = await import(validatorUrl.href);
const registry = JSON.parse(readFileSync(registryPath, "utf-8"));

if (!isValidRegistryIndex(registry)) {
  console.error("registry.json is invalid");
  process.exit(1);
}
console.log("registry.json is valid");
