import { Bot } from "../bot.ts";
import { DiscordIntegrationCreateUpdate } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";

export function transformIntegration(bot: Bot, payload: DiscordIntegrationCreateUpdate) {
  const integration = {
    guildId: bot.transformers.snowflake(payload.guild_id),
    id: bot.transformers.snowflake(payload.id),
    name: payload.name,
    type: payload.type,
    enabled: payload.enabled,
    syncing: payload.syncing,
    roleId: payload.role_id ? bot.transformers.snowflake(payload.role_id) : undefined,
    enableEmoticons: payload.enable_emoticons,
    expireBehavior: payload.expire_behavior,
    expireGracePeriod: payload.expire_grace_period,
    user: payload.user ? bot.transformers.user(bot, payload.user) : undefined,
    account: {
      id: bot.transformers.snowflake(payload.account.id),
      name: payload.account.name,
    },
    syncedAt: payload.synced_at ? Date.parse(payload.synced_at) : undefined,
    subscriberCount: payload.subscriber_count,
    revoked: payload.revoked,
    application: payload.application
      ? {
        id: bot.transformers.snowflake(payload.application.id),
        name: payload.application.name,
        icon: payload.application.icon ? bot.utils.iconHashToBigInt(payload.application.icon) : undefined,
        description: payload.application.description,
        bot: payload.application.bot ? bot.transformers.user(bot, payload.application.bot) : undefined,
      }
      : undefined,
  };

  return integration as Optionalize<typeof integration>;
}

export interface Integration extends ReturnType<typeof transformIntegration> {}
