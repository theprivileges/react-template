const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const appPublic = path.resolve(__dirname, 'docs');

module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  return {
    mode: isEnvProduction
      ? 'production'
      : isEnvDevelopment && 'development',
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? 'nosources-source-map'
      : isEnvDevelopment && 'cheap-module-source-map',
    entry: {
      // main: './src/scripts/index.js',
      index: './src/styles/index.css',
    },
    output: {
      filename: isEnvProduction
        ? '[name].[contenthash:8].bundle.js'
        : '[name].bundle.js',
      chunkFilename: isEnvProduction
        ? '[name].[contenthash:8].chunk.js'
        : '[name].chunk.js',
      path: appPublic,
      pathinfo: isEnvDevelopment,
      publicPath: '',
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'eslint-loader'
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [
            isEnvDevelopment &&
              'style-loader',
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
          ].filter(Boolean)
        },
      ]
    },
    plugins: [
      new CleanWebpackPlugin({}),
      new CopyPlugin(['CNAME']),
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: './src/index.html',
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'async'
      }),
      new MiniCssExtractPlugin(
        Object.assign(
          {},
          isEnvProduction
          ? {
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[name].[contenthash:8].chunk.css',
            }
          : {
              filename: '[name].css',
              chunkFilename: '[name].chunk.css',
          }
        )
      )
    ].filter(Boolean),
    optimization: {
      minimize: isEnvProduction,
      runtimeChunk: true,
      splitChunks: {
        chunks: 'all',
        name: false,
      }
    },
    devServer: {
      contentBase: appPublic,
      compress: true,
      clientLogLevel: 'none',
      publicPath: '/',
      quiet: true,
      overlay: true,
    }
  };
}
