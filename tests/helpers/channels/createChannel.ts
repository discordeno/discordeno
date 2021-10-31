import { Bot } from "../../../src/bot.ts";
import { CreateGuildChannel } from "../../../src/types/guilds/create_guild_channel.ts";
import { DiscordChannelTypes } from "../../../src/types/mod.ts";
import { assertExists,assertEquals } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

export async function createChannelTests(bot: Bot, guildId: bigint, options: CreateGuildChannel, t: Deno.TestContext) {
    const channel = await bot.helpers.createChannel(guildId, options);
  
    // Assertions
    assertExists(channel);
    assertEquals(channel.type, options.type || DiscordChannelTypes.GuildText);
  
    // Delay the execution to allow event to be processed
    await delayUntil(10000, () => bot.cache.channels.has(channel.id));
  
    if (!bot.cache.channels.has(channel.id)) {
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
  }