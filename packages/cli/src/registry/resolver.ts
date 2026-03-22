import type { SolidcnConfig } from "../schema/config.js";
import type { RegistryItem } from "../schema/registry.js";
import type { Fetcher } from "./fetcher.js";

/**
 * Recursively resolves a component and all its registry dependencies
 * (potentially cross-registry) and returns them in install order.
 */
export class Resolver {
  private readonly seen = new Set<string>();

  constructor(
    private readonly fetcher: Fetcher,
    private readonly config: SolidcnConfig,
  ) {}

  async resolve(nameOrUrl: string): Promise<RegistryItem[]> {
    if (this.seen.has(nameOrUrl)) return [];
    this.seen.add(nameOrUrl);

    const item = await this.fetcher.fetchItem(nameOrUrl);
    const results: RegistryItem[] = [];

    // Resolve registry dependencies first (depth-first)
    for (const dep of item.registryDependencies ?? []) {
      const depItems = await this.resolve(dep);
      results.push(...depItems);
    }

    results.push(item);
    return results;
  }
}
