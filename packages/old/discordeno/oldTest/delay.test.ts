import { delay } from '../mod.js'
import { assertEquals } from './deps.js'

Deno.test({
  name: '[utils] delay 2000 ms',
  ignore: process.env.TEST_ENV === 'INTEGRATION',
  async fn(t) {
    const before = Date.now()
    await delay(2000)
    const after = Date.now()
    assertEquals(after - before >= 2000, true)
  }
})
