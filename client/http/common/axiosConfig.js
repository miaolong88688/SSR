
let baseConfig = require('./baseURL')

function baseURL () {
  if (process.__DEV__ === 'dev') {
    return '/api/'
  } else if (process.__DEV__ === 'beta') {
    return baseConfig.betaBaseUrl
  } else if (process.__DEV__ === 'test') {
    return baseConfig.testBaseUrl
  } else if (process.__DEV__ === 'prod') {
    return baseConfig.prodBaseUrl
  }
}

export default {
  baseURL: baseURL(),
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
  // withCredentials: true  // 携带cookie
}
