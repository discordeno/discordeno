import { use as chaiUse, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { afterEach, beforeEach, describe, it } from 'mocha';
import sinon from 'sinon';
import { createRestManager } from '../../src/manager.js';
import type { RestManager } from '../../src/types.js';
import { fakeToken as token } from '../constants.js';

chaiUse(chaiAsPromised);

/** Builds an error in the shape Node.js gives a failed syscall. */
function nodeError(message: string, code: string, syscall: string): Error {
  return Object.assign(new Error(message), { code, syscall });
}

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

    it('Will not re-send the request when the attempt times out', async () => {
      const timeoutError = new DOMException('The operation timed out.', 'TimeoutError');
      fetchStub.rejects(timeoutError);

      const error = await expect(rest.makeRequest('GET', '/gateway/bot')).to.eventually.be.rejectedWith(Error);
      expect(fetchStub.callCount).to.be.equal(1);
      // The failure is reported with the same error as a request that is not proxied
      expect(error.message).to.be.equal('[999] The request timed out and it maxed out the retries limit.');
      expect(error.cause).to.deep.include({ ok: false, status: 999, errorObject: timeoutError });
    });

    // The errors below are the ones each runtime actually throws, taken from a fetch to a port nothing listens on, an unresolvable host and an
    // unreachable network on Node.js, Bun and Deno.
    const connectErrors = {
      refused: () => new TypeError('fetch failed', { cause: nodeError('connect ECONNREFUSED 127.0.0.1:8000', 'ECONNREFUSED', 'connect') }),
      // Both addresses of a dual stack host failed, so undici hands us all of them at once
      dualStack: () =>
        new TypeError('fetch failed', {
          cause: new AggregateError([
            nodeError('connect ECONNREFUSED ::1:8000', 'ECONNREFUSED', 'connect'),
            nodeError('connect ECONNREFUSED 127.0.0.1:8000', 'ECONNREFUSED', 'connect'),
          ]),
        }),
      unreachable: () => new TypeError('fetch failed', { cause: nodeError('connect EHOSTUNREACH 192.168.178.14:80', 'EHOSTUNREACH', 'connect') }),
      dns: () => new TypeError('fetch failed', { cause: nodeError('getaddrinfo EAI_AGAIN proxy.local', 'EAI_AGAIN', 'getaddrinfo') }),
      // Bun reports the same error for every failure to connect
      bun: () => Object.assign(new Error('Unable to connect. Is the computer able to access the url?'), { code: 'ConnectionRefused' }),
      // Deno reports neither a code nor a syscall
      deno: () =>
        new TypeError('fetch failed', {
          cause: new Error('error sending request for url (http://proxy.local/): client error (Connect): tcp connect error: No route to host'),
        }),
    };

    for (const [name, createFetchError] of Object.entries(connectErrors)) {
      it(`Will re-send the request when it could not connect to the proxy (${name})`, async () => {
        fetchStub.onFirstCall().rejects(createFetchError());
        fetchStub
          .onSecondCall()
          .resolves(new Response(JSON.stringify({ url: 'wss://gateway.discord.gg' }), { headers: { 'Content-Type': 'application/json' } }));

        expect(await rest.makeRequest('GET', '/gateway/bot')).to.be.deep.equal({ url: 'wss://gateway.discord.gg' });
        expect(fetchStub.callCount).to.be.equal(2);
      });
    }

    it('Will not re-send the request when the connection failed after it was sent', async () => {
      // A socket that dies once the request is on the wire may have been forwarded to Discord already, unlike one that never connected
      const fetchError = new TypeError('fetch failed', { cause: nodeError('read ECONNRESET', 'ECONNRESET', 'read') });
      fetchStub.rejects(fetchError);

      const error = await expect(rest.makeRequest('GET', '/gateway/bot')).to.eventually.be.rejectedWith(Error);
      expect(fetchStub.callCount).to.be.equal(1);
      expect(error.cause).to.deep.include({ ok: false, status: 999, errorObject: fetchError });
    });

    it('Will not re-send the request when the proxy closed the connection', async () => {
      const fetchError = new TypeError('fetch failed', { cause: Object.assign(new Error('other side closed'), { code: 'UND_ERR_SOCKET' }) });
      fetchStub.rejects(fetchError);

      const error = await expect(rest.makeRequest('GET', '/gateway/bot')).to.eventually.be.rejectedWith(Error);
      expect(fetchStub.callCount).to.be.equal(1);
      expect(error.cause).to.deep.include({ ok: false, status: 999, errorObject: fetchError });
    });

    it('Will stop re-sending the request once maxProxyConnectionRetryCount is exhausted', async () => {
      rest.maxProxyConnectionRetryCount = 2;
      fetchStub.rejects(connectErrors.refused());

      const error = await expect(rest.makeRequest('GET', '/gateway/bot')).to.eventually.be.rejectedWith(Error);
      expect(fetchStub.callCount).to.be.equal(3);
      expect(error.message).to.be.equal('[999] The proxy could not be reached and it maxed out the retries limit.');
    });

    it('Will re-send a timed out attempt when proxy.retryOnTimeout is enabled', async () => {
      const retryingRest = createRestManager({
        token,
        proxy: {
          baseUrl: 'https://localhost:8000',
          authorization: token,
          retryOnTimeout: true,
        },
      });

      fetchStub.onFirstCall().rejects(new DOMException('The operation timed out.', 'TimeoutError'));
      fetchStub
        .onSecondCall()
        .resolves(new Response(JSON.stringify({ url: 'wss://gateway.discord.gg' }), { headers: { 'Content-Type': 'application/json' } }));

      expect(await retryingRest.makeRequest('GET', '/gateway/bot')).to.be.deep.equal({ url: 'wss://gateway.discord.gg' });
      expect(fetchStub.callCount).to.be.equal(2);
    });

    it('Will not re-send a timed out attempt once maxRetryCount is exhausted, even with proxy.retryOnTimeout enabled', async () => {
      const retryingRest = createRestManager({
        token,
        proxy: {
          baseUrl: 'https://localhost:8000',
          authorization: token,
          retryOnTimeout: true,
        },
      });
      retryingRest.maxRetryCount = 0;
      fetchStub.rejects(new DOMException('The operation timed out.', 'TimeoutError'));

      await expect(retryingRest.makeRequest('GET', '/gateway/bot')).to.eventually.be.rejected;
      expect(fetchStub.callCount).to.be.equal(1);
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

        // Let the first request finish so the queue drains
        finishFirstRequest(
          new Response('{}', {
            headers: { 'Content-Type': 'application/json', 'x-ratelimit-limit': '5', 'x-ratelimit-remaining': '4', 'x-ratelimit-reset-after': '1' },
          }),
        );
        await clock.tickAsync(1000);
        await first;
        // The stale entry gets dequeued once the queue frees up (it re-checks every second); it reaches
        // fetch with an already aborted signal, so nothing goes on the wire
        await clock.tickAsync(1000);
        expect(fetchStub.callCount).to.be.equal(2);
        expect((fetchStub.secondCall.args[0] as Request).signal.aborted).to.be.equal(true);
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
  });
});
