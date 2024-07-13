/**
 * Credit: mattrunyon
 * https://github.com/facebook/docusaurus/issues/4765#issuecomment-1679863984
 */

import type { LoadContext, Plugin } from '@docusaurus/types'
import TerserPlugin, { esbuildMinify } from 'terser-webpack-plugin'

export default function (_context: LoadContext, _options: unknown): Plugin {
  return {
    name: 'webpack-docusaurus-plugin',
    configureWebpack(config, _isServer, _utils) {
      const cacheOptions = { cache: process.env.CI !== 'true' }

      const minimizer = new TerserPlugin({
        minify: esbuildMinify,
      })
      const minimizers = config.optimization.minimizer?.map((m) => (m instanceof TerserPlugin ? minimizer : m))

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
