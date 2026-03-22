import type { Component, JSX } from "solid-js";
import type { TocItem } from "../../lib/toc.js";
import { Sidebar } from "./Sidebar.js";
import { TableOfContents } from "./TableOfContents.js";

interface DocLayoutProps {
  children: JSX.Element;
  toc?: TocItem[];
}

export const DocLayout: Component<DocLayoutProps> = (props) => {
  return (
    <div class="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl">
      <Sidebar />
      <main class="min-w-0 flex-1">
        <div class="mx-auto flex max-w-5xl gap-10 px-4 py-8 sm:px-6 lg:px-10 xl:max-w-6xl xl:gap-16">
          <article class="min-w-0 flex-1 docs-prose">{props.children}</article>
          {props.toc && props.toc.length > 0 && <TableOfContents items={props.toc} />}
        </div>
      </main>
    </div>
  );
};

export type { DocLayoutProps };
