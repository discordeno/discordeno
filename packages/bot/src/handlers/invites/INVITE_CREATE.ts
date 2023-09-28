import type { DiscordGatewayPayload, DiscordInviteCreate } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleInviteCreate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  bot.events.inviteCreate?.(bot.transformers.invite(bot, data.d as DiscordInviteCreate))
}
