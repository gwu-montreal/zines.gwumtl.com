import React, { useState, useCallback } from "react";
import { css } from "astroturf";

import ChapterMap from "@gameworkers/chapter-map-component";

import Layout from "~/components/Layout";

// Attach map data to window
(window as any).WORLD_110M_JSON_PATH = "/world-110m.json";
(window as any).WORLD_50M_JSON_PATH = "/world-50m.json";

const {
  container,
  inner,
  buttonscontainer,
  buttons,
  map,
  localtext,
  tooltip,
} = css`
  .container {
    width: 100%;
  }

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
    max-width: 220px;
  }
`;

// const Map = () => {
//   const [zoom, setZoom] = useState(0.9);

//   const handleZoomIn = useCallback(() => {
//     setZoom((z) => Math.min(z + 0.5, 20));
//   }, [setZoom]);

//   const handleZoomOut = useCallback(() => {
//     setZoom((z) => Math.max(z - 0.5, 1));
//   }, [setZoom]);

//   return (
//     <Layout containerClassName={container}>
//       <div className={inner}>
//         <div className={buttonscontainer}>
//           <div className={buttons}>
//             <button
//               disabled={zoom >= 20}
//               style={{
//                 marginBottom: 10,
//                 opacity: zoom >= 20 ? 0.3 : 1,
//               }}
//               onClick={handleZoomIn}
//             >
//               ➕
//             </button>
//             <button
//               disabled={zoom <= 1}
//               style={{ opacity: zoom <= 1 ? 0.3 : 1 }}
//               onClick={handleZoomOut}
//             >
//               ➖
//             </button>
//           </div>
//         </div>
//         <ChapterMap
//           className={map}
//           centerLat={18}
//           centerLng={13}
//           height={450}
//           markerScale={0.1}
//           scale={205}
//           width={780}
//           enablePanning
//           zoom={zoom}
//           tooltipClassName={tooltip}
//         />
//         <p className={localtext}>{t("find_local_chapter")}</p>
//       </div>
//     </Layout>
//   );
// };

// export default Map;
