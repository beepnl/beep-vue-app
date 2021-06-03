const appConfig = require('../public/manifest')

module.exports = {
  title: appConfig.title + ' Docs',
  description: appConfig.description,
  themeConfig: {
    sidebar: [['/']],
  },
}
