import webpack from 'webpack'
import Config from 'webpack-config'
export default new Config().extend('scripts/conf/webpack.base.config.js').merge({
  entry: {
    vendor: ['vue', 'core-js/fn/promise']
  },
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
