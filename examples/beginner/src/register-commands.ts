import 'dotenv/config'

import { bot } from './bot.js'
import { updateCommands } from './utils/helpers.js'

bot.logger.info('Updating commands...')
await updateCommands()
