#!/usr/bin/env node
/**
 * Validates apps/docs/public/r/registry.json using the CLI's Zod schemas.
 * Run from repo root after `pnpm --filter solidcn build` and registry:build.
 */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = join(root, "apps/docs/public/r/registry.json");
const validatorUrl = new URL("../packages/cli/dist/registry/validator.js", import.meta.url);

const { isValidRegistryIndex, isValidRegistryItem } = await import(validatorUrl.href);
const registry = JSON.parse(readFileSync(registryPath, "utf-8"));

if (!isValidRegistryIndex(registry)) {
  console.error("registry.json is invalid");
  process.exit(1);
}

const registryDir = join(root, "apps/docs/public/r");
const itemFiles = new Set(
  readdirSync(registryDir)
    .filter((name) => name.endsWith(".json") && name !== "registry.json")
    .map((name) => name.replace(/\.json$/, "")),
);

const indexNames = new Set(registry.items.map((i) => i.name));
const graph = new Map();
const filePathOwners = new Map();

for (const item of registry.items) {
  const itemPath = join(registryDir, `${item.name}.json`);
  let itemData;
  try {
    itemData = JSON.parse(readFileSync(itemPath, "utf-8"));
  } catch {
    console.error(`Cannot read item file for "${item.name}" (${itemPath})`);
    process.exit(1);
  }

  if (!isValidRegistryItem(itemData)) {
    console.error(`Item file is invalid: ${itemPath}`);
    process.exit(1);
  }

  for (const dep of itemData.registryDependencies ?? []) {
    if (!indexNames.has(dep)) {
      console.error(`"${item.name}" depends on missing registry item "${dep}"`);
      process.exit(1);
    }
  }

  graph.set(item.name, itemData.registryDependencies ?? []);

  for (const f of itemData.files ?? []) {
    const owner = filePathOwners.get(f.path);
    if (owner && owner !== item.name) {
      console.error(`File path collision: "${f.path}" is emitted by "${owner}" and "${item.name}"`);
      process.exit(1);
    }
    filePathOwners.set(f.path, item.name);
  }

  itemFiles.delete(item.name);
}

const visited = new Set();
const stack = new Set();
function visit(node) {
  if (stack.has(node)) {
    console.error(`Cycle detected in registryDependencies at "${node}"`);
    process.exit(1);
  }
  if (visited.has(node)) return;
  visited.add(node);
  stack.add(node);
  for (const dep of graph.get(node) ?? []) visit(dep);
  stack.delete(node);
}
for (const name of indexNames) visit(name);

if (itemFiles.size > 0) {
  console.error(
    `Orphan item files not listed in registry.json: ${Array.from(itemFiles).join(", ")}`,
  );
  process.exit(1);
}

console.log("registry.json and item files are valid");
