import languageMap from "content/languages.json";

export { languageMap };

export const languageList = Object.keys(languageMap);

export type ArticleTypes = "unionfaqs" | "bare" | undefined;
