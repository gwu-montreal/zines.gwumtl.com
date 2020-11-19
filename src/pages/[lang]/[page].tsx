import React from "react";
// import dynamic from "next/dynamic";

import Layout from "~/components/Layout";

import type { GetStaticProps, GetStaticPaths } from "next";
import type { ArticleTypes } from "~/lib/consts";

// const Map = dynamic(() => import("~/components/Map"));

// even though we don't use all these static props in the component, our app
// wrapper (_app.tsx) also receives them and consumes them.
type PageProps = {
  lang: string;
  title: string;
  type?: ArticleTypes;
  content: string;
  currentPage: string;
  summary: string;
};

const Page = ({ title, type, content, summary }: PageProps) => {
  if (type === "map") {
    throw new Error("Re-enable the map CSS and imports to use it!");
    // return (
    //   <Layout pageTitle={title} type={type}>
    //     <Map />
    //   </Layout>
    // );
  }

  return (
    <Layout
      pageTitle={title}
      type={type}
      contents={content}
      summary={summary}
    />
  );
};

export const getStaticProps: GetStaticProps<
  PageProps,
  { lang: string; page: string }
> = async ({ params }) => {
  const { getDirectoryForSlug } = await import("~/lib/server");
  const { summarize } = await import("~/lib/util");

  const { lang, page } = params!;

  const {
    default: content,
    attributes: { title, type, summary },
    plaintext,
  } = await import(`content/${getDirectoryForSlug(page)}/${page}/${lang}.md`);

  const props: PageProps = {
    lang,
    title,
    currentPage: page,
    content,
    summary: summarize(summary ?? plaintext.split(/\s+/).join(" "), 160),
  };

  // next complains if we return an undefined field in props,
  // so check before adding
  if (type) props.type = type;

  return {
    props,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { languageList } = await import("~/lib/consts");
  const { getAllPageNames } = await import("~/lib/server");

  const allPageNames = getAllPageNames();

  const paths = languageList.flatMap((lang) =>
    allPageNames.map((page) => ({ params: { lang, page } }))
  );

  return {
    paths,
    fallback: false,
  };
};

export default Page;
