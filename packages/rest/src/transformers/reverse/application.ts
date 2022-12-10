import type { DiscordApplication } from '@discordeno/types'
import { bigintToSnowflake, iconBigintToHash } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import type { Application } from '../application.js'

export function transformApplicationToDiscordApplication (
  rest: RestManager,
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
      ? iconBigintToHash(payload.coverImage)
      : undefined,
    flags: payload.flags,

    id: bigintToSnowflake(payload.id),
    icon: payload.icon ? iconBigintToHash(payload.icon) : null,
    owner: payload.owner
      ? rest.transformers.reverse.user(rest, payload.owner)
      : undefined,
    team: payload.team
      ? rest.transformers.reverse.team(rest, payload.team)
      : null,
    guild_id: payload.guildId ? bigintToSnowflake(payload.guildId) : undefined
  }
}
