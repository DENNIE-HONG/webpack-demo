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
    optimization: {
      splitChunks : {
        chunks: "initial",
        cacheGroups: {
          commons: {
            minChunks: 2,
            name: 'commons'
          },
          vendors: {
            test: 'vendor',
            name: 'vendor',
            priority: 10,
            enforce: true
          },
        }
      },
      runtimeChunk: {
        name: 'manifest'
      }
    },
    plugins: [
      new CleanWebpackPlugin('dist/*.*', {
        root: path.resolve(__dirname, '../')
      }),
      new webpack.ProvidePlugin({
        $: 'jquery'
      }),
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
    }
  };
  moreWebpackPlugin();
  return config;
  function moreWebpackPlugin () {
    let pages = ['home', 'detail'];
    pages.map((page)=>{
      let conf = {
        chunks: ['manifest', 'vendor', 'commons', page],
        filename: `${page}.html`,
        template: `./src/views/${page}/${page}.html`,
        chunksSortMode: 'manual'
      };
      config.plugins.push(new HtmlWebpackPlugin(conf));
    });
  }
}