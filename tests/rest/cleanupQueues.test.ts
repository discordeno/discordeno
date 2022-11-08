import { cleanupQueues, createRestManager, RestManager, RestPayload, RestRequest } from "../../mod.ts";
import { assertEquals, beforeEach, describe, it } from "../deps.ts";

describe("[rest] cleanupQueues", {
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
}, () => {
  let rest: RestManager;

  const fakeRequest: { request: RestRequest; payload: RestPayload } = {
    payload: { retryCount: 0 },
    request: { method: "DELETE", reject: () => {}, respond: () => {}, url: "" },
  };

  beforeEach(() => {
    rest = createRestManager({ token: " " });
  });

  describe("pathQueues", () => {
    it("Will delete queue from pathQueues if queue empty", () => {
      rest.pathQueues.set("", { isWaiting: false, requests: [] });
      cleanupQueues(rest);
      assertEquals(rest.pathQueues.size, 0);
    });

    it("Will not delete queue from pathQueues if queue not empty", () => {
      rest.pathQueues.set("", { isWaiting: false, requests: [fakeRequest, fakeRequest] });
      cleanupQueues(rest);
      assertEquals(rest.pathQueues.size, 1);
    });
  });

  describe("processingQueue", () => {
    it("Will not disable the queue if queues is not empty", () => {
      rest.processingQueue = true;
      rest.pathQueues.set("", { isWaiting: false, requests: [fakeRequest] });
      cleanupQueues(rest);
      assertEquals(rest.processingQueue, true);
    });

    it("Will disable the queue if queues is empty", () => {
      rest.processingQueue = true;
      cleanupQueues(rest);
      assertEquals(rest.processingQueue, false);
    });
  });
});
