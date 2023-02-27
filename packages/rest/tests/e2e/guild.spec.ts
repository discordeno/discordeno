import { ChannelTypes } from '@discordeno/types'
import { logger } from '@discordeno/utils'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { after, describe, it } from 'mocha'
import { rest } from './utils.js'
chai.use(chaiAsPromised)

describe('Guild helpers', async () => {
  // Delete the oldest guild(most likely to have finished tests).

  it('Create and delete a guild', async () => {
    const guild = await rest.createGuild({
      name: 'Discordeno-test',
    })
    expect(guild.id).to.be.exist
    await rest.deleteGuild(guild.id)
    // Make sure the guild was deleted
    await expect(rest.getGuild(guild.id)).to.eventually.rejected
  })

  describe('Edit and get', async () => {
    const guild = await rest.createGuild({
      name: 'Discordeno-test',
    })

    after(async () => {
      await rest.deleteGuild(guild.id)
    })

    it('Get a guild', async () => {
      const exists = await rest.getGuild(guild.id)
      expect(exists).to.be.exist
      expect(exists.id).to.be.exist
      expect(exists.name).to.equal(guild.name)
    })

    it('Edit a guild', async () => {
      const voiceChannel = await rest.createChannel(guild.id, {
        name: 'edit-guild-test',
        type: ChannelTypes.GuildVoice,
      })
      expect(voiceChannel.id).to.be.exist

      const edited = await rest.editGuild(guild.id, {
        name: 'Discordeno-test-edited',
        afkChannelId: voiceChannel.id,
        // afkTimeout: 5,
      })
      expect(edited.name).to.equal('Discordeno-test-edited')
      expect(guild.afkChannelId).to.not.equal(voiceChannel.id)
      expect(edited.afkChannelId).to.equal(voiceChannel.id)
      // expect(guild.afkTimeout).to.equal(0);
      // expect(edited.afkTimeout).to.equal(5);

      it("Reset a guild's afk channel id", async () => {
        const edited2 = await rest.editGuild(guild.id, { afkChannelId: null })
        expect(edited.afkChannelId).to.not.equal(edited2.afkChannelId)
        expect(edited2.afkChannelId).to.equal(undefined)
      })

      await rest.deleteChannel(voiceChannel.id)
    })

    // it("Edit a guild's afk settings", async () => {

    // });

    it('Get audit logs', async () => {
      const auditLogs = await rest.getAuditLog(guild.id, { limit: 1 })
      expect(auditLogs.auditLogEntries.length).to.be.exist
    })

    // Get available voice regions
    it('Get available voice regions', async () => {
      const regions = await rest.getVoiceRegions(guild.id)
      expect(regions.length).to.be.exist
    })

    // Get a guild ban
    it('Get a guild ban', async () => {
      await rest.banMember(guild.id, 379643682984296448n)

      const fetchedBan = await rest.getBan(guild.id, 379643682984296448n)

      // Assertions
      expect(fetchedBan).to.be.exist
      expect(fetchedBan.user.id).to.equal('379643682984296448')

      // Get multiple guild bans
      it('Get multiple guild bans', async () => {
        await rest.banMember(guild.id, 416477607966670869n)
        await rest.banMember(guild.id, 635383782576357407n)

        const fetchedBans = await rest.getBans(guild.id)

        // Assertions
        expect(fetchedBans).to.be.exist
      })
    })

    // Get vanity URL
    it('Get vanity URL', async () => {
      await expect(rest.getVanityUrl(guild.id)).to.eventually.rejected
    })
  })
})
