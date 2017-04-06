module.exports = {
  entry: './app/index.jsx',
  output: {
    filename: "./build/bundle.js",
    sourceMapFilename: "./build/bundle.map"
  },
  devServer: {
    inline: true,
    contentBase: './',
    port: 8100
  },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
