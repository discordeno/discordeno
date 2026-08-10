import { type InspectOptions, inspect } from 'node:util';
import {
  camelize,
  camelToSnakeCase,
  DISCORDENO_VERSION,
  delay,
  getBotIdFromToken,
  hasProperty,
  logger,
  snowflakeToTimestamp,
} from '@discordeno/utils';
import { type CamelizedRestEndpoints, type RestEndpoints, restEndpoints } from './endpoints.js';
import { createInvalidRequestBucket } from './invalidBucket.js';
import { Queue } from './queue.js';
import { createRoutes } from './routes.js';
import type { CreateRequestBodyOptions, CreateRestManagerOptions, RestManager, SendRequestOptions } from './types.js';

export const DISCORD_API_VERSION = 10;
export const DISCORD_API_URL = 'https://discord.com/api';

export const AUDIT_LOG_REASON_HEADER = 'x-audit-log-reason';
export const RATE_LIMIT_REMAINING_HEADER = 'x-ratelimit-remaining';
export const RATE_LIMIT_RESET_AFTER_HEADER = 'x-ratelimit-reset-after';
export const RATE_LIMIT_GLOBAL_HEADER = 'x-ratelimit-global';
export const RATE_LIMIT_BUCKET_HEADER = 'x-ratelimit-bucket';
export const RATE_LIMIT_LIMIT_HEADER = 'x-ratelimit-limit';
export const RATE_LIMIT_SCOPE_HEADER = 'x-ratelimit-scope';

