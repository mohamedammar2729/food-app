import { Languages } from "@/constants/enums";
import "server-only";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
};

const getTranslation = async (locale: string) => {
//   const dictionary = await dictionaries[locale]();
//   return dictionary;
return locale === Languages.ARABIC? dictionaries.ar() : dictionaries.en();
}

export default getTranslation;
