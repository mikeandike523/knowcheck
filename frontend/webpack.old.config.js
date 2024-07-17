import  path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import fs from 'fs'

const __dirname = path.dirname(import.meta.url.slice("file://".length).slice(process.platform==="win32" ? 1 : 0))

const spinnerHtml = fs.readFileSync("./spinnerHtml.html")
const spinnerStyles = fs.readFileSync("./spinnerStyles.html")
const exports = {
  mode: "production",
  entry: './src/main.tsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    symlinks: true,
    alias: {
      "@":path.resolve(__dirname,"src")
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, '.babelrc'),
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]',
        },
      },
      {
        test: /\.html$/,
        use: ['html-loader'], // Add html-loader to process HTML files
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.webpack.html', // Use index.html as the template
      filename: 'index.html',
      // favicon: './assets/favicon.ico',
      templateParameters: {
        spinnerHtml,
        spinnerStyles
      },
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};

export default exports