var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "scripts/index.js"),
    vendors: ["react", "kinto", "jsonschema"]
  },
  output: {
    path: path.join(__dirname, "build", "scripts"),
    filename: "bundle.js",
    publicPath: "scripts/"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js"),
    new webpack.IgnorePlugin(/fake\-indexeddb/)  // From kinto.js
  ],
  resolve: {
    extensions: ["", ".js", ".jsx", ".css"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ["babel"],
        include: [
          path.join(__dirname, "scripts"),
          path.join(__dirname, "schema")
        ]
      },
      {
        test: /\.css$/,
        loader: "style!css",
        include: path.join(__dirname, "css")
      }
    ]
  }
};
