import { iconHashToBigInt, type ApplicationFlags, type Bot, type DiscordApplication, type Team, type User } from '../index.js'

export function transformApplication(bot: Bot, payload: DiscordApplication): Application {
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

    id: bot.transformers.snowflake(payload.id),
    icon: payload.icon ? iconHashToBigInt(payload.icon) : undefined,
    owner: payload.owner
      ? // @ts-expect-error the partial here wont break anything
        bot.transformers.user(bot, payload.owner)
      : undefined,
    team: payload.team ? bot.transformers.team(bot, payload.team) : undefined,
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
  } as Application

  return bot.transformers.customizers.application(bot, payload, application)
}

export interface Application {
  flags?: ApplicationFlags
  icon?: bigint
  rpcOrigins?: string[]
  termsOfServiceUrl?: string
  privacyPolicyUrl?: string
  primarySkuId?: string
  slug?: string
  coverImage?: bigint
  owner?: User
  team?: Team
  guildId?: bigint
  id: bigint
  name: string
  description: string
  botPublic: boolean
  botRequireCodeGrant: boolean
  verifyKey: string
}
