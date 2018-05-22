const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = env => {
  console.log('Environment Variables: ', env.production);
  return merge(common(env), {
    mode: "development", 
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, '../dist'),
      host: 'localhost',
      port: 7000,
      compress: true,
      hot: true,
      inline: true,
      progress: true,
      overlay: true
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, '../dist')
    }
  });
}
