/*
 * this module should only be used in server-side methods,
 * eg. getStaticProps and getStaticPaths.
 */

import assert from "assert";
import fs from "fs";
import { join } from "path";

const contentDir = join(process.cwd(), "content");
const manifestPath = join(contentDir, "manifest.json");
const articlesPath = join(contentDir, "articles");
const extraPagesPath = join(contentDir, "extrapages");

export function getArticleNames(): string[] {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  // the manifest is all we need, but perform some additional checks to make
  // sure it doesn't point to missing articles (and that there are no articles
  // not referred to in the manifest)

  assert(Array.isArray(manifest));

  const articleNames = fs.readdirSync(articlesPath);

  const invalidManifestEntries = manifest.filter(
    (a) => !articleNames.includes(a)
  );
  if (invalidManifestEntries.length > 0) {
    throw new Error(
      `Unknown manifest entries: [${invalidManifestEntries.join(", ")}]`
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

  return manifest;
}

export function getExtraPageNames() {
  return fs.readdirSync(extraPagesPath);
}

export function getAllPageNames() {
  return [...getArticleNames(), ...getExtraPageNames()];
}

export function getDirectoryForSlug(slug: string) {
  if (fs.readdirSync(articlesPath).includes(slug)) {
    return "articles";
  }
  return "extrapages";
}
