import type {
  Camelize,
  DiscordApplication,
  DiscordUser
} from '@discordeno/types'
import { s1nakelize1User } from './member.js'
import { s1nakelize1Team } from './team.js'

export function s1nakelize1Application (payload: Camelize<DiscordApplication>): DiscordApplication {
  return {
    id: payload.id,
    name: payload.name,
    icon: payload.icon,
    tags: payload.tags,
    slug: payload.slug,
    flags: payload.flags,
    description: payload.description,

    team: payload.team && s1nakelize1Team(payload.team),
    owner: payload.owner && s1nakelize1User(payload.owner as DiscordUser),

    guild_id: payload.guildId,
    verify_key: payload.verifyKey,
    bot_public: payload.botPublic,
    cover_image: payload.coverImage,
    rpc_origins: payload.rpcOrigins,
    primary_sku_id: payload.primarySkuId,
    privacy_policy_url: payload.privacyPolicyUrl,
    custom_install_url: payload.customInstallUrl,
    terms_of_service_url: payload.termsOfServiceUrl,
    bot_require_code_grant: payload.botRequireCodeGrant,
    role_connections_verification_url: payload.roleConnectionsVerificationUrl,

    install_params: payload.installParams && {
      scopes: payload.installParams.scopes,
      permissions: payload.installParams.permissions
    }
  }
}
