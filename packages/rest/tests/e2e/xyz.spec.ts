import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { describe, it } from 'mocha'
import { e2ecache, rest } from './utils.js'
chai.use(chaiAsPromised)

// The xyz.spec.ts file name will make this test run last as tests are ran in alphabetical file name order.

describe('[rest] Cleanup tests', () => {
  describe('Remove the timers', () => {
    it('In the invalid bucket', async () => {
      if (rest.invalidBucket.timeoutId) clearTimeout(rest.invalidBucket.timeoutId)
    })
  })

  it('Delete the created guild', async () => {
    if (e2ecache.guild.id) await rest.deleteGuild(e2ecache.guild.id);
  })
})
