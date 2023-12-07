/**
 * Credit: mattrunyon
 * https://github.com/facebook/docusaurus/issues/4765#issuecomment-1679863984
 */

const TerserPlugin = require('terser-webpack-plugin')

module.exports = function (context, options) {
  return {
    name: 'webpack-docusaurus-plugin',
    configureWebpack(config, isServer, utils) {
      const cacheOptions = { cache: process.evn.CI !== 'true' }

      const minimizer = new TerserPlugin({
        minify: TerserPlugin.esbuildMinify,
      })
      const minimizers = config.optimization.minimizer?.map(m =>
        m instanceof TerserPlugin ? minimizer : m,
      )

      return {
        mergeStrategy: { 'optimization.minimizer': 'replace' },
        optimization: {
          minimizer: minimizers,
        },
        ...cacheOptions,
      }
    },
  }
}
