import { bot } from "../mod.ts";
import { Channel } from "../../transformers/channel.ts";
import { assertEquals } from "../deps.ts";

export default async function (channel: Channel) {
  const fetched = await bot.helpers.getChannel(channel.id);
  assertEquals(fetched, channel);
}
