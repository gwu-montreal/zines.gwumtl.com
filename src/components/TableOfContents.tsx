import React from "react";
import { css } from "astroturf";

import PageLink from "~/components/PageLink";
import { useSiteData } from "~/lib/site-data";

const { wrapper, tocitem, activetocitem, unionfaqs, sidebar } = css`
  .wrapper {
    margin: 30px 0;
    padding: 20px;
    background-color: #eae0e0;
    text-align: center;
  }

  .tocitem {
    display: inline-block;

    &:not(:last-child)::after {
      margin: 0 10px;
      content: "·";
    }
  }

  .activetocitem {
    font-weight: bold;
  }

  .unionfaqs {
    font-family: "Metropolis";
    font-size: 80%;
    color: rgb(0, 0, 196);
  }

  .sidebar {
    &.wrapper {
      display: none;

      @media (--xlarge) {
        display: initial;
        position: absolute;
        left: 100%;
        margin: 0;
        padding: 0;
        padding-top: 50px;
        margin-left: 1rem;
        background: transparent;
        text-align: left;
        width: 300px;
      }
    }

    .tocitem {
      margin-bottom: 0.5rem;

      &::after {
        content: "";
        margin: 0;
      }

      > span {
        font-weight: normal !important;
        display: block;
        position: relative;
        transition: transform 0.2s ease;

        &::before {
          content: "\\25b6";
          position: absolute;
          left: -1.2em;
          top: 0.2em;
          font-size: 0.8em;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }

        &.activetocitem {
          transform: translateX(0.9em);

          &::before {
            opacity: 0.75;
          }
        }
      }
    }
  }
`;

const TableOfContents = ({ sidebar: isSidebar }: { sidebar?: boolean }) => {
  const { toc, t, currentPage } = useSiteData();

  const tocItems = toc.map(({ route, title, type }) => {
    const maybeUnionfaqs =
      type === "unionfaqs" ? (
        <span className={unionfaqs}>{t("unionfaqs")}: </span>
      ) : null;

    return (
      <span className={tocitem} key={route}>
        {currentPage === route || currentPage === route + "/" ? (
          <span className={activetocitem}>
            {maybeUnionfaqs}
            {title}
          </span>
        ) : (
          <PageLink to={`/${route}`}>
            {maybeUnionfaqs}
            {title}
          </PageLink>
        )}
      </span>
    );
  });

  return (
    <div className={`${isSidebar ? sidebar : ""} ${wrapper}`}>{tocItems}</div>
  );
};

export default TableOfContents;
