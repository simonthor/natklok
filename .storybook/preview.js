import { BLUE, PURPLE, PINK } from "../src/util/constants";
import {i18n} from './i18next.js';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "blue",
    values: [
      { name: "blue", value: BLUE },
      { name: "purple", value: PURPLE },
      { name: "pink", value: PINK },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "centered",
  i18n,
  locale: 'swe',
  locales: {
    swe: {title: "Svenska", left: '🇸🇪'},
    en: {title: "English", left: '🇬🇧'},
  },
};
