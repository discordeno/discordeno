import { type DiscordApplication, DiscordApplicationIntegrationType } from '@discordeno/types';
import { iconHashToBigInt } from '@discordeno/utils';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import { ToggleBitfield } from './toggles/ToggleBitfield.js';
import type { Application } from './types.js';

export function transformApplication(bot: Bot, payload: Partial<DiscordApplication>, extra?: { shardId?: number; partial?: boolean }) {
  const props = bot.transformers.desiredProperties.application;
  const application = {} as SetupDesiredProps<Application, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.name && payload.name) application.name = payload.name;
  if (props.description && payload.description) application.description = payload.description;
  if (props.rpcOrigins && payload.rpc_origins) application.rpcOrigins = payload.rpc_origins;
  if (props.botPublic && payload.bot_public !== undefined) application.botPublic = payload.bot_public;
  if (props.botRequireCodeGrant && payload.bot_require_code_grant !== undefined) application.botRequireCodeGrant = payload.bot_require_code_grant;
  if (props.termsOfServiceUrl && payload.terms_of_service_url) application.termsOfServiceUrl = payload.terms_of_service_url;
  if (props.privacyPolicyUrl && payload.privacy_policy_url) application.privacyPolicyUrl = payload.privacy_policy_url;
  if (props.verifyKey && payload.verify_key) application.verifyKey = payload.verify_key;
  if (props.primarySkuId && payload.primary_sku_id) application.primarySkuId = payload.primary_sku_id;
  if (props.slug && payload.slug) application.slug = payload.slug;
  if (props.coverImage && payload.cover_image) application.coverImage = iconHashToBigInt(payload.cover_image);
  if (props.flags && payload.flags !== undefined) application.flags = payload.flags;
  // flags_new is a string with the bitfield inside
  if (props.flagsNew && payload.flags_new) application.flagsNew = new ToggleBitfield(Number(payload.flags_new));
  if (props.id && payload.id) application.id = bot.transformers.snowflake(payload.id);
  if (props.icon && payload.icon) application.icon = iconHashToBigInt(payload.icon);
  if (props.owner && payload.owner) application.owner = bot.transformers.user(bot, payload.owner, { partial: true });
  if (props.team && payload.team) application.team = bot.transformers.team(bot, payload.team);
  if (props.guildId && payload.guild_id) application.guildId = bot.transformers.snowflake(payload.guild_id);
  if (props.customInstallUrl && payload.custom_install_url) application.customInstallUrl = payload.custom_install_url;
  if (props.guild && payload.guild) application.guild = bot.transformers.guild(bot, payload.guild, { shardId: extra?.shardId, partial: true });
  if (props.approximateGuildCount && payload.approximate_guild_count !== undefined)
    application.approximateGuildCount = payload.approximate_guild_count;
  if (props.approximateUserInstallCount && payload.approximate_user_install_count !== undefined)
    application.approximateUserInstallCount = payload.approximate_user_install_count;
  if (props.approximateUserAuthorizationCount && payload.approximate_user_authorization_count !== undefined)
    application.approximateUserAuthorizationCount = payload.approximate_user_authorization_count;
  if (props.bot && payload.bot) application.bot = bot.transformers.user(bot, payload.bot, { partial: true });
  if (props.interactionsEndpointUrl && payload.interactions_endpoint_url) application.interactionsEndpointUrl = payload.interactions_endpoint_url;
  if (props.redirectUris && payload.redirect_uris) application.redirectUris = payload.redirect_uris;
  if (props.roleConnectionsVerificationUrl && payload.role_connections_verification_url)
    application.roleConnectionsVerificationUrl = payload.role_connections_verification_url;
  if (props.tags && payload.tags) application.tags = payload.tags;
  if (props.installParams && payload.install_params) {
    application.installParams = {
      scopes: payload.install_params.scopes,
      permissions: bot.transformers.snowflake(payload.install_params.permissions),
    };
  }
  if (props.integrationTypesConfig && payload.integration_types_config) {
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
  if (props.eventWebhooksUrl && payload.event_webhooks_url) application.eventWebhooksUrl = payload.event_webhooks_url;
  if (props.eventWebhooksStatus && payload.event_webhooks_status) application.eventWebhooksStatus = payload.event_webhooks_status;
  if (props.eventWebhooksTypes && payload.event_webhooks_types) application.eventWebhooksTypes = payload.event_webhooks_types;

  return callCustomizer('application', bot, payload, application, {
    shardId: extra?.shardId,
    partial: extra?.partial ?? false,
  });
}
