const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = () => {
  let config = {
    entry: {
      home: './src/views/home/home.js',
      detail: './src/views/detail/detail.js',
      vendor: ['jquery']
    },
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, '../dist')
    },
    plugins: [
      new CleanWebpackPlugin('dist/*.*', {
        root: path.resolve(__dirname, '../')
      }),
    ],
    optimization: {
      splitChunks : {
        cacheGroups: {
          vendor: {
            name: 'vendor',
            chunks: "initial"
          },
          commons: {
            name: 'common',
            chunks: "initial"
          }
        }
      }
    },
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
    }
  };
  moreWebpackPlugin();
  return config;
  function moreWebpackPlugin () {
    let pages = ['home', 'detail'];
    pages.map((page)=>{
      let conf = {
        filename: `${page}.html`,
        template: `./src/views/${page}/${page}.html`
      };
      config.plugins.push(new HtmlWebpackPlugin(conf));
    });
  }
}