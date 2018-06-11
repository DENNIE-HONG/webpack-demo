const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = env => {
  env.production = env.production !== 'false';
  return merge(common(env), {
    mode: 'development', 
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, '../dist'),
      clientLogLevel: 'warning',
      port: 7000,
      compress: true,
      hot: true,
      publicPath: '/',
      noInfo: true,
      overlay: true,
      proxy: {
        '*': 'http://localhost:8888'
      },
      openPage: 'http://localhost:7000',
      public: 'http://localhost:7000',
      stats: {
        colors: true
      }
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
};
