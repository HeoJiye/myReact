const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@lib': path.resolve(__dirname, 'lib/'),
      '@myReact': path.resolve(__dirname, 'lib/myReact')
    }
  },
  entry: {
    app: ['./src/index.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              [
                '@babel/preset-env',
                {
                  targets: '> 1%, not dead',
                  useBuiltIns: 'usage',
                  corejs: { version: '3' }
                }
              ]
            ],
            plugins: ['@babel/plugin-transform-react-jsx']
          }
        },
        exclude: /(node_modules)/
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    compress: true,
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.LoaderOptionsPlugin({ debug: true })
  ]
};
