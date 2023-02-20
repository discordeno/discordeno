import { expect } from 'chai'
import { describe, it } from 'mocha'
import { calculateBits, calculatePermissions } from '../src/permissions.js'

describe('permissions.ts', () => {
  describe('calculatePermissions function', () => {
    it('will return the array of permissions of bitwise string', () => {
      expect(calculatePermissions(34393292864n)).to.have.members(['ADD_REACTIONS', 'CREATE_PUBLIC_THREADS', 'USE_VAD'])
    })
  })
  describe('calculateBits function', () => {
    it('will return the bitwise string of array of permissions', () => {
      expect(calculateBits(['ADD_REACTIONS', 'CREATE_PUBLIC_THREADS', 'USE_VAD'])).to.equal('34393292864')
    })
  })
})
