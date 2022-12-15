import { expect } from 'chai'
import type { KeyObject } from 'node:crypto'
import { generateKeyPairSync, sign } from 'node:crypto'
import Sinon from 'sinon'
import { verifySignature } from '../src/verifySignature.js'

describe('VerifySignature', () => {
  let publicKey: KeyObject
  let privateKey: KeyObject
  let clock: Sinon.SinonFakeTimers

  beforeEach(() => {
    clock = Sinon.useFakeTimers();

    ({ publicKey, privateKey } = generateKeyPairSync('ed25519'))
  })

  afterEach(() => {
    Sinon.restore()
    clock.restore()
  })

  it('reutrn true if signature is verified', () => {
    const timestamp = Date.now().toString()
    const body = 'test body'
    const signature = sign(
      undefined,
      Buffer.from(timestamp + body),
      privateKey
    )

    const verifiedSignature = verifySignature({
      publicKey: publicKey
        .export({ type: 'spki', format: 'der' })
        .toString('hex')
        .substring(24),
      signature: signature.toString('hex'),
      timestamp,
      body
    })

    expect(verifiedSignature.body).equal(body)
    expect(verifiedSignature.isValid).true
  })
})
