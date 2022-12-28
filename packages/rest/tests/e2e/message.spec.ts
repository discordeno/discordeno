import { expect } from 'chai'
import { describe, it } from 'mocha'
import { rest } from '../utils.js'

describe('[rest] Message related tests', () => {
  describe('Send a message', () => {
    it('With content', async () => {
      const message = await rest.sendMessage('1057524844712964146', { content: 'testing rate limit manager' })
      expect(message.content).to.be.equal('testing rate limit manager')
    })
  })

  describe('Rate limit manager testing', () => {
    it('Send 10 messages to 1 channel', async () => {
      await Promise.all([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(async (i) => {
        await rest.sendMessage('1057524844712964146', { content: `testing rate limit manager ${i}` })
      }))
    })
  })
})
