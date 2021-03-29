/** Processes a request and assigns it to a queue or creates a queue if none exists for it. */
export function processRequest(
  request: ServerRequest,
  payload: RunMethodOptions,
  options: RestServerOptions,
) {
  const route = request.url.substring(request.url.indexOf("api/"));
  const parts = route.split("/");
  // REMOVE THE API
  parts.shift();
  // REMOVES THE VERSION NUMBER
  if (parts[0]?.startsWith("v")) parts.shift();
  // SET THE NEW REQUEST URL
  request.url = `${BASE_URL}/v${options.apiVersion || 8}/${parts.join("/")}`;
  // REMOVE THE MAJOR PARAM
  parts.shift();

  const [id] = parts;

  const queue = restCache.pathQueues.get(id);
  // IF THE QUEUE EXISTS JUST ADD THIS TO THE QUEUE
  if (queue) {
    queue.push({ request, payload, options });
  } else {
    // CREATES A NEW QUEUE
    restCache.pathQueues.set(id, [{
      request,
      payload,
      options,
    }]);
    processQueue(id);
  }
}
