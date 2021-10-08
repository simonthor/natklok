//0 sets the height to windowHeight
export const HEIGHT = 0;

// Quiz Settings
export const MAX_AMOUNT_QUESTIONS = 12;

// Global colors
export const BLUE = "#063955";
export const PURPLE = "#293881";
export const PINK = "#E2147E";
export const PALEBLUE = "#1DB6EB";
export const BLACK = "#111111";
export const WHITE = "#FFFFFF";

// Profiles
export const BANK_PROFILE = "BANK_PROFILE";
export const GAMING_PROFILE = "GAMING_PROFILE";
export const STREAMING_PROFILE = "STREAMING_PROFILE";
export const SOCIAL_MEDIA_PROFILE = "SOCIAL_MEDIA_PROFILE";
export const GENERAL_PROFILE = "GENERAL_PROFILE";

export const PROFILE_STYLING = {
  BANK_PROFILE: {
    color: "#0EE08C",
    dark: true,
  },
  GAMING_PROFILE: {
    color: "#FDCF35",
    dark: true,
  },
  STREAMING_PROFILE: {
    color: "#FB733F",
    dark: true,
  },
  SOCIAL_MEDIA_PROFILE: {
    color: "#FF3854",
    dark: false,
  },
};

// Categories
export const SHARED_PASSWORD_QUESTION = "SHARED_PASSWORD_QUESTION";
export const PUBLIC_WIFI_QUESTION = "PUBLIC_WIFI_QUESTION";
export const DECEIVE_WEBSITE = "DECEIVE_WEBSITE";
export const PASSWORD_STRENGTH_QUESTION = "PASSWORD_STRENGTH_QUESTION";
export const WIFI_ON_QUESTION = "WIFI_ON_QUESTION";
export const ROMANCE_SCAM = "ROMANCE_SCAM";
export const BLACKMAIL = "BLACKMAIL";
export const DONT_CLICK_LINK = "DONT_CLICK_LINK";
export const USE_SAME_PASSWORD = "USE_SAME_PASSWORD";
export const SHOULDER_SURFING = "SHOULDER_SURFING";
export const RANK_PASSWORDS = "RANK_PASSWORDS";
export const VIRUS = "VIRUS";

// Question types
export const YES_NO = "YES_NO";
export const DRAG_TO_TRASH = "DRAG_TO_TRASH";
export const SEVERAL_OPTION = "SEVERAL_OPTION";
export const PASSWORD_INPUT = "PASSWORD_INPUT";
export const CHAT = "CHAT";
export const FAKE_WEBSITE = "FAKE_WEBSITE";
export const FAKE_DOMAIN = "FAKE_DOMAIN";
export const SEARCH_RESULT = "SEARCH_RESULT";
export const ORDER = "ORDER";

