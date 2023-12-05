import {
  iconHashToBigInt,
  type ApplicationFlags,
  type Bot,
  type DiscordApplication,
  type DiscordUser,
  type Guild,
  type Team,
  type User,
} from '../index.js'

export function transformApplication(bot: Bot, payload: { application: DiscordApplication; shardId: number }): Application {
  const application = {
    name: payload.application.name,
    description: payload.application.description,
    rpcOrigins: payload.application.rpc_origins,
    botPublic: payload.application.bot_public,
    botRequireCodeGrant: payload.application.bot_require_code_grant,
    termsOfServiceUrl: payload.application.terms_of_service_url,
    privacyPolicyUrl: payload.application.privacy_policy_url,
    verifyKey: payload.application.verify_key,
    primarySkuId: payload.application.primary_sku_id,
    slug: payload.application.slug,
    coverImage: payload.application.cover_image ? iconHashToBigInt(payload.application.cover_image) : undefined,
    flags: payload.application.flags,

    id: bot.transformers.snowflake(payload.application.id),
    icon: payload.application.icon ? iconHashToBigInt(payload.application.icon) : undefined,
    owner: payload.application.owner
      ? // @ts-expect-error the partial here wont break anything
        bot.transformers.user(bot, payload.application.owner)
      : undefined,
    team: payload.application.team ? bot.transformers.team(bot, payload.application.team) : undefined,
    guildId: payload.application.guild_id ? bot.transformers.snowflake(payload.application.guild_id) : undefined,
    // @ts-expect-error the partial here wont break anything
    guild: payload.application.guild ? bot.transformers.guild(bot, { guild: payload.application.guild, shardId: payload.shardId }) : undefined,
    approximateGuildCount: payload.application.approximate_guild_count,
    bot: payload.application.bot ? bot.transformers.user(bot, payload.application.bot as DiscordUser) : undefined,
    interactionsEndpointUrl: payload.application.interactions_endpoint_url,
    redirectUris: payload.application.redirect_uris,
  } as Application

  return bot.transformers.customizers.application(bot, payload.application, application)
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
  guild?: Guild
  id: bigint
  name: string
  description: string
  botPublic: boolean
  botRequireCodeGrant: boolean
  verifyKey: string
  approximateGuildCount?: number
  bot?: User
  redirectUris?: string[]
  interactionsEndpointUrl?: string
}
