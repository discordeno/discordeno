import type { Bot, DiscordGatewayPayload, DiscordGuildApplicationCommandPermissions } from '../../index.js'

export async function handleApplicationCommandPermissionsUpdate(bot: Bot, data: DiscordGatewayPayload, shardId: number): Promise<void> {
  const payload = data.d as DiscordGuildApplicationCommandPermissions
  bot.events.applicationCommandPermissionsUpdate?.(bot.transformers.applicationCommandPermission(bot, payload))
}
