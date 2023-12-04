const TerserPlugin = require('terser-webpack-plugin')

module.exports = function (context, options) {
  return {
    name: 'webpack-docusaurus-plugin',
    configureWebpack(config, isServer, utils) {
      const cacheOptions = { cache: false }
      const minimizer = new TerserPlugin({
        minify: TerserPlugin.swcMinify,
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
