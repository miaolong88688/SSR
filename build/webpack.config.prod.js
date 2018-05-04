//生产环境中通用的配置
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin'); //多线程运行uglifyjs插件
const HappyPack = require('happypack');//loader多线程处理文件
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const CleanWebpackPlugin = require('clean-webpack-plugin');//清空文件夹
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');//脚本内联到html
const CompressionPlugin = require("compression-webpack-plugin"); // gzip压缩
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')  // css压缩
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');// 将dll插入到HTML

let prodConfig;
prodConfig = merge(baseConfig, {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
            // 'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: [
            '*', 
            '.js', 
            '.vue', 
            '.json'
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'HappyPack/loader?id=jsHappy', //ES6转换为ES5
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, '../src'),
                    path.resolve(__dirname, '../node_modules/mcx-ui')
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], { // 清空打包文件
            root: path.resolve(__dirname, '..'), // 根目录
            dry: false //启用删除文件
        }), 
        // 配置提取出的样式文件
        new ExtractTextPlugin('assets/css/main.css?[hash]' + +new Date()),
        // 提取公共基础库
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
            filename: 'assets/js/[name]-[id].js?[hash:8]' + +new Date 
        }),
        //js 内联
        new InlineManifestWebpackPlugin({
            name: 'webpackManifest'
        }),
        //让loader可以多进程去处理文件
        new HappyPack({
            id: 'jsHappy',
            threadPool: happyThreadPool,
            loaders: [{
                path: 'babel-loader',
                query: {
                    cacheDirectory: '.webpack_cache',
                    presets: [
                        ["env", { "modules": false }],
                        'stage-3'
                    ],
                    "plugins": ["syntax-dynamic-import"]
                }
            }]
        }),
        new webpack.optimize.UglifyJsPlugin({ // js压缩
            //sourceMap: true, 
            compress: {
                warnings: false // 忽略警告
            }
        }),
        // new CompressionPlugin({ // gzip
            //         asset: "[path].gz[query]",
            //         algorithm: "gzip",
            //         test: /\.js$|\.css$|\.html$/,
            //         threshold: 10240,
            //         minRatio: 0
        // }),
        //根据已有的html文件生成html文件
        new HtmlwebpackPlugin({  // 打包输出HTML
            minify:{ //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:true,    //删除空白符与换行符
                minifyCSS: true, //压缩内联css
            },
            filename: 'index.html',
            template: 'index.html'
        }),
        new webpack.DllReferencePlugin({  // dll
            context: __dirname,
            /** 
                下面这个地址对应webpack.dll.config.js中生成的那个json文件的路径
                这样webpack打包时，就先直接去这个json文件中把那些预编译的资源弄进来
            **/
            manifest: require('../dll/dll.manifest.json')
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            },
            __DEV__: JSON.stringify(process.env.NODE_ENV)
        }),
        new ParallelUglifyPlugin({ //多线程运行uglifyjs插件
            cacheDir: '.cache/',
            uglifyJS:{
                output: {
                comments: false
                },
                compress: {
                warnings: false
                }
            }
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['dll/dll.js'],
            append: false, // 资产前添加
            publicPath: '/',
            hash: true
        }),
    ],
    //devtool: '#source-map'
})

module.exports = prodConfig;