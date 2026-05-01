import type { SolidcnConfig } from "../schema/config.js";
import { DEFAULT_REGISTRIES_URL, resolveRegistryUrl } from "../schema/config.js";
import type { RegistryEntry, RegistryIndex, RegistryItem } from "../schema/registry.js";
import { RegistriesSchema, RegistryIndexSchema, RegistryItemSchema } from "../schema/registry.js";
import { getBuiltinRegistryItem, isPlainRegistryName } from "./builtin.js";

export class Fetcher {
  private registriesCache: RegistryEntry[] | null = null;

  constructor(private readonly config: SolidcnConfig) {}

  async fetchItem(nameOrUrl: string): Promise<RegistryItem> {
    if (isPlainRegistryName(nameOrUrl)) {
      const builtin = getBuiltinRegistryItem(nameOrUrl, this.config);
      if (builtin) return builtin;
    }

    const { itemUrl, headers } = await this.resolveItemUrl(nameOrUrl);

    try {
      const res = await fetch(itemUrl, { headers });
      if (!res.ok) {
        throw new Error(`Failed to fetch ${itemUrl}: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();
      return RegistryItemSchema.parse(json);
    } catch (error) {
      if (isPlainRegistryName(nameOrUrl)) {
        const builtin = getBuiltinRegistryItem(nameOrUrl, this.config);
        if (builtin) return builtin;
      }

      throw error;
    }
  }

  async fetchIndex(registryNs?: string): Promise<RegistryIndex> {
    const { indexUrl, headers } = await this.resolveItemUrl(registryNs ?? "registry");

    const res = await fetch(indexUrl, { headers });
    if (!res.ok) {
      throw new Error(
        `Failed to fetch registry index at ${indexUrl}: ${res.status} ${res.statusText}`,
      );
    }

    const json = await res.json();
    return RegistryIndexSchema.parse(json);
  }

  async fetchRegistries(): Promise<RegistryEntry[]> {
    if (this.registriesCache) return this.registriesCache;

    try {
      const res = await fetch(DEFAULT_REGISTRIES_URL);
      if (!res.ok) return [];

      const json = await res.json();
      const parsed = RegistriesSchema.safeParse(json);
      if (!parsed.success) return [];

      this.registriesCache = parsed.data;
      return parsed.data;
    } catch {
      return [];
    }
  }

  private async resolveItemUrl(
    nameOrUrl: string,
  ): Promise<{ itemUrl: string; indexUrl: string; headers: Record<string, string> }> {
    // Direct URL — no resolution needed
    if (nameOrUrl.startsWith("http://") || nameOrUrl.startsWith("https://")) {
      return resolveRegistryUrl(this.config, nameOrUrl);
    }

    // Namespaced: @acme/button or @acme
    const namespaceMatch = nameOrUrl.match(/^(@[^/]+)/);
    const ns = namespaceMatch?.[1];

    if (ns && !this.config.registries?.[ns]) {
      // Not in local config — try remote registries.json
      const registries = await this.fetchRegistries();
      const remote = registries.find((r) => r.name === ns);

      if (remote) {
        // Inject into config for this session so resolveRegistryUrl can use it
        this.config.registries = {
          ...this.config.registries,
          [ns]: { url: remote.url },
        };
      }
    }

    return resolveRegistryUrl(this.config, nameOrUrl);
  }
}
