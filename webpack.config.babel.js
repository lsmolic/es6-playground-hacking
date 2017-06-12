import path from 'path'
import webpack from 'webpack'

const folder = {
  src: './app/assets/',
  build: './public/'
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
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  watch: true
}

export default options;