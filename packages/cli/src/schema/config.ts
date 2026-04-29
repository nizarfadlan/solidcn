import { resolve } from "node:path";
import fsExtra from "fs-extra";
import { z } from "zod";

export const ConfigSchema = z.object({
  $schema: z.string().optional(),
  style: z.string().default("default"),
  tailwind: z
    .object({
      css: z.string().default("src/app.css"),
      baseColor: z.string().default("slate"),
    })
    .default({}),
  aliases: z
    .object({
      components: z.string().default("~/components/ui"),
      utils: z.string().default("~/lib/utils"),
      hooks: z.string().default("~/hooks"),
    })
    .default({}),
  registries: z
    .record(
      z.union([
        z.string(),
        z.object({
          url: z.string(),
          headers: z.record(z.string()).optional(),
        }),
      ]),
    )
    .default({}),
});

export type SolidcnConfig = z.infer<typeof ConfigSchema>;

export const DEFAULT_CONFIG: SolidcnConfig = {
  style: "default",
  tailwind: { css: "src/app.css", baseColor: "slate" },
  aliases: {
    components: "~/components/ui",
    utils: "~/lib/utils",
    hooks: "~/hooks",
  },
  registries: {},
};

const DEFAULT_REGISTRY_URL = "https://solidcn.nizarfadlan.dev/r/{name}.json";
const DEFAULT_INDEX_URL = "https://solidcn.nizarfadlan.dev/r/registry.json";

export async function loadConfig(cwd: string): Promise<SolidcnConfig> {
  const configPath = resolve(cwd, "solidcn.json");

  if (!(await fsExtra.pathExists(configPath))) {
    return DEFAULT_CONFIG;
  }

  const raw = await fsExtra.readJson(configPath);
  return ConfigSchema.parse(raw);
}

export function resolveRegistryUrl(
  config: SolidcnConfig,
  nameOrUrl: string,
): { itemUrl: string; indexUrl: string; headers: Record<string, string> } {
  // Direct URL
  if (nameOrUrl.startsWith("http://") || nameOrUrl.startsWith("https://")) {
    return { itemUrl: nameOrUrl, indexUrl: nameOrUrl, headers: {} };
  }

  // Namespaced: @acme/button
  const namespaceMatch = nameOrUrl.match(/^(@[^/]+)\/(.+)$/);
  if (namespaceMatch) {
    const [, ns, itemName] = namespaceMatch;
    if (!ns || !itemName) throw new Error("Invalid component reference");
    const regConfig = config.registries?.[ns];

    if (!regConfig) {
      throw new Error(`Registry namespace "${ns}" not found in solidcn.json`);
    }

    const baseUrl = typeof regConfig === "string" ? regConfig : regConfig.url;
    const headers = typeof regConfig === "string" ? {} : (regConfig.headers ?? {});
    const resolvedHeaders = Object.fromEntries(
      Object.entries(headers).map(([k, v]) => [
        k,
        v.replace(/\$\{([^}]+)\}/g, (_, envKey: string) => process.env[envKey] ?? ""),
      ]),
    );

    return {
      itemUrl: baseUrl.replace("{name}", itemName),
      indexUrl: baseUrl.replace("{name}", "registry"),
      headers: resolvedHeaders,
    };
  }

  // Namespace-only (for index): @acme
  if (nameOrUrl.startsWith("@")) {
    const regConfig = config.registries?.[nameOrUrl];
    if (!regConfig) {
      throw new Error(`Registry namespace "${nameOrUrl}" not found in solidcn.json`);
    }
    const baseUrl = typeof regConfig === "string" ? regConfig : regConfig.url;
    const headers = typeof regConfig === "string" ? {} : (regConfig.headers ?? {});
    return {
      itemUrl: baseUrl,
      indexUrl: baseUrl.replace("{name}", "registry"),
      headers,
    };
  }

  // Plain name — use default registry
  return {
    itemUrl: DEFAULT_REGISTRY_URL.replace("{name}", nameOrUrl),
    indexUrl: DEFAULT_INDEX_URL,
    headers: {},
  };
}
