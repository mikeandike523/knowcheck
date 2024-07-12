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
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, '.babelrc') // Specify the path to your .babelrc file
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
  },
  experiments: {
    // outputModule: true // Enable output as ES module
  }
};