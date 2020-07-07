import React from "react";
import { css } from "astroturf";
import Head from "next/head";

import Link from "~/components/LocalizedLink";
import TableOfContents from "~/components/TableOfContents";
import DownloadZines from "~/components/DownloadZines";
import { useSiteData } from "~/lib/site-data";

import type { GetStaticProps, GetStaticPaths } from "next";

interface PageProps {
  lang: string;
  content: string;
}

const { container, image, readzine } = css`
  .container h2 {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    margin-bottom: 1.6rem;
  }

  .image {
    margin-left: 15px;
    float: right;
    max-width: 40%;
  }

  .readzine {
    text-align: center;
  }
`;

const OpeningStatement = ({ content }: PageProps) => {
  const { t } = useSiteData();

  return (
    <>
      <Head>
        <title>{t("site_title")}</title>
      </Head>
      <div className={container}>
        <img
          alt="Isabelle: Unionize!"
          className={image}
          src="/images/isabelle-clearbg-inlined.svg"
        />
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <Link href="/intro">
          <h1 className={readzine}>{t("read_the_zine")}</h1>
        </Link>
        <TableOfContents />
        <DownloadZines />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps,
  { lang: string }
> = async ({ params }) => {
  const { lang } = params!;

  const { default: content } = await import(
    `content/othertext/opening-statement/${lang}.md`
  );

  return {
    props: {
      lang,
      content,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { languageList } = await import("~/lib/consts");

  return {
    paths: languageList.map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};

export default OpeningStatement;
