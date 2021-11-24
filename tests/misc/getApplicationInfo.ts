import { assertEquals } from "../deps.ts";
import { bot } from "../mod.ts";

Deno.test("[application] Get application info", async () => {
  const application = await bot.helpers.getApplicationInfo();
  assertEquals(application.id, bot.id);
});
