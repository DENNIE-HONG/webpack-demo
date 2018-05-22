const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = (env) => {
  console.log(env.production);
  let config = {
    entry: {
      home: './src/views/home/home.js',
      detail: './src/views/detail/detail.js',
      vendor: ['jquery']
      
    },
    optimization: {
      splitChunks : {
        chunks: 'initial',
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2,
            name: 'commons',
            maxInitialRequests: 5,
            minSize: 0 
          },
          vendors: {
            test: 'vendor',
            name: 'vendor',
            priority: 10,
            enforce: true
          }
        }
      },
      runtimeChunk: {
        name: 'manifest'
      }
    },
    plugins: [
      new CleanWebpackPlugin(['dist/*.*', 'dist/css/*.*'], {
        root: path.resolve(__dirname, '../')
      }),
      new webpack.ProvidePlugin({
        $: 'jQuery',
        jQuery: 'jQuery'
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, '../src'),
          loader: "babel-loader"
        },
        {
          test: /\.(css|scss)$/,
          use: [
            env.production? MiniCssExtractPlugin.loader: 'style-loader',
            "css-loader"
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