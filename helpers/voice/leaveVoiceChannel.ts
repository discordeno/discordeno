import type { Bot } from "../../bot.ts";
import { GatewayOpcodes } from "../../types/shared.ts";

/** Leave a voice channel inside a guild. */
export async function leaveVoiceChannel(
  bot: Bot,
  guildId: bigint,
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
      channel_id: null,
      self_mute: false,
      self_deaf: false,
    },
  });
}
