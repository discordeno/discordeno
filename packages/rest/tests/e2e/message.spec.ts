import { expect } from 'chai'
import { describe, it } from 'mocha'
import { rest } from './utils.js'

describe('[rest] Message related tests', () => {
  describe('Send a message', () => {
    it('With content', async () => {
      const message = await rest.sendMessage('1041029705790402611', { content: 'testing rate limit manager' })
      expect(message.content).to.be.equal('testing rate limit manager')
    })
  })

  describe('Rate limit manager testing', () => {
    it('Send 10 messages to 1 channel', async () => {
      await Promise.all([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(async (i) => {
        await rest.sendMessage('1041029705790402611', { content: `10 messages to 1 channel testing rate limit manager ${i}` })
      }))
    })

    // TODO: Make this dynamic when we can create channels
    const spamChannelIds = [
      '1041029705790402611', '1041029706838966393',
      '1041029707459731586', '1041029708004995199',
      '1041029708453789766', '1041029709049385010',
      '1041029709632377003', '1041029710227976313',
      '1041029710764834856', '1041029711414956202',
      '1041029712153149524', '1041029712933306459',
      '1041029713566646313', '1041029714254508042',
      '1041029714921406555', '1041029716334870629',
      '1041029717127614636', '1041029717689647114',
      '1041029718603997214', '1041029719925215302',
      '1041029721179308082', '1041029721988812860',
      '1041029722466943037', '1041029723217743964',
      '1041029723872034826', '1041029724492804156',
      '1041029725117743144', '1041029725818212474',
      '1041029726531227741', '1041029727231684638'
    ]

    it('Send 10 messages to 10 channels', async () => {
      await Promise.all(spamChannelIds.map(async (channelId) => {
        await Promise.all([...Array(10).keys()].map(async (_, index) => {
          await rest.sendMessage(channelId, { content: `testing rate limit manager ${index}` })
        }))
      }))
    })
  })
})
