// const fs = require('fs')
const appConfig = require('./public/manifest')

/** @type import('@vue/cli-service').ProjectOptions */
module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  // https://github.com/neutrinojs/webpack-chain/tree/v4#getting-started
  chainWebpack(config) {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', appConfig.title)

    // Set up all the aliases we use in our app.
    config.resolve.alias.clear().merge(require('./aliases.config').webpack)

    // Don't allow importing .vue files without the extension, as
    // it's necessary for some Vetur autocompletions.
    config.resolve.extensions.delete('.vue')

    // Only enable performance hints for production builds,
    // outside of tests.
    config.performance.hints(
      process.env.NODE_ENV === 'production' &&
        !process.env.VUE_APP_TEST &&
        'warning'
    )
  },
  css: {
    // Enable CSS source maps. Disable for production build!
    sourceMap: false,
    loaderOptions: {
      scss: {
        prependData: `$ASSETS: '${process.env.VUE_APP_ASSETS_URL}'; @import "~@assets/css/mixins.scss"; @import "~@assets/css/variables.scss"; @import "~@assets/css/main.scss"; @import "~@assets/css/icons.scss"; @import "~@assets/css/typography.scss"; @import "~@assets/css/grid.scss"; @import "~@assets/css/vendors.scss";`,
      },
    },
  },
  // Configure Webpack's dev server.
  // https://cli.vuejs.org/guide/cli-service.html
  devServer: {
    // https: {
    //   key: fs.readFileSync('./localhost.key'),
    //   cert: fs.readFileSync('./localhost.crt'),
    // },
    public: 'http://localhost:8083/',
  },
  publicPath: '/',
}
