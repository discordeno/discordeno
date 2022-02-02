const { name, description, repository: repo } = require("../../package");
const nav = require("./navbar");
const sidebar = require("./sidebar");

const title = name[0].toUpperCase() + name.slice(1);

module.exports = {
  base: `/`,
  title,
  description,
  head: [
    ["link", { rel: "icon", href: "/favicon.png" }],
    ["meta", { name: "theme-color", content: "#7289DA" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    ["meta", { name: "og:title", content: title }],
    [
      "meta",
      {
        name: "og:description",
        content: description,
      },
    ],
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "og:url", content: "https://discordeno.mod.land" }],
    ["meta", { name: "og:image", content: "/logo.png" }],
  ],
  theme: "yuu",
  themeConfig: {
    repo,
    docsDir: "src",
    docsBranch: "main",
    editLinks: true,
    lastUpdated: true,
    sidebarDepth: 0,
    nav,
    sidebar,
    yuu: {
      defaultDarkTheme: true,
    },
  },
  plugins: [
    "@vuepress/plugin-back-to-top",
    "@vuepress/plugin-medium-zoom",
  ],
};
