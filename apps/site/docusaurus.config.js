// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Discordeno",
  tagline: "Making Scalable Bots Easy!",
  url: "https://discordeno.mod.land",
  baseUrl: "/discordeno/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",
  organizationName: "discordeno",
  projectName: "discordeno",
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Discordeno",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docs",
            position: "left",
            label: "Docs",
            docsPluginId: "docs",
          },
          {
            type: "docSidebar",
            sidebarId: "tutorial",
            position: "left",
            label: "Tutorial",
            docsPluginId: "tutorial",
          },
          {
            href: "https://github.com/discordeno/discordeno",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Introduction",
                to: "/docs/intro",
              },
              {
                label: "Getting Started",
                to: "/docs/getting-started",
              },
              {
                label: "FAQ",
                to: "/docs/frequently-asked-questions",
              },
              {
                label: "Benchmark",
                to: "/docs/benchmark",
              },
            ],
          },
          {
            title: "Tutorial",
            items: [
              {
                label: "Big Bot",
                to: "/tutorial/big-bot-guide/step-by-step",
              },
              {
                label: "Node.js",
                to: "/tutorial/nodejs/getting-started",
              },
              {
                label: "Amethyst",
                to: "/tutorial/amethyst/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.gg/ddeno",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/discordeno/discordeno",
              },
            ],
          },
        ],
        copyright: `Copyright © 2021 - ${new Date().getFullYear()} Discordeno.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      {
        id: "docs",
        path: "docs",
        routeBasePath: "docs",
        sidebarPath: require.resolve("./docsSidebars.js"),
        editUrl: "https://github.com/discordeno/discordeno/tree/main/site/",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      {
        id: "tutorial",
        path: "tutorial",
        routeBasePath: "tutorial",
        sidebarPath: require.resolve("./tutorialSidebars.js"),
        editUrl: "https://github.com/discordeno/discordeno/tree/main/site/",
      },
    ],
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        indexDocs: true,
        indexPages: true,
        docsRouteBasePath: ["/docs", "/tutorial"],
        language: ["en"],
        hashed: true,
        docsDir: ["docs", "tutorial"],
        blogDir: [],
        removeDefaultStopWordFilter: true,
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
      },
    ],
    [
      "client-redirects",
      /** @type {import('@docusaurus/plugin-client-redirects').Options} */
      {
        createRedirects(existingPath) {
          if (
            existingPath.includes("/tutorial/big-bot-guide/") || existingPath.includes("/tutorial/nodejs/") ||
            existingPath.includes("/tutorial/amethyst/")
          ) {
            return [
              existingPath.replace("/tutorial/", "/docs/"),
            ];
          }
          if (
            existingPath.includes("/docs/docs/frequently-asked-questions") ||
            existingPath.includes("/docs/docs/getting-started") || existingPath.includes("/docs/docs/migrating")
          ) {
            return [
              existingPath.replace("/docs/", "/docs/general/"),
            ];
          }
          return undefined; // Return a falsy value: no redirect created
        },
      },
    ],
  ],
};

module.exports = config;
