import type { DiscordGatewayPayload, DiscordInviteCreate } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleInviteCreate(bot: Bot, data: DiscordGatewayPayload, shardId: number): Promise<void> {
  if (!bot.events.inviteCreate) return

  bot.events.inviteCreate(bot.transformers.invite(bot, { invite: data.d as DiscordInviteCreate, shardId }))
}
