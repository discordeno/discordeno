import { Buffer } from 'node:buffer'
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { getBotIdFromToken, removeTokenPrefix } from '../src/token.js'

describe('token.ts', () => {
  describe('token function', () => {
    it('Will remove token prefix when Bot is prefixed.', () => {
      expect(removeTokenPrefix('Bot discordeno is best lib')).to.be.equal('discordeno is best lib')
    })

    it('Will remove token prefix when Bot is NOT prefixed.', () => {
      expect(removeTokenPrefix('discordeno is best lib')).to.be.equal('discordeno is best lib')
    })

    it('Will throw when token is undefined.', () => {
      expect(() => removeTokenPrefix(undefined)).to.throw()
    })
  })

  describe('getBotIdFromToken function', () => {
    it('Will get Bot Id from token', () => {
      expect(getBotIdFromToken(`${Buffer.from('1033452747380494366').toString('base64')}.zawsxedcrftvgybhu`)).to.equal(1033452747380494366n)
    })
  })
})
