import { expect } from 'chai'
import sinon from 'sinon'
import { delay } from '../src/utils.js'

describe('utils.ts', () => {
  let clock: sinon.SinonFakeTimers

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    sinon.restore()
    clock.restore()
  })

  it('will', async () => {
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
