import { bot } from "../mod.ts";
import { Channel } from "../../transformers/channel.ts";
import { assertEquals, assertExists } from "../deps.ts";

export default async function (channel: Channel) {
  const fetched = await bot.helpers.getChannel(channel.id);
  assertExists(fetched);
  assertEquals(fetched, channel);
}
