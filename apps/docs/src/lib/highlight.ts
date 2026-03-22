import { createHighlighter } from "shiki";

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark", "github-light"],
      langs: ["tsx", "typescript", "bash", "json", "css"],
    });
  }
  return highlighterPromise;
}

export async function highlight(
  code: string,
  lang = "tsx",
  theme: "light" | "dark" = "dark",
): Promise<string> {
  const hl = await getHighlighter();
  return hl.codeToHtml(code, {
    lang,
    theme: theme === "dark" ? "github-dark" : "github-light",
  });
}
