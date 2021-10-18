import type { AddGuildDiscoverySubcategory } from "../../types/discovery/add_guild_discovery_subcategory.ts";
import {Bot} from "../../bot.ts";
import {SnakeCasedPropertiesDeep} from "../../types/util.ts";

/** Add a discovery subcategory to the guild. Requires the `MANAGE_GUILD` permission. */
export async function addDiscoverySubcategory(bot: Bot, guildId: bigint, categoryId: number) {
  await bot.utils.requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

  return await bot.rest.runMethod<SnakeCasedPropertiesDeep<AddGuildDiscoverySubcategory>>(
      bot.rest,
      "post",
      bot.constants.endpoints.DISCOVERY_SUBCATEGORY(guildId, categoryId)
  );
}
