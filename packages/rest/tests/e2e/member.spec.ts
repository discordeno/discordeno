import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { describe } from 'mocha'
import { createRestManager } from '../../src/restManager.js'
import { CACHED_COMMUNITY_GUILD_ID, token } from './utils.js'
chai.use(chaiAsPromised)

// THIS IS WOLF, IF ANYTHING BREAKS BLAME HIM!
const wolfID = 270273690074087427n
// THIS IS IAN, HE PLAY GOLDEN SUN. BAN HIM BEFORE HE MAKES US ADDICTED TO IT!!!
const ianID = 90339695967350784n
// THIS IS LTS, HE PLAY TETRIS EFFECT: CONNECTED. BAN HIM BEFORE HE MAKES US ADDICTED TO IT!!!
const ltsID = 379643682984296448n

describe('[member] Member tests', async () => {
  const rest = createRestManager({
    token
  })

  describe('Get members', () => {
    it("Fetches the bot and compares the bot's id with the fetched member's id", async () => {
      const member = await rest.getMember(CACHED_COMMUNITY_GUILD_ID, rest.id)
      expect(member?.user.id).to.exist
      expect(member?.user.id).to.equal(rest.id)
    })

    it('Gets a member list and checks if the bot is in the member list', async () => {
      const members = await rest.getMembers(CACHED_COMMUNITY_GUILD_ID, {
        limit: 10
      })
      expect(members.has(rest.id.toString())).to.equal(true)
    })

    // fetch a single member by id
    it('fetch a single member by id', async () => {
      const member = await rest.getMember(CACHED_COMMUNITY_GUILD_ID, rest.id)

      expect(member?.user.id).to.exist
    })
  })

  describe('Ban member', () => {
    // ban user from guild without reason
    describe('ban user from guild without reason', async () => {
      await rest.banMember(CACHED_COMMUNITY_GUILD_ID, wolfID)

      // get a single user's ban
      it("get a single user's ban", async () => {
        expect(await rest.getBan(CACHED_COMMUNITY_GUILD_ID, wolfID)).to.exist
      })
    })

    // ban member from guild with a reason
    it('ban member from guild with a reason', async () => {
      await rest.banMember(CACHED_COMMUNITY_GUILD_ID, ianID, {
        reason: 'Blame Wolf'
      })
      expect(await rest.getBan(CACHED_COMMUNITY_GUILD_ID, ianID)).to.exist
    })

    // ban member from guild and delete messages
    it('ban member from guild and delete messages', async () => {
      await rest.banMember(CACHED_COMMUNITY_GUILD_ID, ltsID, {
        deleteMessageSeconds: 604800
      })
      expect(await rest.getBan(CACHED_COMMUNITY_GUILD_ID, ltsID)).to.exist
    })

    // get bans on a server
    it('get bans on a server', async () => {
      const bans = await rest.getBans(CACHED_COMMUNITY_GUILD_ID)
      expect(bans.size).to.greaterThan(1)
    })

    // unban member from guild
    it('unban member from guild', async () => {
      await Promise.all([
        rest.unbanMember(CACHED_COMMUNITY_GUILD_ID, wolfID),
        rest.unbanMember(CACHED_COMMUNITY_GUILD_ID, ianID)
      ])

      await expect(rest.getBan(CACHED_COMMUNITY_GUILD_ID, wolfID)).to.eventually
        .rejected
    })
  })

  describe('nickname', () => {
    it("Edit a bot's nickname", async () => {
      const nick = 'lts20050703'
      const member = await rest.editBotMember(CACHED_COMMUNITY_GUILD_ID, {
        nick
      })
      expect(member.nick).to.equal(nick)

      // Change nickname back
      const member2 = await rest.editBotMember(CACHED_COMMUNITY_GUILD_ID, {
        nick: null
      })
      expect(member2.nick).to.equal(undefined)
    })
  })

  describe('DM', () => {
    it('[member] get dm channel and send a message', async () => {
      // Itoh Alt ID
      const channel = await rest.getDmChannel(750661528360845322n)
      expect(channel?.id).to.exist

      const message = await rest.sendMessage(channel.id, {
        content: 'https://i.imgur.com/doG55NR.png'
      })
      expect(message?.content).to.exist
    })
  })
})
