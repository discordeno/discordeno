import { ChannelTypes } from '@discordeno/types'
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

describe('Manage Guilds', async () => {
  it('Create and delete a guild', async () => {
    const guild = await rest.createGuild({
      name: 'Discordeno-test',
    })
    expect(e2eCache.guild.id).to.be.exist
    await rest.deleteGuild(guild.id)
    // Make sure the guild was deleted
    const deleted = await rest.getGuild(guild.id).catch(() => undefined)
    expect(deleted).to.be.equal(undefined)
  })

  it('Get a guild', async () => {
    const exists = await rest.getGuild(e2eCache.guild.id)
    expect(exists).to.be.exist
    expect(exists.id).to.be.exist
    expect(exists.name).to.equal(e2eCache.guild.name)
  })

  it('AFK channel', async () => {
    const voiceChannel = await rest.createChannel(e2eCache.guild.id, {
      name: 'edit-guild-test',
      type: ChannelTypes.GuildVoice,
    })
    expect(voiceChannel.id).to.be.exist

    const edited = await rest.editGuild(e2eCache.guild.id, {
      name: 'Discordeno-test-edited',
      afkChannelId: voiceChannel.id,
      // afkTimeout: 5,
    })
    expect(edited.name).to.equal('Discordeno-test-edited')
    expect(e2eCache.guild.afkChannelId).to.not.equal(voiceChannel.id)
    expect(edited.afkChannelId).to.equal(voiceChannel.id)
    // expect(guild.afkTimeout).to.equal(0);
    // expect(edited.afkTimeout).to.equal(5);

    const edited2 = await rest.editGuild(e2eCache.guild.id, { afkChannelId: null })
    expect(edited.afkChannelId).to.not.equal(edited2.afkChannelId)
    // Use boolean to check both undefined or null
    expect(!!edited2.afkChannelId).to.equal(false)

    await rest.deleteChannel(voiceChannel.id)
  })

  // it("Edit a guild's afk settings", async () => {

  // });

  it('Get audit logs', async () => {
    const auditLogs = await rest.getAuditLog(e2eCache.guild.id, { limit: 1 })
    expect(auditLogs.auditLogEntries.length).to.be.exist
  })

  // Get available voice regions
  it('Get available voice regions', async () => {
    const regions = await rest.getVoiceRegions(e2eCache.guild.id)
    expect(regions.length).to.be.exist
  })

  it('Banning members', async () => {
    await rest.banMember(
      e2eCache.guild.id,
      '379643682984296448',
      {
        deleteMessageSeconds: 604800,
      },
      'Blame Wolf',
    )
    const fetchedBan = await rest.getBan(e2eCache.guild.id, '379643682984296448')

    // Assertions
    expect(fetchedBan).to.be.exist
    expect(fetchedBan.user.id).to.equal('379643682984296448')

    await rest.banMember(e2eCache.guild.id, '416477607966670869')
    const fetchedBans = await rest.getBans(e2eCache.guild.id)

    // Assertions
    expect(fetchedBans).to.be.exist
    expect(fetchedBans.length).to.greaterThanOrEqual(2)

    await rest.unbanMember(e2eCache.guild.id, '416477607966670869')
    await rest.unbanMember(e2eCache.guild.id, '379643682984296448')

    const unbanned = await rest.getBans(e2eCache.guild.id)
    expect(unbanned.length).to.equal(0)
  })

  // Get vanity URL
  it('Get vanity URL', async () => {
    await expect(rest.getVanityUrl(e2eCache.guild.id)).to.eventually.rejected
  })

  // Get a welcome screen
  // it('Get welcome screen', async () => {
  //   const screen = await rest.getWelcomeScreen(e2ecache.guild.id)
  //   await rest.editWelcomeScreen(e2ecache.guild.id, {
  //     enabled: true,
  //     description: 'some description',
  //   })

  // })
})
