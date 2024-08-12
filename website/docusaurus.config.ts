// Note: type annotations allow type checking and IDEs autocompletion

import type { Options as PluginContentDocs } from '@docusaurus/plugin-content-docs'
import type { Options as PresetClassicOptions, ThemeConfig } from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { themes } from 'prism-react-renderer'

const config: Config = {
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
  trailingSlash: false,

  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve('esbuild-loader'),
      options: {
        loader: 'tsx',
        jsx: 'automatic',
        format: isServer ? 'cjs' : undefined,
        target: isServer ? 'node12' : 'es2017',
      },
    }),
  },

  markdown: {
    format: 'detect',
  },

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'warn',

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
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          editUrl: 'https://github.com/discordeno/discordeno/tree/main/website/',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/styling/index.css'),
        },
      } satisfies PresetClassicOptions,
    ],
  ],

  themeConfig: {
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
        {
          type: 'docSidebar',
          sidebarId: 'old_docs',
          position: 'left',
          label: 'Old Docs',
          docsPluginId: 'old_docs',
        },
        {
          type: 'docSidebar',
          sidebarId: 'api_reference',
          position: 'left',
          label: 'API Reference',
          docsPluginId: 'api_reference',
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
          title: 'Old Docs',
          items: [
            {
              label: 'Introduction',
              to: '/old_docs/intro',
            },
            {
              label: 'Getting Started',
              to: '/old_docs/getting-started',
            },
            {
              label: 'FAQ',
              to: '/old_docs/frequently-asked-questions',
            },
            {
              label: 'Benchmark',
              to: '/old_docs/benchmark',
            },
          ],
        },
        {
          title: 'API Reference',
          items: [
            {
              label: 'Bot package',
              to: '/api_reference/category/bot-1',
            },
            {
              label: 'Gateway package',
              to: '/api_reference/category/gateway-1',
            },
            {
              label: 'Rest package',
              to: '/api_reference/category/rest-1',
            },
            {
              label: 'Utils package',
              to: '/api_reference/category/utils-1',
            },
            {
              label: 'Types package',
              to: '/api_reference/category/types-1',
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
      theme: themes.github,
      darkTheme: themes.dracula,
      magicComments: [
        // Docusaurus default magic comment
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'theme-code-block-add',
          line: 'insert-next-line',
          block: { start: 'insert-start', end: 'insert-end' },
        },
        {
          className: 'theme-code-block-remove',
          line: 'remove-next-line',
          block: { start: 'remove-start', end: 'remove-end' },
        },
      ],
      additionalLanguages: ['bash'],
    },
  } satisfies ThemeConfig,

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'old_docs',
        path: 'old_docs',
        routeBasePath: 'old_docs',
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/discordeno/discordeno/tree/main/site/',
      } satisfies PluginContentDocs,
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api_reference',
        path: 'api_reference',
        routeBasePath: 'api_reference',
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/discordeno/discordeno/tree/main/site/',
      } satisfies PluginContentDocs,
    ],
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        indexDocs: true,
        indexPages: true,
        docsRouteBasePath: ['/docs', 'api_reference'],
        language: ['en'],
        hashed: true,
        docsDir: ['docs', 'api_reference'],
        blogDir: [],
        removeDefaultStopWordFilter: true,
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
      },
    ],
  ],
}

export default config
