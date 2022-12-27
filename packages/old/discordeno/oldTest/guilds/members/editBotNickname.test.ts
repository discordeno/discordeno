import { assertEquals } from '../../deps.js'
import { loadBot } from '../../mod.js'
import { CACHED_COMMUNITY_GUILD_ID } from '../../utils.js'

Deno.test({
  name: "[misc] edit a bot's nickname",
  ignore: process.env.TEST_ENV === 'UNIT',
  async fn(t) {
    const bot = loadBot()

    const nick = 'lts20050703'
    const member = await bot.helpers.editBotMember(CACHED_COMMUNITY_GUILD_ID, { nick })
    assertEquals(member.nick, nick)

    // Change nickname back
    const member2 = await bot.helpers.editBotMember(CACHED_COMMUNITY_GUILD_ID, { nick: null })
    assertEquals(member2.nick, undefined)
  }
})
