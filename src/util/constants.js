//0 sets the height to windowHeight
export const HEIGHT = 0;

// Global colors
export const BLUE = "#063955";
export const PURPLE = "#292881";
export const PINK = "#E2147E";
export const PALEBLUE = "#1DB6EB";
export const BLACK = "#111111";
export const WHITE = "#FFFFFF";

// Profiles
export const BANK_PROFILE = {
  "title": "BANK_PROFILE",
  "color": "#0EE08C",
  "dark": true
};
export const GAMING_PROFILE = {
  "title": "GAMING_PROFILE",
  "color": "#FDCF35",
  "dark": true
};
export const STREAMING_PROFILE = {
  "title": "STREAMING_PROFILE",
  "color": "#FB733F",
  "dark": false
};
export const SOCIAL_MEDIA_PROFILE = {
  "title": "SOCIAL_MEDIA_PROFILE",
  "color": "#FF3854",
  "dark": false
};
export const GENERAL_PROFILE = "GENERAL_PROFILE";

// Categories
export const SHARED_PASSWORD_QUESTION = "SHARED_PASSWORD_QUESTION";
export const PUBLIC_WIFI_QUESTION = "PUBLIC_WIFI_QUESTION";
export const PASSWORD_STRENGTH_QUESTION = "PASSWORD_STRENGTH_QUESTION";
export const WIFI_ON_QUESTION = "WIFI_ON_QUESTION";

// Question types
export const YES_NO = "YES_NO";
export const SEVERAL_OPTION = "SEVERAL_OPTION";
export const PASSWORD_INPUT = "PASSWORD_INPUT";

export const QUESTIONS = [
  {
    category: SHARED_PASSWORD_QUESTION,
    type: SEVERAL_OPTION,
    forProfile: GAMING_PROFILE,
    title: "questions.csgoSkin.title",
    text: "questions.csgoSkin.text",
    moreInfo: "questions.csgoSkin.moreInfo",
    emojis: ["🔪", "🔒", "🔫"],
    readMoreLink:
      "https://sakerhetskollen.se/testa-din-sakerhet/ar-du-saker-pa-ditt-losenord",
    options: [
      { text: "questions.csgoSkin.option1", score: 0 },
      {
        text: "questions.csgoSkin.option2",
        score: 0.8,
      },
      { text: "questions.csgoSkin.option3", score: 1 },
    ],
  },
  {
    category: SHARED_PASSWORD_QUESTION,
    type: YES_NO,
    forProfile: SOCIAL_MEDIA_PROFILE,
    title: "questions.fakeApp.title",
    text: "questions.fakeApp.text",
    moreInfo: "questions.fakeApp.moreInfo",
    emojis: ["📱", "🔒"],
    readMoreLink:
      "https://sakerhetskollen.se/testa-din-sakerhet/ar-du-saker-pa-ditt-losenord",
    yes_score: 0,
    no_score: 1,
  },
  {
    category: PASSWORD_STRENGTH_QUESTION,
    type: PASSWORD_INPUT,
    forProfile: GENERAL_PROFILE,
    title: "questions.passwordCheck.title",
    text: "questions.passwordCheck.text",
    moreInfo: "questions.passwordCheck.moreInfo",
    emojis: ["🔒", "🔑"],
    readMoreLink:
      "https://sakerhetskollen.se/testa-din-sakerhet/ar-du-saker-pa-ditt-losenord",
    options: [
      { text: "questions.publicWifi.option1", score: 0 },
      {
        text: "questions.publicWifi.option2",
        score: 1,
      },
      { text: "questions.publicWifi.option3", score: 0.7 },
    ],
  },
  {
    category: PUBLIC_WIFI_QUESTION,
    type: SEVERAL_OPTION,
    forProfile: GENERAL_PROFILE,
    title: "questions.publicWifi.title",
    text: "questions.publicWifi.text",
    moreInfo: "questions.publicWifi.moreInfo",
    emojis: ["☕", "📶"],
    readMoreLink:
      "https://sakerhetskollen.se/testa-din-sakerhet/ar-du-saker-pa-ditt-losenord",
    options: [
      { text: "questions.publicWifi.option1", score: 0 },
      {
        text: "questions.publicWifi.option2",
        score: 1,
      },
      { text: "questions.publicWifi.option3", score: 0.7 },
    ],
  },
];
