/**
 * @description 导出vue/cli配置，以下所有配置修改需要重启项目
 */
module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH
    ? process.env.VUE_APP_PUBLIC_PATH
    : '/',
  authPath: process.env.VUE_APP_AUTH_PATH,
  outputDir: process.env.VUE_APP_OUTPUTDIR
    ? process.env.VUE_APP_OUTPUTDIR
    : 'dist',
  assetsDir: 'static',
  nodeEnv: process.env.VUE_APP_DEV_ENV,
  lintOnSave: true,
  transpileDependencies: ['resize-detector'],
  devPort: 10000,
  providePlugin: {},
  build7z: false,
  buildGzip: false,
  imageCompression: true,
  pwa: false,
  authMode: process.env.VUE_APP_AUTH_MODE
    ? process.env.VUE_APP_AUTH_MODE
    : 'saml2',
  linkPath: process.env.VUE_APP_LINk_PATH,
}
