/* eslint-disable @typescript-eslint/restrict-template-expressions */
// @ts-nocheck

import { BigString, GatewayOpcodes } from '@discordeno/types'
import { calculateShardId } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'
/**
 * Leaves the voice channel the bot user is currently in.
 *
 * This function sends the _Update Voice State_ gateway command over the gateway behind the scenes.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild the voice channel to leave is in.
 *
 * @remarks
 * Fires a _Voice State Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/topics/gateway#update-voice-state}
 */
export async function leaveVoiceChannel (
  rest: RestManager,
  guildId: BigString
): Promise<void> {
  const shardId = calculateShardId(
    bot.gateway,
    rest.transformers.snowflake(guildId)
  )
  const shard = bot.gateway.manager.shards.get(shardId)
  if (shard == null) {
    throw new Error(`Shard (id: ${shardId} not found`)
  }

  return shard.send({
    op: GatewayOpcodes.VoiceStateUpdate,
    d: {
      guild_id: guildId.toString(),
      channel_id: null,
      self_mute: false,
      self_deaf: false
    }
  })
}
