import { bot } from '../bot.js'
import { commands } from '../commands.js'

export async function updateApplicationCommands(): Promise<void> {
  await bot.helpers.upsertGlobalApplicationCommands(commands.array())
}
