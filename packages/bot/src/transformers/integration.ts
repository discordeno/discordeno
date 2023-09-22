import type { DiscordIntegrationCreateUpdate, IntegrationExpireBehaviors, OAuth2Scope } from '@discordeno/types'
import { iconHashToBigInt, type Bot, type User } from '../index.js'

export function transformIntegration(bot: Bot, payload: DiscordIntegrationCreateUpdate): Integration {
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
          icon: payload.application.icon ? iconHashToBigInt(payload.application.icon) : undefined,
          description: payload.application.description,
          bot: payload.application.bot ? bot.transformers.user(bot, payload.application.bot) : undefined,
        }
      : undefined,
    scopes: payload.scopes,
  } as Integration

  return bot.transformers.customizers.integration(bot, payload, integration)
}

export interface Integration {
  user?: User
  enabled?: boolean
  syncing?: boolean
  roleId?: bigint
  enableEmoticons?: boolean
  expireBehavior?: IntegrationExpireBehaviors
  expireGracePeriod?: number
  syncedAt?: number
  subscriberCount?: number
  revoked?: boolean
  application?: {
    bot?: User
    icon?: bigint
    id: bigint
    name: string
    description: string
  }
  id: bigint
  name: string
  guildId: bigint
  type: 'twitch' | 'youtube' | 'discord'
  account: {
    id: bigint
    name: string
  }
  scopes: OAuth2Scope[]
}
