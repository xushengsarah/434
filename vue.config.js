
const webpack = require('webpack')
module.exports = {
  publicPath: './',
  outputDir: '434',  //修改默认打包名称dist
  assetsDir: 'assets', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。从生成的资源覆写 filename 或 chunkFilename 时，assetsDir 会被忽略。
  indexPath: 'index.html', // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  filenameHashing: true, // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。
  devServer: {
    port: 8899,
    // proxy: {
    //   '/api': {
    //     //target: 'http://190.13.37.20:8088/bigScreen/api/v2',
    //     target: 'http://190.15.240.159:8088/bigScreen/api/v2',
    //     ws: true,
    //     secure: false,  // https ---> true
    //     changeOrigin: true, // 是否跨域
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ]
  },
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item.use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 要公用的scss的路径
          resources: './src/assets/css/common.scss'
        })
        .end()
    })
  }
}
