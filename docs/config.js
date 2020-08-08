const config = {
  gatsby: {
    pathPrefix: "/",
    siteUrl: "https://discordeno.js.org",
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    logo: "https://i.imgur.com/ZSTr4J6.png",
    logoLink: "/",
    title: "",
    githubUrl: "https://github.com/Skillz4Killz/Discordeno",
    helpUrl: "",
    tweetText: "",
    social: `<li>
		    <a href="https://discord.gg/J4NqJ72" target="_blank" rel="noopener">
		      <div class="discordBtn">
		        <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/discord-brands-block.svg' alt={'Discord'}/>
		      </div>
		    </a>
		  </li>`,
    links: [{ text: "", link: "" }],
    search: {
      enabled: false,
      indexName: "",
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      "/introduction",
      "/faq",
      "/gettingstarted",
      "/stepbystep",
      "/createbot",
      "/createcommand",
      "/permlevels",
      "/djs",
    ],
    collapsedNav: [
      "/createbot",
      "/createcommand",
    ],
    links: [
      {
        text: "Documentation",
        link: "https://doc.deno.land/https/deno.land/x/discordeno/mod.ts",
      },
      {
        text: "Bugs/Issues",
        link: "https://github.com/Skillz4Killz/Discordeno/issues",
      },
      {
        text: "Contribute",
        link: "https://github.com/Skillz4Killz/Discordeno/pulls",
      },
    ],
    frontline: false,
    ignoreIndex: true,
    title:
      "<a href='https://discord.gg/J4NqJ72'>Discord </a><div class='greenCircle'></div><a href='https://discord.gg/J4NqJ72'>Support</a>",
  },
  siteMetadata: {
    title: "Discordeno",
    description: "Easy Deno module for Discord API interactions..",
    ogImage: "https://i.imgur.com/7O5E6hI.png",
    docsLocation: "https://github.com/Skillz4Killz/Discordeno",
    favicon: "",
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: "Gatsby Gitbook Starter",
      short_name: "GitbookStarter",
      start_url: "/",
      background_color: "#6b37bf",
      theme_color: "#6b37bf",
      display: "standalone",
      crossOrigin: "use-credentials",
      icons: [
        {
          src: "src/pwa-512.png",
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
};

module.exports = config;
