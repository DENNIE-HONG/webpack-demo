const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin');
const glob = require('glob');
module.exports = (env) => {
  let entryFiles = glob.sync('src/views/**/*.js');
  let entries = {};
  entryFiles.forEach(file => {
    let name = path.basename(file, '.js');
    entries[name] = './' + file;
  });
  let config = {
    entry: entries,
    resolve: {
      alias: {
        scss: path.resolve(__dirname, '../src/scss'),
        coms: path.resolve(__dirname, '../src/components')
      }
    },
    optimization: {
      splitChunks : {
        cacheGroups: {
          default: false,
          common: {
            name: 'common',
            chunks: 'initial',
            minChunks: 2
          },
          vendor: {
            test: /jquery/,
            name: 'vendor',
            priority: 10,
            chunks: 'initial',
            enforce: true,
          }
        }
      },
      runtimeChunk: {
        name: 'manifest'
      }
    },
    plugins: [
      new CleanWebpackPlugin(['dist/*.*', 'dist/js/*.*', 'dist/css/*.*', '../views/', '../views/coms/'], {
        root: path.resolve(__dirname, '../')
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      new WriteFilePlugin({
        test: /\.(art|html)$/
      }),
      // new CopyWebpackPlugin([
      //   {
      //     from: path.resolve(__dirname, '../src/components/**/*.art'),
      //     to: path.resolve(__dirname, '../../views/coms'),
      //     flatten: true
      //   }
      // ])
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
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 2048,
                name: env.production ? 'fonts/[name].[hash:7].[ext]' : 'fonts/[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.art$/,
          use: [
            {
              loader: 'art-template-loader'
            }
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                removeComments: false
              }
            }
          ]
        }
      ]
    }
  };
  moreWebpackPlugin(config);
  moreComsHtmlOutput(config);
  // config.plugins.push(new HtmlWebpackHarddiskPlugin());
  return config;
  
}
function moreWebpackPlugin (config) {
  let pages = glob.sync('src/views/**/*.html');
  pages.map((filepath)=>{
    let fileName = path.basename(filepath, '.html');
    let conf = {
      chunks: ['manifest', 'common', 'vendor', fileName],
      filename: path.resolve(__dirname, `../../views/${fileName}.html`),
      template: filepath,
      chunksSortMode: 'manual'
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
  });
}
function moreComsHtmlOutput (config) {
  let pages = glob.sync('src/components/**/*.art');
  pages.map((filepath)=>{
    let fileName = path.basename(filepath, '.art');
    let conf = {
      filename: path.resolve(__dirname, `../../views/coms/${fileName}.art`),
      template: filepath,
      inject: false
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
  });
}