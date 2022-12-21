/* eslint-disable @typescript-eslint/restrict-template-expressions */
// @ts-nocheck

import type { AtLeastOne, BigString } from '@discordeno/types'
import { GatewayOpcodes } from '@discordeno/types'
import { calculateShardId } from '@discordeno/utils'
import type { RestManager } from '../../../../../rest/src/restManager.js'

/**
 * Connects the bot user to a voice or stage channel.
 *
 * This function sends the _Update Voice State_ gateway command over the gateway behind the scenes.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild the voice channel to leave is in.
 *
 * @remarks
 * Requires the `CONNECT` permission.
 *
 * Fires a _Voice State Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/topics/gateway#update-voice-state}
 */
export async function connectToVoiceChannel (
  rest: RestManager,
  guildId: BigString,
  channelId: BigString,
  options?: AtLeastOne<Omit<UpdateVoiceState, 'guildId' | 'channelId'>>
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
      channel_id: channelId.toString(),
      self_mute: Boolean(options?.selfMute),
      self_deaf: options?.selfDeaf ?? true
    }
  })
}

/** https://discord.com/developers/docs/topics/gateway#update-voice-state */
export interface UpdateVoiceState {
  /** id of the guild */
  guildId: string
  /** id of the voice channel client wants to join (null if disconnecting) */
  channelId: string | null
  /** Is the client muted */
  selfMute: boolean
  /** Is the client deafened */
  selfDeaf: boolean
}
