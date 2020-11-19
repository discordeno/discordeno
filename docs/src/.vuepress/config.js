const { description, repository } = require("../../package");

const discordLink = "";

module.exports = {
  title: "Discordeno",
  description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref： https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: repository,
    editLinks: true,
    docsDir: "docs",
    editLinkText: "Help us improve this page!",
    lastUpdated: true,
    smoothScroll: true,
    nav: [
      {
        text: "Guide",
        link: "/guide/",
      },
      {
        text: "Discord",
        link: discordLink,
        target: "_blank",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          title: "Guide",
          collapsable: false,
          children: [
            "",
            "using-vue",
          ],
        },
      ],
    },
  },

  /**
   * Apply plugins， ref： https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    "@vuepress/plugin-back-to-top",
    "@vuepress/plugin-medium-zoom",
  ],
};
