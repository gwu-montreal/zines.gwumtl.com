/*
 * this entire file -- and any other file you create with a .server.js suffix
 * and import -- is evaluated at build-time using val-loader. next doesn't have
 * a built-in way to specify build-time site-wide data, only per-route data. we
 * don't want to pay the cost of loading this for every route, so by using
 * val-loader we can calculate it once and import it wherever needed.
 */

// @ts-check
const fs = require("fs");
const { join } = require("path");
const frontmatter = require("front-matter");

const contentDir = join(process.cwd(), "content");
const articlesPath = join(contentDir, "articles");

const manifest = require(join(contentDir, "manifest.json"));
const languages = require(join(contentDir, "languages.json"));

const languageList = Object.keys(languages);

/** @typedef {{ route: string; title: string; type: string }[]} TOC */
/** @typedef {{ [lang: string]: TOC }} TOCMap */

/** @type {TOCMap} */
module.exports = function getTOC() {
  /** @type {TOCMap} */
  const toc = {};

  for (const lang of languageList) {
    toc[lang] = [];

    for (const route of manifest) {
      const filePath = join(articlesPath, route, lang + ".md");

      const {
        attributes: { title, type },
      } = frontmatter(fs.readFileSync(filePath, "utf8"));

      if (!title) {
        console.error(`expected title in frontmatter for file: ${filePath}`);
      }

      toc[lang].push({
        route,
        title,
        type,
      });
    }
  }

  return {
    cacheable: true,
    code: "module.exports = " + JSON.stringify(toc),
  };
};
