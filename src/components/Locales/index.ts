import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import all translations
import navTranslationKa from "@/components/Locales/ka/nav.json";
import navTranslationEn from "@/components/Locales/en/nav.json";
import mainTranslationKa from "@/components/Locales/ka/main.json";
import mainTranslationEn from "@/components/Locales/en/main.json";
import SignIn_SignUpEn from "@/components/Locales/en/SignIn-SignUp.json";
import SignIn_SignUpKa from "@/components/Locales/ka/SignIn-SignUp.json";
import profile_ka from "@/components/Locales/ka/profile.json";
import profile_en from "@/components/Locales/en/profile.json";
import review_ka from "@/components/Locales/ka/review.json";
import review_en from "@/components/Locales/en/review.json";
import aboutTranslationKa from "@/components/Locales/ka/about.json";
import aboutTranslationEn from "@/components/Locales/en/about.json";

const options = {
  order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
  lookupLocalStorage: "appLanguage",
  caches: ["localStorage"],
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: options,
    resources: {
      ka: {
        translation: {
          "nav-Translation": navTranslationKa,
          "MainPage-Translation": mainTranslationKa,
          "SignIn-SignUp-Translation": SignIn_SignUpKa,
          "Profile-Translation": profile_ka,
          "Review-Translation": review_ka,
          "About-Translation": aboutTranslationKa,
        },
      },
      en: {
        translation: {
          "nav-Translation": navTranslationEn,
          "MainPage-Translation": mainTranslationEn,
          "SignIn-SignUp-Translation": SignIn_SignUpEn,
          "Profile-Translation": profile_en,
          "Review-Translation": review_en,
          "About-Translation": aboutTranslationEn,
        },
      },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "ka"],
    interpolation: {
      escapeValue: false,
    },
  });

//save language to localStorage
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("appLanguage", lng);
});

export default i18n;
