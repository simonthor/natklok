import { BLUE, PURPLE, PINK } from "../src/util/constants";

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
};
