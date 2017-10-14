const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  //entry: './app/index.js',
  devtool: "inline-source-map",
  plugins: [new CopyWebpackPlugin([{ from: "./app/index.html", to: "./index.html" }])],
  devServer: {
    contentBase: "./dist"
  },
  entry: {
    app: "./app/js/index.js"
  },
  output: {
    filename: "./js/bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  }
};
