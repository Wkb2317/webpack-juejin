const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  // 模式
  mode: "production",
  // 入口文件
  entry: "./src/main.js",
  // 输入配置
  output: {
    filename: "js/[name].[contenthash:10].js",
    path: path.resolve(__dirname, "./dist"),
    assetModuleFilename: "static/[name][hash][ext][query]",
    // 动态加载路径
    chunkFilename: "js/[name].[contenthash:10].chunk.js",
    // 打包前清空dist目录
    clean: true,
  },
  devtool: "source-map",
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
        oneOf: [
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
              filename: "static/[name][hash][ext][query]",
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
              "thread-loader",
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true,
                  include: path.resolve(__dirname, "./src"),
                },
              },
            ],
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
      filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
    }),
    new CssMinimizerPlugin(),
    new TerserPlugin(),
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, "./src"),
      exclude: "node_modules",
      cache: true, // 开启缓
      cacheLocation: path.resolve(__dirname, "./node_modules/.cache/.eslintcache"),
    }),
    new PreloadWebpackPlugin({
      rel: "preload", // preload兼容性更好
      as: "script",
      // rel: 'prefetch' // prefetch兼容性更差
    }),
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  // 优化
  optimization: {
    splitChunks: {
      chunks: "all", // 对所有模块都分割
    },
    runtimeChunk: {
      name: (entryPoint) => `runtime~${entryPoint.name}`,
    },
  },
};
