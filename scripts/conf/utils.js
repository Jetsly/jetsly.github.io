import {
  join
} from 'path'

export const env = {
  assetsPath: dir => join(__dirname, '../../', dir),
  port: 8088
}

export const aliasObject = Object.assign({}, {
  'src': env.assetsPath('src'),
  'assets': env.assetsPath('src/assets'),
  'actions': env.assetsPath('src/actions'),
  'components': env.assetsPath('src/components'),
  'units': env.assetsPath('src/units'),
  'stores': env.assetsPath('src/stores'),
  'routers': env.assetsPath('src/routers'),
  'directives': env.assetsPath('src/directives'),
  'mixins': env.assetsPath('src/mixins')
})
