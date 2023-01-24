import type { Camelize, DiscordIntegration } from '@discordeno/types'
import TRANSFORMERS from '...js'

export function c1amelize1Integration (payload: DiscordIntegration): Camelize<DiscordIntegration> {
  return {
    id: payload.id,
    name: payload.name,
    type: payload.type,
    scopes: payload.scopes,
    syncing: payload.syncing,
    enabled: payload.enabled,
    revoked: payload.revoked,

    roleId: payload.role_id,
    syncedAt: payload.synced_at,
    expireBehavior: payload.expire_behavior,
    subscriberCount: payload.subscriber_count,
    enableEmoticons: payload.enable_emoticons,
    expireGracePeriod: payload.expire_grace_period,

    user: payload.user && TRANSFORMERS.user(payload.user),

    account: {
      id: payload.account.id,
      name: payload.account.name
    },
    application: payload.application && {
      id: payload.application.id,
      bot: payload.application.bot,
      name: payload.application.name,
      icon: payload.application.icon,
      description: payload.application.description
    }
  }
}
