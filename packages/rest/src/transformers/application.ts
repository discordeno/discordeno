import { DiscordApplication, Optionalize } from '@discordeno/types'
import { iconHashToBigInt } from '@discordeno/utils'
import type { RestManager } from '../restManager.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformApplication (
  rest: RestManager,
  payload: DiscordApplication
) {
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
    coverImage: payload.cover_image
      ? iconHashToBigInt(payload.cover_image)
      : undefined,
    flags: payload.flags,

    id: rest.transformers.snowflake(payload.id),
    icon: payload.icon ? iconHashToBigInt(payload.icon) : undefined,
    // @ts-expect-error the partial here wont break anything
    owner: payload.owner
      ? rest.transformers.user(rest, payload.owner)
      : undefined,
    team: payload.team ? rest.transformers.team(rest, payload.team) : undefined,
    guildId: payload.guild_id
      ? rest.transformers.snowflake(payload.guild_id)
      : undefined
  }

  return application as Optionalize<typeof application>
}

export interface Application extends ReturnType<typeof transformApplication> {}
