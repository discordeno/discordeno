// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Discordeno",
  tagline: "Making Scalable Bots Easy!",
  url: "https://discordeno.mod.land",
  baseUrl: "/",
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
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/discordeno/discordeno/tree/main/site/",
        },
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
            type: 'docSidebar',
            sidebarId: 'docs',
            position: "left",
            label: "Docs",
          },
          {
            type: 'docSidebar',
            sidebarId: 'tutorial',
            position: "left",
            label: "Tutorial",
          },
          {
            to: "/benchmark",
            label: "Benchmark",
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
                to: "/docs/docs/intro",
              },
              {
                label: "Getting Started",
                to: "/docs/docs/getting-started",
              },
              {
                label: "FAQ",
                to: "/docs/docs/frequently-asked-questions",
              },
            ],
          }, {
            title: "Tutorial",
            items: [
              {
                label: "Big Bot",
                to: "/docs/tutorial/big-bot-guide/step-by-step",
              },
              {
                label: "Node.js",
                to: "/docs/tutorial/nodejs/getting-started",
              },
              {
                label: "Amethyst",
                to: "/docs/tutorial/amethyst/intro",
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
    // ... Your other plugins.
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        indexDocs: true,
        indexPages: true,
        docsRouteBasePath: ["/docs"],
        language: ["en"],
        hashed: true,
        docsDir: ["docs"],
        blogDir: [],
        removeDefaultStopWordFilter: true,
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
      },
    ],
  ],
};

module.exports = config;
