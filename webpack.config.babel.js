// @ts-check

import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import de from 'dotenv';
import webpack from 'webpack';

const dotenv = de.config({
  path: path.join(__dirname, '.env'),
});

const mode = process.env.NODE_ENV || 'development';
const environment = process.env.NODE_ENV ? process.env : dotenv.parsed;

module.exports = {
  mode,
  externals: {
    gon: 'gon',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: '/assets/',
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    publicPath: '/assets/',
    compress: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(environment),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
