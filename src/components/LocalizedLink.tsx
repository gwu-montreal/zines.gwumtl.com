import React from "react";
import Link from "next/link";

import { useSiteData } from "~/lib/site-data";

const LocalizedLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const { lang } = useSiteData();

  // TODO: we can support relative links if we really need to
  if (!href.startsWith("/")) {
    console.warn(`<LocalizedLink> using relative href: "${href}"`);
    console.warn(`only absolute uris are currently supported.`);
  }

  const resolvedHref = href === "/" ? "/[lang]" : "/[lang]/[page]";

  // HACK: normally "/fr/" with a trailing slash should be the same as "/fr",
  // but next currently gets a bit confused in dev mode about this. (the final
  // static export works fine with either!)
  const resolvedAs = href === "/" ? `/${lang}` : `/${lang}${href}`;

  return (
    <Link href={resolvedHref} as={resolvedAs}>
      <a>{children}</a>
    </Link>
  );
};

export default LocalizedLink;
