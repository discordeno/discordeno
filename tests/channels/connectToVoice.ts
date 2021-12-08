import { ChannelTypes } from "../../mod.ts";
import { assertEquals } from "../deps.ts";
import { bot, guild } from "../mod.ts";
import { delayUntil } from "../utils.ts";

Deno.test("[channel] Connect to voice channel.", async () => {
  const channel = await bot.helpers.createChannel(guild.id, {
    name: "lumap",
    type: ChannelTypes.GuildVoice,
  });

  let joined = false;

  bot.events.voiceStateUpdate = function (bot, voiceState) {
    if (voiceState.userId !== bot.id) return;
    joined = voiceState.channelId === channel.id;
  };

  // CONNECT BOT
  await bot.helpers.connectToVoiceChannel(guild.id, channel.id);
  // WAIT FOR EVENT TO ARRIVE
  await delayUntil(10000, () => joined);

  assertEquals(joined, true);
});
