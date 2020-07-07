import React from "react";
import { css } from "astroturf";

import PrevNextLinks from "~/components/PrevNextLinks";
import TableOfContents from "./TableOfContents";
import DownloadZines from "./DownloadZines";

const { footer } = css`
  .footer {
    margin-bottom: 2rem;
  }
`;

const Footer = () => (
  <div className={footer}>
    <PrevNextLinks />
    <TableOfContents />
    <DownloadZines />
  </div>
);

export default Footer;
