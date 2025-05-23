import { expect } from 'chai'
import { afterEach, beforeEach, describe, it } from 'mocha'
import sinon from 'sinon'
import { delay, hasProperty, jsonSafeReplacer } from '../src/utils.js'

describe('utils.ts', () => {
  let clock: sinon.SinonFakeTimers

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    sinon.restore()
    clock.restore()
  })

  describe('jsonSafe function', () => {
    it('will convert records to `JSON.stringify`-serializable', () => {
      // Example from issue#4196: https://github.com/discordeno/discordeno/issues/4196.
      const value = { limit: 0, userIds: [0n, 0n, 0n] }
      const expected = { limit: 0, userIds: ['0', '0', '0'] }
      expect(JSON.stringify(value, jsonSafeReplacer)).equal(JSON.stringify(expected))
    })
  })

  describe('delay function', () => {
    it('will delay/sleep for given time', async () => {
      let delayEnded = false
      delay(31).then(() => {
        delayEnded = true
      })
      expect(delayEnded).to.be.false
      await clock.tickAsync(30)
      expect(delayEnded).to.be.false
      await clock.tickAsync(31)
      expect(delayEnded).to.be.true
    })
  })

  describe('hasProperty funciton', async () => {
    const obj = { prop: 'lts372005' }

    it('will return true if it does have property', () => {
      expect(hasProperty(obj, 'prop')).equal(true)
    })

    it('will return false if it does not have property', () => {
      expect(hasProperty(obj, 'lts372005')).equal(false)
    })
  })
})
