const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    polyfill: 'babel-polyfill',
    bundle: './index.js'
  },

  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build/')
  },

  module: {
    rules: [
    {oneOf:[
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
      },
      {
        // Exclude `js` files to keep "css" loader working as it injects
        // it's runtime that would otherwise processed through "file" loader.
        // Also exclude `html` and `json` extensions so they get processed
        // by webpacks internal loaders.
        exclude: [/\.js$/, /\.html$/, /\.json$/],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },


      ]}
     
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: []
};
