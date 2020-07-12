/*
 * this entire file -- and any other files with a .server.js suffix that are
 * imported -- is evaluated at build-time using val-loader. next doesn't have a
 * built-in way to specify build-time site-wide data, only per-route data. we
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

// some basic checks:
if (!Array.isArray(manifest) || manifest.some((e) => typeof e !== "string")) {
  throw new Error("Expected manifest to be array of strings!");
}
const articleNames = fs.readdirSync(articlesPath);
const invalidManifestEntries = manifest.filter(
  (a) => !articleNames.includes(a)
);
if (invalidManifestEntries.length > 0) {
  throw new Error(
    `Unknown manifest entries: ${invalidManifestEntries
      .map((e) => `"${e}"`)
      .join(", ")}\nDelete them from manifest.json if you meant to remove them.`
  );
}
const invalidArticleNames = articleNames.filter((a) => !manifest.includes(a));
if (invalidArticleNames.length > 0) {
  console.warn(
    "Found articles not present in manifest:",
    invalidArticleNames.join(", "),
    "\nAdd them to the manifest to see them on the site!"
  );
}

/** @typedef {{ route: string; title: string; type?: string }[]} TOC */
/** @typedef {{ [lang: string]: TOC }} TOCMap */

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

/** @type {TOCMap} */
module.exports = () => ({
  cacheable: true,
  code: "module.exports = " + JSON.stringify(toc),
});
