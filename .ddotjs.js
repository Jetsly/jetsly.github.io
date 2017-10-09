const autoprefixer= require('autoprefixer')
const join = require('path').join
const assetsPath = (...relativePath) => join(__dirname, ...relativePath)

module.exports = {
  entry: {
    app: ['./src/entry.js'],
    vendor: ['./src/vendor.js']
  },
  output: {
    path: 'docs',
  },
  resolve:{
    extensions: ['.js', '.vue', '.json'],
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
  postcss:[
    autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0', 'iOS >= 7.0']
    })
  ]
}
