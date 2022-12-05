import type { DiscordGuildWidget, Optionalize } from '@discordeno/types'
import { iconHashToBigInt } from '@discordeno/utils'
import type { RestManager } from '../restManager.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformWidget (
  rest: RestManager,
  payload: DiscordGuildWidget
) {
  const widget = {
    id: rest.transformers.snowflake(payload.id),
    name: payload.name,
    instant_invite: payload.instant_invite,
    channels: payload.channels.map((channel) => ({
      id: rest.transformers.snowflake(channel.id),
      name: channel.name,
      position: channel.position
    })),
    members: payload.members.map((member) => ({
      id: rest.transformers.snowflake(member.id),
      username: member.username,
      discriminator: member.discriminator,
      avatar: member.avatar ? iconHashToBigInt(member.avatar) : undefined,
      status: member.status,
      avatarUrl: member.avatar_url
    })),
    presenceCount: payload.presence_count
  }

  return widget as Optionalize<typeof widget>
}

export interface GuildWidget extends ReturnType<typeof transformWidget> {}
