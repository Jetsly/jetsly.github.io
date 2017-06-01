import webpack from 'webpack'
import Config from 'webpack-config'
<<<<<<< HEAD
export default new Config().extend({
  'scripts/conf/webpack.base.config.js': config => {
    config.entry.vendor = [
      ...config.entry.vendor,
      'webpack-hot-middleware/client'
    ]
    return config
  }
}).merge({
=======
export default new Config().extend('scripts/conf/webpack.base.config.js').merge({
  entry: {
    vendor: ['vue', 'core-js/fn/promise']
  },
>>>>>>> master
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
