const { environment } = require('@rails/webpacker')
const webpack = require('webpack')
const vue = require('./loaders/vue')

environment.loaders.append('vue', vue)
// environment.loaders.delete('url')
environment.plugins.append(
    'CommonsChunkVendor',
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => {
      // this assumes your vendor imports exist in the node_modules directory
      return module.context && module.context.indexOf('node_modules') !== -1
    }
})
)

environment.plugins.append(
    'CommonsChunkManifest',
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    })
)

module.exports = environment
