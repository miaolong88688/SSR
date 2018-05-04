const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 分离css
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin') // css压缩
const utils = require('../config/utils')

let devConfig
devConfig = merge(baseConfig, {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: utils.devServer(),
  performance: {
    hints: false
  },
  module: { // eslint
    rules: [
      {
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        exclude: [
          /node_modules/,
          '../src/assets/'
        ],
        enforce: 'pre'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('assets/css/main.css?[hash]'),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
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
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common', // 选择入口处打包的文件名称
      filename: 'assets/js/[name]-[id].js?[hash:8]' // 被打包好的文件路径及公共模块名称
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      include: ['main.js'],
      exclude: ['vendor.js'],
      column: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      },
      'process.__DEV__': JSON.stringify(process.env.NODE_ENV)
    })
  ]
})
module.exports = devConfig
