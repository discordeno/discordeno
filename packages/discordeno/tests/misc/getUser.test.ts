import { assertEquals, assertExists } from '../deps.js'
import { loadBot } from '../mod.js'

Deno.test({
  name: '[User] get a user and transform',
  ignore: process.env.TEST_ENV === 'UNIT',
  async fn(t) {
    const bot = loadBot()
    const user = await bot.helpers.getUser(bot.id)
    assertExists(user?.id)
    assertEquals(user.id, bot.id)
  }
})
