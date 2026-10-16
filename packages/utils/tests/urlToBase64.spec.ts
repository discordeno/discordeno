import { expect } from 'chai';
import { afterEach, beforeEach, describe, it } from 'mocha';
import sinon from 'sinon';
import { urlToBase64 } from '../src/urlToBase64.js';

describe('urlToBase64.ts', () => {
  let fetchStub: sinon.SinonStub;

  beforeEach(() => {
    fetchStub = sinon.stub(globalThis, 'fetch');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('urlToBase64 function', () => {
    it('Will convert a png image to base64', async () => {
      fetchStub.resolves(new Response(new ArrayBuffer(8), { headers: { 'content-type': 'image/png' } }));

      const url = await urlToBase64('https://example.com/image.png');

      expect(url).equal('data:image/png;base64,AAAAAAAAAAA=');
    });

    it('Will throw on a non ok response', async () => {
      fetchStub.resolves(new Response(null, { status: 404, statusText: 'Not Found' }));

      let error: unknown;

      try {
        await urlToBase64('https://example.com/image.png');
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error);
      expect((error as Error).message).to.equal('Failed to fetch https://example.com/image.png: 404 Not Found');
    });
  });
});
