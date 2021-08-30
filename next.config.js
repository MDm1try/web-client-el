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
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
});
