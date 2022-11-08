import { createRestManager, RestManager } from "../../mod.ts";
import { afterEach, assertEquals, assertSpyCalls, beforeEach, describe, FakeTime, it, spy } from "../deps.ts";

describe("[rest] processRateLimitedPaths", {
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
}, () => {
  let rest: RestManager;
  let time: FakeTime;

  beforeEach(() => {
    rest = createRestManager({ token: " " });
    time = new FakeTime();
  });

  afterEach(() => {
    time.restore();
  });

  describe("rateLimitedPaths", () => {
    it("Will not delete path from rateLimitedPaths before resetTimestamp", () => {
      rest.rateLimitedPaths.set("", { resetTimestamp: Date.now() + 1, url: "" });
      rest.processRateLimitedPaths(rest);
      assertEquals(rest.rateLimitedPaths.size, 1);
    });

    it("Will delete path from rateLimitedPaths after resetTimestamp", () => {
      rest.rateLimitedPaths.set("", { resetTimestamp: Date.now(), url: "" });
      rest.processRateLimitedPaths(rest);
      assertEquals(rest.rateLimitedPaths.size, 0);
    });

    it("Will mark globallyRateLimited false if key is global", () => {
      rest.rateLimitedPaths.set("global", { resetTimestamp: Date.now(), url: "" });
      rest.globallyRateLimited = true;
      rest.processRateLimitedPaths(rest);
      assertEquals(rest.rateLimitedPaths.size, 0);
      assertEquals(rest.globallyRateLimited, false);
    });

    it("Will not mark globallyRateLimited false if key is not global", () => {
      rest.rateLimitedPaths.set("", { resetTimestamp: Date.now(), url: "" });
      rest.globallyRateLimited = true;
      rest.processRateLimitedPaths(rest);
      assertEquals(rest.rateLimitedPaths.size, 0);
      assertEquals(rest.globallyRateLimited, true);
    });
  });

  describe("processingRateLimitedPaths", () => {
    it("Will set processing true if queues is not empty", () => {
      rest.processingRateLimitedPaths = true;
      rest.rateLimitedPaths.set("", { resetTimestamp: Date.now() + 1, url: "" });
      rest.processRateLimitedPaths(rest);
      assertEquals(rest.processingRateLimitedPaths, true);
    });

    it("Will set processing false if queues is empty", () => {
      rest.processingRateLimitedPaths = true;
      rest.processRateLimitedPaths(rest);
      assertEquals(rest.processingRateLimitedPaths, false);
    });

    it("Will set timeout if queues is empty", () => {
      rest.rateLimitedPaths.set("", { resetTimestamp: Date.now() + 1, url: "" });
      const processRateLimitedPathsSpy = spy(rest, "processRateLimitedPaths");
      rest.processRateLimitedPaths(rest);

      // Rerun after 1000ms
      time.tick(999);
      assertSpyCalls(processRateLimitedPathsSpy, 1);
      time.tick(1);
      assertSpyCalls(processRateLimitedPathsSpy, 2);
    });
  });
});
