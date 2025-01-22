// @ts-check
import { readFile, writeFile, readdir } from "fs/promises";
import * as cheerio from "cheerio";

const ICML_DIR = "content-indesign";

for (const lang of ["en", "fr"]) {
  const dir = `${ICML_DIR}/${lang}`;
  const files = await readdir(dir);

  for (const file of files) {
    if (!file.endsWith(".icml")) continue;

    const path = `${dir}/${file}`;
    const doc = await readFile(path);
    const $ = cheerio.load(doc, { xml: { decodeEntities: false } });

    // remove empty paragraphs
    const emptyParagraphs = $("ParagraphStyleRange")
      .toArray()
      .filter((para) => $(para).text().trim().length === 0);

    if (emptyParagraphs.length > 0) {
      console.log(
        `Doc "${path}" has ${emptyParagraphs.length} empty paragraphs. Cleaning up.`
      );
      for (const e of emptyParagraphs) {
        const prev = $(e).prev();
        const next = $(e).next();
        if (prev?.[0]?.name === "Br" && next?.[0]?.name === "Br") {
          next.remove();
        }

        $(e).remove();
      }

      await writeFile(path, $.xml());
    }
  }
}
