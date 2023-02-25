const path = require("path");
const MinCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { DefinePlugin } = require("webpack");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: path.resolve(__dirname, "./src/main.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash].js",
    chunkFilename: "static/js/[name].[contenthash].[chunk].js",
    assetModuleFilename: "static/media/[contenthash][ext][query]",
    clean: true,
  },
  resolve: {
    extensions: [".vue", ".js", ".json"],
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css/i,
        use: [MinCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less/i,
        use: [MinCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/i,
        type: "asset/resource",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js/i,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 开启缓存，优化打包速度
              exclude: /(node_modules|bower_components)/,
            },
          },
        ],
      },
      {
        test: /\.vue$/i,
        loader: "vue-loader",
        options: {
          cacheDirectory: path.resolve(__dirname, "../node_modules/.cache/vue-loader"),
        },
      },
    ],
  },
  plugins: [
    new CssMinimizerWebpackPlugin(),
    new MinCssExtractPlugin({
      filename: "static/css/[name].[contenthash].css",
      chunkFilename: "static/css/[name].[contenthash].chunk.css",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
    new VueLoaderPlugin(),
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
      cache: true,
      cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"),
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false",
    }),
    new TerserPlugin(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  devtool: isProduction ? undefined : "cheap-module-source-map",
  optimization: {
    minimize: isProduction,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vue: {
          test: /[\\/]node_modules[\\/]vue(.*)?/,
          name: "static/js/vue-chunk",
          priority: 40,
        },
        element: {
          priority: 30,
          test: /[\\/]node_modules[\\/]element-plus[\\/]/,
          name: "static/js/element-chunk",
        },
        libs: {
          priority: 20,
          test: /[\\/]node_modules[\\/]/,
          name: "static/js/libs-chunk",
        },
      },
    },
    // 缓存
    runtimeChunk: {
      name: (entry) => `runtime~${entry.name}.js`,
    },
  },
};
