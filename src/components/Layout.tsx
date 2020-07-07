import React from "react";
import Head from "next/head";
import { css } from "astroturf";

import { useSiteData } from "~/lib/site-data";
import Clearfix from "~/components/Clearfix";
import Footer from "~/components/Footer";
import TableOfContents from "~/components/TableOfContents";

interface BaseLayoutProps {
  pageTitle: string;
  header?: (title: string) => JSX.Element;
  type?: string;
  containerClassName?: string;
}

type LayoutProps = BaseLayoutProps &
  ({ children: React.ReactNode } | { contents: string });

/* unionfaqs styles */
const { faqcontainer, faqbody, faqheader } = css`
  .faqcontainer {
    border-radius: 5px;
    background-color: rgb(246, 246, 255);
    box-shadow: 0 0 1px rgb(0, 0, 255);
  }

  .faqbody {
    font-family: "Liberation Mono";
  }

  .faqheader {
    font-weight: bold;
    color: rgb(0, 0, 196);
    margin-bottom: 0.2rem;
  }
`;

const Layout = ({
  pageTitle,
  type,
  containerClassName = "",
  ...contentsOrChildren
}: LayoutProps) => {
  const { t } = useSiteData();

  const isFaq = type === "unionfaqs";

  return (
    <>
      <Head>
        <title>{`${t("site_title")} - ${pageTitle}`}</title>
        <meta
          property="og:title"
          content={(isFaq ? `${t("unionfaqs_prefix")} ` : "") + pageTitle}
        />
      </Head>
      <div style={{ width: "100%" }}>
        <div style={{ width: "100%", position: "relative" }}>
          <TableOfContents sidebar />
        </div>
        <div className={`page ${isFaq ? faqcontainer : containerClassName}`}>
          {isFaq ? (
            <>
              <h1 className={faqheader}>{t("unionfaqs_title")}</h1>
              <h2>{pageTitle}</h2>
            </>
          ) : (
            <h2>{pageTitle}</h2>
          )}
          {"children" in contentsOrChildren ? (
            contentsOrChildren.children
          ) : (
            <div
              className={`page-content ${isFaq ? faqbody : ""}`}
              dangerouslySetInnerHTML={{ __html: contentsOrChildren.contents }}
            />
          )}
          <Clearfix />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;