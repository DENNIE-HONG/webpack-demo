const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const glob = require('glob');
module.exports = (env) => {
  let config = {
    entry: {
      home: './src/views/home/home.js',
      detail: './src/views/detail/detail.js',
      vendor: ['jquery']
      
    },
    resolve: {
      extensions: ['.js', '.scss', '.json']
    },
    optimization: {
      splitChunks : {
        chunks: 'initial',
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2,
            name: 'commons'
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
      new CleanWebpackPlugin(['dist/*.*', 'dist/js/*.*', 'dist/css/*.*'], {
        root: path.resolve(__dirname, '../')
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, '../src'),
          loader: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192
              }
            }
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
  config.plugins.push(new HtmlWebpackHarddiskPlugin());
  return config;
  function moreWebpackPlugin () {
    let pages = glob.sync('src/views/**/*.html');
    pages.map((filepath)=>{
      let fileName = path.basename(filepath, '.html');
      let conf = {
        chunks: ['manifest', 'vendor', 'commons', fileName],
        filename: `${fileName}.html`,
        template: `./src/views/${fileName}/${fileName}.html`,
        chunksSortMode: 'manual',
        alwaysWriteToDisk: true
      };
      config.plugins.push(new HtmlWebpackPlugin(conf));
    });
  }
}