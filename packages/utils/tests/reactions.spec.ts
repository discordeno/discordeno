import { expect } from 'chai'
import { describe, it } from 'mocha'
import { processReactionString } from '../src/reactions.js'

describe('Reactions', () => {
  it('Convert a unicode emoji to discord form', () => {
    const reaction = processReactionString('😄')
    expect(reaction).to.be.equal('😄')
  })

  it('Convert a custom emoji to discord form', () => {
    const reaction = processReactionString('<:discordeno:785403373817823272>')
    expect(reaction).to.be.equal('discordeno:785403373817823272')
  })

  it('Convert an animated custom emoji to discord form', () => {
    const reaction = processReactionString('<a:discordeno:785403373817823272>')
    expect(reaction).to.be.equal('discordeno:785403373817823272')
  })
})
