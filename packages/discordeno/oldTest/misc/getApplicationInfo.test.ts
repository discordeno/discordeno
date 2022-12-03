import { assertEquals } from '../deps.js'
import { loadBot } from '../mod.js'

Deno.test({
  name: '[application] Get application info',
  ignore: process.env.TEST_ENV === 'UNIT',
  async fn(t) {
    const bot = loadBot()
    const application = await bot.helpers.getApplicationInfo()
    assertEquals(application.id, bot.id)
  }
})
