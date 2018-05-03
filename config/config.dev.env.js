module.exports = {
    isEnv: process.env.NODE_ENV === 'dev' ? true : false,
    env: process.env.NODE_ENV,
    envBaseUrl: 'http://beta-zhanchikuaizu.91naxia.com/api', // 本地开发
    betaBaseUrl: 'http://beta-zhanchikuaizu.91naxia.com/api', // 开发
    testBaseUrl: 'http://test-zhanchikuaizu.91naxia.com/api', // 测试
    prodBaseUrl: 'https://zhanchikuaizu.91naxia.com/api' // 生产
} 


