import { bot } from "../mod.ts";
import { delayUntil } from "../utils.ts";
import { Channel } from "../../transformers/channel.ts";

export default async function (channel: Channel) {
  // Delete the channel now without a reason
  await bot.helpers.deleteChannel(channel.id);
  // wait to give it time for event
  await delayUntil(10000, () => !bot.channels.has(channel.id));

  // Make sure it is gone from cache
  if (bot.channels.has(channel.id)) {
    throw new Error("The channel should have been deleted but it is still in cache.");
  }
}
