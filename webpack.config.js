const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const cssDev = [
  "style-loader",
  {
    loader: "css-loader",
    options: {
      modules: true,
      localIdentName: "[name]__[local]--[hash:base64:5]"
    }
  },
  "sass-loader"
];
const cssProd = ExtractTextPlugin.extract({
  fallback: "style-loader",
  use: [
    {
      loader: "css-loader",
      options: {
        modules: true,
        localIdentName: "[name]__[local]--[hash:base64:5]"
      }
    },
    {
      loader: "sass-loader"
    }
  ]
});
const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader?name=[name].[ext]&outputPath=media/",
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    hot: true,
    port: 5000,
    stats: "errors-only",
    open: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack 101",
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      template: "./src/index.html"
    }),
    new ExtractTextPlugin({
      filename: "css/main.css",
      disable: !isProd,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};
