const path = require('path');

module.exports = {
  entry: './src/views/home/home.js',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    port: 8000,
    compress: true
  }
}
