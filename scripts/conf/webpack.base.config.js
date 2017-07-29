import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import {
  env
} from './utils.js'
import {
  styleLoaders,
  default as cssLoaders
} from './vue-loader.conf'
import {
  aliasObject
} from './utils'
export default {
  entry: {
    app: ['./src/entry.js'],
    vendor: ['./src/vendor.js']
  },
  output: {
    path: env.assetsPath('dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      env.assetsPath('src'),
      env.assetsPath('node_modules'),
      env.assetsPath('../node_modules')
    ],
    alias: aliasObject
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['vendor', 'app'],
      filename: `index.html`,
      template: `./src/index.pug`
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    })
  ],
  module: {
    noParse: [
      /aframe-master/
    ],
    rules: [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [env.assetsPath('src'), env.assetsPath('test')],
      exclude: [env.assetsPath('src/assets/libs')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: cssLoaders
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [env.assetsPath('src'), env.assetsPath('test'), env.assetsPath('node_modules')],
      exclude: [env.assetsPath('node_modules/aframe')]
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'file-loader',
      options: {
        limit: 10000,
        name: 'img/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.pug$/,
      loader: 'pug-loader'
    }
    ].concat(styleLoaders())
  }
}
