import { assertEquals } from "../deps.ts";
import { bot, guild } from "../mod.ts";

Deno.test("[channel] Get all channels", async () => {
  await Promise.all([
    bot.helpers.createChannel(guild.id, { name: "first" }),
    bot.helpers.createChannel(guild.id, { name: "second" }),
  ]);

  const channels = await bot.helpers.getChannels(guild.id);

  assertEquals(channels.size > 1, true);
});
