"use strict";

var nodeExternals = require("webpack-node-externals");
var path = require("path");

module.exports = {
  mode: "development",
  optimization: {
    minimize: false,
  },
  entry: "./functions/api.ts",
  output: {
    path: path.resolve(__dirname, "functions"), // <-- Important
    filename: "./api.js", // <-- Important
    libraryTarget: "this", // <-- Important
  },
  target: "node", // <-- Important
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  externals: [nodeExternals()], // <-- Important
};
