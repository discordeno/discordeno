import type { Bot } from "../../bot.ts";
import { AtLeastOne, GatewayOpcodes } from "../../types/shared.ts";

/** Connect or join a voice channel inside a guild. By default, the "selfDeaf" option is true. Requires `CONNECT` and `VIEW_CHANNEL` permissions. */
export async function connectToVoiceChannel(
  bot: Bot,
  guildId: bigint,
  channelId: bigint,
  options?: AtLeastOne<Omit<UpdateVoiceState, "guildId" | "channelId">>,
): Promise<void> {
  const shardId = bot.utils.calculateShardId(bot.gateway, guildId);
  const shard = bot.gateway.manager.shards.get(shardId);
  if (!shard) {
    throw new Error(`Shard (id: ${shardId} not found`);
  }

  return shard.send({
    op: GatewayOpcodes.VoiceStateUpdate,
    d: {
      guild_id: guildId.toString(),
      channel_id: channelId.toString(),
      self_mute: Boolean(options?.selfMute),
      self_deaf: options?.selfDeaf ?? true,
    },
  });
}

/** https://discord.com/developers/docs/topics/gateway#update-voice-state */
export interface UpdateVoiceState {
  /** id of the guild */
  guildId: string;
  /** id of the voice channel client wants to join (null if disconnecting) */
  channelId: string | null;
  /** Is the client muted */
  selfMute: boolean;
  /** Is the client deafened */
  selfDeaf: boolean;
}
