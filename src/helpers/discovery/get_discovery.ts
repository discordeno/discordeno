import type { DiscoveryMetadata } from "../../types/discovery/discovery_metadata.ts";
import type { Bot } from "../../bot.ts";

/** Returns the discovery metadata object for the guild. Requires the `MANAGE_GUILD` permission. */
export async function getDiscovery(bot: Bot, guildId: bigint) {
  return await bot.rest.runMethod<DiscoveryMetadata>(
    bot.rest,
    "get",
    bot.constants.endpoints.DISCOVERY_METADATA(guildId)
  );
}
