import { expect } from 'chai'
import { describe, it } from 'mocha'
// import { bigintToSnowflake, snowflakeToBigint } from '../src/bigint.js'
let bigintToSnowflake, snowflakeToBigint

describe.skip('bigint.ts', () => {
  it('[bigint] - Transform a snowflake string to bigint', () => {
    const text = '130136895395987456'
    const big = 130136895395987456n
    const result = snowflakeToBigint(text)

    expect(big).to.be.equal(result)
    expect(text).to.be.not.equal(result)
  })

  it('[bigint] - Transform a bigint to a string', () => {
    const text = '130136895395987456'
    const big = 130136895395987456n
    const result = bigintToSnowflake(big)

    expect(text).to.be.equal(result)
    expect(big).to.be.not.equal(result)
  })
})
