const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const Router = require('koa-router')()
const axios = require('axios')
const MemoryFS = require('memory-fs')
const VusServerRender = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')
const serverCompilor = webpack(serverConfig)

const mfs = new MemoryFS()
serverCompilor.outputFileSystem = mfs

let bundle
serverCompilor.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(wran => console.log(wran))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})

const handleSSR = async (all) => {
  if (!bundle) {
    all.body = '稍等...'
    return
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
  )

  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VusServerRender
    .createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    })

  await serverRender(all, renderer, template)
}

Router.get('*', handleSSR)

module.exports = Router
