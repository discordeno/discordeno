import { logger, LogLevels } from '@discordeno/utils'
// For debugging purposes
logger.setLevel(LogLevels.Debug)

import { createRestManager } from '../../src/manager.js'
import { token } from './constants.js'

export const rest = createRestManager({
  token,
})
rest.deleteQueueDelay = 10000

console.log('CREATING GUILD')
export const e2ecache = {
  guild: await rest.createGuild({ name: 'ddenotester' }),
}

console.log('CACHED check', e2ecache.guild)
