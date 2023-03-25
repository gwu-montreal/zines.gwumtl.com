import React from "react";
import { css } from "astroturf";

import PageLink from "~/components/PageLink";
import { useSiteData } from "~/lib/site-data";

const { container, cover, gwumtllogo } = css`
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

  .gwumtllogo {
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
              <PageLink to="/endnotes">{t("references_page")}</PageLink>
            </div>
            <div>
              <PageLink to="/how-to-print">{t("printing_hints")}</PageLink>
            </div>
            <div>
              <PageLink to="/older-versions">{t("older_versions")}</PageLink>
            </div>
          </div>
        </div>
      </div>
      <p className="tc">
        <a href="https://gwumtl.com">
          <span>GWU Montréal</span>
          <img
            title="GWU Montréal"
            className={gwumtllogo}
            src="/images/gwu-montreal-logo.svg"
          />
        </a>
      </p>
    </div>
  );
};

export default DownloadZines;
