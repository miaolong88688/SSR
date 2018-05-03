const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 分离css
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')  // css压缩
const autoprefixer = require('autoprefixer'); // 浏览器前缀
const px2rem = require('postcss-plugin-px2rem'); // 转换px为rem
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin'); // 多线程压缩

const NODE_ENV = require('./config/config.dev.env');
const utils = require('./config/utils');

var isProd = process.env.NODE_ENV === 'dev'

module.exports = {
  entry: {
    main: './src/main.js',
    common: ['vue', 'vuex', 'axios', './src/lib/rem', 'mcx-ui']
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'assets/js/[name]-[id].js?[hash]',
    publicPath: isProd ? '/' : '/dist/'
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
              rootValue:75, // 根字体大小
              unitPrecision: 3 // 渲染单位小数个数
            })
          ]
        },
        // include: path.resolve(__dirname, './node_modules/mcx-ui')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      },      
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!less-loader' })
      }, 
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options:{
          cacheDirectory: true
        },
        exclude: /node_modules/,
        include: path.resolve(__dirname, './src'),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: 'assets/images/[name].[ext]?[hash]',
          limit: 10000
        },
        //include: path.resolve(__dirname, './src'),
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: utils.devServer(),
  performance: {
    hints: false
  },
  plugins: [
    new ExtractTextPlugin('assets/css/main.css?[hash]'),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new HtmlWebpackPlugin({  // 打包输出HTML
      title: 'Hello World app',
      minify:{ //压缩HTML文件
          removeComments:true,    //移除HTML中的注释
          collapseWhitespace:true,    //删除空白符与换行符
          minifyCSS: true, //压缩内联css
      },
      filename: 'index.html',
      template: 'index.html'
    }),
    new CleanWebpackPlugin(['dist']), // 清空打包文件
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV.env)
      }
    }),
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
    })
  ]
}

// if ( process.env.NODE_ENV === 'production' ) { // 生产环境
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new webpack.optimize.UglifyJsPlugin({
//       sourceMap: true,
//       compress: {
//         warnings: false
//       }
//     })
//   ])
// }
