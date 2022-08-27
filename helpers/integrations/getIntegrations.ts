import type { Bot } from "../../bot.ts";
import { Integration } from "../../transformers/integration.ts";
import { DiscordIntegration } from "../../types/discord.ts";
import { Collection } from "../../util/collection.ts";

/** Returns a list of integrations for the guild. Requires the MANAGE_GUILD permission. */
export async function getIntegrations(bot: Bot, guildId: bigint): Promise<Collection<bigint, Integration>> {
  const results = await bot.rest.runMethod<DiscordIntegration[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_INTEGRATIONS(guildId),
  );

  return new Collection(
    results.map((result) => {
      const integration = bot.transformers.integration(bot, { guild_id: guildId.toString(), ...result });
      return [integration.id, integration];
    }),
  );
}
