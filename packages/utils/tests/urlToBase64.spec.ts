import { expect } from 'chai'
import { afterEach, beforeEach, describe, it } from 'mocha'
import sinon from 'sinon'
import { urlToBase64 } from '../src/urlToBase64.js'

describe('urlToBase64.ts', () => {
  let fetchStub: sinon.SinonStub

  beforeEach(() => {
    fetchStub = sinon.stub(typeof global !== 'undefined' ? global : window, 'fetch')
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('urlToBase64 function', () => {
    it('Will convert a png image to base64', async () => {
      const mockArrayBuffer = new ArrayBuffer(8)

      fetchStub.resolves({
        arrayBuffer: () => Promise.resolve(mockArrayBuffer),
      })

      const url = await urlToBase64('https://example.com/image.png')

      expect(url).equal('data:image/png;base64,AAAAAAAAAAA=')
    })
  })
})
