import { Buffer } from 'node:buffer'
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { decode, encode } from '../src/base64.js'

describe('base64.ts', () => {
  describe('encode', () => {
    it('can encode string to base64', () => {
      expect(encode('Man Ё𤭢')).to.be.equal('TWFuINCB8KStog==')
    })
    it('can encode Uint8Array to base64', () => {
      expect(encode(new Uint8Array([77, 97, 110, 32, 208, 129, 240, 164, 173, 162]))).to.be.equal('TWFuINCB8KStog==')
      expect(encode(new Uint8Array([77, 97, 110, 32, 208, 129, 240, 164, 173]))).to.be.equal('TWFuINCB8KSt')
      expect(encode(new Uint8Array([77, 97, 110, 32, 208, 129, 240, 164, 173, 162, 63]))).to.be.equal('TWFuINCB8KStoj8=')
    })
    it('can encode Buffer to base64', () => {
      expect(encode(Buffer.from([77, 97, 110, 32, 208, 129, 240, 164, 173, 162]))).to.be.equal('TWFuINCB8KStog==')
      expect(encode(Buffer.from([77, 97, 110, 32, 208, 129, 240, 164, 173]))).to.be.equal('TWFuINCB8KSt')
      expect(encode(Buffer.from([77, 97, 110, 32, 208, 129, 240, 164, 173, 162, 63]))).to.be.equal('TWFuINCB8KStoj8=')
    })
  })

  describe('decode', () => {
    it('can dencode string to Uint8Array', () => {
      expect(new TextDecoder().decode(decode('TWFuINCB8KStog=='))).to.be.equal('Man Ё𤭢')
      expect(new TextDecoder().decode(decode('TWFuINCB8KSt'))).to.be.equal('Man Ё\ufffd')
      expect(new TextDecoder().decode(decode('TWFuINCB8KStoj8='))).to.be.equal('Man Ё𤭢?')
    })

    it('will throw an error with invalid string', () => {
      expect(() => decode('=adw')).to.throw('Unable to parse base64 string.')
      expect(() => decode('a')).to.throw('Unable to parse base64 string.')
      expect(() => decode('$avs')).to.throw('Unable to parse base64 string.')
      expect(() => decode('~daw')).to.throw('Unable to parse base64 string.')
    })
  })

  /** Old test */
  it('[utils] encode some bytes to base64', () => {
    expect(encode(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))).to.be.deep.equal('AQIDBAUGBwgJCg==')
  })

  it('[utils] decode some base64 to bytes', () => {
    expect(decode('AQIDBAUGBwgJCg==')).to.be.deep.equal(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
  })

  it('[utils] encode/decode base64 roundtrip should work', () => {
    for (let i = 0; i < 10; i++) {
      const bytes: number[] = []
      for (let i = 0; i < 10000; i++) {
        bytes.push(Math.floor(Math.random() * 256))
      }
      const data = new Uint8Array(bytes)
      expect(decode(encode(data))).to.be.deep.equal(data)
    }
  })
})
