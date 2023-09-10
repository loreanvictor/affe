import axios from 'axios'


// TODO:
// turn this into an independently published plugin.
// to achieve that, this basically lacks the following:
//
// - options for including URLs (not all https, for example from esm.sh or .js files)
// - options for excluding some other stuff
// - a little option for verbosity of logs
// - tests
//
const plugin = () => ({
  name: 'vite-plugin-https-imports',
  enforce: 'pre',
  apply: 'build',
  resolveId(id, importer) {
    if (id.startsWith('https://')) {
      return id
    } else if (importer && importer.startsWith('https://')) {
      return new URL(id, importer).toString()
    }
  },
  async load(id) {
    if (id.startsWith('https://')) {
      const chalk = (await import('chalk')).default
      const ora = (await import('ora')).default

      const loading = ora(chalk.dim('downloading ') + chalk.hex('1450A3')(id)).start()
      const { data } = await axios.get(id)
      loading.succeed(chalk.dim('downloaded ') + chalk.hex('1450A3')(id))

      return data
    }
  }
})


export default {
  plugins: [plugin()]
}
