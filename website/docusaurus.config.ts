// Note: type annotations allow type checking and IDEs autocompletion

import type { Options as PluginContentDocs } from '@docusaurus/plugin-content-docs'
import type {
  Options as PresetClassicOptions,
  ThemeConfig,
} from '@docusaurus/preset-classic'
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
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  webpack: {
    jsLoader: isServer => ({
      loader: require.resolve('esbuild-loader'),
      options: {
        loader: 'tsx',
        jsx: 'automatic',
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
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
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
      } satisfies PresetClassicOptions,
    ],
  ],

  themeConfig: {
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
        {
          type: 'docSidebar',
          sidebarId: 'old_docs',
          position: 'left',
          label: 'Old Docs',
          docsPluginId: 'old_docs',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorial',
          position: 'left',
          label: 'Tutorial',
          docsPluginId: 'tutorial',
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
          title: 'Tutorial',
          items: [
            {
              label: 'Big Bot',
              to: '/tutorial/big-bot-guide/step-by-step',
            },
            {
              label: 'Node.js',
              to: '/tutorial/nodejs/getting-started',
            },
            {
              label: 'Amethyst',
              to: '/tutorial/amethyst/intro',
            },
          ],
        },
        {
          title: 'API Reference',
          items: [
            {
              label: 'Classes',
              to: '/api_reference/category/classes-3',
            },
            {
              label: 'Enums',
              to: '/api_reference/category/enums-3',
            },
            {
              label: 'Interfaces',
              to: '/api_reference/category/interfaces-3',
            },
            {
              label: 'Modules',
              to: '/api_reference/category/modules-3',
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
        id: 'tutorial',
        path: 'tutorial',
        routeBasePath: 'tutorial',
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
        docsRouteBasePath: ['/docs', '/tutorial', 'api_reference'],
        language: ['en'],
        hashed: true,
        docsDir: ['docs', 'tutorial', 'api_reference'],
        blogDir: [],
        removeDefaultStopWordFilter: true,
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
      },
    ],
    './webpack-docusaurus-plugin.ts',
  ],
}

export default config
