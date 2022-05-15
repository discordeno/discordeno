import type { Bot } from "../../bot.ts";
import { DiscordDiscoveryMetadata } from "../../types/discord.ts";

/** Returns the discovery metadata object for the guild. Requires the `MANAGE_GUILD` permission. */
export async function getDiscovery(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<DiscordDiscoveryMetadata>(
    bot.rest,
    "get",
    bot.constants.endpoints.DISCOVERY_METADATA(guildId),
  );

  return bot.transformers.discoveryMetadata(bot, { ...result, guildId });
}
