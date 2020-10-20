module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
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