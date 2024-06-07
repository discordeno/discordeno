import { bot } from '../bot.js'
import { updateGuildCommands } from '../utils/helpers.js'

bot.events.guildCreate = async (guild) => await updateGuildCommands(bot, guild)
