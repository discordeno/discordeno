import type { DiscordGuildWidget } from '@discordeno/types'
import { type Bot, type GuildWidget, iconHashToBigInt } from '../index.js'

export function transformWidget(bot: Bot, payload: DiscordGuildWidget): GuildWidget {
  const widget = {
    id: bot.transformers.snowflake(payload.id),
    name: payload.name,
    instant_invite: payload.instant_invite,
    channels: payload.channels.map((channel) => ({
      id: bot.transformers.snowflake(channel.id),
      name: channel.name,
      position: channel.position,
    })),
    members: payload.members.map((member) => ({
      id: bot.transformers.snowflake(member.id),
      username: member.username,
      discriminator: member.discriminator,
      avatar: member.avatar ? iconHashToBigInt(member.avatar) : undefined,
      status: member.status,
      avatarUrl: member.avatar_url,
    })),
    presenceCount: payload.presence_count,
  } as GuildWidget

  return bot.transformers.customizers.widget(bot, payload, widget)
}
