// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const TerserPlugin = require('terser-webpack-plugin');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Discordeno',
  tagline: 'Making Scalable Bots Easy!',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://discordeno.js.org/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'discordeno', // Usually your GitHub org/user name.
  projectName: 'discordeno', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  webpack: {
    jsLoader: isServer => ({
      loader: require.resolve('esbuild-loader'),
      options: {
        loader: 'tsx',
        format: isServer ? 'cjs' : undefined,
        target: isServer ? 'node12' : 'es2017',
      },
    }),
  },

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/discordeno/discordeno/tree/main/website/',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/styling/index.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/links-embed-image.png',
      navbar: {
        title: 'Discordeno',
        logo: {
          alt: 'Discordeno Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://discord.gg/ddeno',
            label: 'Discord',
            position: 'right',
          },
          {
            href: 'https://github.com/discordeno/discordeno',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Documentation',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/ddeno',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/discordeno/discordeno',
              },
            ],
          },
        ],
        copyright: `Copyright © 2021-${new Date().getFullYear()}, Discordeno.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        indexDocs: true,
        indexPages: true,
        docsRouteBasePath: ['/docs', '/tutorial'],
        language: ['en'],
        hashed: true,
        docsDir: ['docs', 'tutorial'],
        blogDir: [],
        removeDefaultStopWordFilter: true,
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
      },
    ],
      './webpack-docusaurus-plugin'
    
  ],
}

module.exports = config
