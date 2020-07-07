import React, { useEffect } from "react";
import Head from "next/head";

import { useSiteData } from "~/lib/site-data";

// this component is currently unused. we're hosting on netlify and using their
// redirect functionality instead, since it can perform 301/302 redirects more
// efficiently (and declaring them is easier.)

const Redirect = ({ redirectPath }: { redirectPath: string }) => {
  const { t } = useSiteData();

  useEffect(() => {
    // for Firefox which disabled meta http-equiv redirects
    window.location.pathname = redirectPath;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content={`0; url=${redirectPath}`} />
      </Head>
      <div>{t("redirecting")}</div>
    </>
  );
};

export default Redirect;
