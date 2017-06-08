const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
require('dotenv').config();

const publicFolder = path.resolve(__dirname, 'public');
const srcFolder = path.resolve(__dirname, 'app');

const isProd = process.env.NODE_ENV === 'production';

const babelPresets = ['es2015', 'stage-3', 'react'];
if (!isProd) babelPresets.push('react-hmre');

const getPlugins = () => {
  /**
   * List of plugins
   *
   * HtmlWebpackPlugin: copy index.html as a template and inject scripts
   * https://github.com/jaketrent/html-webpack-template
   *
   * CleanWebpackPlugin: clear 'public' folder
   * https://github.com/johnagan/clean-webpack-plugin
   *
   * webpack.DefinePlugin: define global variables
   * https://webpack.github.io/docs/list-of-plugins.html#defineplugin
   *
   * ExtractTextPlugin: create separate files
   * https://github.com/webpack/extract-text-webpack-plugin
   *
   * webpack.HotModuleReplacementPlugin: refresh page on fly
   *
   * webpack.optimize.UglifyJsPlugin(): Minimize all JavaScript output of chunks
   */
  const plugins = [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(srcFolder, 'index.html'),
    }),

    new CleanWebpackPlugin(publicFolder, {
      root: __dirname,
      verbose: true,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),

    new ExtractTextPlugin({
      filename: isProd ? 'styles.[contenthash].css' : 'styles.css',
      allChunks: true,
    }),
  ];

  if (isProd) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: module => (
          module.context && module.context.indexOf('node_modules') !== -1
        ),
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
      })
    );
  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return plugins;
};

module.exports = {
  /**
   * Source maps
   * Used only in dev env
   */
  devtool: isProd ? 'eval' : 'eval-source-map',

  /**
   * Entry application point
   */
  entry: {
    app: [
      'babel-polyfill',
      'whatwg-fetch',
      path.resolve(srcFolder, 'index.js'),
      path.resolve(srcFolder, 'index.css'),
    ],
  },

  /**
   * Output options
   */
  output: {
    path: publicFolder,
    publicPath: '/',
    filename: isProd ? '[name].[chunkhash].js' : '[name].js',
  },

  /**
   * Webpack dev server configuration
   * https://webpack.github.io/docs/webpack-dev-server.html
   */
  devServer: {
    host: process.env.WEBPACK_DEV_SERVER_HOST,
    port: process.env.WEBPACK_DEV_SERVER_PORT,
    inline: true,
    hot: !isProd,
    contentBase: './public',
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },

  module: {
    /**
     * List of loaders
     *
     * babel-loader: transpile code (ES6/ES7) into ES5, hot module replacement included
     * https://github.com/babel/babel-loader
     *
     * Extract css to separate file
     * https://github.com/postcss/postcss-loader
     *
     * Enable hot module replacement for an extracted css file
     * https://github.com/shepherdwind/css-hot-loader
     */
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: srcFolder,
        use: {
          loader: 'babel-loader',
          options: {
            presets: babelPresets,
            plugins: isProd ? [] : ['transform-runtime'],
          },
        },
      },

      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        })),
      },

      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/[name]-[hash:8].[ext]',
          },
        },
      },
    ],
  },

  plugins: getPlugins(),
};
