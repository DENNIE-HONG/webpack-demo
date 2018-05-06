const path = require('path');
module.exports = {
  entry: {
    'home':'./src/views/home/home.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  devServer: {
    contentBase: '../src/views/home/home.html',
    host: 'localhost',
    port: 8000,
    compress: true
  },
  watch: true
}
