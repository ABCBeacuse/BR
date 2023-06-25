const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: './',
    lintOnSave: false,
    devServer: {
        https: false,
        open: false,
        proxy: {
            "/br": {
                target: 'http://10.102.3.132:8000/',
                ws: true,
                pathRewrite: {
                    '^/br': ''
                },
                changeOrigin: true
            }
        }
    }
})
