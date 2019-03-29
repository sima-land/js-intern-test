const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: './index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build/')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  devServer: {
    contentBase: join(__dirname, 'public/'),
    watchContentBase: true,
    compress: true,
    open: true,
    port: 8000
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
