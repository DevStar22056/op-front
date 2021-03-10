var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var DebugWebpackPlugin = require('debug-webpack-plugin');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#eval',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.CommonsChunkPlugin({
      name: "element-ui",
      // (the commons chunk name)
    
      filename: "element-ui.js",
      // (the filename of the commons chunk)
    
      // minChunks: 3,
      // (Modules must be shared between 3 entries)
    
      // chunks: ["pageA", "pageB"],
      // (Only use these entries)
    }),
    new DebugWebpackPlugin({

      // Defaults to ['webpack:*'] which can be VERY noisy, so try to be specific
      scope: [
        'webpack:compilation:succeed-module',
      ],
      listeners: {
        'webpack:compilation:build-module': function(thing) {
            // console.log(thing.rawRequest, thing.resource);
        },
        'webpack:normal-module-factory:before-resolve': function(thing) {
            // console.log(thing.contextInfo.issuer, thing.request);
        },
        'webpack:compilation:succeed-module': function(thing) {
            // console.log(thing.rawRequest);
        }
    },


      // Defaults to the compiler's setting
      debug: false
    }),

    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
