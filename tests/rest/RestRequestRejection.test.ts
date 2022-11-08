import { convertRestError } from "../../mod.ts";
import { assertStringIncludes, describe, it } from "../deps.ts";

describe("[rest] convertRestError", {
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
}, () => {
  it("Should contain important info", () => {
    const convertedError = convertRestError(new Error(), {
      status: 404,
      error: "error message",
      body: "error body",
      ok: false,
    });
    assertStringIncludes(convertedError.message, "404");
    assertStringIncludes(convertedError.message, "error message");
    assertStringIncludes(convertedError.message, "error body");
  });
});
