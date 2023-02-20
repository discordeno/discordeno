import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { describe, it } from 'mocha'
import { e2ecache, rest } from './utils.js'
chai.use(chaiAsPromised)

// THIS IS WOLF, IF ANYTHING BREAKS BLAME HIM!
const wolfID = 270273690074087427n
// THIS IS IAN, HE PLAY GOLDEN SUN. BAN HIM BEFORE HE MAKES US ADDICTED TO IT!!!
const ianID = 90339695967350784n
// THIS IS LTS, HE PLAY TETRIS EFFECT: CONNECTED. BAN HIM BEFORE HE MAKES US ADDICTED TO IT!!!
const ltsID = 379643682984296448n

before(async () => {
  if (!e2ecache.guild) {
    e2ecache.guild = await rest.createGuild({
      name: 'Discordeno-test',
    })
  }
})

after(async () => {
  if (rest.invalidBucket.timeoutId) clearTimeout(rest.invalidBucket.timeoutId)
  if (e2ecache.guild.id && !e2ecache.deletedGuild) {
    e2ecache.deletedGuild = true;
    await rest.deleteGuild(e2ecache.guild.id)
  }
})

describe('[member] Member tests', async () => {
  describe('Get members', () => {
    it("Fetches the bot and compares the bot's id with the fetched member's id", async () => {
      const member = await rest.getMember(e2ecache.communityGuildId, rest.applicationId)
      expect(member?.user.id).to.exist
      expect(member?.user.id).to.equal(rest.applicationId.toString())
    })

    it('Gets a member list and checks if the bot is in the member list', async () => {
      const members = await rest.getMembers(e2ecache.communityGuildId, {
        limit: 10
      })
      expect(members.some(m => m.user.id === rest.applicationId.toString())).to.equal(true)
    })

    // fetch a single member by id
    it('fetch a single member by id', async () => {
      const member = await rest.getMember(e2ecache.communityGuildId, rest.applicationId)

      expect(member?.user.id).to.exist
    })
  })

  describe('Ban member', () => {
    // ban user from guild without reason
    describe('ban user from guild without reason', async () => {
      await rest.banMember(e2ecache.communityGuildId, wolfID)

      // get a single user's ban
      it("get a single user's ban", async () => {
        expect(await rest.getBan(e2ecache.communityGuildId, wolfID)).to.exist
      })
    })

    // ban member from guild with a reason
    it('ban member from guild with a reason', async () => {
      await rest.banMember(e2ecache.communityGuildId, ianID, {
        reason: 'Blame Wolf'
      })
      expect(await rest.getBan(e2ecache.communityGuildId, ianID)).to.exist
    })

    // ban member from guild and delete messages
    it('ban member from guild and delete messages', async () => {
      await rest.banMember(e2ecache.communityGuildId, ltsID, {
        deleteMessageSeconds: 604800
      })
      expect(await rest.getBan(e2ecache.communityGuildId, ltsID)).to.exist
    })

    // get bans on a server
    it('get bans on a server', async () => {
      const bans = await rest.getBans(e2ecache.communityGuildId)
      expect(bans.length).to.greaterThan(1)
    })

    // unban member from guild
    it('unban member from guild', async () => {
      await Promise.all([
        rest.unbanMember(e2ecache.communityGuildId, wolfID),
        rest.unbanMember(e2ecache.communityGuildId, ianID)
      ])

      await expect(rest.getBan(e2ecache.communityGuildId, wolfID)).to.eventually
        .rejected
    })
  })

  describe('nickname', () => {
    it("Edit a bot's nickname", async () => {
      const nick = 'lts20050703'
      const member = await rest.editBotMember(e2ecache.communityGuildId, {
        nick
      })
      expect(member.nick).to.equal(nick)

      // Change nickname back
      const member2 = await rest.editBotMember(e2ecache.communityGuildId, {
        nick: null
      })
      expect(member2.nick).to.null
    })
  })

  // waiting for channel
  describe.skip('DM', () => {
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
