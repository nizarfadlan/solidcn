import { resolve } from "node:path";
import { intro, outro, spinner } from "@clack/prompts";
import { Command } from "commander";
import pc from "picocolors";
import { Fetcher } from "../registry/fetcher.js";
import { Installer } from "../registry/installer.js";
import { Resolver } from "../registry/resolver.js";
import { loadConfig } from "../schema/config.js";

export const diffCommand = new Command("diff")
  .description("Show what would change when adding a component")
  .argument("<component>", "Component name or URL")
  .option("--cwd <path>", "Working directory", process.cwd())
  .option("--patch", "Show line-by-line patch for modified files", false)
  .option("--only-modified", "Hide unchanged files from output", false)
  .action(
    async (component: string, opts: { cwd: string; patch: boolean; onlyModified: boolean }) => {
      try {
        const cwd = resolve(opts.cwd);

        intro("solidcn diff");

        const config = await loadConfig(cwd);
        const fetcher = new Fetcher(config);
        const resolver = new Resolver(fetcher, config);
        const installer = new Installer(cwd, config, false, true, false);

        const s = spinner();
        s.start(`Resolving ${component}`);
        const items = await resolver.resolve(component);
        s.stop(`Resolved ${items.length} item(s)`);

        let adds = 0;
        let modifies = 0;
        let same = 0;

        for (const item of items) {
          const plans = await installer.plan(item);
          if (plans.length === 0) continue;

          console.log(`\n${pc.bold(item.name)}`);
          for (const p of plans) {
            if (!p.exists) {
              adds++;
              console.log(`  ${pc.green("ADD")}    ${p.outputPath}`);
            } else if (!p.same) {
              modifies++;
              console.log(`  ${pc.yellow("MOD")}    ${p.outputPath}`);
              if (opts.patch && p.currentContent !== undefined) {
                const patch = toUnifiedDiff(p.currentContent, p.content, p.outputPath);
                if (patch.trim().length > 0) {
                  console.log(pc.dim(patch));
                }
              }
            } else {
              same++;
              if (!opts.onlyModified) {
                console.log(`  ${pc.dim("SAME")}   ${p.outputPath}`);
              }
            }
          }
        }

        console.log(
          `\n${pc.bold("Summary")}\n` +
            `  ${pc.green("ADD")}: ${adds}\n` +
            `  ${pc.yellow("MOD")}: ${modifies}\n` +
            `  ${pc.dim("SAME")}: ${same}\n`,
        );

        outro("Done!");
      } catch (err) {
        console.error(pc.red(err instanceof Error ? err.message : String(err)));
        process.exit(1);
      }
    },
  );

function toUnifiedDiff(oldText: string, newText: string, file: string): string {
  const a = oldText.split("\n");
  const b = newText.split("\n");

  const n = a.length;
  const m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array<number>(m + 1).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      const ai = a[i] ?? "";
      const bj = b[j] ?? "";
      const downRight = dp[i + 1]?.[j + 1] ?? 0;
      const down = dp[i + 1]?.[j] ?? 0;
      const right = dp[i]?.[j + 1] ?? 0;
      const row = dp[i];
      if (!row) continue;
      row[j] = ai === bj ? 1 + downRight : Math.max(down, right);
    }
  }

  const lines: string[] = [`--- ${file}`, `+++ ${file}`, "@@ @@"];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    const ai = a[i] ?? "";
    const bj = b[j] ?? "";
    if (ai === bj) {
      lines.push(` ${ai}`);
      i++;
      j++;
      continue;
    }

    if ((dp[i + 1]?.[j] ?? 0) >= (dp[i]?.[j + 1] ?? 0)) {
      lines.push(`-${ai}`);
      i++;
    } else {
      lines.push(`+${bj}`);
      j++;
    }
  }
  while (i < n) {
    lines.push(`-${a[i] ?? ""}`);
    i++;
  }
  while (j < m) {
    lines.push(`+${b[j] ?? ""}`);
    j++;
  }

  return lines.join("\n");
}
