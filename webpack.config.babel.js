import path from 'path'
import webpack from 'webpack'
import htmlWebpackPlugin from 'html-webpack-plugin'

const folder = {
  src: `${__dirname}/app/assets/`,
  build: `${__dirname}/public/`
}

let options = {
  entry: `${folder.src}js/main.js`,
  output: {
    path: path.resolve(__dirname, `${folder.build}js/`),
    filename: 'main.webpack.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      hash: true,
      filename: `${folder.build}html/index.html`,
      template: `${folder.src}html/index.html.ejs`
    })
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map',
  watch: true
}

export default options;