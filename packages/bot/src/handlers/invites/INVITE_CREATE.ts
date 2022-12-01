import { DiscordGatewayPayload, DiscordInviteCreate } from '@discordeno/types'
import { Bot } from '../../bot.js'

export function handleInviteCreate (bot: Bot, data: DiscordGatewayPayload) {
  bot.events.inviteCreate(bot, bot.transformers.invite(bot, data.d as DiscordInviteCreate))
}
