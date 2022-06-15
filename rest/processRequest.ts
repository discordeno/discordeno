import { RestManager } from "./restManager.ts";
import { BASE_URL } from "../util/constants.ts";
import { RestPayload, RestRequest } from "./rest.ts";

/** Processes a request and assigns it to a queue or creates a queue if none exists for it. */
export function processRequest(rest: RestManager, request: RestRequest, payload: RestPayload) {
  const route = request.url.substring(request.url.indexOf("api/"));
  const parts = route.split("/");
  // REMOVE THE API
  parts.shift();
  // REMOVES THE VERSION NUMBER
  if (parts[0]?.startsWith("v")) parts.shift();
  // SET THE NEW REQUEST URL
  request.url = `${BASE_URL}/v${rest.version}/${parts.join("/")}`;
  // REMOVE THE MAJOR PARAM
  parts.shift();

  const url = rest.simplifyUrl(request.url, request.method);

  const queue = rest.pathQueues.get(url);
  if (queue) {
    queue.requests.push({ request, payload });
  } else {
    // CREATES A NEW QUEUE
    rest.pathQueues.set(url, {
      isWaiting: false,
      requests: [
        {
          request,
          payload,
        },
      ],
    });
    rest.processQueue(rest, url);
  }
}
