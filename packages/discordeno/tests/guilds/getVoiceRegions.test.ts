import { assertEquals } from '../deps.js'
import { loadBot } from '../mod.js'
import { CACHED_COMMUNITY_GUILD_ID } from '../utils.js'

Deno.test({
  name: '[voice] Get voice regions',
  ignore: process.env.TEST_ENV === 'UNIT',
  async fn(t) {
    const bot = loadBot()
    const regions = await bot.helpers.getVoiceRegions(CACHED_COMMUNITY_GUILD_ID)
    assertEquals(regions.size > 1, true)
  }
})
