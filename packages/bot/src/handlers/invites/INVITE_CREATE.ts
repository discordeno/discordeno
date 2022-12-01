import { Bot } from '../../bot.js'
import { DiscordGatewayPayload, DiscordInviteCreate } from '../../types/discord.js'

export function handleInviteCreate (bot: Bot, data: DiscordGatewayPayload) {
  bot.events.inviteCreate(bot, bot.transformers.invite(bot, data.d as DiscordInviteCreate))
}
