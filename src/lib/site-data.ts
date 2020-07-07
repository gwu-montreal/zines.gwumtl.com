import { createContext, useContext } from "react";
import { useRouter } from "next/router";

import en from "content/en.json";
import fr from "content/fr.json";
import langs from "content/languages.json";

import toc from "~/lib/toc.server";

interface SiteDataContext {
  lang: string;
  currentPage?: string;
}

export const DEFAULT_LANG = "en";

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
    t: (id: string) => localeData[lang][id] || localeData["en"][id] || id,
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
