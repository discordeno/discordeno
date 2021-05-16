import { rest, RestPayload, RestRequest } from "../../rest/rest.ts";
import Client from "../Client.ts";

export class RestManager {
  /** The bot client this is managing for. */
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /** Check the rate limits for a url or a bucket. */
  checkRateLimits(url: string) {
    return rest.checkRateLimits(url);
  }

  /** Cleans up the queues by checking if there is nothing left and removing it. */
  cleanupQueues() {
    return rest.cleanupQueues();
  }

  /** Creates the request body and headers that are necessary to send a request. Will handle different types of methods and everything necessary for discord. */
  createRequestBody(queuedRequest: {
    request: RestRequest;
    payload: RestPayload;
  }) {
    return rest.createRequestBody(queuedRequest);
  }

  /** Processes the queue by looping over each path separately until the queues are empty. */
  processQueue(id: string) {
    return rest.processQueue(id);
  }

  /** This will create a infinite loop running in 1 seconds using tail recursion to keep rate limits clean. When a rate limit resets, this will remove it so the queue can proceed. */
  processRateLimitedPaths() {
    return rest.processRateLimitedPaths();
  }

  /** Processes the rate limit headers and determines if it needs to be ratelimited and returns the bucket id if available */
  processRequestHeaders(url: string, headers: Headers) {
    return rest.processRequestHeaders(url, headers);
  }

  /** Processes a request and assigns it to a queue or creates a queue if none exists for it. */
  processRequest(request: RestRequest, payload: RestPayload) {
    return rest.processRequest(request, payload);
  }

  runMethod(
    method: "get" | "post" | "put" | "delete" | "patch",
    url: string,
    body?: unknown,
    retryCount = 0,
    bucketId?: string,
  ) {
    return rest.runMethod(method, url, body, retryCount, bucketId);
  }

  /** Send a fetch request to the api with this method. */
  get(url: string, body?: unknown, retryCount = 0, bucketId?: string) {
    return this.runMethod("get", url, body, retryCount, bucketId);
  }
  /** Send a fetch request to the api with this method. */
  post(url: string, body?: unknown, retryCount = 0, bucketId?: string) {
    return this.runMethod("post", url, body, retryCount, bucketId);
  }
  /** Send a fetch request to the api with this method. */
  put(url: string, body?: unknown, retryCount = 0, bucketId?: string) {
    return this.runMethod("put", url, body, retryCount, bucketId);
  }
  /** Send a fetch request to the api with this method. */
  delete(url: string, body?: unknown, retryCount = 0, bucketId?: string) {
    return this.runMethod("delete", url, body, retryCount, bucketId);
  }
  /** Send a fetch request to the api with this method. */
  patch(url: string, body?: unknown, retryCount = 0, bucketId?: string) {
    return this.runMethod("patch", url, body, retryCount, bucketId);
  }

  /** Splits the into simpler parts to process. */
  simplifyUrl(url: string, method: string) {
    return rest.simplifyUrl(url, method);
  }
}

export default RestManager;
