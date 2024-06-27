import { expect } from 'chai'
import { describe, it } from 'mocha'
import { iconBigintToHash, iconHashToBigInt } from '../src/hash.js'

const iconHash = '4bbb271a13f7195031adcc06a2d867ce'
const iconBigInt = 3843769888406823508519992434416504301518n
const a_iconHash = 'a_4bbb271a13f7195031adcc06a2d867ce'
const a_iconBigInt = 3503487521485885045056617826984736090062n

describe('hash.ts', () => {
  it('[utils] icon hash to bigint', () => {
    expect(iconHashToBigInt(iconHash)).to.be.equal(iconBigInt)
  })

  it('[utils] icon bigint to hash', () => {
    expect(iconBigintToHash(iconBigInt)).to.be.equal(iconHash)
  })

  it('[utils] icon hash to bigint a_ (animated)', () => {
    expect(iconHashToBigInt(a_iconHash)).to.be.equal(a_iconBigInt)
  })

  it('[utils] icon bigint to hash a_ (animated)', () => {
    expect(iconBigintToHash(a_iconBigInt)).to.be.equal(a_iconHash)
  })
})