export const QUESTIONS = [
  {
    id: 1,
    category: DONT_CLICK_LINK,
    type: SEARCH_RESULT,
    forProfile: GENERAL_PROFILE,
    title: "questions.searchResult.title",
    text: "questions.searchResult.text",
    moreInfo: "questions.searchResult.moreInfo",
    evenMoreInfo: "questions.searchResult.evenMoreInfo",
    searchCategories: ["Allt", "Bilder", "Nyheter"],
    adNotice: "ANNONS",
    options: {
      correct: {
        text: "Se där! Helt rätt!",
        score: 1
      },
      partially: {
        text: "Annonser går inte alltid att lita på.",
        score: 0.2
      },
      wrong: {
        text: "Du klickade på en suspekt länk.",
        score: 0
      }
  },
    searches: [{
      query: "Vad kostar ett frimärke?",
      correctAnswerIndex: 3,
      links: [{
          url: "https://www.post.em/Frimarken-Rabatt",
          type: "ad",
          title: "Frimärken för 1kr | Köp hos Postem'",
          metaDesc: "Halva priset för frimärken  70% rabatt på Västkusten  Leverans i Sverige på några dagar  Garanterat pris"
        },
        {
          url: "https://www.ship.py/shipments",
          type: "ad",
          title: "Vad kostar ett frimärke? - Vi skickar ditt paket.",
          metaDesc: "Shippy är världsledande på moderna och högteknologiska fraktlösningar som kräver minimal kundkontakt och ger maximal avkastning."
        },
        {
          url: "https://postn0rd-sverige-norden.gq/786",
          type: "normal",
          title: "Frimärken | Postnord Sverige",
          metaDesc: "Med direktbetalande kund menar vi dig som betalar via internetbank eller med kort och inte har något avtal med oss. Se portotabeller."
        },
        {
          url: "https://www.postnord.se/inrikes/portotabeller",
          type: "normal",
          title: "Portotabell och priser för brev inrikes | PostNord",
          metaDesc: "Här hittar du portotabeller som visar vad det kostar för dig som direktbetalande kund att skicka brev och paket inrikes och utrikes."
      }]
    },
    {
      query: "Vad är Tiktok?",
      correctAnswerIndex: 2,
      links: [{
        url: "https://www.harvest.ts",
        type: "ad",
        title: "Boosta dina följare på Tiktok med Harvest - helt gratis!",
        metaDesc: "Med hjälp av Harvest kan du få tusentals likes på dina videor. Premium följare enkelt och snabbt."
      },
      {
        url: "https://www.tiktok.en/kurs",
        type: "ad",
        title: "Lär dig allt om TikTok | Onlinekurs med Johlina Doe",
        metaDesc: "Mrs. Doe lär dig allt om hur du blir en riktig TikTok stjärna och alltid hamnar på #foryou. Börja kursen idag för 499kr."
      },
      {
        url: "https://internetstiftelsen.se › podd › ... › vad-ar-tiktok",
        type: "normal",
        title: "Vad är Tiktok, och hur fungerar det? - Internetstiftelsen",
        metaDesc: "Vad är Tiktok? Tiktok är en app för mobiltelefonen, där man kan spela in och dela videor med varandra. Appen hette från början Musical.ly, och blev populär främst bland unga tjejer i åldern 7-13 år."
      },
      {
        url: "https://www.wikipediia.src.om",
        type: "normal",
        title: "TikTok - Wikipedia",
        metaDesc: "TikTok, även känt som Douyin (kinesiska: 抖音; pinyin: Dǒuyīn) i Kina, är en sociala medier-app för skapande och delning av videor och livesändningar."
      }]
    }],
  },
  {
    id: 2,
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
        score: 0,
      },
      { text: "questions.csgoSkin.option3", score: 1 },
    ],
  },
  {
    id: 3,
    category: SHARED_PASSWORD_QUESTION,
    type: YES_NO,
    forProfile: SOCIAL_MEDIA_PROFILE,
    title: "questions.fakeApp.title",
    text: "questions.fakeApp.text",
    moreInfo: "questions.fakeApp.moreInfo",
    emojis: ["📱", "🔒"],
    readMoreLink:
      "https://sakerhetskollen.se/testa-din-sakerhet/ar-du-saker-pa-ditt-losenord",
    yes_score: 1,
    no_score: 0,
  },
  {
    id: 4,
    category: ROMANCE_SCAM,
    type: CHAT,
    forProfile: GENERAL_PROFILE,
    title: "questions.romanceScamChat.title",
    text: "questions.romanceScamChat.text",
    moreInfo: "questions.romanceScamChat.moreInfo",
    evenMoreInfo: "questions.romanceScamChat.evenMoreInfo",
    yourAnswer: "questions.romanceScamChat.yourAnswer",
    from: "questions.romanceScamChat.from",
    readMoreLink:
      "https://sakerhetskollen.se/testa-din-sakerhet/ar-du-saker-pa-ditt-losenord",
    options: [
      { text: "questions.romanceScamChat.bad", score: 0 },
      { text: "questions.romanceScamChat.good", score: 1 },
    ],
    smses: [
      { side: "left", text: "questions.romanceScamChat.chat1" },
      { side: "right", text: "questions.romanceScamChat.chat2" },
      { side: "left", text: "questions.romanceScamChat.chat3" },
      { side: "left", text: "questions.romanceScamChat.chat4" },
    ],
  },
  {
    id: 5,
    category: PASSWORD_STRENGTH_QUESTION,
    type: PASSWORD_INPUT,
    forProfile: GENERAL_PROFILE,
    title: "questions.passwordCheck.title",
    profileBasedTitleVars: ["profileBasedService"],
    text: "questions.passwordCheck.text",
    moreInfo: "questions.passwordCheck.moreInfo",
    emojis: ["📱", "🔒"],
    readMoreLink:
      "https://sakerhetskollen.se/testa-din-sakerhet/ar-du-saker-pa-ditt-losenord",
    profileBasedService: {
      BANK_PROFILE: {
        name: "questions.passwordCheck.profileBasedService.BANK_PROFILE",
        color: "#0abf53",
        secondColor: "#fff",
        thirdColor: "#00112c",
      },
      GAMING_PROFILE: {
        name: "questions.passwordCheck.profileBasedService.GAMING_PROFILE",
        color: "#2a475e",
        secondColor: "#c7d5e0",
        thirdColor: "#66c0f4",
      },
      STREAMING_PROFILE: {
        name: "questions.passwordCheck.profileBasedService.STREAMING_PROFILE",
        color: "#f3f6f8",
        secondColor: "#282828",
        thirdColor: "#ff0000",
      },
      SOCIAL_MEDIA_PROFILE: {
        name: "questions.passwordCheck.profileBasedService.SOCIAL_MEDIA_PROFILE",
        color: "#f5f8fa",
        secondColor: "#14171a",
        thirdColor: "#1da1f2",
      },
    },
    options: [
      { text: "questions.passwordCheck.option1", score: 1 },
      {
        text: "questions.passwordCheck.option2",
        score: 0,
      },
      { text: "questions.passwordCheck.option3", score: 0 },
    ],
  },
  {
    id: 6,
    category: PUBLIC_WIFI_QUESTION,
    type: SEVERAL_OPTION,
    forProfile: GENERAL_PROFILE,
    title: "questions.publicWifi.title",
    text: "questions.publicWifi.text",
    moreInfo: "questions.publicWifi.moreInfo",
    readMoreLink:
      "https://sakerhetskollen.se/testa-din-sakerhet/ar-du-saker-pa-ditt-losenord",
    options: [
      { text: "questions.publicWifi.option1", score: 0 },
      {
        text: "questions.publicWifi.option2",
        score: 1,
      },
      { text: "questions.publicWifi.option3", score: 0 },
    ],
  },
  {
    id: 7,
    category: DECEIVE_WEBSITE,
    type: FAKE_WEBSITE,
    forProfile: GENERAL_PROFILE,
    title: "questions.fakeWebsite.title",
    text: "questions.fakeWebsite.text",
    moreInfo: "questions.fakeWebsite.moreInfo",
  },
  {
    id: 8,
    category: USE_SAME_PASSWORD,
    type: DRAG_TO_TRASH,
    forProfile: GENERAL_PROFILE,
    title: "questions.trashSamePassword.title",
    text: "questions.trashSamePassword.text",
    moreInfo: "questions.trashSamePassword.moreInfo",
    dragToTrashText: "questions.trashSamePassword.dragToTrashText",
  },
  {
    id: 9,
    category: RANK_PASSWORDS,
    type: ORDER,
    forProfile: GENERAL_PROFILE,
    title: "questions.rankpasswords.title",
    text: "questions.rankpasswords.text",
    moreInfo: "questions.rankpasswords.moreInfo",
    evenMoreInfo: "questions.rankpasswords.evenMoreInfo",
    best: "questions.rankpasswords.best",
    worst: "questions.rankpasswords.worst",
    options: [
      { text: "abc123", id: "1" },
      { text: "mångabäckarsmågrodorna", id: "2" },
      { text: "Vinter1994?", id: "3" },
      { text: "{wz_kjq?ycl&aP#/", id: "4" },
    ],
    correctIdOrder: ["4", "3", "2", "1"],
  },
  {
    id: 10,
    category: BLACKMAIL,
    type: CHAT,
    forProfile: GENERAL_PROFILE,
    title: "questions.blackmailChat.title",
    text: "questions.blackmailChat.text",
    moreInfo: "questions.blackmailChat.moreInfo",
    evenMoreInfo: "questions.blackmailChat.evenMoreInfo",
    yourAnswer: "questions.blackmailChat.yourAnswer",
    from: "questions.blackmailChat.from",
    options: [
      { text: "questions.blackmailChat.bad", score: 0 },
      { text: "questions.blackmailChat.good", score: 1 },
    ],
    smses: [
      { side: "left", text: "questions.blackmailChat.chat1" },
      { side: "left", image: "intim1" },
      { side: "left", text: "questions.blackmailChat.chat2" },
    ],
  },
  {
    id: 11,
    category: DONT_CLICK_LINK,
    type: CHAT,
    forProfile: GENERAL_PROFILE,
    title: "questions.dontClickLinkPhoto.title",
    text: "questions.dontClickLinkPhoto.text",
    moreInfo: "questions.dontClickLinkPhoto.moreInfo",
    evenMoreInfo: "questions.dontClickLinkPhoto.evenMoreInfo",
    yourAnswer: "questions.dontClickLinkPhoto.yourAnswer",
    from: "questions.dontClickLinkPhoto.from",
    options: [
      { text: "questions.dontClickLinkPhoto.bad", score: 0 },
      { text: "questions.dontClickLinkPhoto.good", score: 1 },
    ],
    smses: [
      { side: "left", text: "questions.dontClickLinkPhoto.chat1" },
      { side: "left", image: "dontClickVideo" },
      { side: "left", text: "questions.dontClickLinkPhoto.chat2" },
    ],
  },
  {
    id: 12,
    category: DECEIVE_WEBSITE,
    type: FAKE_DOMAIN,
    forProfile: GENERAL_PROFILE,
    title: "questions.fakeDomain.title",
    text: "questions.fakeDomain.text",
    moreInfo: "questions.fakeDomain.moreInfo",
    evenMoreInfo: "questions.fakeDomain.evenMoreInfo",
  },
  {
    id: 13,
    category: SHOULDER_SURFING,
    type: DRAG_TO_TRASH,
    forProfile: SOCIAL_MEDIA_PROFILE,
    title: "questions.shoulderSurfSocial.title",
    text: "questions.shoulderSurfSocial.text",
    moreInfo: "questions.shoulderSurfSocial.moreInfo",
    evenMoreInfo: "questions.shoulderSurfSocial.evenMoreInfo",
    dragToTrashText: "questions.shoulderSurfSocial.dragToTrashText",
  },
  {
    id: 14,
    category: SHOULDER_SURFING,
    type: DRAG_TO_TRASH,
    forProfile: GAMING_PROFILE,
    title: "questions.shoulderSurfGaming.title",
    text: "questions.shoulderSurfGaming.text",
    moreInfo: "questions.shoulderSurfGaming.moreInfo",
    evenMoreInfo: "questions.shoulderSurfGaming.evenMoreInfo",
    dragToTrashText: "questions.shoulderSurfGaming.dragToTrashText",
  },
  {
    id: 15,
    category: VIRUS,
    type: SEVERAL_OPTION,
    forProfile: STREAMING_PROFILE,
    title: "questions.downloadFilmVirus.title",
    text: "questions.downloadFilmVirus.text",
    moreInfo: "questions.downloadFilmVirus.moreInfo",
    options: [
      { text: "questions.downloadFilmVirus.option1", score: 1 },
      { text: "questions.downloadFilmVirus.option2", score: 0 },
      { text: "questions.downloadFilmVirus.option3", score: 0 },
    ],
  },
];