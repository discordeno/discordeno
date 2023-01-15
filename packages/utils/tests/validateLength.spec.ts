import { expect } from 'chai'
import { describe, it } from 'mocha'
// import { validateLength } from '../src/validateLength.js'
let validateLength

describe.skip(' ', () => {
  it('[utils] Validate length is too low', () => {
    expect(validateLength('test', { min: 5 })).to.be.equal(false)
  })

  it('[utils] Validate length is too high', () => {
    expect(validateLength('test', { max: 3 })).to.be.equal(false)
  })

  it('[utils] Validate length is NOT just right in between.', () => {
    expect(validateLength('test', { min: 5, max: 3 })).to.be.equal(false)
  })

  it('[utils] Validate length is NOT too low', () => {
    expect(validateLength('test', { min: 3 })).to.be.equal(true)
  })

  it('[utils] Validate length is NOT too high', () => {
    expect(validateLength('test', { max: 5 })).to.be.equal(true)
  })

  it('[utils] Validate length is just right in between.', () => {
    expect(validateLength('test', { min: 3, max: 6 })).to.be.equal(true)
  })
})
