import { DiscordIntegrationCreateUpdate, Optionalize } from '@discordeno/types'
import { Client } from '../client.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformIntegration (
  client: Client,
  payload: DiscordIntegrationCreateUpdate
) {
  const integration = {
    guildId: client.transformers.snowflake(payload.guild_id),
    id: client.transformers.snowflake(payload.id),
    name: payload.name,
    type: payload.type,
    enabled: payload.enabled,
    syncing: payload.syncing,
    roleId: payload.role_id
      ? client.transformers.snowflake(payload.role_id)
      : undefined,
    enableEmoticons: payload.enable_emoticons,
    expireBehavior: payload.expire_behavior,
    expireGracePeriod: payload.expire_grace_period,
    user: payload.user
      ? client.transformers.user(client, payload.user)
      : undefined,
    account: {
      id: client.transformers.snowflake(payload.account.id),
      name: payload.account.name
    },
    syncedAt: payload.synced_at ? Date.parse(payload.synced_at) : undefined,
    subscriberCount: payload.subscriber_count,
    revoked: payload.revoked,
    application: payload.application
      ? {
          id: client.transformers.snowflake(payload.application.id),
          name: payload.application.name,
          icon: payload.application.icon
            ? client.utils.iconHashToBigInt(payload.application.icon)
            : undefined,
          description: payload.application.description,
          client: payload.application.bot
            ? client.transformers.user(client, payload.application.bot)
            : undefined
        }
      : undefined,
    scopes: payload.scopes
  }

  return integration as Optionalize<typeof integration>
}

export interface Integration extends ReturnType<typeof transformIntegration> {}
