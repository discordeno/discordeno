import type { Bot } from "../../bot.ts";
import { Integration } from "../../transformers/integration.ts";
import { DiscordIntegration } from "../../types/discord.ts";
import { Collection } from "../../util/collection.ts";

/** Returns a list of integrations for the guild. Requires the MANAGE_GUILD permission. */
export async function getIntegrations(bot: Bot, guildId: bigint): Promise<Collection<string, Integration>> {
  const result = await bot.rest.runMethod<DiscordIntegration[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_INTEGRATIONS(guildId),
  );

  return new Collection(
    result.map<[string, Integration]>((integration) => [
      integration.id,
      bot.transformers.integration(bot, {
        guild_id: guildId.toString(),
        id: integration.id,
        name: integration.name,
        type: integration.type,
        enabled: integration.enabled,
        syncing: integration.syncing,
        role_id: integration.role_id,
        enable_emoticons: integration.enable_emoticons,
        expire_behavior: integration.expire_behavior,
        expire_grace_period: integration.expire_grace_period,
        user: integration.user,
        account: integration.account,
        synced_at: integration.synced_at,
        subscriber_count: integration.subscriber_count,
        revoked: integration.revoked,
        application: integration.application,
      }),
    ]),
  );
}
