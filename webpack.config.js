const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './docs/'),
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [{
      test: /\.js$/, exclude: /(node_modules|bower_components)/,
      use: { loader: 'babel-loader' },
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
  },
  watchOptions: {
    ignored: /.frag$/,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
