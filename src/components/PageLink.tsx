import React from "react";

import { LocalizedLink } from "./LocalizedLink";

/**
 * shorthand for linking to a given route with the href `/[lang]/[page]`
 * (which is most pages on this site).
 */
const PageLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <LocalizedLink href="/[page]" as={to}>
    {children}
  </LocalizedLink>
);

export default PageLink;
