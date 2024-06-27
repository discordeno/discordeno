import { use as chaiUse, expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { describe, it } from 'mocha'
import { e2eCache, rest } from './utils.js'
chaiUse(chaiAsPromised)

before(async () => {
  if (!e2eCache.guild) {
    e2eCache.guild = await rest.createGuild({
      name: 'Discordeno-test',
    })
  }
})

after(async () => {
  if (e2eCache.guild.id && !e2eCache.deletedGuild) {
    e2eCache.deletedGuild = true
    await rest.deleteGuild(e2eCache.guild.id)
  }
})

describe('Member tests', () => {
  it("Fetches the bot and compares the bot's id with the fetched member's id", async () => {
    const member = await rest.getMember(e2eCache.communityGuildId, rest.applicationId)
    expect(member?.user.id).to.exist
    expect(member?.user.id).to.equal(rest.applicationId.toString())
  })

  it('Gets a member list and checks if the bot is in the member list', async () => {
    const members = await rest.getMembers(e2eCache.communityGuildId, {
      limit: 10,
    })
    expect(members.some((m) => m.user.id === rest.applicationId.toString())).to.equal(true)
  })

  // fetch a single member by id
  it('Fetch a single member by id', async () => {
    const member = await rest.getMember(e2eCache.communityGuildId, rest.applicationId)

    expect(member?.user.id).to.exist
  })

  it("Edit a bot's nickname", async () => {
    const nick = 'lts20050703'
    const member = await rest.editBotMember(e2eCache.communityGuildId, {
      nick,
    })
    expect(member.nick).to.equal(nick)

    // Change nickname back
    const member2 = await rest.editBotMember(e2eCache.communityGuildId, {
      nick: null,
    })
    expect(member2.nick).to.null
  })

  it('Send a direct message', async () => {
    // DM test only on dd unit testing bot
    if (rest.applicationId.toString() !== '770381961553510451') return
    // Itoh Alt ID
    const channel = await rest.getDmChannel(750661528360845322n)
    expect(channel?.id).to.exist

    const message = await rest.sendMessage(channel.id, {
      content: 'https://i.imgur.com/doG55NR.png',
    })
    expect(message?.content).to.exist
  })
})
