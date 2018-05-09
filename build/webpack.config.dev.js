const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 分离css
const utils = require('../config/utils')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

let devConfig
devConfig = merge(baseConfig, {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../client'),
      'vue$': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: utils.devServer(),
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
    new VueClientPlugin(), // SSR
    new ExtractTextPlugin('assets/css/main.css?[hash]'), // css提取
    new HtmlWebpackPlugin({ // 打包输出HTML
      title: 'Hello World app',
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      filename: 'index.html',
      template: 'index.html'
    }),
    new CleanWebpackPlugin(['dist']), // 清空打包文件
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      },
      'process.__DEV__': JSON.stringify(process.env.NODE_ENV)
    })
  ]
})
module.exports = devConfig
