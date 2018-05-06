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
  optimization: { // 替代 CommonsChunkPlugin
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
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
    // 提取公共基础库 // webpack4 取消
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ['vendor'],
    //   filename: 'assets/js/[name]-[id].js?[hash:8]' + (+new Date())
    // }),
    // new webpack.SourceMapDevToolPlugin({
    //   filename: '[file].map',
    //   include: ['main.js'],
    //   exclude: ['vendor.js'],
    //   column: false
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      },
      'process.__DEV__': JSON.stringify(process.env.NODE_ENV)
    })
  ]
})
module.exports = devConfig
