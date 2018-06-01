const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = env => {
  return merge(common(env), {
    mode: 'development', 
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, '../dist'),
      host: 'localhost',
      port: 7000,
      compress: true,
      hot: true,
      inline: true,
      progress: true,
      publicPath: '/',
      overlay: true,
      proxy: {
        '*': 'http://localhost:8888'
      },
      openPage: 'http://localhost:7000'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      })
    ],
    output: {
      filename: 'js/[name].js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
    },
    watch: true
  });
}
