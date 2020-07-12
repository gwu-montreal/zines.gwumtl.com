import { createContext, useContext } from "react";
import { useRouter } from "next/router";

import langs from "content/languages.json";

// TODO: could use require.context if we really want to hardcode fewer
// assumptions about languages available
import en from "content/en.json";
import fr from "content/fr.json";

import toc from "~/lib/toc.server";

export const DEFAULT_LANG = "en";

export { toc, langs };

interface SiteDataContext {
  lang: string;
  currentPage?: string;
}

const SiteData = createContext<SiteDataContext>({ lang: DEFAULT_LANG });

const localeData: { [lang: string]: { [id: string]: string } } = {
  en,
  fr,
};

export const SiteDataProvider = SiteData.Provider;

export function useSiteData() {
  const { lang, currentPage } = useContext(SiteData);
  const router = useRouter();

  return {
    lang,
    langs,
    toc: toc[lang],
    currentPage,
    t: (id: string) => {
      if (localeData[lang][id]) return localeData[lang][id];
      console.warn(`Locale string not found for id "${id}" in lang "${lang}"`);
      return localeData[DEFAULT_LANG][id] || id;
    },
    setLang: (nextLang: string) => {
      if (!router.query.lang) {
        console.warn("Trying to set language, but not on a localized route!");
        return;
      }

      if (nextLang !== lang) {
        const nextRoute = Object.entries(router.query)
          .filter(([key]) => key !== "lang")
          .reduce(
            (acc, [k, v]) => acc.replace(`[${k}]`, v as string),
            router.route
          )
          .replace(`[lang]`, nextLang);

        router.push(router.route, nextRoute).catch((e) => console.error(e));
      }
    },
  };
}
