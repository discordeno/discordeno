import { HTTPResponseCodes } from "../types/shared.ts";
import { BASE_URL } from "../util/constants.ts";
import { RequestMethod } from "./rest.ts";
import { RestManager } from "./restManager.ts";

export interface RestSendRequestOptions {
  url: string;
  method: RequestMethod;
  bucketId?: string;
  reject?: Function;
  respond?: Function;
  retryCount?: number;
  payload?: {
    headers: Record<string, string>;
    body: string | FormData;
  };
}

export async function sendRequest<T>(rest: RestManager, options: RestSendRequestOptions): Promise<T> {
  try {
    // CUSTOM HANDLER FOR USER TO LOG OR WHATEVER WHENEVER A FETCH IS MADE
    rest.debug(`[REST - fetching] URL: ${options.url} | ${JSON.stringify(options)}`);

    const response = await fetch(
      options.url.startsWith(BASE_URL) ? options.url : `${BASE_URL}/v${rest.version}/${options.url}`,
      {
        method: options.method,
        headers: options.payload?.headers,
        body: options.payload?.body,
      },
    );
    rest.debug(`[REST - fetched] URL: ${options.url} | ${JSON.stringify(options)}`);

    const bucketIdFromHeaders = rest.processRequestHeaders(
      rest,
      rest.simplifyUrl(options.url, options.method),
      response.headers,
    );
    // SET THE BUCKET Id IF IT WAS PRESENT
    if (bucketIdFromHeaders) {
      options.bucketId = bucketIdFromHeaders;
    }

    if (response.status < 200 || response.status >= 400) {
      rest.debug(
        `[REST - httpError] Payload: ${JSON.stringify(options)} | Response: ${JSON.stringify(response)}`,
      );

      let error = "REQUEST_UNKNOWN_ERROR";
      switch (response.status) {
        case HTTPResponseCodes.BadRequest:
          error = "The options was improperly formatted, or the server couldn't understand it.";
          break;
        case HTTPResponseCodes.Unauthorized:
          error = "The Authorization header was missing or invalid.";
          break;
        case HTTPResponseCodes.Forbidden:
          error = "The Authorization token you passed did not have permission to the resource.";
          break;
        case HTTPResponseCodes.NotFound:
          error = "The resource at the location specified doesn't exist.";
          break;
        case HTTPResponseCodes.MethodNotAllowed:
          error = "The HTTP method used is not valid for the location specified.";
          break;
        case HTTPResponseCodes.GatewayUnavailable:
          error = "There was not a gateway available to process your options. Wait a bit and retry.";
          break;
      }

      if (
        rest.invalidRequestErrorStatuses.includes(response.status) &&
        !(response.status === 429 && response.headers.get("X-RateLimit-Scope"))
      ) {
        // INCREMENT CURRENT INVALID REQUESTS
        ++rest.invalidRequests;

        if (!rest.invalidRequestsTimeoutId) {
          rest.invalidRequestsTimeoutId = setTimeout(() => {
            rest.debug(`[REST - processGlobalQueue] Resetting invalid optionss counter in setTimeout.`);
            rest.invalidRequests = 0;
            rest.invalidRequestsTimeoutId = 0;
          }, rest.invalidRequestsInterval);
        }
      }

      // If NOT rate limited remove from queue
      if (response.status !== 429) {
        options.reject?.({
          ok: false,
          status: response.status,
          error,
          body: response.type ? JSON.stringify(await response.json()) : undefined,
        });

        throw new Error(
          JSON.stringify({
            ok: false,
            status: response.status,
            error,
            body: response.type ? JSON.stringify(await response.json()) : undefined,
          }),
        );
      } else {
        if (options.retryCount && options.retryCount++ >= rest.maxRetryCount) {
          rest.debug(`[REST - RetriesMaxed] ${JSON.stringify(options)}`);
          // REMOVE ITEM FROM QUEUE TO PREVENT RETRY
          options.reject?.({
            ok: false,
            status: response.status,
            error: "The options was rate limited and it maxed out the retries limit.",
          });

          // @ts-ignore Code should never reach here
          return;
        }
      }
    }

    // SOMETIMES DISCORD RETURNS AN EMPTY 204 RESPONSE THAT CAN'T BE MADE TO JSON
    if (response.status === 204) {
      rest.debug(`[REST - FetchSuccess] URL: ${options.url} | ${JSON.stringify(options)}`);
      options.respond?.({
        ok: true,
        status: 204,
      });
      // @ts-ignore 204 will be void
      return;
    } else {
      // CONVERT THE RESPONSE TO JSON
      const json = JSON.stringify(await response.json());

      rest.debug(`[REST - fetchSuccess] ${JSON.stringify(options)}`);
      options.respond?.({
        ok: true,
        status: 200,
        body: json,
      });

      return JSON.parse(json);
    }
  } catch (error) {
    // SOMETHING WENT WRONG, LOG AND RESPOND WITH ERROR
    rest.debug(`[REST - fetchFailed] Payload: ${JSON.stringify(options)} | Error: ${error}`);
    options.reject?.({
      ok: false,
      status: 599,
      error: "Internal Proxy Error",
    });

    throw new Error("Something went wrong in sendRequest", {
      cause: error,
    });
  }
}
