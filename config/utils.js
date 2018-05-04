const utils = class {
    static devServer() {
        return {
            historyApiFallback: true,
            noInfo: true,
            overlay: true,
            publicPath: '/',
            inline: true,
            port: 8888,
            disableHostCheck: true,
            proxy: { // 开发环境反向代理
                // 请求到 '/api' 下 的请求都会被代理到 target 中
                '/api': { 
                    target: require('../src/http/common/baseURL').envBaseUrl,
                    secure: false, // 接受 运行在 https 上的服务
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api' :''
                    },
                }
            }
        }
    }
}

module.exports = utils;