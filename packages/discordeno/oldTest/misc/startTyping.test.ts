import { loadBot } from '../mod.js'
import { CACHED_COMMUNITY_GUILD_ID } from '../utils.js'

Deno.test({
  name: '[typing] start typing',
  ignore: process.env.TEST_ENV === 'UNIT',
  async fn(t) {
    const bot = loadBot()
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, { name: 'typing' })
    await bot.helpers.startTyping(channel.id)
    await bot.helpers.deleteChannel(channel.id)
  }
})
