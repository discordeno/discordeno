export {}

/*
import { expect } from 'chai'
import sinon, { stub } from 'sinon'
import {
  createRestManager,
  processRequestHeaders,
  RestManager
} from '../src/index.js'

describe.skip('[rest] processRequestHeaders', () => {
  let rest: RestManager
  let time: sinon.SinonFakeTimers

  beforeEach(() => {
    rest = createRestManager({ token: ' ' })
    time = sinon.useFakeTimers()
  })

  afterEach(() => {
    time.restore()
  })

  describe('With No limit', () => {
    it('will do nothing and return undefined if no bucketID', () => {
      stub(rest, 'processRateLimitedPaths', () => {})
      const headers = new Headers()
      headers.set('x-ratelimit-remaining', '1')
      expect(processRequestHeaders(rest, '/url/path', headers)).to.be.equal(
        undefined
      )
      expect(rest.rateLimitedPaths.size).to.be.equal(0)
    })
    it('will do nothing and undefined if have bucketID', () => {
      stub(rest, 'processRateLimitedPaths', () => {})
      const headers = new Headers()
      headers.set('x-ratelimit-remaining', '1')
      headers.set('x-ratelimit-bucket', 'bucketID123')
      expect(processRequestHeaders(rest, '/url/path', headers)).to.be.equal(
        undefined
      )
      expect(rest.rateLimitedPaths.size).to.be.equal(0)
    })
  })

  describe('With Url limited', () => {
    it('will set url rateLimitedPaths and return undefined if no bucketID', () => {
      stub(rest, 'processRateLimitedPaths', () => {})
      const headers = new Headers()
      headers.set('x-ratelimit-remaining', '0')
      headers.set('x-ratelimit-reset-after', '321')
      expect(processRequestHeaders(rest, '/url/path', headers)).to.be.equal(
        undefined
      )
      expect(rest.rateLimitedPaths.size).to.be.equal(1)
      assertEquals(rest.rateLimitedPaths.get('/url/path'), {
        url: '/url/path',
        resetTimestamp: Date.now() + 321000,
        bucketId: undefined
      })
    })

    it('will set url and bucket rateLimitedPaths and return bucketIDs if have bucketID', () => {
      stub(rest, 'processRateLimitedPaths', () => {})
      const headers = new Headers()
      headers.set('x-ratelimit-remaining', '0')
      headers.set('x-ratelimit-reset-after', '98')
      headers.set('x-ratelimit-bucket', 'bucket123')
      expect(processRequestHeaders(rest, '/url/path', headers)).to.be.equal(
        'bucket123'
      )
      expect(rest.rateLimitedPaths.size).to.be.equal(2)
      assertEquals(rest.rateLimitedPaths.get('/url/path'), {
        url: '/url/path',
        resetTimestamp: Date.now() + 98000,
        bucketId: 'bucket123'
      })
      assertEquals(rest.rateLimitedPaths.get('bucket123'), {
        url: '/url/path',
        resetTimestamp: Date.now() + 98000,
        bucketId: 'bucket123'
      })
    })

    it('will run processRateLimitedPaths if not processing', () => {
      const processRateLimitedPathsStub = stub(
        rest,
        'processRateLimitedPaths',
        () => {}
      )
      const headers = new Headers()
      headers.set('x-ratelimit-remaining', '0')
      headers.set('x-ratelimit-reset-after', '98')
      rest.processingRateLimitedPaths = false
      processRequestHeaders(rest, '/url/path', headers)
      assertSpyCalls(processRateLimitedPathsStub, 1)
    })

    it('will not run processRateLimitedPaths if processing', () => {
      const processRateLimitedPathsStub = stub(
        rest,
        'processRateLimitedPaths',
        () => {}
      )
      const headers = new Headers()
      headers.set('x-ratelimit-remaining', '0')
      headers.set('x-ratelimit-reset-after', '98')
      rest.processingRateLimitedPaths = true
      processRequestHeaders(rest, '/url/path', headers)
      assertSpyCalls(processRateLimitedPathsStub, 0)
    })
  })

  describe('With Global limited', () => {
    it('will set global rateLimitedPaths and return undefined if no bucketID', () => {
      stub(rest, 'processRateLimitedPaths', () => {})
      const headers = new Headers()
      headers.set('x-ratelimit-global', 'true')
      headers.set('retry-after', '89')
      expect(processRequestHeaders(rest, '/url/path', headers)).to.be.equal(
        undefined
      )
      expect(rest.rateLimitedPaths.size).to.be.equal(1)
      assertEquals(rest.rateLimitedPaths.get('global'), {
        url: 'global',
        resetTimestamp: Date.now() + 89000,
        bucketId: undefined
      })
    })

    it('will set global and bucket rateLimitedPaths and return bucketIDs if have bucketID', () => {
      stub(rest, 'processRateLimitedPaths', () => {})
      const headers = new Headers()
      headers.set('x-ratelimit-global', 'true')
      headers.set('retry-after', '13')
      headers.set('x-ratelimit-bucket', 'bucket123')
      expect(processRequestHeaders(rest, '/url/path', headers)).to.be.equal(
        'bucket123'
      )
      expect(rest.rateLimitedPaths.size).to.be.equal(2)
      assertEquals(rest.rateLimitedPaths.get('global'), {
        url: 'global',
        resetTimestamp: Date.now() + 13000,
        bucketId: 'bucket123'
      })
      assertEquals(rest.rateLimitedPaths.get('bucket123'), {
        url: 'global',
        resetTimestamp: Date.now() + 13000,
        bucketId: 'bucket123'
      })
    })

    it('will run processRateLimitedPaths if not processing', () => {
      const processRateLimitedPathsStub = stub(
        rest,
        'processRateLimitedPaths',
        () => {}
      )
      const headers = new Headers()
      headers.set('x-ratelimit-global', 'true')
      headers.set('retry-after', '89')
      rest.processingRateLimitedPaths = false
      processRequestHeaders(rest, '/url/path', headers)
      assertSpyCalls(processRateLimitedPathsStub, 1)
    })

    it('will not run processRateLimitedPaths if processing', () => {
      const processRateLimitedPathsStub = stub(
        rest,
        'processRateLimitedPaths',
        () => {}
      )
      const headers = new Headers()
      headers.set('x-ratelimit-global', 'true')
      headers.set('retry-after', '89')
      rest.processingRateLimitedPaths = true
      processRequestHeaders(rest, '/url/path', headers)
      assertSpyCalls(processRateLimitedPathsStub, 0)
    })
  })
})
*/
