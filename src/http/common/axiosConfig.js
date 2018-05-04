
let baseConfig = require('./baseURL');

function baseURL() {
    if ( __DEV__ === 'dev' ) {
        return '/api/'
    }else if( __DEV__ === 'beta' ) {
        return baseConfig.betaBaseUrl
    }else if( __DEV__ === 'test' ) {
        return baseConfig.testBaseUrl
    }else if( __DEV__ === 'prod' ) {
        return baseConfig.prodBaseUrl
    }
}

export default {
    baseURL: baseURL(),
    timeout: 8000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    // withCredentials: true  // 携带cookie
}