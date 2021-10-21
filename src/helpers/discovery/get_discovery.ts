import type { DiscoveryMetadata } from "../../types/discovery/discovery_metadata.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";
import type { Bot } from "../../bot.ts";

/** Returns the discovery metadata object for the guild. Requires the `MANAGE_GUILD` permission. */
export async function getDiscovery(bot: Bot, guildId: bigint) {
  await bot.utils.requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

  return await bot.rest.runMethod<SnakeCasedPropertiesDeep<DiscoveryMetadata>>(
    bot.rest,
    "get",
    bot.constants.endpoints.DISCOVERY_METADATA(guildId)
  );
}
