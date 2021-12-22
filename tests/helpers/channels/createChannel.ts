import { CreateGuildChannel } from "../../../src/types/guilds/createGuildChannel.ts";
import { ChannelTypes } from "../../../src/types/mod.ts";
import { assertExists, assertEquals } from "../../deps.ts";
import { bot } from "../../mod.ts";
import { delayUntil } from "../../utils.ts";

export async function createChannelTests(
  guildId: bigint,
  options: CreateGuildChannel,
  autoDelete: boolean,
) {
  const channel = await bot.helpers.createChannel(guildId, options);

  // Assertions
  assertExists(channel);
  assertEquals(channel.type, options.type || ChannelTypes.GuildText);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.channels.has(channel.id));

  if (!bot.channels.has(channel.id)) {
    throw new Error("The channel seemed to be created but it was not cached.");
  }

  if (options.topic && channel.topic !== options.topic) {
    throw new Error("The channel was supposed to have a topic but it does not appear to be the same topic.");
  }

  if (options.bitrate && channel.bitrate !== options.bitrate) {
    throw new Error("The channel was supposed to have a bitrate but it does not appear to be the same bitrate.");
  }

  if (options.permissionOverwrites && channel.permissionOverwrites?.length !== options.permissionOverwrites.length) {
    throw new Error(
      "The channel was supposed to have a permissionOverwrites but it does not appear to be the same permissionOverwrites."
    );
  }

  if (autoDelete) {
    await bot.helpers.deleteChannel(channel.id);
  }
}
