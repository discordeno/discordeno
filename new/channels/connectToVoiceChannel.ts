import { assertEquals } from "../deps.ts";
import { bot, guild } from "../mod.ts";
import { delayUntil } from "../utils.ts";
import { Channel } from "../../transformers/channel.ts";

export default async function (channel: Channel) {
  let joined = false;

  bot.events.voiceStateUpdate = function (bot, voiceState) {
    if (voiceState.userId === bot.id && voiceState.channelId === channel.id) joined = true;
  };

  // CONNECT BOT
  await bot.helpers.connectToVoiceChannel(guild.id, channel.id);
  // WAIT FOR EVENT TO ARRIVE
  await delayUntil(10000, () => joined);

  assertEquals(joined, true);
}
