import { expect } from 'chai'
import { afterEach, beforeEach, describe, it } from 'mocha'
import sinon from 'sinon'
import { delay } from '../src/utils.js'
import { formatImageUrl } from '../src/images.js'

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

it('[utils] format image url', () => {
  expect(formatImageUrl('https://skillz.is.pro')).to.be.equal('https://skillz.is.pro.jpg?size=128')
  expect(formatImageUrl('https://skillz.is.pro', 1024)).to.be.equal('https://skillz.is.pro.jpg?size=1024')
  expect(formatImageUrl('https://skillz.is.pro', 1024, 'gif')).to.be.equal('https://skillz.is.pro.gif?size=1024')
  expect(formatImageUrl('https://skillz.is.pro', undefined, 'gif')).to.be.equal('https://skillz.is.pro.gif?size=128')
})
