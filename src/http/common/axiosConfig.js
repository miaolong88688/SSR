let env = require('../../../config/config.dev.env');
let isEnv = env.isEnv;  
let prodBaseUrl = env.prodBaseUrl;

function URL() {
    if ( isEnv ) {
        return '/api/'
    }else {
        if ( env.env === 'beta' ) {
            return env.betaBaseUrl
        }else if( env.env === 'test' ) {
            return env.testBaseUrl
        }else if( env.env === 'prod' ) {
            return env.prodBaseUrl
        }
    }
}

console.log( URL() )

export default {
    baseURL: URL(),
    timeout: 8000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    // withCredentials: true  // 携带cookie
}