import type { Camelize, DiscordRole } from '@discordeno/types'
import { calculateBits } from '@discordeno/utils'
import { expect } from 'chai'
import { afterEach, before, beforeEach, describe, it } from 'mocha'
import { e2ecache, rest } from './utils.js'

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
    await rest.deleteGuild(e2ecache.guild.id)
  }
})

describe('[role] Role tests', async () => {
  // Create a role with a reason
  it('Create a role with a reason', async () => {
    const role = await rest.createRole(
      e2ecache.guild?.id,
      {
        name: `test role ${Date.now()}`,
      },
      'test reason',
    )

    expect(role.id).to.exist

    await rest.deleteRole(e2ecache.guild.id, role.id)
  })

  // Create a role without a reason
  it('Create a role without a reason', async () => {
    const role = await rest.createRole(e2ecache.guild.id, {
      name: `test role ${Date.now()}`,
    })

    expect(role.id).to.exist

    await rest.deleteRole(e2ecache.guild.id, role.id)
  })

  // Delete a role
  it('Delete a role', async () => {
    const role = await rest.createRole(e2ecache.guild.id, {
      name: `test role ${Date.now()}`,
    })
    await rest.deleteRole(e2ecache.guild.id, role.id)
    const deletedRoles = await rest.getRoles(e2ecache.guild.id)
    expect(deletedRoles.some((r) => r.id === role.id)).to.equal(false)
  })

  // Edit a role
  describe('Edit a role', async () => {
    let role: Camelize<DiscordRole>

    beforeEach(async () => {
      role = await rest.createRole(e2ecache.guild.id, {
        name: `test role ${Date.now()}`,
      })
    })

    afterEach(async () => {
      await rest.deleteRole(e2ecache.guild.id, role.id)
    })

    // Edit the roles name
    it('Edit the roles name', async () => {
      const edited = await rest.editRole(e2ecache.guild.id, role.id, {
        name: 'test role 4',
      })
      expect(edited.name).to.equal('test role 4')
    })

    // Edit the roles color
    it('Edit the roles color', async () => {
      const edited = await rest.editRole(e2ecache.guild.id, role.id, {
        color: 0x0000ff,
      })
      expect(edited.color).to.equal(0x0000ff)
    })

    // Edit the roles hoist
    it('Edit the roles hoist', async () => {
      expect(role.hoist).to.equal(false)
      const edited = await rest.editRole(e2ecache.guild.id, role.id, {
        hoist: true,
      })
      expect(edited.hoist).to.equal(true)
    })

    // Make hoist false
    it('Make hoist false', async () => {
      await rest.editRole(e2ecache.guild.id, role.id, { hoist: true })

      const edited = await rest.editRole(e2ecache.guild.id, role.id, {
        hoist: false,
      })
      expect(edited.hoist).to.equal(false)
    })

    // Edit the roles mentionable
    it('Edit the roles mentionable', async () => {
      const edited = await rest.editRole(e2ecache.guild.id, role.id, {
        mentionable: true,
      })
      expect(edited.mentionable).to.equal(true)
    })

    // Make mentionable false
    it('Make mentionable false', async () => {
      await rest.editRole(e2ecache.guild.id, role.id, {
        mentionable: true,
      })
      const edited = await rest.editRole(e2ecache.guild.id, role.id, {
        mentionable: false,
      })
      expect(edited.mentionable).to.equal(false)
    })

    // Edit the roles permissions
    it('Edit the roles permissions', async () => {
      const edited = await rest.editRole(e2ecache.guild.id, role.id, {
        permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
      })
      expect(edited.permissions.toString()).to.equal(calculateBits(['SEND_MESSAGES', 'VIEW_CHANNEL']))
    })
  })

  describe('Remove a role from a user', async () => {
    let role: Camelize<DiscordRole>

    beforeEach(async () => {
      role = await rest.createRole(e2ecache.guild.id, {
        name: `test role ${Date.now()}`,
      })
      await rest.addRole(e2ecache.guild.id, rest.applicationId, role.id)
    })

    // afterEach(async () => {
    //   await rest.deleteRole(e2ecache.guild.id, role.id)
    // })

    it('without a reason', async () => {
      await rest.removeRole(e2ecache.guild.id, rest.applicationId, role.id)
      const member = await rest.getMember(e2ecache.guild.id, rest.applicationId)
      // console.log('member', member.errors.userId.Errors)
      expect(member?.roles.includes(role.id)).to.equal(false)
    })

    it('with a reason', async () => {
      await rest.removeRole(e2ecache.guild.id, rest.applicationId, role.id, 'test reason')
      const member = await rest.getMember(e2ecache.guild.id, rest.applicationId)
      expect(member?.roles.includes(role.id)).to.equal(false)
    })
  })

  describe('Assign a role to a user', async () => {
    let role: Camelize<DiscordRole>

    beforeEach(async () => {
      role = await rest.createRole(e2ecache.guild.id, {
        name: `test role ${Date.now()}`,
      })
    })

    afterEach(async () => {
      await rest.removeRole(e2ecache.guild.id, rest.applicationId, role.id)
      await rest.deleteRole(e2ecache.guild.id, role.id)
    })

    it('Without a reason.', async () => {
      // Assign the role to the user
      await rest.addRole(e2ecache.guild.id, rest.applicationId, role.id)
      const member = await rest.getMember(e2ecache.guild.id, rest.applicationId)
      expect(member?.roles.includes(role.id)).to.equal(true)
    })

    // Add the role to the user with a reason
    it('With a reason', async () => {
      await rest.addRole(e2ecache.guild.id, rest.applicationId, role.id, 'test reason')
      const member = await rest.getMember(e2ecache.guild.id, rest.applicationId)
      expect(member?.roles.includes(role.id)).to.equal(true)
    })
  })
})
