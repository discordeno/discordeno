import { assertEquals } from "../deps.ts";
import { bot, guild } from "../mod.ts";

Deno.test("[channel] Get a channel", async () => {
  const channel = await bot.helpers.createChannel(guild.id, {
    name: "fetching",
  });

  const fetched = await bot.helpers.getChannel(channel.id);

  assertEquals(channel.id, fetched.id);
  assertEquals(channel.name, fetched.name);
});
