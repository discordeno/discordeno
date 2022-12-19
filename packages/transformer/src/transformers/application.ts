import type {
  Camelize,
  DiscordApplication,
  DiscordUser
} from '@discordeno/types'
import { c1amelize1User } from './member.js'
import { c1amelize1Team } from './team.js'

export function c1amelize1Application (
  payload: DiscordApplication
): Camelize<DiscordApplication> {
  return {
    id: payload.id,
    name: payload.name,
    icon: payload.icon,
    description: payload.description,
    rpcOrigins: payload.rpc_origins,
    botPublic: payload.bot_public,
    botRequireCodeGrant: payload.bot_require_code_grant,
    termsOfServiceUrl: payload.terms_of_service_url,
    privacyPolicyUrl: payload.privacy_policy_url,
    owner: payload.owner && c1amelize1User(payload.owner as DiscordUser),
    verifyKey: payload.verify_key,
    team: payload.team && c1amelize1Team(payload.team),
    guildId: payload.guild_id,
    primarySkuId: payload.primary_sku_id,
    slug: payload.slug,
    coverImage: payload.cover_image,
    flags: payload.flags,
    tags: payload.tags,
    installParams: payload.install_params && {
      scopes: payload.install_params.scopes,
      permissions: payload.install_params.permissions
    },
    customInstallUrl: payload.custom_install_url,
    roleConnectionsVerificationUrl: payload.role_connections_verification_url
  }
}
