const { resolve, join } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: './src/index.js'
  },

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
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: join(__dirname, '/'),
    compress: false,
    port: 9000,
    host: 'localhost',
    disableHostCheck: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
