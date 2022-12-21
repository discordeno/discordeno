import type { DiscordRole } from '@discordeno/types'
import { calculateBits } from '@discordeno/utils'
import { expect } from 'chai'
import { describe } from 'mocha'
import { createRestManager } from '../../src/restManager.js'
import { CACHED_COMMUNITY_GUILD_ID, token } from './utils.js'

describe('[role] Role tests', async () => {
  const rest = createRestManager({
    token
  })

  // Create a role with a reason
  it('Create a role with a reason', async () => {
    const role = await rest.createRole(
      CACHED_COMMUNITY_GUILD_ID,
      {
        name: `test role ${Date.now()}`
      },
      'test reason'
    )

    expect(role.id).to.exist

    await rest.deleteRole(CACHED_COMMUNITY_GUILD_ID, role.id)
  })

  // Create a role without a reason
  it('Create a role without a reason', async () => {
    const role = await rest.createRole(CACHED_COMMUNITY_GUILD_ID, {
      name: `test role ${Date.now()}`
    })

    expect(role.id).to.exist

    await rest.deleteRole(CACHED_COMMUNITY_GUILD_ID, role.id)
  })

  // Delete a role
  it('Delete a role', async () => {
    const role = await rest.createRole(CACHED_COMMUNITY_GUILD_ID, {
      name: `test role ${Date.now()}`
    })
    await rest.deleteRole(CACHED_COMMUNITY_GUILD_ID, role.id)
    const deletedRoles = await rest.getRoles(CACHED_COMMUNITY_GUILD_ID)
    expect(deletedRoles.has(role.id)).to.equal(false)
  })

  // Edit a role
  describe('Edit a role', async () => {
    let role: DiscordRole

    beforeEach(async () => {
      role = await rest.createRole(CACHED_COMMUNITY_GUILD_ID, {
        name: `test role ${Date.now()}`
      })
    })

    afterEach(async () => {
      await rest.deleteRole(CACHED_COMMUNITY_GUILD_ID, role.id)
    })

    // Edit the roles name
    it('Edit the roles name', async () => {
      const edited = await rest.editRole(CACHED_COMMUNITY_GUILD_ID, role.id, {
        name: 'test role 4'
      })
      expect(edited.name).to.equal('test role 4')
    })

    // Edit the roles color
    it('Edit the roles color', async () => {
      const edited = await rest.editRole(CACHED_COMMUNITY_GUILD_ID, role.id, {
        color: 0x0000ff
      })
      expect(edited.color).to.equal(0x0000ff)
    })

    // Edit the roles hoist
    it('Edit the roles hoist', async () => {
      const edited = await rest.editRole(CACHED_COMMUNITY_GUILD_ID, role.id, {
        hoist: true
      })
      expect(edited.toggles.hoist).to.equal(true)
    })

    // Make hoist false
    it('Make hoist false', async () => {
      await rest.editRole(CACHED_COMMUNITY_GUILD_ID, role.id, { hoist: true })

      const edited = await rest.editRole(CACHED_COMMUNITY_GUILD_ID, role.id, {
        hoist: false
      })
      expect(edited.toggles.hoist).to.equal(false)
    })

    // Edit the roles mentionable
    it('Edit the roles mentionable', async () => {
      const edited = await rest.editRole(CACHED_COMMUNITY_GUILD_ID, role.id, {
        mentionable: true
      })
      expect(edited.toggles.mentionable).to.equal(true)
    })

    // Make mentionable false
    it('Make mentionable false', async () => {
      await rest.editRole(CACHED_COMMUNITY_GUILD_ID, role.id, {
        mentionable: true
      })
      const edited = await rest.editRole(CACHED_COMMUNITY_GUILD_ID, role.id, {
        mentionable: false
      })
      expect(edited.toggles.mentionable).to.equal(false)
    })

    // Edit the roles permissions
    it('Edit the roles permissions', async () => {
      const edited = await rest.editRole(CACHED_COMMUNITY_GUILD_ID, role.id, {
        permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL']
      })
      expect(edited.permissions.toString()).to.equal(
        calculateBits(['SEND_MESSAGES', 'VIEW_CHANNEL'])
      )
    })
  })

  describe('Remove a role from a user', async () => {
    let role: DiscordRole

    beforeEach(async () => {
      role = await rest.createRole(CACHED_COMMUNITY_GUILD_ID, {
        name: `test role ${Date.now()}`
      })
      await rest.addRole(
        CACHED_COMMUNITY_GUILD_ID,
        130136895395987456n,
        role.id
      )
    })

    afterEach(async () => {
      await rest.deleteRole(CACHED_COMMUNITY_GUILD_ID, role.id)
    })

    it('without a reason', async () => {
      await rest.removeRole(
        CACHED_COMMUNITY_GUILD_ID,
        130136895395987456n,
        role.id
      )
      const member = await rest.getMember(
        CACHED_COMMUNITY_GUILD_ID,
        130136895395987456n
      )
      expect(member?.roles.includes(role.id)).to.equal(false)
    })

    it('with a reason', async () => {
      await rest.removeRole(
        CACHED_COMMUNITY_GUILD_ID,
        130136895395987456n,
        role.id,
        'test reason'
      )
      const member = await rest.getMember(
        CACHED_COMMUNITY_GUILD_ID,
        130136895395987456n
      )
      expect(member?.roles.includes(role.id)).to.equal(false)
    })
  })

  describe('Assign a role to a user', async () => {
    let role: DiscordRole

    beforeEach(async () => {
      role = await rest.createRole(CACHED_COMMUNITY_GUILD_ID, {
        name: `test role ${Date.now()}`
      })
    })

    afterEach(async () => {
      await rest.removeRole(
        CACHED_COMMUNITY_GUILD_ID,
        130136895395987456n,
        role.id
      )
      await rest.deleteRole(CACHED_COMMUNITY_GUILD_ID, role.id)
    })

    it('Without a reason.', async () => {
      // Assign the role to the user
      await rest.addRole(
        CACHED_COMMUNITY_GUILD_ID,
        130136895395987456n,
        role.id
      )
      const member = await rest.getMember(
        CACHED_COMMUNITY_GUILD_ID,
        130136895395987456n
      )
      expect(member?.roles.includes(role.id)).to.equal(true)
    })

    // Add the role to the user with a reason
    it('With a reason', async () => {
      await rest.addRole(
        CACHED_COMMUNITY_GUILD_ID,
        130136895395987456n,
        role.id,
        'test reason'
      )
      const member = await rest.getMember(
        CACHED_COMMUNITY_GUILD_ID,
        130136895395987456n
      )
      expect(member?.roles.includes(role.id)).to.equal(true)
    })
  })
})
