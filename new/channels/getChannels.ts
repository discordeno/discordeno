import { bot, guild } from "../mod.ts";
import { assertEquals, assertExists } from "../deps.ts";
export default async function (channelsSize: number) {
  const channels = await bot.helpers.getChannels(guild.id);
  assertExists(channels);
  assertEquals(channels.size >= channelsSize, true);
}
