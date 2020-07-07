/* eslint no-undef: error */
const withPlugins = require("next-compose-plugins");
const fonts = require("next-fonts");
const optimizedImages = require("next-optimized-images");

module.exports = withPlugins(
  [
    () => ({
      webpack(cfg) {
        // enable astroturf
        cfg.module.rules.push({
          test: /\.tsx$/,
          use: [
            {
              loader: "astroturf/loader",
              options: { extension: ".module.css" },
            },
          ],
        });

        cfg.module.rules.push({
          test: /\.md$/,
          use: [
            {
              loader: "remark-loader-2",
              options: {},
            },
          ],
        });

        cfg.module.rules.push({
          test: /\.server\.js$/,
          use: [
            {
              loader: "val-loader",
            },
          ],
        });

        return cfg;
      },
    }),
    fonts,
    optimizedImages,
  ],
  {
    reactStrictMode: true,
  }
);
