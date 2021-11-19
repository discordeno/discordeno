import { delay } from "../src/util/utils.ts";

// CHANGE TO TRUE WHEN DEBUGGING SANITIZATION ERRORS
const sanitizeMode = {
  sanitizeResources: false,
  sanitizeOps: false,
  sanitizeExit: false,
};

Deno.test({
  name: "- Example Tests",
  fn: async (t) => {
    await t.step("Nested tests", async (t) => {
        await t.step({ name: "this is quick", fn: () => {}, ...sanitizeMode });

        await Promise.all([
            t.step({
                name: "[example] 1",
                fn: async (t) => {
                  await delay(60000);
                },
                ...sanitizeMode,
              }),
        ])
    });
  },
  ...sanitizeMode,
});
