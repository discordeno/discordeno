import { expect } from 'chai'
import { describe, it } from 'mocha'
import { processReactionString } from '../src/reactions.js'

describe('rection.ts', () => {
  describe('processReactionString function', () => {
    it('will transform rection', () => {
      expect(processReactionString('<:blobreach:123456789012345678>')).to.equal('blobreach:123456789012345678')
    })

    it('will transform gif rection', () => {
      expect(processReactionString('<a:blobreach:123456789012345678>')).to.equal('blobreach:123456789012345678')
    })

    it('will return name:id rection without transform', () => {
      expect(processReactionString('blobreach:123456789012345678')).to.equal('blobreach:123456789012345678')
    })
  })
})
