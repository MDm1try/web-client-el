const path = require("path");
const nextTranslate = require("next-translate");

// module.exports = {
//   reactStrictMode: true,
//   sassOptions: {
//     includePaths: [path.join(__dirname, "src/styles")],
//   },
//   i18n: {
//     locales: ["ua", "rus"],
//     defaultLocale: "ua",
//   },
// };

module.exports = nextTranslate({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
  images: {
    domains: ["localhost"],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE: process.env.FIREBASE,
  },
});
