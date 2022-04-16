import { bot, guild } from "../mod.ts";
import { assertEquals } from "../deps.ts";
export default async function (channelsSize: number) {
  const channels = await bot.helpers.getChannels(guild.id);
  assertEquals(channels.size >= channelsSize, true);
}
