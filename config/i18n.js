import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // ✅ грузим переводы из /public/locales
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: "ру", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // ✅ путь к JSON
    },
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    ns: ["common"], // используем namespace common
    defaultNS: "common",
  });

export default i18n;