import type { DiscordGatewayPayload, DiscordInviteCreate } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleInviteCreate(bot: Bot, data: DiscordGatewayPayload, shardId: number): Promise<void> {
  if (!bot.events.inviteCreate) return

  const payload = data.d as DiscordInviteCreate

  bot.events.inviteCreate(bot.transformers.invite(bot, payload, { shardId }))
}
