const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 分离css
const VueServerPlugin = require('vue-server-renderer/server-plugin') // 服务端渲染插件

let serverSSR
serverSSR = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../client/server-entry'),
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../client')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devtool: 'sourec-map',
  externals: Object.keys(require('../package.json').dependencies),
  module: { // eslint
    rules: [
      {
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        exclude: [
          /node_modules/,
          '../client/assets/'
        ],
        enforce: 'pre'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('assets/css/main.css?[hash]'), // css提取
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      },
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerPlugin()
  ]
})
module.exports = serverSSR
