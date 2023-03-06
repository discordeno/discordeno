import { expect } from 'chai'
import { afterEach, beforeEach, describe, it } from 'mocha'
import sinon from 'sinon'
import { delay, hasProperty } from '../src/utils.js'

describe('utils.ts', () => {
  let clock: sinon.SinonFakeTimers

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    sinon.restore()
    clock.restore()
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
