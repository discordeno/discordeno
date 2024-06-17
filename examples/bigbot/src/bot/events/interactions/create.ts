import { InteractionTypes, LogLevels, commandOptionsParser, type Interaction, type logger } from '@discordeno/bot'
import chalk from 'chalk'
import { bot } from '../../bot.js'

bot.events.interactionCreate = async (interaction) => {
  const isAutocomplete = interaction.type === InteractionTypes.ApplicationCommandAutocomplete
  const isCommandOrAutocomplete = interaction.type === InteractionTypes.ApplicationCommand || isAutocomplete

  if (!interaction.data || !isCommandOrAutocomplete) return

  const command = bot.commands.get(interaction.data.name)

  if (!command) {
    logCommand(interaction, 'Missing', interaction.data.name)
    await interaction.respond('❌ Something went wrong. I was not able to find this command.')

    return
  }

  logCommand(interaction, 'Trigger', interaction.data.name)

  const options = commandOptionsParser(interaction)

  try {
    if (isAutocomplete) {
      await command.autoComplete?.(interaction, options)
    } else {
      await command.run(interaction, options)
    }

    logCommand(interaction, 'Success', interaction.data.name)
  } catch (error) {
    logCommand(interaction, 'Failure', interaction.data.name, LogLevels.Error, error)
    await interaction.respond('❌ Something went wrong. The command execution has thrown an error.')
  }
}

function logCommand(
  interaction: Interaction,
  type: 'Failure' | 'Success' | 'Trigger' | 'Missing',
  commandName: string,
  logLevel: LogLevels = LogLevels.Info,
  ...restArgs: unknown[]
): void {
  const typeColor = ['Failure', 'Missing'].includes(type) ? chalk.red(type) : type === 'Success' ? chalk.green(type) : chalk.white(type)

  const autocomplete = interaction.type === InteractionTypes.ApplicationCommandAutocomplete ? ' (AutoComplete) ' : ''
  const command = `Command${autocomplete}: ${chalk.bgYellow.black(commandName || 'Unknown')} - ${chalk.bgBlack(typeColor)}`
  const user = chalk.bgGreen.black(`@${interaction.user.username} (${interaction.user.id})`)
  const guild = chalk.bgMagenta.black(interaction.guildId ? `guildId: ${interaction.guildId}` : 'DM')

  ;(bot.logger as typeof logger).log(logLevel, `${command} - By ${user} in ${guild}`, ...restArgs)
}
