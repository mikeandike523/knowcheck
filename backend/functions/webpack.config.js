const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode:"development",
  entry: './api.ts',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(t|j|c)sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, '.babelrc')
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    symlinks:true,
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'api.js',
    path: path.resolve(__dirname),
    libraryTarget: 'commonjs2'
  }
};