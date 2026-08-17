import { use as chaiUse, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { afterEach, beforeEach, describe, it } from 'mocha';
import sinon from 'sinon';
import { createRestManager } from '../../src/manager.js';
import type { RestManager } from '../../src/types.js';
import { fakeToken as token } from '../constants.js';

chaiUse(chaiAsPromised);

describe('[rest] manager', () => {
  describe('create a rest manager with only a token', () => {
    const rest = createRestManager({ token });
    it('Token is set properly.', () => {
      expect(rest.token).to.be.equal(token);
    });

    it('Default values are set when none are provided.', () => {
      expect(rest.version).to.be.equal(10);
      expect(rest.baseUrl).to.be.equal('https://discord.com/api');
    });
  });

  describe('create a manager with other options', () => {
    const options = {
      token,
      version: 9,
      proxy: {
        baseUrl: 'https://localhost:8000',
        authorization: token,
      },
    } as const;

    const rest = createRestManager(options);

    it('With a version', () => {
      expect(rest.version).to.be.equal(options.version);
    });

    it('With a base url', () => {
      expect(rest.baseUrl).to.be.equal(options.proxy.baseUrl);
    });

    it('Strips a trailing slash from proxy base urls', () => {
      const rest = createRestManager({ ...options, proxy: { ...options.proxy, baseUrl: 'https://localhost:8000/' } });
      expect(rest.baseUrl).to.be.equal('https://localhost:8000');
      expect(rest.isProxied).to.be.equal(true);
    });

    it('With an application id', () => {
      const rest = createRestManager({ ...options, applicationId: '130136895395987456' });
      expect(rest.applicationId).to.be.equal(130136895395987456n);
    });
  });

  describe('rest.simplifyUrl', () => {
    describe('the ending id', () => {
      it('Will change to x minor params', () => {
        const rest = createRestManager({ token });
        expect(rest.simplifyUrl('/messages/555555555555555555', 'PUT')).to.be.equal('PUT:/messages/x');
        expect(rest.simplifyUrl('/users/555555555555555555', 'PUT')).to.be.equal('PUT:/users/x');
        expect(rest.simplifyUrl('/abc/555555555555555555', 'PUT')).to.be.equal('PUT:/abc/x');
        expect(rest.simplifyUrl('/test1/555555555555555555', 'PUT')).to.be.equal('PUT:/test1/x');
        expect(rest.simplifyUrl('/test2/555555555555555555', 'PUT')).to.be.equal('PUT:/test2/x');
      });

      it('Will not change to x major params', () => {
        const rest = createRestManager({ token });
        expect(rest.simplifyUrl('/channels/555555555555555555', 'PUT')).to.be.equal('PUT:/channels/555555555555555555');
        expect(rest.simplifyUrl('/guilds/555555555555555555', 'PUT')).to.be.equal('PUT:/guilds/555555555555555555');
        expect(rest.simplifyUrl('/webhooks/555555555555555555', 'PUT')).to.be.equal('PUT:/webhooks/555555555555555555');
      });
    });

    describe('with route', () => {
      describe('/reactions', () => {
        it('Will remove path after reactions', () => {
          const rest = createRestManager({ token });
          expect(
            rest.simplifyUrl('/channels/555555555555555555/messages/555555555555555555/reactions/wdiubaibfwuabfobaowbfoibnion/@me', 'PUT'),
          ).to.be.equal('PUT:/channels/555555555555555555/messages/x/reactions/x/@me');
        });
      });

      describe('/messages', () => {
        it('Will add method in front route', () => {
          const rest = createRestManager({ token });
          expect(rest.simplifyUrl('/channels/555555555555555555/messages/555555555555555555', 'POST')).to.be.equal(
            'POST:/channels/555555555555555555/messages/x',
          );
          expect(rest.simplifyUrl('/channels/555555555555555555/messages/555555555555555555', 'GET')).to.be.equal(
            'GET:/channels/555555555555555555/messages/x',
          );
          expect(rest.simplifyUrl('/channels/555555555555555555/messages/555555555555555555', 'PUT')).to.be.equal(
            'PUT:/channels/555555555555555555/messages/x',
          );
        });
      });

      describe('/webhook/id/token', () => {
        it('Will not change to x major params', () => {
          const rest = createRestManager({ token });
          expect(rest.simplifyUrl('/webhooks/555555555555555555/abcdefg1234567', 'POST')).to.be.equal(
            'POST:/webhooks/555555555555555555/abcdefg1234567',
          );
        });

        it('Will change to x minor params', () => {
          const rest = createRestManager({ token });
          expect(rest.simplifyUrl('/webhooks/555555555555555555/abcdefg1234567/messages/2222222222222222222', 'POST')).to.be.equal(
            'POST:/webhooks/555555555555555555/abcdefg1234567/messages/x',
          );
        });
      });
    });
  });

  describe('rest.checkRateLimits', () => {
    let rest: RestManager;
    let clock: sinon.SinonFakeTimers;

    beforeEach(() => {
      rest = createRestManager({ token });
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('will return false for path without rate limited', () => {
      expect(rest.checkRateLimits('/channel/555555555555555555', `Bot ${token}`)).to.be.equal(false);
    });

    describe('With per URL rateLimitedPath', () => {
      it('Will return time until reset if before resetTimestamp', () => {
        rest.rateLimitedPaths.set(`Bot ${token}/channel/555555555555555555`, {
          url: '/channel/555555555555555555',
          resetTimestamp: Date.now() + 6541,
        });
        expect(rest.checkRateLimits('/channel/555555555555555555', `Bot ${token}`)).to.be.equal(6541);
      });

      it('Will return false if before resetTimestamp', () => {
        rest.rateLimitedPaths.set(`Bot ${token}/channel/555555555555555555`, {
          url: '/channel/555555555555555555',
          resetTimestamp: Date.now(),
        });
        expect(rest.checkRateLimits('/channel/555555555555555555', `Bot ${token}`)).to.be.equal(false);
      });
    });

    describe('With global rateLimitedPath', () => {
      it('Will return time until reset if before resetTimestamp', () => {
        rest.rateLimitedPaths.set('global', {
          url: '/channel/555555555555555555',
          resetTimestamp: Date.now() + 9849,
        });
        expect(rest.checkRateLimits('/channel/555555555555555555', `Bot ${token}`)).to.be.equal(9849);
      });

      it('Will return false if before resetTimestamp', () => {
        rest.rateLimitedPaths.set('global', {
          url: '/channel/555555555555555555',
          resetTimestamp: Date.now(),
        });
        expect(rest.checkRateLimits('/channel/555555555555555555', `Bot ${token}`)).to.be.equal(false);
      });
    });

    describe('With both URL and Global rateLimitedPath', () => {
      it('Will return URL time first if before resetTimestamp', () => {
        rest.rateLimitedPaths.set(`Bot ${token}/channel/555555555555555555`, {
          url: '/channel/555555555555555555',
          resetTimestamp: Date.now() + 6541,
        });
        rest.rateLimitedPaths.set('global', {
          url: '/channel/555555555555555555',
          resetTimestamp: Date.now() + 9849,
        });
        expect(rest.checkRateLimits('/channel/555555555555555555', `Bot ${token}`)).to.be.equal(6541);
      });
    });
  });

  describe('rest.processRateLimitedPaths', () => {
    let rest: RestManager;
    let time: sinon.SinonFakeTimers;

    beforeEach(() => {
      rest = createRestManager({ token: '1', applicationId: 1n });
      time = sinon.useFakeTimers();
    });

    afterEach(() => {
      time.restore();
    });

    describe('rateLimitedPaths', () => {
      it('Will not delete path from rateLimitedPaths before resetTimestamp', () => {
        rest.rateLimitedPaths.set('', {
          resetTimestamp: Date.now() + 1,
          url: '',
        });
        rest.processRateLimitedPaths();
        expect(rest.rateLimitedPaths.size).to.be.equal(1);
      });

      it('Will delete path from rateLimitedPaths after resetTimestamp', () => {
        rest.rateLimitedPaths.set('', { resetTimestamp: Date.now(), url: '' });
        rest.processRateLimitedPaths();
        expect(rest.rateLimitedPaths.size).to.be.equal(0);
      });

      it('Will mark globallyRateLimited false if key is global', () => {
        rest.rateLimitedPaths.set('global', {
          resetTimestamp: Date.now(),
          url: '',
        });
        rest.globallyRateLimited = true;
        rest.processRateLimitedPaths();
        expect(rest.rateLimitedPaths.size).to.be.equal(0);
        expect(rest.globallyRateLimited).to.be.equal(false);
      });

      it('Will not mark globallyRateLimited false if key is not global', () => {
        rest.rateLimitedPaths.set('', { resetTimestamp: Date.now(), url: '' });
        rest.globallyRateLimited = true;
        rest.processRateLimitedPaths();
        expect(rest.rateLimitedPaths.size).to.be.equal(0);
        expect(rest.globallyRateLimited).to.be.equal(true);
      });
    });
  });

  describe('rest.makeRequest with a proxy', () => {
    let rest: RestManager;
    let fetchStub: sinon.SinonStub;

    beforeEach(() => {
      rest = createRestManager({
        token,
        proxy: {
          baseUrl: 'https://localhost:8000',
          authorization: token,
        },
      });
      fetchStub = sinon.stub(globalThis, 'fetch');
    });

    afterEach(() => {
      fetchStub.restore();
    });

    // Re-sending is checked by counting the calls to fetch, never by timing, so the backoff between them is turned off to keep the suite fast
    // and free of a wait that could get flaky under load.
    const createRetryingRest = (): RestManager => {
      const retryingRest = createRestManager({
        token,
        proxy: { baseUrl: 'https://localhost:8000', authorization: token, retryRequests: true },
      });
      retryingRest.proxyRetryDelayStep = 0;

      return retryingRest;
    };

    it('Will not re-send the request when the attempt times out', async () => {
      const timeoutError = new DOMException('The operation timed out.', 'TimeoutError');
      fetchStub.rejects(timeoutError);

      const error = await expect(rest.makeRequest('GET', '/gateway/bot')).to.eventually.be.rejectedWith(Error);
      expect(fetchStub.callCount).to.be.equal(1);
      // The failure is reported with the same error as a request that is not proxied
      expect(error.message).to.be.equal('[999] The request timed out and it maxed out the retries limit.');
      expect(error.cause).to.deep.include({ ok: false, status: 999, errorObject: timeoutError });
    });

    it('Will not re-send the request when the connection fails', async () => {
      const fetchError = new TypeError('fetch failed', { cause: new Error('connect ECONNREFUSED 127.0.0.1:8000') });
      fetchStub.rejects(fetchError);

      const error = await expect(rest.makeRequest('GET', '/gateway/bot')).to.eventually.be.rejectedWith(Error);
      expect(fetchStub.callCount).to.be.equal(1);
      expect(error.cause).to.deep.include({ ok: false, status: 999, errorObject: fetchError });
    });

    // Both of these failed without giving us a response, so neither says whether the proxy got the request. They are re-sent together or not
    // at all, which is what `proxy.retryRequests` decides.
    const failuresWithoutAResponse = {
      timeout: () => new DOMException('The operation timed out.', 'TimeoutError'),
      connect: () => new TypeError('fetch failed', { cause: new Error('connect ECONNREFUSED 127.0.0.1:8000') }),
    };

    for (const [name, createFetchError] of Object.entries(failuresWithoutAResponse)) {
      it(`Will re-send the request when proxy.retryRequests is enabled (${name})`, async () => {
        const retryingRest = createRetryingRest();

        fetchStub.onFirstCall().rejects(createFetchError());
        fetchStub
          .onSecondCall()
          .resolves(new Response(JSON.stringify({ url: 'wss://gateway.discord.gg' }), { headers: { 'Content-Type': 'application/json' } }));

        expect(await retryingRest.makeRequest('GET', '/gateway/bot')).to.be.deep.equal({ url: 'wss://gateway.discord.gg' });
        expect(fetchStub.callCount).to.be.equal(2);
      });
    }

    it('Will stop re-sending once maxRetryCount is exhausted, even with proxy.retryRequests enabled', async () => {
      const retryingRest = createRetryingRest();
      retryingRest.maxRetryCount = 0;
      fetchStub.rejects(new DOMException('The operation timed out.', 'TimeoutError'));

      await expect(retryingRest.makeRequest('GET', '/gateway/bot')).to.eventually.be.rejected;
      expect(fetchStub.callCount).to.be.equal(1);
    });

    it('Will stop re-sending once maxProxyRetryCount is exhausted', async () => {
      const retryingRest = createRetryingRest();
      retryingRest.maxProxyRetryCount = 2;
      fetchStub.rejects(failuresWithoutAResponse.connect());

      const error = await expect(retryingRest.makeRequest('GET', '/gateway/bot')).to.eventually.be.rejectedWith(Error);
      expect(fetchStub.callCount).to.be.equal(3);
      expect(error.cause).to.deep.include({ ok: false, status: 999 });
    });

    it('Will count re-sends of different failures against the same maxRetryCount', async () => {
      const retryingRest = createRetryingRest();
      retryingRest.maxRetryCount = 1;

      fetchStub.onFirstCall().rejects(failuresWithoutAResponse.timeout());
      fetchStub.onSecondCall().rejects(failuresWithoutAResponse.connect());
      fetchStub
        .onThirdCall()
        .resolves(new Response(JSON.stringify({ url: 'wss://gateway.discord.gg' }), { headers: { 'Content-Type': 'application/json' } }));

      await expect(retryingRest.makeRequest('GET', '/gateway/bot')).to.eventually.be.rejectedWith(Error);
      // The timed out attempt used up the single retry this request gets, the failure to connect does not get one of its own
      expect(fetchStub.callCount).to.be.equal(2);
    });
  });

  describe('rest.makeRequest with an AbortSignal', () => {
    let fetchStub: sinon.SinonStub;

    beforeEach(() => {
      fetchStub = sinon.stub(globalThis, 'fetch');
    });

    afterEach(() => {
      fetchStub.restore();
    });

    it('Will reject an already aborted request without sending it', async () => {
      const rest = createRestManager({ token });

      await expect(rest.makeRequest('GET', '/gateway/bot', { signal: AbortSignal.abort() })).to.eventually.be.rejected;
      expect(fetchStub.callCount).to.be.equal(0);
    });

    it('Will reject a queued request when the signal aborts', async () => {
      // queueMicrotask is excluded from the faked timers because reading a Response body schedules one internally, and a faked one is never run
      // as a real microtask, which makes the read spin forever.
      const clock = sinon.useFakeTimers({ toNotFake: ['queueMicrotask'] });

      try {
        const rest = createRestManager({ token });
        // Hold the first request open so the next request stays stuck in the queue behind it
        let finishFirstRequest: (value: Response) => void = () => {};
        fetchStub.callsFake(async (request: Request) => {
          // Like real fetch, refuse to send a request whose signal is already aborted
          if (request.signal.aborted) throw request.signal.reason;
          return await new Promise<Response>((resolve) => {
            finishFirstRequest = resolve;
          });
        });

        const first = rest.makeRequest('GET', '/gateway/bot');
        // Let the first request reach fetch and block the queue
        await clock.tickAsync(0);

        const controller = new AbortController();
        const queued = rest.makeRequest('GET', '/gateway/bot', { signal: controller.signal });
        controller.abort();

        // The caller is rejected right away, while the request is still stuck in the queue
        await expect(queued).to.eventually.be.rejected;
        expect(fetchStub.callCount).to.be.equal(1);

        // And the queue no longer holds on to it
        const queue = [...rest.queues.values()][0];
        expect(queue.waiting.length).to.be.equal(0);
        expect(queue.pending.length).to.be.equal(0);

        // Let the first request finish so the queue drains
        finishFirstRequest(
          new Response('{}', {
            headers: { 'Content-Type': 'application/json', 'x-ratelimit-limit': '5', 'x-ratelimit-remaining': '4', 'x-ratelimit-reset-after': '1' },
          }),
        );
        await clock.tickAsync(1000);
        await first;
        // Nothing is left of the cancelled request, so the queue never spends a rate limit slot on it
        await clock.tickAsync(1000);
        expect(fetchStub.callCount).to.be.equal(1);
      } finally {
        clock.restore();
      }
    });

    it('Will drop a queued request that was aborted before the queue got to it', async () => {
      const clock = sinon.useFakeTimers({ toNotFake: ['queueMicrotask'] });

      try {
        const rest = createRestManager({ token });
        let finishFirstRequest: (value: Response) => void = () => {};
        fetchStub.callsFake(async (request: Request) => {
          // Like real fetch, refuse to send a request whose signal is already aborted
          if (request.signal.aborted) throw request.signal.reason;
          return await new Promise<Response>((resolve) => {
            finishFirstRequest = resolve;
          });
        });

        const first = rest.makeRequest('GET', '/gateway/bot');
        // Let the first request reach fetch and block the queue
        await clock.tickAsync(0);

        const controller = new AbortController();
        const queued = rest.makeRequest('GET', '/gateway/bot', { signal: controller.signal });
        // Let it get past the waiting list and into the pending one before giving up on it
        await clock.tickAsync(1000);
        controller.abort();

        await expect(queued).to.eventually.be.rejected;

        finishFirstRequest(
          new Response('{}', {
            headers: { 'Content-Type': 'application/json', 'x-ratelimit-limit': '5', 'x-ratelimit-remaining': '4', 'x-ratelimit-reset-after': '1' },
          }),
        );
        await clock.tickAsync(1000);
        await first;
        await clock.tickAsync(1000);

        // The cancelled request is dropped instead of being sent with an already aborted signal
        expect(fetchStub.callCount).to.be.equal(1);
        const queue = [...rest.queues.values()][0];
        expect(queue.pending.length).to.be.equal(0);
      } finally {
        clock.restore();
      }
    });

    it('Will cancel an in flight request when the signal aborts', async () => {
      const rest = createRestManager({ token });
      // Behave like real fetch: never settle until the signal on the request aborts
      fetchStub.callsFake(
        async (request: Request) =>
          await new Promise<Response>((_resolve, reject) => {
            request.signal.addEventListener('abort', () => reject(request.signal.reason), { once: true });
          }),
      );

      const controller = new AbortController();
      const promise = rest.makeRequest('GET', '/gateway/bot', { signal: controller.signal });
      // Let the request go out before aborting
      await new Promise((resolve) => setImmediate(resolve));
      controller.abort();

      await expect(promise).to.eventually.be.rejected;
      expect(fetchStub.callCount).to.be.equal(1);
      // The signal must be forwarded to fetch so the connection itself gets torn down
      expect((fetchStub.firstCall.args[0] as Request).signal.aborted).to.be.equal(true);
    });

    it('Will throw for an aborted request in proxy mode without contacting the proxy', async () => {
      const rest = createRestManager({ token, proxy: { baseUrl: 'https://localhost:8000', authorization: token } });

      const error = await expect(rest.makeRequest('GET', '/gateway/bot', { signal: AbortSignal.abort() })).to.eventually.be.rejectedWith(Error);
      expect(fetchStub.callCount).to.be.equal(0);
      expect(error.message).to.be.equal('[999] The request was aborted.');
    });

    it('Will cancel an in flight request to the proxy when the signal aborts, without re-sending it', async () => {
      const rest = createRestManager({ token, proxy: { baseUrl: 'https://localhost:8000', authorization: token } });
      // Behave like real fetch: never settle until the signal on the request aborts
      fetchStub.callsFake(
        async (request: Request) =>
          await new Promise<Response>((_resolve, reject) => {
            request.signal.addEventListener('abort', () => reject(request.signal.reason), { once: true });
          }),
      );

      const controller = new AbortController();
      const promise = rest.makeRequest('GET', '/gateway/bot', { signal: controller.signal });
      // Let the request go out before aborting
      await new Promise((resolve) => setImmediate(resolve));
      controller.abort();

      await expect(promise).to.eventually.be.rejected;
      expect(fetchStub.callCount).to.be.equal(1);
    });

    it('Will reject when the signal aborts while the proxy response body is being read', async () => {
      const rest = createRestManager({ token, proxy: { baseUrl: 'https://localhost:8000', authorization: token } });
      // Behave like real fetch: resolve as soon as the headers are in and fail the body read once the signal aborts
      fetchStub.callsFake(async (request: Request) => {
        const body = new ReadableStream({
          start(streamController) {
            streamController.enqueue(new TextEncoder().encode('{"url":'));
            request.signal.addEventListener('abort', () => streamController.error(request.signal.reason), { once: true });
          },
        });

        return new Response(body, { headers: { 'Content-Type': 'application/json' } });
      });

      const controller = new AbortController();
      const promise = rest.makeRequest('GET', '/gateway/bot', { signal: controller.signal });
      // Let the headers arrive, the body is still being read at this point
      await new Promise((resolve) => setImmediate(resolve));
      controller.abort();

      const error = await expect(promise).to.eventually.be.rejectedWith(Error);
      expect(error.message).to.be.equal('[999] The request was aborted.');
    });
  });

  describe('rest.sendRequest with a server error', () => {
    let rest: RestManager;
    let fetchStub: sinon.SinonStub;

    const jsonHeaders = { 'Content-Type': 'application/json' };
    const gatewayResponse = () => new Response(JSON.stringify({ url: 'wss://gateway.discord.gg' }), { headers: jsonHeaders });

    beforeEach(() => {
      rest = createRestManager({ token });
      // Re-sending is checked by counting the calls to fetch, never by timing, so the backoff between them is turned off to keep the suite fast
      // and free of a wait that could get flaky under load.
      rest.serverErrorRetryDelayStep = 0;
      fetchStub = sinon.stub(globalThis, 'fetch');
    });

    afterEach(() => {
      fetchStub.restore();
    });

    for (const status of [502, 503]) {
      it(`Will re-send the request when a gateway in front of the api answered (${status})`, async () => {
        fetchStub.onFirstCall().resolves(new Response('{}', { status, headers: jsonHeaders }));
        fetchStub.onSecondCall().resolves(gatewayResponse());

        expect(await rest.makeRequest('GET', '/gateway/bot')).to.be.deep.equal({ url: 'wss://gateway.discord.gg' });
        expect(fetchStub.callCount).to.be.equal(2);
      });
    }

    // These two reached the api, so it may have carried the request out before it failed or ran out of time
    for (const status of [500, 504]) {
      it(`Will not re-send the request when the api itself answered (${status})`, async () => {
        fetchStub.resolves(new Response('{}', { status, headers: jsonHeaders }));

        await expect(rest.makeRequest('GET', '/gateway/bot')).to.eventually.be.rejectedWith(Error);
        expect(fetchStub.callCount).to.be.equal(1);
      });
    }

    it('Will stop re-sending once maxRetryCount is exhausted', async () => {
      rest.maxRetryCount = 0;
      fetchStub.resolves(new Response('{}', { status: 502, headers: jsonHeaders }));

      await expect(rest.makeRequest('GET', '/gateway/bot')).to.eventually.be.rejectedWith(Error);
      expect(fetchStub.callCount).to.be.equal(1);
    });

    it('Will stop re-sending once maxServerErrorRetryCount is exhausted', async () => {
      rest.maxServerErrorRetryCount = 2;
      fetchStub.resolves(new Response('{}', { status: 502, headers: jsonHeaders }));

      await expect(rest.makeRequest('GET', '/gateway/bot')).to.eventually.be.rejectedWith(Error);
      expect(fetchStub.callCount).to.be.equal(3);
    });
  });
});
