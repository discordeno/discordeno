import 'dotenv/config'

import { bot } from './bot.js'
import { updateApplicationCommands } from './utils/updateCommands.js'

bot.logger.info('Updating commands...')
await updateApplicationCommands()
