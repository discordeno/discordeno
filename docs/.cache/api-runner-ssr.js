var plugins = [{
      plugin: require('/Users/Dr.Zishan/Desktop/idk/G4M3R/Discordeno/docs/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/Dr.Zishan/Desktop/idk/G4M3R/Discordeno/docs/node_modules/gatsby-plugin-layout/gatsby-ssr'),
      options: {"plugins":[],"component":"/Users/Dr.Zishan/Desktop/idk/G4M3R/Discordeno/docs/src/templates/docs.js"},
    },{
      plugin: require('/Users/Dr.Zishan/Desktop/idk/G4M3R/Discordeno/docs/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/Dr.Zishan/Desktop/idk/G4M3R/Discordeno/docs/node_modules/gatsby-plugin-mdx/gatsby-ssr'),
      options: {"plugins":[],"gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-images","options":{"maxWidth":1035,"sizeByPixelDensity":true}},{"resolve":"gatsby-remark-copy-linked-files"}],"extensions":[".mdx",".md"]},
    },{
      plugin: require('/Users/Dr.Zishan/Desktop/idk/G4M3R/Discordeno/docs/node_modules/gatsby-plugin-gtag/gatsby-ssr'),
      options: {"plugins":[],"trackingId":null,"head":true,"anonymize":false},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`);

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api);
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map((plugin) => {
    if (!plugin.plugin[api]) {
      return undefined;
    }
    const result = plugin.plugin[api](args, plugin.options);
    if (result && argTransform) {
      args = argTransform({ args, result });
    }
    return result;
  });

  // Filter out undefined results.
  results = results.filter((result) => typeof result !== `undefined`);

  if (results.length > 0) {
    return results;
  } else {
    return [defaultReturn];
  }
};
