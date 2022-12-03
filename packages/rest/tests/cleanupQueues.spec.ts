import { expect } from 'chai'
import {
  cleanupQueues,
  createRestManager,
  RestManager,
  RestPayload,
  RestRequest
} from '../src/index.js'

describe.skip('[rest] cleanupQueues', () => {
  let rest: RestManager

  const fakeRequest: { request: RestRequest, payload: RestPayload } = {
    payload: { retryCount: 0 },
    request: { method: 'DELETE', reject: () => {}, respond: () => {}, url: '' }
  }

  beforeEach(() => {
    rest = createRestManager({ token: ' ' })
  })

  describe('pathQueues', () => {
    it('Will delete queue from pathQueues if queue empty', () => {
      rest.pathQueues.set('', { isWaiting: false, requests: [] })
      cleanupQueues(rest)
      expect(rest.pathQueues.size).to.be.equal(0)
    })

    it('Will not delete queue from pathQueues if queue not empty', () => {
      rest.pathQueues.set('', {
        isWaiting: false,
        requests: [fakeRequest, fakeRequest]
      })
      cleanupQueues(rest)
      expect(rest.pathQueues.size).to.be.equal(1)
    })
  })

  describe('processingQueue', () => {
    it('Will not disable the queue if queues is not empty', () => {
      rest.processingQueue = true
      rest.pathQueues.set('', { isWaiting: false, requests: [fakeRequest] })
      cleanupQueues(rest)
      expect(rest.processingQueue).to.be.equal(true)
    })

    it('Will disable the queue if queues is empty', () => {
      rest.processingQueue = true
      cleanupQueues(rest)
      expect(rest.processingQueue).to.be.equal(false)
    })
  })
})
