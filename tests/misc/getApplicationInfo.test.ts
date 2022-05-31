import { assertEquals } from "../deps.ts";
import { loadBot } from "../mod.ts";

Deno.test("[application] Get application info", async () => {
  const bot = loadBot();
  const application = await bot.helpers.getApplicationInfo();
  assertEquals(application.id, bot.id);
});
