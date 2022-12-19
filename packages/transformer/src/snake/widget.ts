import type { Camelize, DiscordGuildWidget } from '@discordeno/types'

export function s1nakelize1Widget (payload: Camelize<DiscordGuildWidget>): DiscordGuildWidget {
  return {
    id: payload.id,
    name: payload.name,
    channels: payload.channels,

    presence_count: payload.presenceCount,
    instant_invite: payload.instantInvite,

    members: payload.members.map((member) => ({
      id: member.id,
      status: member.status,
      avatar: member.avatar,
      username: member.username,
      discriminator: member.discriminator,

      avatar_url: member.avatarUrl
    }))
  }
}
