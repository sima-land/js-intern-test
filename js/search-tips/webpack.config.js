const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: './index.js'
  },

  devServer: {
    disableHostCheck: true,
  },

  devtool: 'inline-source-map',

  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build/'),
    publicPath: 'build/',
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
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: []
};
