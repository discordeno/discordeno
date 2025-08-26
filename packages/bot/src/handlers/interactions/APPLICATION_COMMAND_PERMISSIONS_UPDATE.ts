import type { DiscordGatewayPayload, DiscordGuildApplicationCommandPermissions } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleApplicationCommandPermissionsUpdate(bot: Bot, data: DiscordGatewayPayload, _shardId: number): Promise<void> {
  if (!bot.events.applicationCommandPermissionsUpdate) return

  const payload = data.d as DiscordGuildApplicationCommandPermissions
  bot.events.applicationCommandPermissionsUpdate(bot.transformers.applicationCommandPermission(bot, payload))
}
