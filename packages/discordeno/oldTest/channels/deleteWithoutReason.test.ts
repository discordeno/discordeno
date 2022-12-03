import { assertExists, assertRejects } from '../deps.js'
import { loadBot } from '../mod.js'
import { CACHED_COMMUNITY_GUILD_ID } from '../utils.js'

Deno.test({
  name: '[channel] delete a channel without a reason',
  ignore: process.env.TEST_ENV === 'UNIT',
  async fn(t) {
    const bot = loadBot()
    // Create a channel to delete
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: 'delete-channel'
    })

    // Make sure the channel was created
    assertExists(channel.id)

    // Delete the channel now without a reason
    await bot.helpers.deleteChannel(channel.id)

    // Check if channel still exists
    await assertRejects(() => bot.helpers.getChannel(channel.id))
  }
})
