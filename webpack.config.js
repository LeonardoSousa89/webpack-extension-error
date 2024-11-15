const productionOrDev = process.env.NODE_ENV !== "production";

const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  mode: productionOrDev ? "development" : "production",

  entry: "/scripts/main.js",
  output: {
    filename: "scripts/main.js",
    path: __dirname + "/dist",
  },

  devServer: {
    static: "./dist",
    port: 9000,
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }),

      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              quality: 100,
            }
          }
        }
      }),

      new CssMinimizerPlugin({}),
      new HtmlMinimizerPlugin(),
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/index.css",
    }),

    new CopyPlugin({
      patterns: [
        {
          context: path.resolve(__dirname, "dist"),
          from: "./*.html",
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },

      {
        test: /\.html$/i,
        type: "asset/resource",
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader",
        options: {
          outputPath: "assets/imgs",
          name: "[name].[ext]",
        },
      },
    ],
  },
};
