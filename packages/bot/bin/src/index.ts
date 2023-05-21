import { Command } from 'commander'
const program = new Command()

program.name('discordeno').description('CLI to some JavaScript string utilities').version('0.1.0')

program
  .command('generate')
  .description('Split a string into substrings and display as an array')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined
    console.log(str.split(options.separator, limit))
  })

program.parse()
