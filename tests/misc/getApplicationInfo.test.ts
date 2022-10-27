import { assertEquals } from "../deps.ts";
import { loadBot } from "../mod.ts";

Deno.test({
  name: "[application] Get application info",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
    const application = await bot.helpers.getApplicationInfo();
    assertEquals(application.id, bot.id);
  },
});
