import { after } from 'mocha'
import { createRestManager } from '../../src/manager.js'
import { E2E_TEST_GUILD_ID, token } from './constants.js'
// For debugging purposes
// logger.setLevel(LogLevels.Debug)
// logger.setDepth(LogDepth.Full)

export const rest = createRestManager({
  token,
})
rest.deleteQueueDelay = 10000

const guild = await rest.getGuild(E2E_TEST_GUILD_ID)
if (!guild) throw new Error('E2E_TEST_GUILD_ID does not exist or is not accessible.')

const channel = await rest.createChannel(guild.id, {
  name: 'discordeno-e2e',
})

after(async () => {
  // Clean up the channel created for testing
  if (channel.id) {
    await rest.deleteChannel(channel.id)
  }
})

export const e2eCache = {
  guildId: E2E_TEST_GUILD_ID,
  guild,
  channel,
}
