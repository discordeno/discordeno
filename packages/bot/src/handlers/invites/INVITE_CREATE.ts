import type { DiscordGatewayPayload, DiscordInviteCreate } from '@discordeno/types'
import type { Bot } from '../../index.js'

export function handleInviteCreate(bot: Bot, data: DiscordGatewayPayload) {
  bot.events.inviteCreate?.(bot.transformers.invite(bot, data.d as DiscordInviteCreate))
}
