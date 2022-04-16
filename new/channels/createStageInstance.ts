import { assertExists } from "../deps.ts";
import { bot } from "../mod.ts";
import { Channel } from "../../transformers/channel.ts";

export default async function (channel: Channel) {
  const instance = await bot.helpers.createStageInstance({ channelId: channel.id, topic: "create-stage-instance" });
  assertExists(instance);
}
