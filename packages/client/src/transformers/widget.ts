import type { DiscordGuildWidget, Optionalize } from '@discordeno/types'
import type { Client } from '../client.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformWidget (client: Client, payload: DiscordGuildWidget) {
  const widget = {
    id: client.transformers.snowflake(payload.id),
    name: payload.name,
    instant_invite: payload.instant_invite,
    channels: payload.channels.map((channel) => ({
      id: client.transformers.snowflake(channel.id),
      name: channel.name,
      position: channel.position
    })),
    members: payload.members.map((member) => ({
      id: client.transformers.snowflake(member.id),
      username: member.username,
      discriminator: member.discriminator,
      avatar: member.avatar
        ? client.utils.iconHashToBigInt(member.avatar)
        : undefined,
      status: member.status,
      avatarUrl: member.avatar_url
    })),
    presenceCount: payload.presence_count
  }

  return widget as Optionalize<typeof widget>
}

export interface GuildWidget extends ReturnType<typeof transformWidget> {}
