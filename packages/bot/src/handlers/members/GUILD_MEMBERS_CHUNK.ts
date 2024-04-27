import type { DiscordGatewayPayload, DiscordGuildMembersChunk } from '@discordeno/types'
import { camelize } from '@discordeno/utils'
import type { Bot } from '../../index.js'

export async function handleGuildMembersChunk(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  const payload = data.d as DiscordGuildMembersChunk

  // If it's not enabled skip checks.
  if (!bot.gateway.cache.requestMembers.enabled) return

  // If this request has no nonce, skip checks.
  if (!payload.nonce) return

  const pending = bot.gateway.cache.requestMembers.pending.get(payload.nonce)

  if (!pending) return

  if (payload.chunk_count === 1) pending.members = payload.members
  else pending.members.push(...payload.members)

  // If this is not the final chunk, just save to cache.
  if (payload.chunk_index + 1 < payload.chunk_count) return

  // Resolve the promise that all requests are done.
  pending.resolve(camelize(pending.members))

  // Delete the cache to clean up once its done.
  bot.gateway.cache.requestMembers.pending.delete(payload.nonce)
}
