import type { DiscordApplication } from '@discordeno/types'
import type { Client } from '../../client.js'
import type { Application } from '../application.js'

export function transformApplicationToDiscordApplication (
  client: Client,
  payload: Application
): DiscordApplication {
  return {
    name: payload.name,
    description: payload.description,
    rpc_origins: payload.rpcOrigins,
    bot_public: payload.botPublic,
    bot_require_code_grant: payload.botRequireCodeGrant,
    terms_of_service_url: payload.termsOfServiceUrl,
    privacy_policy_url: payload.privacyPolicyUrl,
    verify_key: payload.verifyKey,
    primary_sku_id: payload.primarySkuId,
    slug: payload.slug,
    cover_image: payload.coverImage
      ? client.utils.iconBigintToHash(payload.coverImage)
      : undefined,
    flags: payload.flags,

    id: client.utils.bigintToSnowflake(payload.id),
    icon: payload.icon ? client.utils.iconBigintToHash(payload.icon) : null,
    owner: payload.owner
      ? client.transformers.reverse.user(client, payload.owner)
      : undefined,
    team: payload.team
      ? client.transformers.reverse.team(client, payload.team)
      : null,
    guild_id: payload.guildId
      ? client.utils.bigintToSnowflake(payload.guildId)
      : undefined
  }
}
