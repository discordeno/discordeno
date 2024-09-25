import 'dotenv/config'

import importDirectory from './utils/loader.js'
import logger from './utils/logger.js'
import { updateApplicationCommands } from './utils/updateCommands.js'

logger.info('Loading commands...')
await importDirectory('./dist/commands')

logger.info('Updating commands...')
await updateApplicationCommands()

logger.info('Done!')

// We need to manually exit as the REST Manager has timeouts that will keep NodeJS alive
process.exit()
