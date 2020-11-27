import { secretbox } from "../../deps.ts";
import { botHasChannelPermissions, Errors } from "../../mod.ts";
import { cacheHandlers } from "../controllers/cache.ts";
import { sendRawGatewayCommand } from "../module/shard.ts";
import { voiceConnections } from "../module/voice.ts";
import { GatewayOpcode, VoiceOpcode } from "../types/discord.ts";

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

const u16_max = 2 ** 16;
const u32_max = 2 ** 32;
const frame_duration = 20;
const sampling_rate = 48000;
let frame = new Uint8Array(28 + 3 * 1276);
const frame_size = sampling_rate * frame_duration / 1000;
let sequence: number;
let timestamp = 0;
let seq = 0;

frame[0] = 0x80;
frame[1] = 0x78;
frame = frame.slice();

const key = new Uint8Array(secretbox.key_length);
const frame_view = new DataView(frame.buffer);
const nonce = new Uint8Array(secretbox.nonce_length);

export function sendVoice(channelID: string, opus: any) {
  const voice = voiceConnections.get(channelID);
  if (!voice?.connection || !voice.addr) return;

  if (u16_max <= ++sequence) sequence -= u16_max;
  if (u32_max <= (timestamp += frame_size)) timestamp %= u32_max;

  frame_view.setUint16(2, seq, false);
  frame_view.setUint32(4, timestamp, false);

  nonce.set(frame.subarray(0, 12));
  const sealed = secretbox.seal(opus, key, nonce);

  frame.set(sealed, 12);
  return voice.connection.send(
    frame.subarray(0, 12 + sealed.length),
    voice.addr,
  );
}

export function setSpeaking(channelID: string, value: boolean) {
  const voice = voiceConnections.get(channelID);
  if (!voice?.ws || !voice.ssrc) return;

  const data = JSON.stringify({
    op: VoiceOpcode.Speaking,
    d: {
      delay: 0,
      ssrc: voice.ssrc,
      speaking: value,
    },
  });

  voice.ws?.send(data);
}
