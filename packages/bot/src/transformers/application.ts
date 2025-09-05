import { type DiscordApplication, DiscordApplicationIntegrationType } from '@discordeno/types'
import { iconHashToBigInt } from '@discordeno/utils'
import type { Bot } from '../bot.js'
import { callCustomizer } from '../transformers.js'
import type { Application } from './types.js'

export function transformApplication(bot: Bot, payload: Partial<DiscordApplication>, extra?: { shardId?: number; partial?: boolean }) {
  const application = {
    name: payload.name,
    description: payload.description,
    rpcOrigins: payload.rpc_origins,
    botPublic: payload.bot_public,
    botRequireCodeGrant: payload.bot_require_code_grant,
    termsOfServiceUrl: payload.terms_of_service_url,
    privacyPolicyUrl: payload.privacy_policy_url,
    verifyKey: payload.verify_key,
    primarySkuId: payload.primary_sku_id,
    slug: payload.slug,
    coverImage: payload.cover_image ? iconHashToBigInt(payload.cover_image) : undefined,
    flags: payload.flags,

    id: payload.id ? bot.transformers.snowflake(payload.id) : undefined,
    icon: payload.icon ? iconHashToBigInt(payload.icon) : undefined,
    owner: payload.owner ? bot.transformers.user(bot, payload.owner, { partial: true }) : undefined,
    team: payload.team ? bot.transformers.team(bot, payload.team) : undefined,
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    customInstallUrl: payload.custom_install_url,
    guild: payload.guild ? bot.transformers.guild(bot, payload.guild, { shardId: extra?.shardId, partial: true }) : undefined,
    approximateGuildCount: payload.approximate_guild_count,
    approximateUserInstallCount: payload.approximate_user_install_count,
    approximateUserAuthorizationCount: payload.approximate_user_authorization_count,
    bot: payload.bot ? bot.transformers.user(bot, payload.bot, { partial: true }) : undefined,
    interactionsEndpointUrl: payload.interactions_endpoint_url ? payload.interactions_endpoint_url : undefined,
    redirectUris: payload.redirect_uris,
    roleConnectionsVerificationUrl: payload.role_connections_verification_url,
    tags: payload.tags,
    installParams: payload.install_params
      ? {
          scopes: payload.install_params.scopes,
          permissions: bot.transformers.snowflake(payload.install_params.permissions),
        }
      : undefined,
    integrationTypesConfig: payload.integration_types_config
      ? {
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
        }
      : undefined,
    eventWebhooksUrl: payload.event_webhooks_url,
    eventWebhooksStatus: payload.event_webhooks_status,
    eventWebhooksTypes: payload.event_webhooks_types,
  } as Application

  return callCustomizer('application', bot, payload, application, {
    shardId: extra?.shardId,
    partial: extra?.partial ?? false,
  })
}
