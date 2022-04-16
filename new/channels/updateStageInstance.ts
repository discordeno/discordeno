import { assertEquals, assertExists } from "../deps.ts";
import { bot } from "../mod.ts";
import { Channel } from "../../transformers/channel.ts";

export default async function (channel: Channel) {
  const topic = "edited";
  const edited = await bot.helpers.updateStageInstance(channel.id, {
    topic,
  });
  assertExists(edited);
  assertEquals(edited.topic, topic);
}
