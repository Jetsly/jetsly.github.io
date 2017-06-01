import webpack from 'webpack'
import Config from 'webpack-config'
export default new Config().extend({
  'scripts/conf/webpack.base.config.js': config => {
    config.entry.vendor = [
      ...config.entry.vendor,
      'webpack-hot-middleware/client'
    ]
    return config
  }
}).merge({
  devtool: '#source-map',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify('development'),
      DEBUG: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})
