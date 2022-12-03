import { assertExists, assertRejects } from '../deps.js'
import { loadBot } from '../mod.js'
import { CACHED_COMMUNITY_GUILD_ID } from '../utils.js'

Deno.test({
  name: '[channel] delete a channel with a reason',
  ignore: process.env.TEST_ENV === 'UNIT',
  async fn(t) {
    const bot = loadBot()
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: 'delete-channel'
    })

    // Make sure the channel was created
    assertExists(channel.id)

    // Delete the channel now with a reason
    await bot.helpers.deleteChannel(channel.id, 'with a reason')

    // Check if channel still exists
    await assertRejects(() => bot.helpers.getChannel(channel.id))
  }
})
