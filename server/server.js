const Koa = require('koa')
const pageRouter = require('./routers/dev-ssr')
const app = new Koa()

const isDev = process.env.NODE_ENV === 'dev'

app.use(async (all, next) => {
  try {
    await next()
  } catch (err) {
    all.status = 500
    if (isDev) {
      all.body = err.message
    } else {
      all.body = 'error'
    }
  }
})
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is lisstening on ${HOST}:${PORT}`)
})
