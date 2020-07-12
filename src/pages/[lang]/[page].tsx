import React from "react";
import dynamic from "next/dynamic";

import Layout from "~/components/Layout";

import type { GetStaticProps, GetStaticPaths } from "next";
import type { ArticleTypes } from "~/lib/consts";

const Map = dynamic(() => import("~/components/Map"));

// even though we don't use all these static props in the component, our app
// wrapper (_app.tsx) also receives them and consumes them.
type PageProps = {
  lang: string;
  title: string;
  type?: ArticleTypes;
  content: string;
  currentPage: string;
};

const Page = ({ title, type, content }: PageProps) => {
  if (type === "map") {
    return (
      <Layout pageTitle={title} type={type}>
        <Map />
      </Layout>
    );
  }

  return <Layout pageTitle={title} type={type} contents={content} />;
};

export const getStaticProps: GetStaticProps<
  PageProps,
  { lang: string; page: string }
> = async ({ params }) => {
  const { getDirectoryForSlug } = await import("~/lib/server");

  const { lang, page } = params!;

  const {
    default: content,
    attributes: { title, type },
  } = await import(`content/${getDirectoryForSlug(page)}/${page}/${lang}.md`);

  const props: PageProps = {
    lang,
    title,
    currentPage: page,
    content,
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
