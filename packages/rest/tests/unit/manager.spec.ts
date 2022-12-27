import { expect } from 'chai'
import { describe, it } from 'mocha'
import { createRestManager } from '../../src/index.js'
import { token } from '../constants.js'

describe('[rest] manager', () => {
  describe('create a rest manager with only a token', () => {
    const rest = createRestManager({ token })
    it('Token is set properly.', () => {
      expect(rest.token).to.be.equal(token)
    })

    it('Default values are set when none are provided.', () => {
      expect(rest.version).to.be.equal(10)
      expect(rest.baseUrl).to.be.equal('https://discord.com/api')
    })
  })

  describe('create a manager with other options', () => {
    const options = {
      token,
      version: 9,
      baseUrl: 'https://localhost:8000'
    } as const

    const rest = createRestManager(options)

    it('With a version', () => {
      expect(rest.version).to.be.equal(options.version)
    })

    it('With a base url', () => {
      expect(rest.baseUrl).to.be.equal(options.baseUrl)
    })
  })
})
