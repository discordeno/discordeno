import { use as chaiUse, expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { describe } from 'mocha'
import { e2eCache, rest } from './utils.js'

chaiUse(chaiAsPromised)

describe('Typings', () => {
  it('Trigger Typing Indication', async () => {
    await rest.triggerTypingIndicator(e2eCache.channel.id)
  })
})

describe('Commands', () => {
  it('Upsert global commands', async () => {
    await rest.upsertGlobalApplicationCommands([
      {
        name: 'ping',
        description: 'Ping the bot',
      },
    ])

    const cmds = await rest.getGlobalApplicationCommands()
    const created = cmds.find((cmd) => cmd.name === 'ping' && cmd.description === 'Ping the bot')
    expect(!!created?.id).to.be.true

    const made = await rest.getGlobalApplicationCommand(created!.id)
    expect(created?.name).to.be.equal(made.name)
    expect(created?.description).to.be.equal(made.description)

    const edited = await rest.editGlobalApplicationCommand(created!.id, { name: 'pong', description: 'edited description' })
    expect(edited.name).to.be.equal('pong')
    expect(edited.name).to.not.be.equal(made.name)
    expect(edited.description).to.be.equal('edited description')
    expect(edited.description).to.not.be.equal(made.description)

    await rest.deleteGlobalApplicationCommand(created!.id)

    await expect(rest.getGlobalApplicationCommand(created!.id)).to.eventually.be.rejected
  })
})
