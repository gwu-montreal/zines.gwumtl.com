import React from "react";
import Head from "next/head";
import { useSiteData } from "~/lib/site-data";
import siteInfo from "~/lib/site-info.server";

import { languageList } from "~/lib/consts";

import openGraphImage from "~/images/social-crop.png";

const { domain, twitter } = siteInfo;

const SEO = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  const { t, currentPage } = useSiteData();
  const resolvedDescription = description || t("site_description");

  return (
    <Head>
      {languageList.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={`${domain}/${l}${currentPage ? "/" + currentPage : ""}`}
        />
      ))}
      <meta
        name="description"
        key="description"
        content={resolvedDescription}
      />
      <meta property="og:title" key="og:title" content={title} />
      <meta
        property="og:description"
        key="og:description"
        content={resolvedDescription}
      />
      <meta property="og:image" content={`${domain}${openGraphImage}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitter} />
    </Head>
  );
};

export default SEO;
