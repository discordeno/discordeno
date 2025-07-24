import { ChannelTypes } from '@discordeno/types'
import { use as chaiUse, expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { describe, it } from 'mocha'
import { e2eCache, rest } from './utils.js'

chaiUse(chaiAsPromised)

describe('Manage Guilds', async () => {
  it('Get a guild', async () => {
    const exists = await rest.getGuild(e2eCache.guildId)
    expect(exists).to.be.exist
    expect(exists.id).to.be.exist
    expect(exists.name).to.equal(e2eCache.guild.name)
  })

  it('AFK channel', async () => {
    // Prepare the AFK channel
    const voiceChannel = await rest.createChannel(e2eCache.guild.id, {
      name: 'e2e-afk-channel',
      type: ChannelTypes.GuildVoice,
    })
    expect(voiceChannel.id).to.be.exist

    // Set the AFK channel
    const edited = await rest.editGuild(e2eCache.guild.id, {
      afkChannelId: voiceChannel.id,
    })

    expect(e2eCache.guild.afkChannelId).to.not.equal(voiceChannel.id)
    expect(edited.afkChannelId).to.equal(voiceChannel.id)
    expect(edited.afkChannelId).to.not.be.null

    // Reset the AFK channel
    const edited2 = await rest.editGuild(e2eCache.guild.id, { afkChannelId: null })
    expect(edited2.afkChannelId).to.be.null

    // Clean up the AFK channel
    await rest.deleteChannel(voiceChannel.id)
  })

  it('Get audit logs', async () => {
    const auditLogs = await rest.getAuditLog(e2eCache.guild.id, { limit: 1 })
    expect(auditLogs.auditLogEntries).to.have.lengthOf(1)
  })

  // Get available voice regions
  it('Get available voice regions', async () => {
    const regions = await rest.getVoiceRegions(e2eCache.guild.id)
    expect(regions).to.have.length.greaterThan(0)
  })

  it('Banning members', async () => {
    // Ban members
    await rest.banMember(
      e2eCache.guild.id,
      '379643682984296448',
      {
        deleteMessageSeconds: 604800,
      },
      'Blame Wolf',
    )
    await rest.banMember(e2eCache.guild.id, '416477607966670869')

    const fetchedBan = await rest.getBan(e2eCache.guild.id, '379643682984296448')
    const fetchedBans = await rest.getBans(e2eCache.guild.id)

    // Assertions
    expect(fetchedBan).to.be.exist
    expect(fetchedBan.user.id).to.equal('379643682984296448')

    // Assertions
    expect(fetchedBans).to.be.exist
    expect(fetchedBans.length).to.greaterThanOrEqual(2)

    // Unban members
    await rest.unbanMember(e2eCache.guild.id, '416477607966670869')
    await rest.unbanMember(e2eCache.guild.id, '379643682984296448')

    const unbanned = await rest.getBans(e2eCache.guild.id)
    expect(unbanned.length).to.equal(0)
  })

  // Get vanity URL
  it('Get vanity URL', async () => {
    if (!e2eCache.guild.vanityUrlCode) {
      await expect(rest.getVanityUrl(e2eCache.guild.id)).to.eventually.rejected
      return
    }

    await expect(rest.getVanityUrl(e2eCache.guild.id)).to.eventually.fulfilled
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
