import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import { join } from 'path'
import {
  styleLoaders,
  default as cssLoaders
} from './vue-loader.conf'
export const assetsPath = (...relativePath) => join(__dirname, '../', ...relativePath)
const isFontFile = url => /\.(woff2?|eot|ttf|otf)(\?.*)?$/.test(url)
export default {
  entry: {
    app: ['./src/entry.js'],
    vendor: ['./src/vendor.js']
  },
  output: {
    path: assetsPath('docs'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      assetsPath('src'),
      assetsPath('node_modules')
    ],
    alias: Object.assign({}, {
      'src': assetsPath('src'),
      'assets': assetsPath('src/assets'),
      'actions': assetsPath('src/actions'),
      'components': assetsPath('src/components'),
      'units': assetsPath('src/units'),
      'stores': assetsPath('src/stores'),
      'routers': assetsPath('src/routers'),
      'directives': assetsPath('src/directives'),
      'mixins': assetsPath('src/mixins')
    })
  },
  module: {
    rules: [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [assetsPath('src')],
      exclude: [assetsPath('node_modules')],
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
      include: [assetsPath('src'), assetsPath('test')],
      exclude: [assetsPath('node_modules')]
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'file-loader',
      options: {
        name: 'img/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'file-loader',
      options: {
        name: '[name].[hash:7].[ext]',
        outputPath: url => `${isFontFile(url) ? 'fonts' : 'media'}/${url}`,
        publicPath: url => `${isFontFile(url) ? '../' : './'}${url}`
      }
    }
    ].concat(styleLoaders())
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['vendor', 'app'],
      filename: `index.html`,
      template: assetsPath(`src/tpl.html`)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    })
  ]
}
