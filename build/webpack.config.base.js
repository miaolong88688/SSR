const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 分离css
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin') // css压缩
const autoprefixer = require('autoprefixer') // 浏览器前缀
// const px2rem = require('postcss-plugin-px2rem') // 转换px为rem

const config = {
  mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production', // development || production
  entry: {
    main: path.join(__dirname, '../src/main.js'),
    common: ['vue', 'vuex', 'axios', './src/lib/rem', 'mcx-ui', 'fastclick', 'vue-router']
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    publicPath: process.env.NODE_ENV === 'dev' ? '/' : '/dist/',
    filename: 'assets/js/[name]-[id].js?[hash]',
    chunkFilename: 'assets/js/[name].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: false,
          postcss: [
            autoprefixer({
              browsers: ['Android > 1', 'ChromeAndroid > 1', 'FirefoxAndroid > 1', 'Samsung > 1', 'and_uc > 1', 'iOS > 1']
            }),
            require('postcss-plugin-px2rem')({
              rootValue: 75, // 根字体大小
              unitPrecision: 3 // 渲染单位小数个数
            })
          ],
          hotReload: true
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: 'css-loader' })
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: 'css-loader!less-loader' })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        },
        exclude: /node_modules/,
        include: path.resolve(__dirname, './src')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: 'assets/images/[name].[ext]?[hash]',
          limit: 1024
        }
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name].[ext]?[hash]'
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
