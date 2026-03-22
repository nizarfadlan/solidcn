import { Link, Meta, Title } from "@solidjs/meta";
import type { Component } from "solid-js";
import { DOCS_SITE_URL } from "./site.js";

export interface DocsSeoProps {
  title: string;
  description: string;
  /** Path including leading slash, e.g. `/docs/components/button` */
  path: string;
}

export const DocsSeo: Component<DocsSeoProps> = (props) => {
  const url = () => `${DOCS_SITE_URL}${props.path}`;
  return (
    <>
      <Title>{props.title}</Title>
      <Meta name="description" content={props.description} />
      <Meta property="og:title" content={props.title} />
      <Meta property="og:description" content={props.description} />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content={url()} />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={props.title} />
      <Meta name="twitter:description" content={props.description} />
      <Link rel="canonical" href={url()} />
    </>
  );
};
