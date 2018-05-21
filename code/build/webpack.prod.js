const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('path');
module.exports = env => {
  
  return merge(common(), {
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, '../dist')
    },
    plugins: [
      new UglifyJSPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
  });
}