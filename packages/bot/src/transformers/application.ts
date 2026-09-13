import { type DiscordApplication, DiscordApplicationIntegrationType } from '@discordeno/types';
import { iconHashToBigInt } from '@discordeno/utils';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import { ToggleBitfield } from './toggles/ToggleBitfield.js';
import type { Application } from './types.js';

export function transformApplication(bot: Bot, payload: Partial<DiscordApplication>, extra?: { shardId?: number; partial?: boolean }) {
  const application = {} as SetupDesiredProps<Application, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.name) application.name = payload.name;
  if (payload.description) application.description = payload.description;
  if (payload.rpc_origins) application.rpcOrigins = payload.rpc_origins;
  if (payload.bot_public !== undefined) application.botPublic = payload.bot_public;
  if (payload.bot_require_code_grant !== undefined) application.botRequireCodeGrant = payload.bot_require_code_grant;
  if (payload.terms_of_service_url) application.termsOfServiceUrl = payload.terms_of_service_url;
  if (payload.privacy_policy_url) application.privacyPolicyUrl = payload.privacy_policy_url;
  if (payload.verify_key) application.verifyKey = payload.verify_key;
  if (payload.primary_sku_id) application.primarySkuId = payload.primary_sku_id;
  if (payload.slug) application.slug = payload.slug;
  if (payload.cover_image) application.coverImage = iconHashToBigInt(payload.cover_image);
  if (payload.flags !== undefined) application.flags = payload.flags;
  // flags_new is a string with the bitfield inside
  if (payload.flags_new) application.flagsNew = new ToggleBitfield(Number(payload.flags_new));
  if (payload.id) application.id = bot.transformers.snowflake(payload.id);
  if (payload.icon) application.icon = iconHashToBigInt(payload.icon);
  if (payload.owner) application.owner = bot.transformers.user(bot, payload.owner, { partial: true });
  if (payload.team) application.team = bot.transformers.team(bot, payload.team);
  if (payload.guild_id) application.guildId = bot.transformers.snowflake(payload.guild_id);
  if (payload.custom_install_url) application.customInstallUrl = payload.custom_install_url;
  if (payload.guild) application.guild = bot.transformers.guild(bot, payload.guild, { shardId: extra?.shardId, partial: true });
  if (payload.approximate_guild_count !== undefined) application.approximateGuildCount = payload.approximate_guild_count;
  if (payload.approximate_user_install_count !== undefined) application.approximateUserInstallCount = payload.approximate_user_install_count;
  if (payload.approximate_user_authorization_count !== undefined)
    application.approximateUserAuthorizationCount = payload.approximate_user_authorization_count;
  if (payload.bot) application.bot = bot.transformers.user(bot, payload.bot, { partial: true });
  if (payload.interactions_endpoint_url) application.interactionsEndpointUrl = payload.interactions_endpoint_url;
  if (payload.redirect_uris) application.redirectUris = payload.redirect_uris;
  if (payload.role_connections_verification_url) application.roleConnectionsVerificationUrl = payload.role_connections_verification_url;
  if (payload.tags) application.tags = payload.tags;
  if (payload.install_params) {
    application.installParams = {
      scopes: payload.install_params.scopes,
      permissions: bot.transformers.snowflake(payload.install_params.permissions),
    };
  }
  if (payload.integration_types_config) {
    application.integrationTypesConfig = {
      [DiscordApplicationIntegrationType.GuildInstall]: payload.integration_types_config['0']?.oauth2_install_params
        ? {
            oauth2InstallParams: {
              scopes: payload.integration_types_config['0'].oauth2_install_params.scopes,
              permissions: bot.transformers.snowflake(payload.integration_types_config['0'].oauth2_install_params.permissions),
            },
          }
        : undefined,
      [DiscordApplicationIntegrationType.UserInstall]: payload.integration_types_config['1']?.oauth2_install_params
        ? {
            oauth2InstallParams: {
              scopes: payload.integration_types_config['1'].oauth2_install_params.scopes,
              permissions: bot.transformers.snowflake(payload.integration_types_config['1'].oauth2_install_params.permissions),
            },
          }
        : undefined,
    };
  }
  if (payload.event_webhooks_url) application.eventWebhooksUrl = payload.event_webhooks_url;
  if (payload.event_webhooks_status) application.eventWebhooksStatus = payload.event_webhooks_status;
  if (payload.event_webhooks_types) application.eventWebhooksTypes = payload.event_webhooks_types;

  return callCustomizer('application', bot, payload, application, {
    shardId: extra?.shardId,
    partial: extra?.partial ?? false,
  });
}
