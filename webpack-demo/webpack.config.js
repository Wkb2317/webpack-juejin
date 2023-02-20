const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const EslintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = {
  // 模式
  mode: "development",
  // 入口文件
  entry: "./src/main.js",
  // 输入配置
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    assetModuleFilename: "static/[hash][ext][query]",
    // 打包前清空dist目录
    clean: true,
  },
  devtool: "eval-cheap-module-source-map",
  // 开发模式
  devServer: {
    // 自动打开浏览器
    open: true,
    // 端口
    port: "3000",
    // 地址
    host: "127.0.0.1",
    // 热更新
    hot: true,
    // 静态目录
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
  },
  // 模块loader
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/[hash][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/[hash][ext][query]",
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      // 指定模板
      template: path.resolve(__dirname, "./public/index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          // copy文件
          from: path.resolve(__dirname, "./public"),
          // copy到哪
          to: path.resolve(__dirname, "./dist"),
          globOptions: {
            // 忽略copy模板文件
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
    }),
    new CssMinimizerPlugin(),
    new TerserPlugin(),
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, "./src"),
      cache: true, // 开启缓
      cacheLocation: path.resolve(__dirname, "./node_modules/.cache/.eslintcache"),
    }),
  ],
};
