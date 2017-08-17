import Config from 'webpack-config'
export default new Config().extend({
  'config/webpack.base.conf.js': config => {
    config.entry.vendor = [
      ...config.entry.vendor,
      'webpack-hot-middleware/client'
    ]
    return config
  }
})
