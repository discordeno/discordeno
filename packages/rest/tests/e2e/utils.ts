import { createRestManager } from '../../src/manager.js'
import { E2E_TEST_GUILD_ID, token } from './constants.js'
// For debugging purposes
// logger.setLevel(LogLevels.Debug)
// logger.setDepth(LogDepth.Full)

export const rest = createRestManager({
  token,
})
rest.deleteQueueDelay = 10000

const guild = await rest.createGuild({ name: 'ddenotester' })
const channel = await rest.createChannel(guild.id, { name: 'ddenotestchannel' })

export const e2eCache = {
  guild,
  channel,
  deletedGuild: false,
  communityGuildId: E2E_TEST_GUILD_ID,
}
