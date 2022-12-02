import { expect } from 'chai'
import { decode, encode } from '../src/base64.js'

describe('base64.ts', () => {
  describe('encode', () => {
    it('can encode string to base64', () => {
      expect(encode('Man Ё𤭢')).to.be.equal('TWFuINCB8KStog==')
    })
    it('can encode Uint8Array to base64', () => {
      expect(
        encode(new Uint8Array([77, 97, 110, 32, 208, 129, 240, 164, 173, 162]))
      ).to.be.equal('TWFuINCB8KStog==')
    })
    it('can encode Buffer to base64', () => {
      expect(
        encode(Buffer.from([77, 97, 110, 32, 208, 129, 240, 164, 173, 162]))
      ).to.be.equal('TWFuINCB8KStog==')
    })
  })

  describe('decode', () => {
    it('can dencode string to Uint8Array', () => {
      expect(new TextDecoder().decode(decode('TWFuINCB8KStog=='))).to.be.equal(
        'Man Ё𤭢'
      )
    })
  })
})
