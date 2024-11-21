import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import navTranslationKa from "@/components/Locales/ka/nav.json";
import navTranslationEn from "@/components/Locales/en/nav.json";
import mainTranslationKa from "@/components/Locales/ka/main.json";
import mainTranslationEn from "@/components/Locales/en/main.json";
import LanguageDetector from "i18next-browser-languagedetector";

const options = {
  // order and from where user language should be detected
  order: ["path", "subdomain"],

  // keys or params to lookup language from
  lookupQuerystring: "lang",
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    detection: options,

    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      ka: {
        translation: {
          "nav-Translation": navTranslationKa,
          "MainPage-Translation": mainTranslationKa,
        },
      },
      en: {
        translation: {
          "nav-Translation": navTranslationEn,
          "MainPage-Translation": mainTranslationEn,
        },
      },
    },
    // lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
