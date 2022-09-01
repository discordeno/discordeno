import type { Bot } from "../../../bot.ts";
import { Integration } from "../../../transformers/integration.ts";
import { DiscordIntegration } from "../../../types/discord.ts";
import { Collection } from "../../../util/collection.ts";

/** Returns a list of integrations for the guild. Requires the MANAGE_GUILD permission. */
export async function getIntegrations(bot: Bot, guildId: bigint): Promise<Collection<bigint, Integration>> {
  const results = await bot.rest.runMethod<DiscordIntegration[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_INTEGRATIONS(guildId),
  );

  return new Collection(
    results.map((result) => {
      const integration = bot.transformers.integration(bot, {
        guild_id: guildId.toString(),
        id: result.id,
        name: result.name,
        type: result.type,
        enabled: result.enabled,
        syncing: result.syncing,
        role_id: result.role_id,
        enable_emoticons: result.enable_emoticons,
        expire_behavior: result.expire_behavior,
        expire_grace_period: result.expire_grace_period,
        user: result.user,
        account: result.account,
        synced_at: result.synced_at,
        subscriber_count: result.subscriber_count,
        revoked: result.revoked,
        application: result.application,
      });
      return [integration.id, integration];
    }),
  );
}
