const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry: {
    'home':'./src/views/home/home.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, '../dist')]),
    new HtmlWebpackPlugin({
      filename: 'home.html',
      template: './src/views/home/home.html',
      title: 'new webpack'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: './src/views',
    host: 'localhost',
    port: 8000,
    compress: true
  },
  watch: true
}
