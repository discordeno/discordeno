import { updateGuildCommands } from '../utils/helpers.ts.js'
import { events } from './mod.ts.js'

events.guildCreate = async (bot, guild) => await updateGuildCommands(bot, guild)
