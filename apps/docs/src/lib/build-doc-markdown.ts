import type { PropDef } from "../components/ui/PropsTable.js";

export interface MarkdownExample {
  title: string;
  description?: string;
  code: string;
}

export interface BuildDocMarkdownInput {
  title: string;
  description: string;
  phase?: string;
  componentName?: string;
  manualInstall?: string;
  usage?: string;
  examples: MarkdownExample[];
  props?: PropDef[];
}

function escTableCell(s: string): string {
  return s.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

export function buildDocPageMarkdown(input: BuildDocMarkdownInput): string {
  const lines: string[] = [];
  lines.push(`# ${input.title}`, "");
  if (input.phase) {
    lines.push(`_${input.phase}_`, "");
  }
  lines.push(input.description, "");

  if (input.componentName ?? input.manualInstall) {
    lines.push("## Installation", "");
    if (input.componentName) {
      lines.push(
        "### CLI",
        "",
        "```bash",
        `npx solidcn@latest add ${input.componentName}`,
        "```",
        "",
      );
    }
    if (input.manualInstall) {
      lines.push("### Manual", "", "```bash", input.manualInstall, "```", "");
    }
  }

  if (input.usage) {
    lines.push("## Usage", "", "```tsx", input.usage.trim(), "```", "");
  }

  if (input.examples.length > 0) {
    lines.push("## Examples", "");
    for (const ex of input.examples) {
      lines.push(`### ${ex.title}`, "");
      if (ex.description) {
        lines.push(ex.description, "");
      }
      lines.push("```tsx", ex.code.trim(), "```", "");
    }
  }

  if (input.props && input.props.length > 0) {
    lines.push("## API Reference", "");
    lines.push("| Prop | Type | Default | Description |");
    lines.push("| --- | --- | --- | --- |");
    for (const p of input.props) {
      const def = p.default ?? "—";
      lines.push(
        `| \`${escTableCell(p.name)}\` | \`${escTableCell(p.type)}\` | ${escTableCell(def)} | ${escTableCell(p.description)} |`,
      );
    }
    lines.push("");
  }

  lines.push("---", "", "_Exported from solidcn docs._", "");
  return lines.join("\n");
}
