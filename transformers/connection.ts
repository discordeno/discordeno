import { Bot } from "../bot.ts";
import { DiscordConnection } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";

export function transformConnection(bot: Bot, payload: DiscordConnection) {
  const connection = {
    id: bot.transformers.snowflake(payload.id),
    name: payload.name,
    type: payload.type,
    revoked: payload.revoked,
    verified: payload.verified,
    friendSync: payload.friend_sync,
    showActivity: payload.show_activity,
    visibility: payload.visibility,
    integrations: payload.integrations?.map((integration) => ({
      id: integration.id ? bot.transformers.snowflake(integration.id) : undefined,
      name: integration.name,
      type: integration.type,
      enabled: integration.enabled,
      syncing: integration.syncing,
      roleId: integration.role_id ? bot.transformers.snowflake(integration.role_id) : undefined,
      enableEmoticons: integration.enable_emoticons,
      expireBehavior: integration.expire_behavior,
      expireGracePeriod: integration.expire_grace_period,
      user: integration.user ? bot.transformers.user(bot, integration.user) : undefined,
      account: integration.account
        ? {
          id: bot.transformers.snowflake(integration.account.id),
          name: integration.account.name,
        }
        : undefined,
      syncedAt: integration.synced_at ? Date.parse(integration.synced_at) : undefined,
      subscriberCount: integration.subscriber_count,
      revoked: integration.revoked,
      application: integration.application
        ? {
          id: bot.transformers.snowflake(integration.application.id),
          name: integration.application.name,
          icon: integration.application.icon ? bot.utils.iconHashToBigInt(integration.application.icon) : undefined,
          description: integration.application.description,
          bot: integration.application.bot ? bot.transformers.user(bot, integration.application.bot) : undefined,
        }
        : undefined,
    })),
  };

  return connection as Optionalize<typeof connection>;
}

export interface Connection extends ReturnType<typeof transformConnection> {}
