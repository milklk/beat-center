module.exports = {
  devServer: {
    port: 8080, 
    proxy: {
      '/bs': {
        target: 'http://192.168.0.106:8080/', 
        changeOrigin: true,
        // pathRewrite: { 
        //   '^/bs': '' //路径重写 
        //   } 
      }
    }
   },
   publicPath: process.env.NODE_ENV === 'production'
   ? '././'
   : '/'
}