import { cacheHandlers } from "../controllers/cache.ts";
import { sendRawGatewayCommand } from "../module/shard.ts";
import { GatewayOpcode } from "../types/discord.ts";

export async function joinVoiceChannel(guildID: string, channelID: string) {
  const shardID = (await cacheHandlers.get("guilds", guildID))?.shardID;
  if (shardID === undefined) return;

  sendRawGatewayCommand(shardID, {
    op: GatewayOpcode.VoiceStateUpdate,
    d: {
      guild_id: guildID,
      channel_id: channelID,
      self_mute: false,
      self_deaf: false,
    },
  });
}
