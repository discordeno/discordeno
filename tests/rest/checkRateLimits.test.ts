import { checkRateLimits, createRestManager, RestManager } from "../../mod.ts";
import { afterEach, assertEquals, beforeEach, describe, FakeTime, it } from "../deps.ts";

describe("[rest] checkRateLimits", {
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

  it("Without rateLimitedPath", () => {
    assertEquals(checkRateLimits(rest, "/channel/555555555555555555"), false);
  });

  describe("With Per URL rateLimitedPath", () => {
    it("Will return time until reset if before resetTimestamp", () => {
      rest.rateLimitedPaths.set("/channel/555555555555555555", {
        url: "/channel/555555555555555555",
        resetTimestamp: Date.now() + 6541,
      });
      assertEquals(checkRateLimits(rest, "/channel/555555555555555555"), 6541);
    });

    it("Will return false if before resetTimestamp", () => {
      rest.rateLimitedPaths.set("/channel/555555555555555555", {
        url: "/channel/555555555555555555",
        resetTimestamp: Date.now(),
      });
      assertEquals(checkRateLimits(rest, "/channel/555555555555555555"), false);
    });
  });

  describe("With Global rateLimitedPath", () => {
    it("Will return time until reset if before resetTimestamp", () => {
      rest.rateLimitedPaths.set("global", { url: "/channel/555555555555555555", resetTimestamp: Date.now() + 9849 });
      assertEquals(checkRateLimits(rest, "/channel/555555555555555555"), 9849);
    });

    it("Will return false if before resetTimestamp", () => {
      rest.rateLimitedPaths.set("global", { url: "/channel/555555555555555555", resetTimestamp: Date.now() });
      assertEquals(checkRateLimits(rest, "/channel/555555555555555555"), false);
    });
  });

  describe("With both URL and Global rateLimitedPath", () => {
    it("Will return URL time first if before resetTimestamp", () => {
      rest.rateLimitedPaths.set("/channel/555555555555555555", {
        url: "/channel/555555555555555555",
        resetTimestamp: Date.now() + 6541,
      });
      rest.rateLimitedPaths.set("global", { url: "/channel/555555555555555555", resetTimestamp: Date.now() + 9849 });
      assertEquals(checkRateLimits(rest, "/channel/555555555555555555"), 6541);
    });
  });
});
