import Config from 'webpack-config'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
process.env.NODE_ENV = 'production'
export default new Config().extend('config/webpack.base.conf.js').merge({
  output: {
    publicPath: './',
    filename: 'js/[name].[chunkhash:7].js'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash:7].css'
    })
  ]
})
