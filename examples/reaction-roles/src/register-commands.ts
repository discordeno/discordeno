import 'dotenv/config'

import { bot } from './bot.js'
import commands from './commands/index.js'

const guildId = 'REPLACE WITH YOUR GUILD ID'

await bot.rest
  .upsertGuildApplicationCommands(guildId, [...commands.values()])
  .catch((e) => bot.logger.error('There was an error when updating the global commands', e))

process.exit(0)
