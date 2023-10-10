import { Command } from 'commander'
const program = new Command()

program.name('discordeno').description('CLI to discordeno utilities').version('0.1.0')

program
  .command('generate')
  .description('description')
  .argument('<string>', 'string to split')
  .action((str, options) => {
    console.log('generate')
  })

program.parse()
