import type { SolidcnConfig } from "../schema/config.js";
import { resolveRegistryUrl } from "../schema/config.js";
import type { RegistryIndex, RegistryItem } from "../schema/registry.js";
import { RegistryIndexSchema, RegistryItemSchema } from "../schema/registry.js";

export class Fetcher {
  constructor(private readonly config: SolidcnConfig) {}

  async fetchItem(nameOrUrl: string): Promise<RegistryItem> {
    const { itemUrl, headers } = resolveRegistryUrl(this.config, nameOrUrl);

    const res = await fetch(itemUrl, { headers });
    if (!res.ok) {
      throw new Error(`Failed to fetch ${itemUrl}: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return RegistryItemSchema.parse(json);
  }

  async fetchIndex(registryNs?: string): Promise<RegistryIndex> {
    const { indexUrl, headers } = resolveRegistryUrl(this.config, registryNs ?? "registry");

    const res = await fetch(indexUrl, { headers });
    if (!res.ok) {
      throw new Error(
        `Failed to fetch registry index at ${indexUrl}: ${res.status} ${res.statusText}`,
      );
    }

    const json = await res.json();
    return RegistryIndexSchema.parse(json);
  }
}
