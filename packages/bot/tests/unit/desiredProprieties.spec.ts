import { expect } from 'chai'
import { describe, it } from 'mocha'
import { createDesiredPropertiesObject } from '../../src/index.js'

describe('desired properties', () => {
  it('fills defaults', () => {
    const desired = createDesiredPropertiesObject({})

    expect(desired.channel.id).to.be.equal(false)
  })

  it('respects config', () => {
    const desired = createDesiredPropertiesObject({ channel: { id: true } })

    expect(desired.channel.id).to.be.equal(true)
    expect(desired.guild.id).to.be.equal(false)
  })

  it('can change default', () => {
    const desired = createDesiredPropertiesObject({}, true)

    expect(desired.channel.id).to.be.equal(true)
  })
})
