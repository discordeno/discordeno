import { Errors } from "../types/misc/errors.ts";
import { API_VERSION, BASE_URL, IMAGE_BASE_URL } from "../util/constants.ts";
import { rest } from "./rest.ts";

export function runMethod<T = any>(
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  body?: unknown,
  retryCount = 0,
  bucketId?: string | null,
): Promise<T> | undefined {
  rest.eventHandlers.debug?.("requestCreate", {
    method,
    url,
    body,
    retryCount,
    bucketId,
  });

  const errorStack = new Error("Location:");
  Error.captureStackTrace(errorStack);

  // For proxies we don't need to do any of the legwork so we just forward the request
  if (
    !url.startsWith(`${BASE_URL}/v${API_VERSION}`) &&
    !url.startsWith(IMAGE_BASE_URL)
  ) {
    return fetch(url, {
      body: JSON.stringify(body || {}),
      headers: {
        authorization: rest.authorization,
      },
      method: method.toUpperCase(),
    })
      .then((res) => {
        if (res.status === 204) return undefined;

        return res.json() as T;
      })
      .catch((error) => {
        console.error(error);
        throw errorStack;
      });
  }

  // No proxy so we need to handle all rate limiting and such
  // deno-lint-ignore no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const callback = async () => {
      try {
        const rateLimitResetIn = rest.checkRateLimits(url);
        if (rateLimitResetIn) {
          return { rateLimited: rateLimitResetIn, beforeFetch: true, bucketId };
        }

        const query = method === "get" && body
          ? // deno-lint-ignore no-explicit-any
            Object.entries(body as any)
              .map(
                ([key, value]) =>
                  `${encodeURIComponent(key)}=${
                    encodeURIComponent(
                      value as string | number | boolean,
                    )
                  }`,
              )
              .join("&")
          : "";
        const urlToUse = method === "get" && query ? `${url}?${query}` : url;

        rest.eventHandlers.debug?.("requestFetch", {
          method,
          url,
          body,
          retryCount,
          bucketId,
        });
        const response = await fetch(
          urlToUse,
          rest.createRequestBody(body, method),
        );
        rest.eventHandlers.debug?.("requestFetched", {
          method,
          url,
          body,
          retryCount,
          bucketId,
          response,
        });
        const bucketIdFromHeaders = rest.processRequestHeaders(
          url,
          response.headers,
        );
        await rest.handleStatusCode(response, errorStack);

        // Sometimes Discord returns an empty 204 response that can't be made to JSON.
        if (response.status === 204) return resolve(undefined as unknown as T);

        const json = await response.json();
        if (
          json.retry_after ||
          json.message === "You are being rate limited."
        ) {
          if (retryCount > 10) {
            rest.eventHandlers.error?.("globalRateLimit", {
              method,
              url,
              body,
              retryCount,
              bucketId,
              errorStack,
            });
            throw new Error(Errors.RATE_LIMIT_RETRY_MAXED);
          }

          return {
            rateLimited: json.retry_after,
            beforeFetch: false,
            bucketId: bucketIdFromHeaders,
          };
        }

        rest.eventHandlers.debug?.("requestSuccess", {
          method,
          url,
          body,
          retryCount,
          bucketId,
        });
        return resolve(json);
      } catch (error) {
        rest.eventHandlers.error?.("unknown", {
          method,
          url,
          body,
          retryCount,
          bucketId,
          errorStack,
        });
        return reject(error);
      }
    };

    rest.addToQueue({
      callback,
      bucketId,
      url,
    });
    if (!rest.queueInProcess) {
      rest.queueInProcess = true;
      await rest.processQueue();
    }
  });
}
