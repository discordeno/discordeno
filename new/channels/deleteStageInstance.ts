import { bot } from "../mod.ts";
import { Channel } from "../../transformers/channel.ts";

export default async function (channel: Channel) {
  await bot.helpers.deleteStageInstance(channel.id);
}
