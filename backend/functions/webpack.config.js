const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode:"development",
  entry: './api.ts',
  target: 'node',
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  module: {
    rules: [
      {
        test: /\.(t|j|c)sx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'api.js',
    path: path.resolve(__dirname),
    libraryTarget: 'commonjs2'
  },
  experiments: {
    // outputModule: true // Enable output as ES module
  }
};