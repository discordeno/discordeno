import type { Integration } from "../../types/integrations/integration.ts";
import type { Bot } from "../../bot.ts";
import { Collection } from "../../util/collection.ts";

/** Returns a list of integrations for the guild. Requires the MANAGE_GUILD permission. */
export async function getIntegrations(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<Integration[]>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_INTEGRATIONS(guildId),
  );

  return new Collection(
    result.map((res) => {
      const integration = bot.transformers.integration(bot, {
        guild_id: guildId.toString(),
        id: res.id,
        name: res.name,
        type: res.type,
        enabled: res.enabled,
        syncing: res.syncing,
        role_id: res.role_id,
        enable_emoticons: res.enable_emoticons,
        expire_behavior: res.expire_behavior,
        expire_grace_period: res.expire_grace_period,
        user: res.user,
        account: res.account,
        synced_at: res.synced_at,
        subscriber_count: res.subscriber_count,
        revoked: res.revoked,
        application: res.application,
      });
      return [integration.id, integration];
    }),
  );
}
