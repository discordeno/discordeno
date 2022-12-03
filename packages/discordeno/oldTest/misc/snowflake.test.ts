import { assertEquals } from '../deps.js'
import { loadBot } from '../mod.js'

Deno.test({
  name: '[tranform] snowflake to bigint',
  ignore: process.env.TEST_ENV === 'UNIT',
  async fn(t) {
    const bot = loadBot()
    assertEquals(130136895395987456n, bot.transformers.snowflake('130136895395987456'))
  }
})
