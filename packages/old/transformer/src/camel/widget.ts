import type { Camelize, DiscordGuildWidget } from '@discordeno/types'

export function c1amelize1Widget (
  payload: DiscordGuildWidget
): Camelize<DiscordGuildWidget> {
  return {
    id: payload.id,
    name: payload.name,
    instantInvite: payload.instant_invite,
    channels: payload.channels.map((channel) => ({
      id: channel.id,
      name: channel.name,
      position: channel.position
    })),
    members: payload.members.map((member) => ({
      id: member.id,
      username: member.username,
      discriminator: member.discriminator,
      avatar: member.avatar,
      status: member.status,
      avatarUrl: member.avatar_url
    })),
    presenceCount: payload.presence_count
  }
}
