/* globals test, rm */
import webpack from 'webpack'
import {
  cyan
} from 'chalk'
import cfg from '../conf/webpack.prod.config'
// console.log(process.env.npm_config_dir)
if (test('-e', cfg.output.path)) {
  rm('-rf', cfg.output.path)
}
webpack(cfg, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')
  console.log(cyan('  Build complete.\n'))
})
