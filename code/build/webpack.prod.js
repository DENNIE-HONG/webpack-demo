const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = env => {
  return merge(common(env), {
    mode: 'production',
    optimization: {
      minimizer: [
        new UglifyJSPlugin({
          cache: true,
          parallel: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:12].css',
        chunkFilename: 'css/[name].[contenthash:12].css'
      })
    ],
    output: {
      filename: 'js/[name].[chunkhash].js',
      path: path.resolve(__dirname, '../dist')
    }
  });
}