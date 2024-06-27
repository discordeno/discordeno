import 'dotenv/config'

import logger from './utils/logger.js'
import { updateApplicationCommands } from './utils/updateCommands.js'

logger.info('Updating commands...')
await updateApplicationCommands()
