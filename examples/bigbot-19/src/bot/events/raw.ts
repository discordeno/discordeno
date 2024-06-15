import { hasProperty, type DiscordGatewayPayload } from '@discordeno/bot'
import { bot } from '../bot.js'
import { updateCommands, usesLatestCommands } from '../utils/updateCommands.js'

bot.events.raw = async (payload) => {
  // Check if the guild needs a command update
  const guildId = attemptToGetGuildId(payload)

  if (guildId && !(await usesLatestCommands(guildId))) {
    await updateCommands(guildId)
  }
}

function attemptToGetGuildId(payload: DiscordGatewayPayload): bigint | undefined {
  const data = payload.d

  if (payload.t === 'GUILD_CREATE' || payload.t === 'GUILD_UPDATE') {
    // Attempt to find the guild_id

    if (typeof data !== 'object' || !data || !hasProperty(data, 'id') || typeof data.id !== 'string') return

    return BigInt(data.id)
  }

  // Attempt to find the guild_id in another object
  if (typeof data !== 'object' || !data || !hasProperty(data, 'guild_id') || typeof data.guild_id !== 'string') return

  // The bigint constructor throws an error if you pass in something that isn't a number
  const isNumber = Number.isInteger(Number.parseInt(data.guild_id))

  if (!isNumber) return undefined

  return BigInt(data.guild_id)
}
