const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = env => {
  return merge(common(env), {
    mode: 'production',
    optimization: {
      minimizer: [
        new UglifyJSPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: {
              drop_console: true
            },
            output: {
              comments: false
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({
          safe: true,
          autoprefixer: {
            remove: false
          }
        })
      ],
      hashedModuleIds: true
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css'
      })
    ],
    output: {
      filename: 'js/[name].[chunkhash:8].js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/'
    }
  });
};