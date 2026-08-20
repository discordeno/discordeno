import type { DiscordIntegrationAccount, DiscordIntegrationApplication, DiscordIntegrationCreateUpdate } from '@discordeno/types';
import { iconHashToBigInt } from '@discordeno/utils';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { Integration, IntegrationAccount, IntegrationApplication } from './types.js';

export function transformIntegration(bot: Bot, payload: Partial<DiscordIntegrationCreateUpdate>, extra?: { partial?: boolean }) {
  const integration = {} as SetupDesiredProps<Integration, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.guild_id) integration.guildId = bot.transformers.snowflake(payload.guild_id);
  if (payload.id) integration.id = bot.transformers.snowflake(payload.id);
  if (payload.name) integration.name = payload.name;
  if (payload.type) integration.type = payload.type;
  if (payload.enabled) integration.enabled = payload.enabled;
  if (payload.syncing) integration.syncing = payload.syncing;
  if (payload.role_id) integration.roleId = bot.transformers.snowflake(payload.role_id);
  if (payload.enable_emoticons) integration.enableEmoticons = payload.enable_emoticons;
  if (payload.expire_behavior) integration.expireBehavior = payload.expire_behavior;
  if (payload.expire_grace_period) integration.expireGracePeriod = payload.expire_grace_period;
  if (payload.user) integration.user = bot.transformers.user(bot, payload.user);
  if (payload.account) integration.account = bot.transformers.integrationAccount(bot, payload.account);
  if (payload.synced_at) integration.syncedAt = Date.parse(payload.synced_at);
  if (payload.subscriber_count) integration.subscriberCount = payload.subscriber_count;
  if (payload.revoked) integration.revoked = payload.revoked;
  if (payload.application) integration.application = bot.transformers.integrationApplication(bot, payload.application);
  if (payload.scopes) integration.scopes = payload.scopes;

  return callCustomizer('integration', bot, payload, integration, {
    partial: extra?.partial ?? false,
  });
}

export function transformIntegrationAccount(bot: Bot, payload: Partial<DiscordIntegrationAccount>, extra?: { partial?: boolean }) {
  const integrationAccount = {} as SetupDesiredProps<IntegrationAccount, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.id !== undefined) integrationAccount.id = bot.transformers.snowflake(payload.id);
  if (payload.name !== undefined) integrationAccount.name = payload.name;

  return callCustomizer('integrationAccount', bot, payload, integrationAccount, {
    partial: extra?.partial ?? false,
  });
}

export function transformIntegrationApplication(bot: Bot, payload: Partial<DiscordIntegrationApplication>, extra?: { partial?: boolean }) {
  const integrationApplication = {} as SetupDesiredProps<IntegrationApplication, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.id !== undefined) integrationApplication.id = bot.transformers.snowflake(payload.id);
  if (payload.name !== undefined) integrationApplication.name = payload.name;
  if (payload.description !== undefined) integrationApplication.description = payload.description;
  if (payload.icon !== undefined) integrationApplication.icon = payload.icon ? iconHashToBigInt(payload.icon) : undefined;
  if (payload.bot !== undefined) integrationApplication.bot = bot.transformers.user(bot, payload.bot);

  return callCustomizer('integrationApplication', bot, payload, integrationApplication, {
    partial: extra?.partial ?? false,
  });
}
