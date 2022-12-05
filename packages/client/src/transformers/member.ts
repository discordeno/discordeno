import type {
  DiscordMember,
  DiscordUser,
  Optionalize
} from '@discordeno/types'
import type { Client } from '../client.js'
import { MemberToggles } from './toggles/member.js'
import { UserToggles } from './toggles/user.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformUser (client: Client, payload: DiscordUser) {
  const user = {
    id: client.transformers.snowflake(payload.id || ''),
    username: payload.username,
    discriminator: payload.discriminator,
    avatar: payload.avatar
      ? client.utils.iconHashToBigInt(payload.avatar)
      : undefined,
    locale: payload.locale,
    email: payload.email ?? undefined,
    flags: payload.flags,
    premiumType: payload.premium_type,
    publicFlags: payload.public_flags,
    toggles: new UserToggles(payload)
  }

  return user as Optionalize<typeof user>
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformMember (
  client: Client,
  payload: DiscordMember,
  guildId: bigint,
  userId: bigint
) {
  const member = {
    id: userId,
    guildId,
    user: payload.user
      ? client.transformers.user(client, payload.user)
      : undefined,
    nick: payload.nick ?? undefined,
    roles: payload.roles.map((id) => client.transformers.snowflake(id)),
    joinedAt: Date.parse(payload.joined_at),
    premiumSince: payload.premium_since
      ? Date.parse(payload.premium_since)
      : undefined,
    avatar: payload.avatar
      ? client.utils.iconHashToBigInt(payload.avatar)
      : undefined,
    permissions: payload.permissions
      ? client.transformers.snowflake(payload.permissions)
      : undefined,
    communicationDisabledUntil: payload.communication_disabled_until
      ? Date.parse(payload.communication_disabled_until)
      : undefined,
    toggles: new MemberToggles(payload)
  }

  return member as Optionalize<typeof member>
}

export interface Member extends ReturnType<typeof transformMember> {}
export interface User extends ReturnType<typeof transformUser> {}
