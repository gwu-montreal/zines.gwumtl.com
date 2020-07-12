import React, { useState, useCallback } from "react";
import { css } from "astroturf";

import ChapterMap from "@sux/chapter-map-component";

import { useSiteData } from "~/lib/site-data";

const {
  inner,
  buttonscontainer,
  buttons,
  button,
  map,
  localtext,
  tooltip,
} = css`
  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .buttonscontainer {
    width: 100%;
    position: relative;
  }

  .buttons {
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    flex-direction: column;
  }

  .button {
    border-radius: 6px;
  }

  .map {
    width: 100% !important;
    height: 0 !important;
    padding-bottom: 58%;
    touch-action: none;
  }

  .localtext {
    text-align: center;
    font-size: 1.4rem;
    margin-top: 1rem;
  }

  .tooltip {
    max-width: 420px;
  }
`;

const Map = () => {
  const { t } = useSiteData();
  const [
    {
      coordinates: [x, y],
      zoom,
    },
    setPos,
  ] = useState({ coordinates: [13, 18], zoom: 0.9 });

  const handleZoomIn = useCallback(() => {
    setPos((pos) => ({ ...pos, zoom: Math.min(pos.zoom + 0.5, 20) }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setPos((pos) => ({ ...pos, zoom: Math.max(pos.zoom - 0.5, 1) }));
  }, []);

  return (
    <div className={inner}>
      <div className={buttonscontainer}>
        <div className={buttons}>
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 20}
            style={{
              marginBottom: 10,
              opacity: zoom >= 20 ? 0.3 : 1,
            }}
            className={button}
          >
            ➕
          </button>
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 1}
            style={{
              opacity: zoom <= 1 ? 0.3 : 1,
            }}
            className={button}
          >
            ➖
          </button>
        </div>
      </div>
      <ChapterMap
        x={x}
        y={y}
        zoom={zoom}
        onPanZoom={setPos}
        panZoomControls
        width={780}
        height={450}
        markerScale={0.1}
        className={map}
        scale={205}
        tooltipClassName={tooltip}
      />
      <p className={localtext}>{t("find_local_chapter")}</p>
    </div>
  );
};

export default Map;
