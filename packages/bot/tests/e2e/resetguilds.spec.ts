import { delay } from '@discordeno/utils'
import { use as chaiUse } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { describe, it } from 'mocha'
import { createBot } from '../../src/bot.js'
import { token } from './constants.js'
chaiUse(chaiAsPromised)

describe('[Bot] Can start and stop the bot', () => {
  it('Start and stop the bot', async () => {
    const bot = createBot({
      token,
    })

    await bot.start()

    await delay(5000)

    await bot.shutdown()
  })
})
