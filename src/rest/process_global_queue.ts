import { RestManager } from "../bot.ts";
import { DiscordHTTPResponseCodes } from "../types/codes/http_response_codes.ts";

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

    const request = rest.globalQueue[0];
    // REMOVES ANY POTENTIAL INVALID CONFLICTS
    if (!request) {
      rest.globalQueue.shift();
      continue;
    }

    // CHECK RATELIMITS FOR 429 REPEATS
    // IF THIS URL IS STILL RATE LIMITED, TRY AGAIN
    const urlResetIn = rest.checkRateLimits(rest, request.basicURL);
    // IF A BUCKET EXISTS, CHECK THE BUCKET'S RATE LIMITS
    const bucketResetIn = request.payload.bucketId ? rest.checkRateLimits(rest, request.payload.bucketId) : false;

    if (urlResetIn || bucketResetIn) {
      const rateLimitedRequest = rest.globalQueue.shift();
      if (rateLimitedRequest) {
        // ONLY ADD TIMEOUT IF ANOTHER QUEUE IS NOT PENDING
        setTimeout(() => {
          rest.debug(`[REST - processGlobalQueue] rate limited, running setTimeout.`);
          // THIS REST IS RATE LIMITED, SO PUSH BACK TO START
          rest.globalQueue.unshift(rateLimitedRequest);
          // START QUEUE IF NOT STARTED
          rest.processGlobalQueue(rest);
        }, urlResetIn || (bucketResetIn as number));
      }

      continue;
    }

    try {
      // CUSTOM HANDLER FOR USER TO LOG OR WHATEVER WHENEVER A FETCH IS MADE
      rest.debug(`[REST - fetching] ${JSON.stringify(request.payload)}`);

      const response = await fetch(request.urlToUse, rest.createRequestBody(rest, request));
      rest.debug(`[REST - fetched] ${JSON.stringify(request.payload)}`);

      const bucketIdFromHeaders = rest.processRequestHeaders(rest, request.basicURL, response.headers);
      // SET THE BUCKET Id IF IT WAS PRESENT
      if (bucketIdFromHeaders) {
        request.payload.bucketId = bucketIdFromHeaders;
      }

      if (response.status < 200 || response.status >= 400) {
        rest.debug(
          `[REST - httpError] Payload: ${JSON.stringify(request.payload)} | Response: ${JSON.stringify(response)}`
        );

        let error = "REQUEST_UNKNOWN_ERROR";
        switch (response.status) {
          case DiscordHTTPResponseCodes.BadRequest:
            error = "The request was improperly formatted, or the server couldn't understand it.";
            break;
          case DiscordHTTPResponseCodes.Unauthorized:
            error = "The Authorization header was missing or invalid.";
            break;
          case DiscordHTTPResponseCodes.Forbidden:
            error = "The Authorization token you passed did not have permission to the resource.";
            break;
          case DiscordHTTPResponseCodes.NotFound:
            error = "The resource at the location specified doesn't exist.";
            break;
          case DiscordHTTPResponseCodes.MethodNotAllowed:
            error = "The HTTP method used is not valid for the location specified.";
            break;
          case DiscordHTTPResponseCodes.GatewayUnavailable:
            error = "There was not a gateway available to process your request. Wait a bit and retry.";
            break;
        }

        // If NOT rate limited remove from queue
        if (response.status !== 429) {
          request.request.reject(new Error(`[${response.status}] ${error}`));
          rest.globalQueue.shift();
        } else {
          if (request.payload.retryCount++ >= rest.maxRetryCount) {
            rest.debug(`[REST - RetriesMaxed] ${JSON.stringify(request.payload)}`);
            // REMOVE ITEM FROM QUEUE TO PREVENT RETRY
            rest.globalQueue.shift();
            request.request.reject(
              new Error(`[${response.status}] The request was rate limited and it maxed out the retries limit.`)
            );
            continue;
          }

          // WAS RATE LIMITED. PUSH TO END OF GLOBAL QUEUE, SO WE DON'T BLOCK OTHER REQUESTS.
          rest.globalQueue.push(rest.globalQueue.shift()!);
        }

        continue;
      }

      // SOMETIMES DISCORD RETURNS AN EMPTY 204 RESPONSE THAT CAN'T BE MADE TO JSON
      if (response.status === 204) {
        rest.debug(`[REST - FetchSuccess] ${JSON.stringify(request.payload)}`);
        // REMOVE FROM QUEUE
        rest.globalQueue.shift();
        request.request.respond({ status: 204 });
      } else {
        // CONVERT THE RESPONSE TO JSON
        const json = await response.json();
        // IF THE RESPONSE WAS RATE LIMITED, HANDLE ACCORDINGLY
        // if (json.retry_after || json.message === "You are being rate limited.") {
        //   // IF IT HAS MAXED RETRIES SOMETHING SERIOUSLY WRONG. CANCEL OUT.
        //   if (request.payload.retryCount >= rest.maxRetryCount) {
        //     rest.eventHandlers.retriesMaxed(request.payload);
        //     request.request.respond({
        //       status: 200,
        //       body: JSON.stringify({
        //         error: "The request was rate limited and it maxed out the retries limit.",
        //       }),
        //     });
        //     // REMOVE ITEM FROM QUEUE TO PREVENT RETRY
        //     rest.globalQueue.shift();
        //     continue;
        //   }

        //   // SINCE IT WAS RATELIMITE, RETRY AGAIN
        //   continue;
        // }

        rest.debug(`[REST - fetchSuccess] ${JSON.stringify(request.payload)}`);
        // REMOVE FROM QUEUE
        rest.globalQueue.shift();
        request.request.respond({
          status: 200,
          body: JSON.stringify(json),
        });
      }
    } catch (error) {
      // SOMETHING WENT WRONG, LOG AND RESPOND WITH ERROR
      rest.debug(`[REST - fetchFailed] Payload: ${JSON.stringify(request.payload)} | Error: ${error}`);
      request.request.reject(error);
      // REMOVE FROM QUEUE
      rest.globalQueue.shift();
    }
  }

  // ALLOW OTHER QUEUES TO START WHEN NEW REQUEST IS MADE
  rest.globalQueueProcessing = false;
}
