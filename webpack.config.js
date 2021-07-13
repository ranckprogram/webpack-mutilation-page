const path = require("path");
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
  },
  module: {
    rules: [
      {
        test: /.pug$/,
        use: ["pug-loader"],
      },
      // {
      //   test: /.pug$/,
      //   use: ["pug-loader"],
      // },
    ],
  },
  plugins: [
    ...pages.map(item => new HtmlWebpackPlugin({
      template: `./src/pages/${item.page}/index.pug`,
      filename: `${item.page}.html`,
      templateParameters: {
        title: item.title,
        item
      },
    }))
  ]
};
