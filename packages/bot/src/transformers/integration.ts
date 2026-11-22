import type { DiscordIntegrationAccount, DiscordIntegrationApplication, DiscordIntegrationCreateUpdate } from '@discordeno/types';
import { iconHashToBigInt } from '@discordeno/utils';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { Integration, IntegrationAccount, IntegrationApplication } from './types.js';

export function transformIntegration(bot: Bot, payload: Partial<DiscordIntegrationCreateUpdate>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.integration;
  const integration = {} as SetupDesiredProps<Integration, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.guildId && payload.guild_id) integration.guildId = bot.transformers.snowflake(payload.guild_id);
  if (props.id && payload.id) integration.id = bot.transformers.snowflake(payload.id);
  if (props.name && payload.name) integration.name = payload.name;
  if (props.type && payload.type) integration.type = payload.type;
  if (props.enabled && payload.enabled) integration.enabled = payload.enabled;
  if (props.syncing && payload.syncing) integration.syncing = payload.syncing;
  if (props.roleId && payload.role_id) integration.roleId = bot.transformers.snowflake(payload.role_id);
  if (props.enableEmoticons && payload.enable_emoticons) integration.enableEmoticons = payload.enable_emoticons;
  if (props.expireBehavior && payload.expire_behavior !== undefined) integration.expireBehavior = payload.expire_behavior;
  if (props.expireGracePeriod && payload.expire_grace_period) integration.expireGracePeriod = payload.expire_grace_period;
  if (props.user && payload.user) integration.user = bot.transformers.user(bot, payload.user);
  if (props.account && payload.account) integration.account = bot.transformers.integrationAccount(bot, payload.account);
  if (props.syncedAt && payload.synced_at) integration.syncedAt = Date.parse(payload.synced_at);
  if (props.subscriberCount && payload.subscriber_count) integration.subscriberCount = payload.subscriber_count;
  if (props.revoked && payload.revoked) integration.revoked = payload.revoked;
  if (props.application && payload.application) integration.application = bot.transformers.integrationApplication(bot, payload.application);
  if (props.scopes && payload.scopes) integration.scopes = payload.scopes;

  return callCustomizer('integration', bot, payload, integration, {
    partial: extra?.partial ?? false,
  });
}

export function transformIntegrationAccount(bot: Bot, payload: Partial<DiscordIntegrationAccount>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.integrationAccount;
  const integrationAccount = {} as SetupDesiredProps<IntegrationAccount, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.id && payload.id !== undefined) integrationAccount.id = bot.transformers.snowflake(payload.id);
  if (props.name && payload.name !== undefined) integrationAccount.name = payload.name;

  return callCustomizer('integrationAccount', bot, payload, integrationAccount, {
    partial: extra?.partial ?? false,
  });
}

export function transformIntegrationApplication(bot: Bot, payload: Partial<DiscordIntegrationApplication>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.integrationApplication;
  const integrationApplication = {} as SetupDesiredProps<IntegrationApplication, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.id && payload.id !== undefined) integrationApplication.id = bot.transformers.snowflake(payload.id);
  if (props.name && payload.name !== undefined) integrationApplication.name = payload.name;
  if (props.description && payload.description !== undefined) integrationApplication.description = payload.description;
  if (props.icon && payload.icon !== undefined) integrationApplication.icon = payload.icon ? iconHashToBigInt(payload.icon) : undefined;
  if (props.bot && payload.bot !== undefined) integrationApplication.bot = bot.transformers.user(bot, payload.bot);

  return callCustomizer('integrationApplication', bot, payload, integrationApplication, {
    partial: extra?.partial ?? false,
  });
}
