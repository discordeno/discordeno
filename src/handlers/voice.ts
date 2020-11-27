import { botHasChannelPermissions, Errors } from "../../mod.ts";
import { cacheHandlers } from "../controllers/cache.ts";
import { sendRawGatewayCommand } from "../module/shard.ts";
import { GatewayOpcode } from "../types/discord.ts";

export interface VoiceConnection {
  /** The channel id for this connection */
  id: string;
  /** Whether this connection is need of resuming */
  needToResume?: boolean;
  // TODO: fix the type
  /** The connection through udp */
  connection?: Deno.DatagramConn;
  addr?: Deno.NetAddr;
  ws?: WebSocket;
  ssrc?: string;
}

export async function joinVoiceChannel(
  guildID: string,
  channelID: string,
  options: Partial<JoinVoiceChannelOptions> = {},
) {
  const hasPerm = await botHasChannelPermissions(channelID, ["CONNECT"]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_CONNECT);
  }

  const guild = await cacheHandlers.get("guilds", guildID);
  if (!guild) return;

  sendRawGatewayCommand(guild.shardID, {
    op: GatewayOpcode.VoiceStateUpdate,
    d: {
      guild_id: guildID,
      channel_id: channelID,
      self_deaf: options.selfDeaf || false,
      self_mute: options.selfMute || false,
    },
  });
}

export interface JoinVoiceChannelOptions {
  selfMute: boolean;
  selfDeaf: boolean;
}
