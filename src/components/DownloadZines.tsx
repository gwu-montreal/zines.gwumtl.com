import React from "react";
import { css } from "astroturf";

import Link from "~/components/LocalizedLink";
import { useSiteData } from "~/lib/site-data";

const { container, cover, gwuintlimage } = css`
  .container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    max-width: 470px;
    padding: 10px;
    margin: 0 auto 1rem;
    border-radius: 5px;
    background-color: rgb(246, 246, 255);
    box-shadow: 0 0 1px rgb(0, 0, 255);
  }

  .cover {
    max-width: 160px;
    margin: 0 1rem 0 0.5rem;
  }

  .gwuintlimage {
    max-height: 5rem;
    margin: 0.5em auto 1em;
    display: block;
  }
`;

const DownloadZines = () => {
  const { t } = useSiteData();

  return (
    <div>
      <div className={container}>
        <div>
          <a
            title={t("download_zine")}
            href="https://gameworkers.github.io/zine-gdc-2019/ZineRemaster_2020/GWUZine_Remaster.pdf"
          >
            <img className={cover} src="/images/cover_thumb_2020.jpg" />
          </a>
        </div>
        <div>
          <a href="https://gameworkers.github.io/zine-gdc-2019/ZineRemaster_2020/GWUZine_Remaster.pdf">
            <h3>{t("download_zine")}</h3>
          </a>
          <div>
            <div>
              <Link href="/endnotes">{t("references_page")}</Link>
            </div>
            <div>
              <Link href="/how-to-print">{t("printing_hints")}</Link>
            </div>
            <div>
              <Link href="/older-versions">{t("older_versions")}</Link>
            </div>
          </div>
        </div>
      </div>
      <p className="tc">
        <a href="https://gameworkersunite.org">
          <span>{t("gwu_international")}</span>
          <img
            title={t("gwu_international")}
            className={gwuintlimage}
            src="/images/gwu-logo.svg"
          />
        </a>
      </p>
    </div>
  );
};

export default DownloadZines;
