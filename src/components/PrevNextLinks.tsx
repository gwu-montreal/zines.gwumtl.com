import React from "react";
import { css } from "astroturf";

import Link from "~/components/LocalizedLink";
import { useSiteData } from "~/lib/site-data";

const { wrapper, onlynext } = css`
  .wrapper {
    display: flex;
    justify-content: space-between;

    &.onlynext {
      justify-content: flex-end;
    }
  }
`;

const PrevNextLinks = () => {
  const { toc, currentPage } = useSiteData();

  if (!currentPage) return null;

  const index = toc.findIndex((t) => t.route === currentPage);

  // out of bounds are fine!
  const prevPage = toc[index - 1];
  const nextPage = toc[index + 1];

  // we have a page name, but we're not on a sequence page
  if (!(prevPage || nextPage)) return null;

  return (
    <div className={`${wrapper} ${!prevPage ? onlynext : ""}`}>
      {prevPage && (
        <Link href={`/${prevPage.route}`}>
          {"<"} {prevPage.title}
        </Link>
      )}
      {nextPage && (
        <Link href={`/${nextPage.route}`}>
          {nextPage.title} {">"}
        </Link>
      )}
    </div>
  );
};

export default PrevNextLinks;
