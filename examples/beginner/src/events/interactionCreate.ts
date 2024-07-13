import { ApplicationCommandOptionTypes, type Guild, hasProperty } from '@discordeno/bot'
import chalk from 'chalk'
import { bot } from '../bot.js'
import { commands } from '../commands.js'
import { getGuildFromId, isSubCommand, isSubCommandGroup } from '../utils/helpers.js'
import { createLogger } from '../utils/logger.js'

const logger = createLogger({ name: 'Event: InteractionCreate' })

bot.events.interactionCreate = async (interaction) => {
  if (!interaction.data || !interaction.id) return

  let guildName = 'Direct Message'
  let guild = {} as Guild

  // Set guild, if there was an error getting the guild, then just say it was a DM. (What else are we going to do?)
  if (interaction.guildId) {
    const guildOrVoid = await getGuildFromId(interaction.guildId).catch((err) => {
      logger.error(err)
    })

    if (guildOrVoid) {
      guild = guildOrVoid
      guildName = guild.name
    }
  }

  logger.info(
    `[Command: ${chalk.bgYellow.black(interaction.data.name)} - ${chalk.bgBlack.white(`Trigger`)}] by @${interaction.user.username} in ${guildName}${guildName !== 'Direct Message' ? ` (${guild.id})` : ``}`,
  )

  let command = commands.get(interaction.data.name)

  if (!command) {
    logger.warn(
      `[Command: ${chalk.bgYellow.black(interaction.data.name)} - ${chalk.bgBlack.yellow(`Not Found`)}] by @${interaction.user.username} in ${guildName}${guildName !== 'Direct Message' ? ` (${guild.id})` : ``}`,
    )

    return
  }

  if (interaction.data.options?.[0]) {
    const optionType = interaction.data.options[0].type

    if (optionType === ApplicationCommandOptionTypes.SubCommandGroup) {
      // Check if command has subcommand and handle types
      if (!command.subcommands) return

      // Try to find the subcommand group
      const subCommandGroup = command.subcommands?.find((command) => command.name === interaction.data?.options?.[0].name)
      if (!subCommandGroup) return

      if (isSubCommand(subCommandGroup)) return

      // Get name of the command which we are looking for
      const targetCmdName = interaction.data.options?.[0].options?.[0].name ?? interaction.data.options?.[0].options?.[0].name
      if (!targetCmdName) return

      // Try to find the command
      command = subCommandGroup.subCommands.find((c) => c.name === targetCmdName)
    }

    if (optionType === ApplicationCommandOptionTypes.SubCommand) {
      // Check if command has subcommand and handle types
      if (!command?.subcommands) return

      // Try to find the command
      const found = command.subcommands.find((command) => command.name === interaction.data?.options?.[0].name)
      if (!found) return

      if (isSubCommandGroup(found)) return

      command = found
    }
  }

  try {
    if (!command) throw new Error('Not command could be found')

    await command.execute(interaction)

    logger.info(
      `[Command: ${chalk.bgYellow.black(interaction.data.name)} - ${chalk.bgBlack.green(`Success`)}] by @${interaction.user.username} in ${guildName}${guildName !== 'Direct Message' ? ` (${guild.id})` : ``}`,
    )
  } catch (err) {
    logger.error(
      `[Command: ${chalk.bgYellow.black(interaction.data.name)} - ${chalk.bgBlack.red(`Error`)}] by @${interaction.user.username} in ${guildName}${guildName !== 'Direct Message' ? ` (${guild.id})` : ``}`,
    )

    if (typeof err !== 'object' || !err || !hasProperty(err, 'message') || err.message === 'Not command could be found') return

    logger.error(err)
  }
}
