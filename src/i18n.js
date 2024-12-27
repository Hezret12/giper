import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';


import ttm from './locales/tm/translation.json';
import tru from './locales/ru/translation.json';

const resources ={
   tk:{
        translation: ttm
    },
    ru:{
        translation: tru
    }
};
const languages=['tk','ru']
export const locales = {tk:"tk", ru:"ru"}
i18n
.use(Backend)
.use(LanguageDetector)
.use(initReactI18next)

.init({
    lng: localStorage.getItem("i18nextLng") || languages[0],
    fallbackLng: languages[0],
    debug:true,
    resources,
    whitelist:languages,

})
export default i18n;
