import { LogDepth, logger, LogLevels } from '@discordeno/utils'

import { createRestManager } from '../../src/manager.js'
import { E2E_TEST_GUILD_ID, token } from './constants.js'
// For debugging purposes
// logger.setLevel(LogLevels.Debug)
// logger.setDepth(LogDepth.Full)

export const rest = createRestManager({
  token,
})
rest.deleteQueueDelay = 10000

export const e2ecache = {
  guild: await rest.createGuild({ name: 'ddenotester' }),
  deletedGuild: false,
  communityGuildId: E2E_TEST_GUILD_ID,
}
