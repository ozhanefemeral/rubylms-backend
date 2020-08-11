module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    devServer: {
      historyApiFallback: true
    }
  },
  "outputDir": "C:\\Users\\Efe\\Desktop\\iş\\ruby\\public",
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