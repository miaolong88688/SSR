// webpack.dll.config.js
const path = require('path')
const DllPlugin = require('webpack/lib/DllPlugin')
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清空文件夹
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 分离css
const autoprefixer = require('autoprefixer') // 浏览器前缀

const vendors = ['vue', 'vuex', 'vue-router', 'axios', 'mcx-ui', './src/lib/rem']

module.exports = {
  mode: 'production', // development || production
  entry: {
    'dll': vendors
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dll'),
    library: '__[name]__lib'
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
          ]
        }
        // include: path.resolve(__dirname, './node_modules/mcx-ui')
      },
      {
        test: /\.css$/,
        // loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!less-loader' })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        },
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: '../dll/assets/images/[name].[ext]?[hash]', // 打包mcx-ui图片
          limit: 10000
        }
        // include: path.resolve(__dirname, './src'),
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
  },
  plugins: [
    new CleanWebpackPlugin(['dll'], { // 清空打包文件
      root: path.resolve(__dirname, '..'), // 根目录
      dry: false // 启用删除文件
    }),
    new DllPlugin({
      name: '__[name]__lib',
      path: path.join(__dirname, '../dll', '[name].manifest.json')
    })
  ]
}
