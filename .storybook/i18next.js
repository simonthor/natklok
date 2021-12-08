import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';

const ns = ['common'];
const supportedLngs = ['en', 'swe'];

i18n.use(initReactI18next)
    .init({
        debug: true,
        lng: 'swe',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        defaultNS: 'common',
        ns,
        supportedLngs,
    });

supportedLngs.forEach((lang) => {
    ns.forEach((n) => {
        i18n.addResourceBundle(
            lang,
            n,
            require(`../src/translations/${lang}/${n}.json`)
        );
    });
});

export {i18n};