import { assertSpyCalls } from "https://deno.land/std@0.162.0/testing/mock.ts";
import { createRestManager, processRequestHeaders, RestManager } from "../../mod.ts";
import { afterEach, assertEquals, beforeEach, describe, FakeTime, it, stub } from "../deps.ts";

describe("[rest] processRequestHeaders", {
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

  describe("With No limit", () => {
    it("will do nothing and return undefined if no bucketID", () => {
      stub(rest, "processRateLimitedPaths", () => {});
      const headers = new Headers();
      headers.set("x-ratelimit-remaining", "1");
      assertEquals(processRequestHeaders(rest, "/url/path", headers), undefined);
      assertEquals(rest.rateLimitedPaths.size, 0);
    });
    it("will do nothing and undefined if have bucketID", () => {
      stub(rest, "processRateLimitedPaths", () => {});
      const headers = new Headers();
      headers.set("x-ratelimit-remaining", "1");
      headers.set("x-ratelimit-bucket", "bucketID123");
      assertEquals(processRequestHeaders(rest, "/url/path", headers), undefined);
      assertEquals(rest.rateLimitedPaths.size, 0);
    });
  });

  describe("With Url limited", () => {
    it("will set url rateLimitedPaths and return undefined if no bucketID", () => {
      stub(rest, "processRateLimitedPaths", () => {});
      const headers = new Headers();
      headers.set("x-ratelimit-remaining", "0");
      headers.set("x-ratelimit-reset-after", "321");
      assertEquals(processRequestHeaders(rest, "/url/path", headers), undefined);
      assertEquals(rest.rateLimitedPaths.size, 1);
      assertEquals(rest.rateLimitedPaths.get("/url/path"), {
        url: "/url/path",
        resetTimestamp: Date.now() + 321000,
        bucketId: undefined,
      });
    });

    it("will set url and bucket rateLimitedPaths and return bucketIDs if have bucketID", () => {
      stub(rest, "processRateLimitedPaths", () => {});
      const headers = new Headers();
      headers.set("x-ratelimit-remaining", "0");
      headers.set("x-ratelimit-reset-after", "98");
      headers.set("x-ratelimit-bucket", "bucket123");
      assertEquals(processRequestHeaders(rest, "/url/path", headers), "bucket123");
      assertEquals(rest.rateLimitedPaths.size, 2);
      assertEquals(rest.rateLimitedPaths.get("/url/path"), {
        url: "/url/path",
        resetTimestamp: Date.now() + 98000,
        bucketId: "bucket123",
      });
      assertEquals(rest.rateLimitedPaths.get("bucket123"), {
        url: "/url/path",
        resetTimestamp: Date.now() + 98000,
        bucketId: "bucket123",
      });
    });

    it("will run processRateLimitedPaths if not processing", () => {
      const processRateLimitedPathsStub = stub(rest, "processRateLimitedPaths", () => {});
      const headers = new Headers();
      headers.set("x-ratelimit-remaining", "0");
      headers.set("x-ratelimit-reset-after", "98");
      rest.processingRateLimitedPaths = false;
      processRequestHeaders(rest, "/url/path", headers);
      assertSpyCalls(processRateLimitedPathsStub, 1);
    });

    it("will not run processRateLimitedPaths if processing", () => {
      const processRateLimitedPathsStub = stub(rest, "processRateLimitedPaths", () => {});
      const headers = new Headers();
      headers.set("x-ratelimit-remaining", "0");
      headers.set("x-ratelimit-reset-after", "98");
      rest.processingRateLimitedPaths = true;
      processRequestHeaders(rest, "/url/path", headers);
      assertSpyCalls(processRateLimitedPathsStub, 0);
    });
  });

  describe("With Global limited", () => {
    it("will set global rateLimitedPaths and return undefined if no bucketID", () => {
      stub(rest, "processRateLimitedPaths", () => {});
      const headers = new Headers();
      headers.set("x-ratelimit-global", "true");
      headers.set("retry-after", "89");
      assertEquals(processRequestHeaders(rest, "/url/path", headers), undefined);
      assertEquals(rest.rateLimitedPaths.size, 1);
      assertEquals(rest.rateLimitedPaths.get("global"), {
        url: "global",
        resetTimestamp: Date.now() + 89000,
        bucketId: undefined,
      });
    });

    it("will set global and bucket rateLimitedPaths and return bucketIDs if have bucketID", () => {
      stub(rest, "processRateLimitedPaths", () => {});
      const headers = new Headers();
      headers.set("x-ratelimit-global", "true");
      headers.set("retry-after", "13");
      headers.set("x-ratelimit-bucket", "bucket123");
      assertEquals(processRequestHeaders(rest, "/url/path", headers), "bucket123");
      assertEquals(rest.rateLimitedPaths.size, 2);
      assertEquals(rest.rateLimitedPaths.get("global"), {
        url: "global",
        resetTimestamp: Date.now() + 13000,
        bucketId: "bucket123",
      });
      assertEquals(rest.rateLimitedPaths.get("bucket123"), {
        url: "global",
        resetTimestamp: Date.now() + 13000,
        bucketId: "bucket123",
      });
    });

    it("will run processRateLimitedPaths if not processing", () => {
      const processRateLimitedPathsStub = stub(rest, "processRateLimitedPaths", () => {});
      const headers = new Headers();
      headers.set("x-ratelimit-global", "true");
      headers.set("retry-after", "89");
      rest.processingRateLimitedPaths = false;
      processRequestHeaders(rest, "/url/path", headers);
      assertSpyCalls(processRateLimitedPathsStub, 1);
    });

    it("will not run processRateLimitedPaths if processing", () => {
      const processRateLimitedPathsStub = stub(rest, "processRateLimitedPaths", () => {});
      const headers = new Headers();
      headers.set("x-ratelimit-global", "true");
      headers.set("retry-after", "89");
      rest.processingRateLimitedPaths = true;
      processRequestHeaders(rest, "/url/path", headers);
      assertSpyCalls(processRateLimitedPathsStub, 0);
    });
  });
});
