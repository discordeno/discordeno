import { RestManager } from "../bot.ts";
import { HTTPResponseCodes } from "../types/shared.ts";

export async function processGlobalQueue(rest: RestManager) {
  // IF QUEUE IS EMPTY EXIT
  if (!rest.globalQueue.length) return;
  // IF QUEUE IS ALREADY RUNNING EXIT
  if (rest.globalQueueProcessing) return;

  // SET AS TRUE SO OTHER QUEUES DON'T START
  rest.globalQueueProcessing = true;

  while (rest.globalQueue.length) {
    // IF THE BOT IS GLOBALLY RATELIMITED TRY AGAIN
    if (rest.globallyRateLimited) {
      setTimeout(() => {
        rest.debug(`[REST - processGlobalQueue] Globally rate limited, running setTimeout.`);
        rest.processGlobalQueue(rest);
      }, 1000);

      // BREAK WHILE LOOP
      break;
    }

    if (rest.invalidRequests === rest.maxInvalidRequests - rest.invalidRequestsSafetyAmount) {
      setTimeout(() => {
        const time = rest.invalidRequestsInterval - (Date.now() - rest.invalidRequestFrozenAt);
        rest.debug(
          `[REST - processGlobalQueue] Freeze global queue because of invalid requests. Time Remaining: ${
            time / 1000
          } seconds.`,
        );
        rest.processGlobalQueue(rest);
      }, 1000);

      // BREAK WHILE LOOP
      break;
    }

    const request = rest.globalQueue.shift();
    // REMOVES ANY POTENTIAL INVALID CONFLICTS
    if (!request) continue;

    // CHECK RATELIMITS FOR 429 REPEATS
    // IF THIS URL IS STILL RATE LIMITED, TRY AGAIN
    const urlResetIn = rest.checkRateLimits(rest, request.basicURL);
    // IF A BUCKET EXISTS, CHECK THE BUCKET'S RATE LIMITS
    const bucketResetIn = request.payload.bucketId ? rest.checkRateLimits(rest, request.payload.bucketId) : false;

    if (urlResetIn || bucketResetIn) {
      // ONLY ADD TIMEOUT IF ANOTHER QUEUE IS NOT PENDING
      setTimeout(() => {
        rest.debug(`[REST - processGlobalQueue] rate limited, running setTimeout.`);
        // THIS REST IS RATE LIMITED, SO PUSH BACK TO START
        rest.globalQueue.unshift(request);
        // START QUEUE IF NOT STARTED
        rest.processGlobalQueue(rest);
      }, urlResetIn || (bucketResetIn as number));

      continue;
    }

    try {
      // CUSTOM HANDLER FOR USER TO LOG OR WHATEVER WHENEVER A FETCH IS MADE
      rest.debug(`[REST - fetching] URL: ${request.urlToUse} | ${JSON.stringify(request.payload)}`);

      const response = await fetch(request.urlToUse, rest.createRequestBody(rest, request));
      rest.debug(`[REST - fetched] URL: ${request.urlToUse} | ${JSON.stringify(request.payload)}`);

      const bucketIdFromHeaders = rest.processRequestHeaders(rest, request.basicURL, response.headers);
      // SET THE BUCKET Id IF IT WAS PRESENT
      if (bucketIdFromHeaders) {
        request.payload.bucketId = bucketIdFromHeaders;
      }

      if (response.status < 200 || response.status >= 400) {
        rest.debug(
          `[REST - httpError] Payload: ${JSON.stringify(request.payload)} | Response: ${JSON.stringify(response)}`,
        );

        let error = "REQUEST_UNKNOWN_ERROR";
        switch (response.status) {
          case HTTPResponseCodes.BadRequest:
            error = "The request was improperly formatted, or the server couldn't understand it.";
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
            error = "There was not a gateway available to process your request. Wait a bit and retry.";
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
              rest.debug(`[REST - processGlobalQueue] Resetting invalid requests counter in setTimeout.`);
              rest.invalidRequests = 0;
              rest.invalidRequestsTimeoutId = 0;
            }, rest.invalidRequestsInterval);
          }
        }

        // If NOT rate limited remove from queue
        if (response.status !== 429) {
          if (response.type) {
            console.log(JSON.stringify(await response.json()));
          }

          request.request.reject(new Error(`[${response.status}] ${error}`));
        } else {
          if (request.payload.retryCount++ >= rest.maxRetryCount) {
            rest.debug(`[REST - RetriesMaxed] ${JSON.stringify(request.payload)}`);
            // REMOVE ITEM FROM QUEUE TO PREVENT RETRY
            request.request.reject(
              new Error(`[${response.status}] The request was rate limited and it maxed out the retries limit.`),
            );
            continue;
          }

          // WAS RATE LIMITED. PUSH TO END OF GLOBAL QUEUE, SO WE DON'T BLOCK OTHER REQUESTS.
          rest.globalQueue.push(request);
        }

        continue;
      }

      // SOMETIMES DISCORD RETURNS AN EMPTY 204 RESPONSE THAT CAN'T BE MADE TO JSON
      if (response.status === 204) {
        rest.debug(`[REST - FetchSuccess] URL: ${request.urlToUse} | ${JSON.stringify(request.payload)}`);
        request.request.respond({ status: 204 });
      } else {
        // CONVERT THE RESPONSE TO JSON
        const json = await response.json();

        rest.debug(`[REST - fetchSuccess] ${JSON.stringify(request.payload)}`);
        request.request.respond({
          status: 200,
          body: JSON.stringify(json),
        });
      }
    } catch (error) {
      // SOMETHING WENT WRONG, LOG AND RESPOND WITH ERROR
      rest.debug(`[REST - fetchFailed] Payload: ${JSON.stringify(request.payload)} | Error: ${error}`);
      request.request.reject(error);
    }
  }

  // ALLOW OTHER QUEUES TO START WHEN NEW REQUEST IS MADE
  rest.globalQueueProcessing = false;
}
