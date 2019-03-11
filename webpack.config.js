const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (webpackEnv) => {
  const isEnvDevelopment === webpackEnv.development;
  const isEnvProduction === webpackEnv.production;

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? 'source-map' : isEnvDevelopment && 'cheap-module-source-map',
    entry: {
      main: './src/scripts/index.js'
    },
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js',
      path: path.resolve(__dirname, 'docs'),
    },
    module: {
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
          use:[
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.jade$/,
          use: {
            loader: 'pug-loader'
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin({}),
      new CopyPlugin(['CNAME']),
      new HtmlWebpackPlugin({
        template: './src/index.jade',
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'async'
      })
    ],
    optimization: {
      minimize: isEnvProduction,
      runtimeChunk: 'single',
    }
  };
}