import { expect } from 'chai'
import { afterEach, beforeEach, describe, it } from 'mocha'
import sinon from 'sinon'
import { delay, formatImageURL } from '../src/utils.js'
let hasProperty: any

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

const obj = { prop: 'lts372005' }

it.skip('[utils] hasProperty does HAVE property', () => {
  expect(hasProperty(obj, 'prop')).to.be.equal(true)
})

it.skip('[utils] hasProperty does NOT HAVE property', () => {
  expect(hasProperty(obj, 'lts372005')).to.be.equal(false)
})

it('[utils] format image url', () => {
  expect(formatImageURL('https://skillz.is.pro')).to.be.equal('https://skillz.is.pro.jpg?size=128')
  expect(formatImageURL('https://skillz.is.pro', 1024)).to.be.equal('https://skillz.is.pro.jpg?size=1024')
  expect(formatImageURL('https://skillz.is.pro', 1024, 'gif')).to.be.equal('https://skillz.is.pro.gif?size=1024')
  expect(formatImageURL('https://skillz.is.pro', undefined, 'gif')).to.be.equal('https://skillz.is.pro.gif?size=128')
})
