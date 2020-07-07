import React from "react";
import { css } from "astroturf";

const { clearfix } = css`
  .clearfix {
    clear: both;
  }
`;

const Clearfix = () => <div className={clearfix} />;

export default Clearfix;
