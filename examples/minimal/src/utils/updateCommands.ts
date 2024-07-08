import { bot } from '../bot.js'
import { configs } from '../config.js'

export async function updateApplicationCommands(): Promise<void> {
  await bot.helpers.upsertGlobalApplicationCommands(
    bot.commands
      // ONLY GLOBAL COMMANDS
      .filter((command) => !command.devOnly)
      .array(),
  )

  await bot.helpers.upsertGuildApplicationCommands(
    configs.devGuildId,
    bot.commands
      // ONLY GLOBAL COMMANDS
      .filter((command) => !!command.devOnly)
      .array(),
  )
}
