import { calculateBits } from '@discordeno/utils'
import { expect } from 'chai'
import { before, describe, it } from 'mocha'
import { e2eCache, rest } from './utils.js'

before(async () => {
  if (!e2eCache.guild) {
    e2eCache.guild = await rest.createGuild({
      name: 'Discordeno-test',
    })
  }
})

after(async () => {
  if (e2eCache.guild.id && !e2eCache.deletedGuild) {
    await rest.deleteGuild(e2eCache.guild.id)
  }
})

describe('Role tests', async () => {
  // Create a role with a reason
  it('Create a role with a reason', async () => {
    const role = await rest.createRole(
      e2eCache.guild?.id,
      {
        name: `test role ${Date.now()}`,
      },
      'test reason',
    )
    expect(role.id).to.exist
  })

  // Create a role without a reason
  it('Create a role without a reason', async () => {
    const role = await rest.createRole(e2eCache.guild.id, {
      name: `test role ${Date.now()}`,
    })
    expect(role.id).to.exist
  })

  // Delete a role
  it('Delete a role', async () => {
    const role = await rest.createRole(e2eCache.guild.id, {
      name: `test role ${Date.now()}`,
    })
    await rest.deleteRole(e2eCache.guild.id, role.id)
    const deletedRoles = await rest.getRoles(e2eCache.guild.id)
    expect(deletedRoles.some((r) => r.id === role.id)).to.equal(false)
  })

  // Edit a role
  it('Edit a role', async () => {
    const role = await rest.createRole(e2eCache.guild.id, {
      name: `test role ${Date.now()}`,
    })

    const edited = await rest.editRole(e2eCache.guild.id, role.id, {
      name: 'test role 4',
      color: 0x0000ff,
      hoist: true,
      mentionable: true,
      permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    })
    expect(edited.name).to.equal('test role 4')
    expect(edited.color).to.equal(0x0000ff)
    expect(edited.hoist).to.equal(true)
    expect(edited.mentionable).to.equal(true)
    expect(edited.permissions.toString()).to.equal(calculateBits(['SEND_MESSAGES', 'VIEW_CHANNEL']))

    await rest.editRole(e2eCache.guild.id, role.id, {
      hoist: false,
      mentionable: false,
    })
    const roles = await rest.getRoles(e2eCache.guild.id)
    const unedited = roles.find((r) => r.id === role.id)

    expect(unedited?.hoist).to.equal(false)
    expect(unedited?.mentionable).to.equal(false)
  })

  it('Add and remove role from user', async () => {
    const role = await rest.createRole(e2eCache.guild.id, {
      name: `test role ${Date.now()}`,
    })

    // Assign the role to the user
    await rest.addRole(e2eCache.guild.id, rest.applicationId, role.id)
    const member = await rest.getMember(e2eCache.guild.id, rest.applicationId)
    expect(member?.roles.includes(role.id)).to.equal(true)

    await rest.removeRole(e2eCache.guild.id, rest.applicationId, role.id)
    const removed = await rest.getMember(e2eCache.guild.id, rest.applicationId)
    // console.log('member', member.errors.userId.Errors)
    expect(removed?.roles.includes(role.id)).to.equal(false)

    // With a reason
    await rest.addRole(e2eCache.guild.id, rest.applicationId, role.id, 'test reason')
    const member2 = await rest.getMember(e2eCache.guild.id, rest.applicationId)
    expect(member2?.roles.includes(role.id)).to.equal(true)

    await rest.removeRole(e2eCache.guild.id, rest.applicationId, role.id, 'test reason')
    const member3 = await rest.getMember(e2eCache.guild.id, rest.applicationId)
    expect(member3?.roles.includes(role.id)).to.equal(false)
  })
})
