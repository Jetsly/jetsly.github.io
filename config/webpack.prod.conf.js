import webpack from 'webpack'
import Config from 'webpack-config'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default new Config().extend('config/webpack.base.conf.js').merge({
  output: {
    publicPath: './',
    filename: 'js/[name].[chunkhash:7].js'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify('production'),
      DEBUG: false
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash:7].css'
    })
  ]
})
