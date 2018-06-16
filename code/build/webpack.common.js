const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const glob = require('glob');
const filePosition = require('../../config/filePosition');
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
      splitChunks: {
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
      new CleanWebpackPlugin([
        `${filePosition.resources}/`,
        `${filePosition.resources}/js/*.*`,
        `${filePosition.resources}/css/`,
        `${filePosition.resources}/fonts/`,
        `${filePosition.views}/`,
        `${filePosition.viewComs}/`
      ], {
        root: path.resolve(__dirname, '../../')
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      new WriteFilePlugin({
        test: /\.html$/
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, '../src'),
          use: [
            'babel-loader',
            'eslint-loader'
          ],
          exclude: [/node_modules/, path.resolve(__dirname, '../src/lib')]
        },
        {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: env.production ? false: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: env.production ? false: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: env.production ? false: true
              }
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [path.resolve(__dirname, '../src/scss/vars.scss'), path.resolve(__dirname, '../src/scss/mixins.scss')]
              }
            }
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
  moreWebpackPlugin(config, env.production);
  moreComsHtmlOutput(config, 'html', env.production);
  return config;

};
/**
 * 生成html文件
 * @param {Object}  webpack配置对象
 * @param {Boolean} 是否是生产环境
*/
function moreWebpackPlugin (config, isProd) {
  let pages = glob.sync('src/views/**/*.html');
  pages.map((filepath)=>{
    let fileName = path.basename(filepath, '.html');
    let conf = {
      chunks: ['manifest', 'common', 'vendor', fileName],
      filename: path.resolve(__dirname, `../../views/${fileName}.html`),
      template: filepath,
      chunksSortMode: 'manual',
      favicon: path.resolve(__dirname, '../../favicon.ico')
    };
    if (isProd) {
      conf = Object.assign(conf, {
        minify: {
          removeComments: true, //去除注释
          collapseWhitespace: true, //去除空格
          minifyJS: true //压缩内联script
        }
      });
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
  });
}
function moreComsHtmlOutput (config, suffixName, isProd) {
  suffixName = suffixName || 'html';
  let pages = glob.sync(`src/components/**/*.${suffixName}`);
  pages.map((filepath)=>{
    let fileName = path.basename(filepath, `.${suffixName}`);
    let conf = {
      filename: path.resolve(__dirname, `../../views/coms/${fileName}.${suffixName}`),
      template: filepath,
      inject: false
    };
    isProd && (conf = Object.assign(conf, {
      minify: {
        removeComments: true, //去除注释
        collapseWhitespace: true, //去除空格
        minifyJS: true //压缩内联script
      }
    }));
    config.plugins.push(new HtmlWebpackPlugin(conf));
  });
}