const { resolve, join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    bundle: './index.js'
  },
  mode: 'development',

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
    contentBase: join(__dirname, ''),
    compress: true,
    port: 8080
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [new HtmlWebpackPlugin({
    template: resolve(__dirname, 'index.html')
  })]  
};
