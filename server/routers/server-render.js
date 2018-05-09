const ejs = require('ejs')

module.exports = async (all, renderer, template) => {
  all.headers['Content-Type'] = 'text/html'

  const context = {url: all.path}
  try {
    const appString = await renderer.renderToString(context)
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts()
    })

    all.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