export function createRestManager(options: CreateRestManagerOptions): RestManager {
  const applicationId = options.applicationId ? BigInt(options.applicationId) : getBotIdFromToken(options.token);

  const baseUrl = (options.proxy?.baseUrl ?? DISCORD_API_URL).replace(/\/$/, '');
  // Discord error can get nested a lot, so we use a custom inspect to change the depth to Infinity
  const baseErrorPrototype = {
    [inspect.custom](_depth: number, options: InspectOptions, _inspect: typeof inspect) {
      return _inspect(this, {
        ...options,
        depth: Infinity,
        // Since we call inspect on ourself, we need to disable the calls to the inspect.custom symbol or else it will cause an infinite loop.
        customInspect: false,
      });
    },
  };

  const rest: RestManager = {
    applicationId,
    authorization: options.proxy?.authorization,
    authorizationHeader: options.proxy?.authorizationHeader ?? 'authorization',
    baseUrl,
    deleteQueueDelay: 60000,
    globallyRateLimited: false,
    invalidBucket: createInvalidRequestBucket({ logger: options.logger }),
    isProxied: !baseUrl.startsWith(DISCORD_API_URL),
    updateBearerTokenEndpoint: options.proxy?.updateBearerTokenEndpoint,
    retryProxiedRequests: options.proxy?.retryRequests ?? false,
    maxRetryCount: Infinity,
    maxProxyRetryCount: 15,
    proxyRetryDelayStep: 250,
    requestTimeout: options.requestTimeout ?? 30000,
    processingRateLimitedPaths: false,
    queues: new Map(),
    rateLimitedPaths: new Map(),
    token: options.token,
    version: options.version ?? DISCORD_API_VERSION,
    logger: options.logger ?? logger,
    events: {
      request: () => {},
      response: () => {},
      requestError: () => {},
      ...options.events,
    },

    routes: createRoutes(),

    createBaseHeaders() {
      return {
        'user-agent': `DiscordBot (https://github.com/discordeno/discordeno, v${DISCORDENO_VERSION})`,
      };
    },

    checkRateLimits(url, identifier) {
      const ratelimited = rest.rateLimitedPaths.get(`${identifier}${url}`);

      const global = rest.rateLimitedPaths.get('global');
      const now = Date.now();

      if (ratelimited && now < ratelimited.resetTimestamp) {
        return ratelimited.resetTimestamp - now;
      }

      if (global && now < global.resetTimestamp) {
        return global.resetTimestamp - now;
      }

      return false;
    },

    async updateTokenQueues(oldToken, newToken) {
      if (rest.isProxied) {
        if (!rest.updateBearerTokenEndpoint) {
          throw new Error(
            "The 'proxy.updateBearerTokenEndpoint' option needs to be set when using a rest proxy and needed to call 'updateTokenQueues'",
          );
        }

        const headers = {
          'content-type': 'application/json',
        } as Record<string, string>;

        if (rest.authorization !== undefined) {
          headers[rest.authorizationHeader] = rest.authorization;
        }

        await fetch(`${rest.baseUrl}/${rest.updateBearerTokenEndpoint}`, {
          method: 'POST',
          body: JSON.stringify({
            oldToken,
            newToken,
          }),
          headers,
        });

        return;
      }

      const newIdentifier = `Bearer ${newToken}`;

      // Update all the queues
      for (const [key, queue] of rest.queues.entries()) {
        if (!key.startsWith(`Bearer ${oldToken}`)) continue;

        rest.queues.delete(key);
        queue.identifier = newIdentifier;

        const newKey = `${newIdentifier}${queue.url}`;
        const newQueue = rest.queues.get(newKey);

        // Merge the queues
        if (newQueue) {
          newQueue.waiting.unshift(...queue.waiting);
          newQueue.pending.unshift(...queue.pending);

          queue.waiting = [];
          queue.pending = [];

          queue.cleanup();
        } else {
          rest.queues.set(newKey, queue);
        }
      }

      for (const [key, ratelimitPath] of rest.rateLimitedPaths.entries()) {
        if (!key.startsWith(`Bearer ${oldToken}`)) continue;

        rest.rateLimitedPaths.set(`${newIdentifier}${ratelimitPath.url}`, ratelimitPath);

        if (ratelimitPath.bucketId) {
          rest.rateLimitedPaths.set(`${newIdentifier}${ratelimitPath.bucketId}`, ratelimitPath);
        }
      }
    },

    changeToDiscordFormat(obj: any): any {
      if (obj === null) return null;

      if (typeof obj === 'object') {
        if (Array.isArray(obj)) {
          return obj.map((item) => rest.changeToDiscordFormat(item));
        }

        const newObj: any = {};

        for (const key of Object.keys(obj)) {
          const value = obj[key];

          // If the key is already in snake_case we can assume it is already in the discord format.
          if (key.includes('_')) {
            newObj[key] = value;
            continue;
          }

          if (value !== undefined) {
            switch (key) {
              case 'nameLocalizations':
                newObj.name_localizations = value;
                continue;
              case 'descriptionLocalizations':
                newObj.description_localizations = value;
                continue;
            }
          }

          newObj[camelToSnakeCase(key)] = rest.changeToDiscordFormat(value);
        }

        return newObj;
      }

      if (typeof obj === 'bigint') return obj.toString();

      return obj;
    },

    createRequestBody(method, options) {
      const headers = this.createBaseHeaders();

      if (options?.unauthorized !== true) headers.authorization = `Bot ${rest.token}`;

      // IF A REASON IS PROVIDED ENCODE IT IN HEADERS
      if (options?.reason !== undefined) {
        headers[AUDIT_LOG_REASON_HEADER] = encodeURIComponent(options?.reason);
      }

      let body: string | FormData | undefined;

      // Have to check for attachments first, since body then has to be send in a different way.
      if (options?.files !== undefined) {
        const form = new FormData();
        for (let i = 0; i < options.files.length; ++i) {
          form.append(`files[${i}]`, options.files[i].blob, options.files[i].name);
        }

        // Have to use changeToDiscordFormat or else JSON.stringify may throw an error for the presence of BigInt(s) in the json
        form.append('payload_json', JSON.stringify(rest.changeToDiscordFormat({ ...options.body, files: undefined })));

        // No need to set the `content-type` header since `fetch` does that automatically for us when we use a `FormData` object.
        body = form;
      } else if (options?.body && options.headers && options.headers['content-type'] === 'application/x-www-form-urlencoded') {
        // OAuth2 body handling
        const formBody: string[] = [];

        const discordBody = rest.changeToDiscordFormat(options.body);

        for (const prop in discordBody) {
          formBody.push(`${encodeURIComponent(prop)}=${encodeURIComponent(discordBody[prop])}`);
        }

        body = formBody.join('&');
      } else if (options?.body !== undefined) {
        if (options.body instanceof FormData) {
          body = options.body;
          // No need to set the `content-type` header since `fetch` does that automatically for us when we use a `FormData` object.
        } else {
          body = JSON.stringify(rest.changeToDiscordFormat(options.body));
          headers['content-type'] = `application/json`;
        }
      }

      // SOMETIMES SPECIAL HEADERS (E.G. CUSTOM AUTHORIZATION) NEED TO BE USED
      if (options?.headers) {
        Object.assign(headers, options.headers);
      }

      return {
        body,
        headers,
        method,
      };
    },

    createRequestError(error, reason) {
      let errorText: string;

      switch (reason.status) {
        case 400:
          errorText = "The options was improperly formatted, or the server couldn't understand it.";
          break;
        case 401:
          errorText = 'The Authorization header was missing or invalid.';
          break;
        case 403:
          errorText = 'The Authorization token you passed did not have permission to the resource.';
          break;
        case 404:
          errorText = "The resource at the location specified doesn't exist.";
          break;
        case 405:
          errorText = 'The HTTP method used is not valid for the location specified.';
          break;
        case 429:
          errorText = "You're being ratelimited.";
          break;
        case 502:
          errorText = 'There was not a gateway available to process your options. Wait a bit and retry.';
          break;
        default:
          errorText = reason.statusText ?? reason.error ?? 'Unknown error';
      }

      error.message = `[${reason.status}] ${errorText}`;

      // If discord sent us JSON, it is probably going to be an error message from which we can get and add some information about the error to the error message, the full body will be in the error.cause
      // https://docs.discord.com/developers/reference#error-messages
      if (typeof reason.body === 'object' && hasProperty(reason.body, 'code') && hasProperty(reason.body, 'message')) {
        error.message += `\nDiscord error: [${reason.body.code}] ${reason.body.message}`;
      }

      error.cause = Object.assign(Object.create(baseErrorPrototype), reason);

      return error;
    },

    processRateLimitedPaths() {
      const now = Date.now();

      for (const [key, value] of rest.rateLimitedPaths.entries()) {
        //   rest.debug(
        // `[REST - processRateLimitedPaths] Running for of loop. ${
        //   value.resetTimestamp - now
        // }`
        //   )
        // If the time has not reached cancel
        if (value.resetTimestamp > now) continue;

        // Rate limit is over, delete the rate limiter
        rest.rateLimitedPaths.delete(key);
        // If it was global, also mark the global value as false
        if (key === 'global') rest.globallyRateLimited = false;
      }

      // ALL PATHS ARE CLEARED CAN CANCEL OUT!
      if (rest.rateLimitedPaths.size === 0) {
        rest.processingRateLimitedPaths = false;
      } else {
        rest.processingRateLimitedPaths = true;
        // RECHECK IN 1 SECOND
        setTimeout(() => {
          // rest.debug('[REST - processRateLimitedPaths] Running setTimeout.')
          rest.processRateLimitedPaths();
        }, 1000);
      }
    },

    /** Processes the rate limit headers and determines if it needs to be rate limited and returns the bucket id if available */
    processHeaders(url, headers, identifier) {
      let rateLimited = false;

      // GET ALL NECESSARY HEADERS
      const remaining = headers.get(RATE_LIMIT_REMAINING_HEADER);
      const retryAfter = headers.get('Retry-After') ?? headers.get(RATE_LIMIT_RESET_AFTER_HEADER);
      const reset = Date.now() + Number(retryAfter) * 1000;
      const global = headers.get(RATE_LIMIT_GLOBAL_HEADER);
      // undefined override null needed for typings
      const bucketId = headers.get(RATE_LIMIT_BUCKET_HEADER) ?? undefined;
      const limit = headers.get(RATE_LIMIT_LIMIT_HEADER);

      // If we didn't received the identifier, fallback to the bot token
      identifier ??= `Bot ${rest.token}`;

      rest.queues.get(`${identifier}${url}`)?.handleCompletedRequest({
        remaining: remaining ? Number(remaining) : undefined,
        interval: retryAfter ? Number(retryAfter) * 1000 : undefined,
        max: limit ? Number(limit) : undefined,
      });

      // IF THERE IS NO REMAINING RATE LIMIT, MARK IT AS RATE LIMITED
      if (remaining === '0') {
        rateLimited = true;

        // SAVE THE URL AS LIMITED, IMPORTANT FOR NEW REQUESTS BY USER WITHOUT BUCKET
        rest.rateLimitedPaths.set(`${identifier}${url}`, {
          url,
          resetTimestamp: reset,
          bucketId,
        });

        // SAVE THE BUCKET AS LIMITED SINCE DIFFERENT URLS MAY SHARE A BUCKET
        if (bucketId) {
          rest.rateLimitedPaths.set(`${identifier}${bucketId}`, {
            url,
            resetTimestamp: reset,
            bucketId,
          });
        }
      }

      // IF THERE IS NO REMAINING GLOBAL LIMIT, MARK IT RATE LIMITED GLOBALLY
      if (global) {
        const retryAfter = Number(headers.get('retry-after')) * 1000;
        const globalReset = Date.now() + retryAfter;
        //   rest.debug(
        // `[REST = Globally Rate Limited] URL: ${url} | Global Rest: ${globalReset}`
        //   )
        rest.globallyRateLimited = true;
        rateLimited = true;

        setTimeout(() => {
          rest.globallyRateLimited = false;
        }, retryAfter);

        rest.rateLimitedPaths.set('global', {
          url: 'global',
          resetTimestamp: globalReset,
          bucketId,
        });

        if (bucketId) {
          rest.rateLimitedPaths.set(identifier, {
            url: 'global',
            resetTimestamp: globalReset,
            bucketId,
          });
        }
      }

      if (rateLimited && !rest.processingRateLimitedPaths) {
        rest.processRateLimitedPaths();
      }
      return rateLimited ? bucketId : undefined;
    },

    async sendRequest(options) {
      const url = `${rest.baseUrl}/v${rest.version}${options.route}`;
      const payload = rest.createRequestBody(options.method, options.requestBodyOptions);

      // Retries a request that was aborted because it hit `rest.requestTimeout`, or rejects it once the retry
      // budget is exhausted. The caller is responsible for the `invalidBucket`/event bookkeeping beforehand.
      const handleTimeout = async (options: SendRequestOptions, error: Error): Promise<void> => {
        if (options.retryCount >= rest.maxRetryCount) {
          rest.logger.debug(`request to ${url} timed out and exceeded the maximum allowed retries.`);
          options.reject({
            ok: false,
            status: 999,
            error: 'The request timed out and it maxed out the retries limit.',
            errorObject: error,
          });
          return;
        }

        rest.logger.debug(`request to ${url} timed out after ${rest.requestTimeout}ms, retrying.`, error);
        options.retryCount += 1;
        await options.retryRequest?.(options);
      };

      const loggingHeaders = { ...payload.headers };

      if (payload.headers.authorization) {
        const authorizationScheme = payload.headers.authorization?.split(' ')[0];
        loggingHeaders.authorization = `${authorizationScheme} tokenhere`;
      }

      // Give this attempt a hard deadline. `AbortSignal.timeout` aborts the fetch (and any in-progress body
      // read) once it fires, which makes the awaited fetch reject so a stalled connection can never keep this
      // queue's `processPending` loop (and therefore the whole queue) wedged forever. Omitted when disabled.
      // The caller's signal is handed to fetch too: fetch refuses to send a request whose signal is already aborted, so a queue entry that got
      // aborted while waiting never goes out, and aborting mid-request tears down the connection.
      const signals: AbortSignal[] = [];
      if (options.requestBodyOptions?.signal) signals.push(options.requestBodyOptions.signal);
      if (rest.requestTimeout > 0) signals.push(AbortSignal.timeout(rest.requestTimeout));

      const request = new Request(url, { ...payload, signal: signals.length > 0 ? AbortSignal.any(signals) : undefined });
      rest.events.request(request, {
        body: options.requestBodyOptions?.body,
      });

      rest.logger.debug(`sending request to ${url}`, 'with payload:', { ...payload, headers: loggingHeaders });
      const response = await fetch(request).catch(async (error) => {
        rest.events.requestError(request, error, { body: options.requestBodyOptions?.body });
        // Mark request as completed
        rest.invalidBucket.handleCompletedRequest(999, false);

        // The caller aborted the request, never re-send it, Discord may have received it already. The caller was rejected the moment the signal fired.
        if (options.requestBodyOptions?.signal?.aborted) {
          options.reject({
            ok: false,
            status: 999,
            error: 'The request was aborted.',
            errorObject: error,
          });
          return;
        }

        // The attempt hit `rest.requestTimeout` and was aborted. Treat it like a transient failure and retry
        // it through the queue, so a single stalled connection doesn't permanently fail the request.
        if (isTimeoutError(error)) return await handleTimeout(options, error);

        rest.logger.debug(`request fetch to ${url} failed.`, error);
        options.reject({
          ok: false,
          status: 999,
          error: 'Possible network or request shape issue occurred. If this is rare, its a network glitch. If it occurs a lot something is wrong.',
          errorObject: error,
        });
      });

      // If response is undefined, the error has been handled in the catch block above
      if (!response) return;

      rest.logger.debug(`request fetched from ${url} with status ${response.status} & ${response.statusText}`);

      // Sometimes the Content-Type may be "application/json; charset=utf-8", for this reason, we need to check the start of the header
      const body = await (response.headers.get('Content-Type')?.startsWith('application/json') ? response.json() : response.text()).catch(() => null);

      rest.events.response(request, response, {
        requestBody: options.requestBodyOptions?.body,
        responseBody: body,
      });

      // Mark request as completed
      rest.invalidBucket.handleCompletedRequest(response.status, response.headers.get(RATE_LIMIT_SCOPE_HEADER) === 'shared');

      // Set the bucket id if it was available on the headers
      const bucketId = rest.processHeaders(rest.simplifyUrl(options.route, options.method), response.headers, payload.headers.authorization);

      if (bucketId) options.bucketId = bucketId;

      if (response.status < HttpResponseCode.Success || response.status >= HttpResponseCode.Error) {
        rest.logger.debug(`Request to ${url} failed.`);

        if (response.status !== HttpResponseCode.TooManyRequests) {
          options.reject({ ok: false, status: response.status, statusText: response.statusText, body });
          return;
        }

        rest.logger.debug(`Request to ${url} was ratelimited.`);
        // Too many attempts, get rid of request from queue.
        if (options.retryCount >= rest.maxRetryCount) {
          rest.logger.debug(`Request to ${url} exceeded the maximum allowed retries.`, 'with payload:', payload);
          // rest.debug(`[REST - RetriesMaxed] ${JSON.stringify(options)}`)
          options.reject({
            ok: false,
            status: response.status,
            statusText: response.statusText,
            error: 'The request was rate limited and it maxed out the retries limit.',
          });

          return;
        }

        options.retryCount += 1;

        const resetAfter = response.headers.get('retry-after');
        if (resetAfter) await delay(Number(resetAfter) * 1000);

        return await options.retryRequest?.(options);
      }

      // Discord sometimes sends a response with no content
      options.resolve({ ok: true, status: response.status, body: response.status === HttpResponseCode.NoContent ? undefined : body });
    },

    simplifyUrl(url, method) {
      const routeInformationKey: string[] = [method];

      const queryParamIndex = url.indexOf('?');
      const route = queryParamIndex !== -1 ? url.slice(0, queryParamIndex) : url;

      // Since the urls start with / the first part will always be empty
      const splittedRoute = route.split('/');

      // 1) Strip the minor params
      //    The only majors are channels, guilds, webhooks and webhooks with their token

      const strippedRoute = splittedRoute
        .map((part, index, array) => {
          // While parseInt will truncate the snowflake id, it will still tell us if it is a number
          const isNumber = Number.isFinite(parseInt(part, 10));

          if (!isNumber) {
            // Reactions emoji need to be stripped as it is a minor parameter
            if (index >= 1 && array[index - 1] === 'reactions') return 'x';
            // If we are on a webhook or if it is part of the route, keep it as it is a major parameter
            return part;
          }

          // Check if we are on a channel id, a guild id or a webhook id
          const isMajor = index >= 1 && (array[index - 1] === 'channels' || array[index - 1] === 'guilds' || array[index - 1] === 'webhooks');

          if (isMajor) return part;

          return 'x';
        })
        .join('/');

      routeInformationKey.push(strippedRoute);

      // 2) Account for exceptions
      //    - https://github.com/discord/discord-api-docs/issues/1092
      //    - https://github.com/discord/discord-api-docs/issues/1295

      // The 2 exceptions are for message delete, so we need to check if we are in that route
      if (method === 'DELETE' && splittedRoute.length === 5 && splittedRoute[1] === 'channels' && strippedRoute.endsWith('/messages/x')) {
        const messageId = splittedRoute[4];
        const timestamp = snowflakeToTimestamp(messageId);
        const now = Date.now();

        // https://github.com/discord/discord-api-docs/issues/1092
        if (now - timestamp < 10_000) {
          routeInformationKey.push('message-delete-10s');
        }

        // https://github.com/discord/discord-api-docs/issues/1295
        // 2 weeks = 2 * 7 * 24 * 60 * 60 * 1000 = 1209600000
        if (now - timestamp > 1209600000) {
          routeInformationKey.push('message-delete-2w');
        }
      }

      return routeInformationKey.join(':');
    },

    async processRequest(request: SendRequestOptions) {
      const url = rest.simplifyUrl(request.route, request.method);

      if (request.runThroughQueue === false) {
        await rest.sendRequest(request);

        return;
      }

      // If the request has a token, use it
      // Else fallback to prefix with the bot token
      const queueIdentifier = request.requestBodyOptions?.headers?.authorization ?? `Bot ${rest.token}`;

      const queue = rest.queues.get(`${queueIdentifier}${url}`);

      if (queue !== undefined) {
        queue.makeRequest(request);
      } else {
        // CREATES A NEW QUEUE
        const bucketQueue = new Queue(rest, { url, deleteQueueDelay: rest.deleteQueueDelay, identifier: queueIdentifier });

        // Save queue
        rest.queues.set(`${queueIdentifier}${url}`, bucketQueue);

        // Add request to queue
        bucketQueue.makeRequest(request);
      }
    },

    async makeRequest(method, route, options) {
      // This error needs to be created here because of how stack traces get calculated
      const error = new Error();

      if (rest.isProxied) {
        if (rest.authorization) {
          options ??= {};
          options.headers ??= {};
          options.headers[rest.authorizationHeader] = rest.authorization;
        }

        const url = `${rest.baseUrl}/v${rest.version}${route}`;

        // An attempt that failed without a response is not re-sent by default. Whatever it failed on, the proxy may already have the request
        // (a timeout only aborts our side of the connection, and a socket that dies once the request is on the wire may still have delivered
        // it), so re-sending it would execute non-idempotent requests twice. `fetch` gives no way to tell the two apart, so the caller is the
        // one who decides: `proxy.retryRequests` says re-sending against this proxy is safe. Retrying towards Discord is the proxy's job, it
        // is the one talking to Discord.
        let retryCount = 0;

        for (;;) {
          // The request may have been aborted while the previous attempt was timing out, never send it in that case.
          if (options?.signal?.aborted) {
            throw rest.createRequestError(error, { ok: false, status: 999, error: 'The request was aborted.', errorObject: options.signal.reason });
          }

          // Give the attempt a deadline (omitted when disabled) so a stalled connection can't hang the caller forever, and hand the caller's
          // signal to fetch so aborting tears down a request that is already on the wire.
          const signals: AbortSignal[] = [];
          if (options?.signal) signals.push(options.signal);
          if (rest.requestTimeout > 0) signals.push(AbortSignal.timeout(rest.requestTimeout));

          const request = new Request(url, {
            ...rest.createRequestBody(method, options),
            signal: signals.length > 0 ? AbortSignal.any(signals) : undefined,
          });
          rest.events.request(request, {
            body: options?.body,
          });

          const result = await fetch(request).catch(async (fetchError) => {
            rest.events.requestError(request, fetchError, { body: options?.body });

            // The caller aborted the request, never re-send it, the proxy may have received it already.
            if (options?.signal?.aborted) {
              throw rest.createRequestError(error, { ok: false, status: 999, error: 'The request was aborted.', errorObject: fetchError });
            }

            const timedOut = isTimeoutError(fetchError);

            if (rest.retryProxiedRequests && retryCount < rest.maxRetryCount && retryCount < rest.maxProxyRetryCount) {
              retryCount++;
              rest.logger.debug(`request to proxy ${url} failed without a response, retrying.`, fetchError);
              // Wait a little longer before each further attempt so a proxy that is down isn't hammered in a tight loop, while staying
              // frequent enough to notice it coming back. A timed out attempt already sat out `requestTimeout`, so it goes again right away.
              if (!timedOut) await delay(rest.proxyRetryDelayStep * retryCount);
              return undefined;
            }

            if (timedOut) {
              rest.logger.debug(`request to proxy ${url} timed out after ${rest.requestTimeout}ms.`);
              throw rest.createRequestError(error, {
                ok: false,
                status: 999,
                error: 'The request timed out and it maxed out the retries limit.',
                errorObject: fetchError,
              });
            }

            rest.logger.debug(`request fetch to proxy ${url} failed.`, fetchError);
            throw rest.createRequestError(error, {
              ok: false,
              status: 999,
              error:
                'Possible network or request shape issue occurred. If this is rare, its a network glitch. If it occurs a lot something is wrong.',
              errorObject: fetchError,
            });
          });

          // If result is undefined, the attempt failed in a way that is safe to re-send and is being retried.
          if (!result) continue;

          // Sometimes the Content-Type may be "application/json; charset=utf-8", for this reason, we need to check the start of the header
          let bodyReadFailed = false;
          const body = await (result.headers.get('Content-Type')?.startsWith('application/json') ? result.json() : result.text()).catch(() => {
            bodyReadFailed = true;
            return null;
          });

          rest.events.response(request, result, {
            requestBody: options?.body,
            responseBody: body,
          });

          // `fetch` resolves once the headers are in, so an abort can land while the body above is still being read. That read rejects, the
          // fallback turns it into a `null` body and the caller gets it back as a successful empty response. A read that did finish is kept,
          // the same way the queued path hands back a result that arrived before the signal fired.
          if (bodyReadFailed && options?.signal?.aborted) {
            throw rest.createRequestError(error, { ok: false, status: 999, error: 'The request was aborted.', errorObject: options.signal.reason });
          }

          if (!result.ok) {
            throw rest.createRequestError(error, { ok: false, status: result.status, statusText: result.statusText, body });
          }

          return result.status !== 204 ? (typeof body === 'string' ? JSON.parse(body) : body) : undefined;
        }
      }

      return await new Promise(async (resolve, reject) => {
        const signal = options?.signal;
        const abortListener = () => {
          // Reject right away instead of waiting for the queue to reach the request. The signal is attached to the fetch itself as well, so an
          // attempt that is already in flight gets its connection torn down too.
          payload.reject({
            ok: false,
            status: 999,
            error: 'The request was aborted.',
            errorObject: signal?.reason,
          });
        };

        const payload: SendRequestOptions = {
          route,
          method,
          requestBodyOptions: options,
          retryCount: 0,
          retryRequest: async (payload: SendRequestOptions) => {
            await rest.processRequest(payload);
          },
          resolve: (data) => {
            signal?.removeEventListener('abort', abortListener);
            resolve(data.status !== 204 ? (data.body as Parameters<typeof resolve>[0]) : undefined!);
          },
          reject: (reason) => {
            signal?.removeEventListener('abort', abortListener);
            reject(rest.createRequestError(error, reason));
          },
          runThroughQueue: options?.runThroughQueue,
        };

        // Reject a queued request as soon as its signal aborts instead of when the queue reaches it, so a caller enforcing a deadline gets its
        // answer right away. Fetch refusing to send an already aborted request is what guarantees the stale queue entry never goes out.
        if (signal?.aborted) {
          abortListener();
          return;
        }

        signal?.addEventListener('abort', abortListener, { once: true });

        await rest.processRequest(payload);
      });
    },

    async get(url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) {
      return await rest.makeRequest('GET', url, options);
    },

    async post(url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) {
      return await rest.makeRequest('POST', url, options);
    },

    async delete(url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) {
      camelize(await rest.makeRequest('DELETE', url, options));
    },

    async patch(url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) {
      return await rest.makeRequest('PATCH', url, options);
    },

    async put(url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) {
      return await rest.makeRequest('PUT', url, options);
    },

    // We need to wrap all the functions to pass the rest manager as the first argument, so we can use it in the endpoints
    ...(Object.fromEntries(
      Object.entries(restEndpoints).map(([key, endpointFunc]) => {
        const func = endpointFunc as (rest: RestManager, ...args: unknown[]) => unknown;
        return [key, async (...args: unknown[]) => camelize(await func(rest, ...args))];
      }),
    ) as CamelizedRestEndpoints),

    // Same as above: this time since we don't need to camelize we can use .bind
    // undefined is used as the this because it will be the values for this in the functions above too since it isn't called with a this context
    snake: Object.fromEntries(
      Object.entries(restEndpoints).map(([key, endpointFunc]) => {
        const func = endpointFunc as (rest: RestManager, ...args: unknown[]) => unknown;
        return [key, async (...args: unknown[]) => await func(rest, ...args)];
      }),
    ) as RestEndpoints,

    preferSnakeCase(enabled: boolean) {
      const camelizer = enabled ? (x: any) => x : camelize;

      rest.get = async (url, options) => {
        return camelizer(await rest.makeRequest('GET', url, options));
      };

      rest.post = async (url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) => {
        return camelizer(await rest.makeRequest('POST', url, options));
      };

      rest.delete = async (url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) => {
        camelizer(await rest.makeRequest('DELETE', url, options));
      };

      rest.patch = async (url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) => {
        return camelizer(await rest.makeRequest('PATCH', url, options));
      };

      rest.put = async (url: string, options?: Omit<CreateRequestBodyOptions, 'body' | 'method'>) => {
        return camelizer(await rest.makeRequest('PUT', url, options));
      };

      return rest;
    },
  } satisfies RestManager;

  return rest;
}

enum HttpResponseCode {
  /** Minimum value of a code in oder to consider that it was successful. */
  Success = 200,
  /** Request completed successfully, but Discord returned an empty body. */
  NoContent = 204,
  /** Minimum value of a code in order to consider that something went wrong. */
  Error = 400,
  /** This request got rate limited. */
  TooManyRequests = 429,
}

/** Whether an error is the `TimeoutError` thrown by `AbortSignal.timeout()`. */
function isTimeoutError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'TimeoutError';
}
