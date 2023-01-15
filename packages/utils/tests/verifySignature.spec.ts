import { expect } from 'chai'
import { afterEach, beforeEach, describe, it } from 'mocha'
import { Buffer } from 'node:buffer'
import Sinon from 'sinon'
import nacl from 'tweetnacl'
// import { verifySignature } from '../src/verifySignature.js'
let verifySignature

describe.skip('verifySignature.ts', () => {
  let publicKey: Uint8Array
  let secretKey: Uint8Array
  let clock: Sinon.SinonFakeTimers

  beforeEach(() => {
    clock = Sinon.useFakeTimers()
    ;({ publicKey, secretKey } = nacl.sign.keyPair())
  })

  afterEach(() => {
    Sinon.restore()
    clock.restore()
  })

  it('reutrn true if signature is verified', () => {
    const timestamp = Date.now().toString()
    const body = 'test body'
    const signature = nacl.sign.detached(Buffer.from(timestamp + body), secretKey)

    const verifiedSignature = verifySignature({
      publicKey: Buffer.from(publicKey).toString('hex'),
      signature: Buffer.from(signature).toString('hex'),
      timestamp,
      body,
    })

    expect(verifiedSignature.body).equal(body)
    expect(verifiedSignature.isValid).true
  })
})
