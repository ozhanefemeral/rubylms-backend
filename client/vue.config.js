module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    devServer: {
      historyApiFallback: true
    }
  },
  "devServer": {
    "proxy": {
      "/": {
        "target": "http://localhost:3000",
        "ws": true,
        "changeOrigin": true
      }
    }
  }
}