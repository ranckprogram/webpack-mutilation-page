const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const pages = [
  {
    title: "首页",
    page: "index",
  },
  {
    title: "新闻",
    page: "news",
  },
  {
    title: "产品",
    page: "product",
  },
  {
    title: "关于",
    page: "about",
  },
];

module.exports = {
  mode: "development",
  entry: pages.reduce(
    (result, current) => ({
      ...result,
      [current.page]: `./src/pages/${current.page}/index.js`,
    }),
    Object.create(null)
  ),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]-[contenthash:5].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /.pug$/,
        use: ["pug-loader"],
      },
      {
        test: /.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "stylus-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    ...pages.map(
      (item) =>
        new HtmlWebpackPlugin({
          template: `./src/pages/${item.page}/index.pug`,
          filename: `${item.page}.html`,
          templateParameters: {
            ...item,
          },
        })
    ),
  ],
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
};
