import { inflate } from "../../deps.ts";
import {
  botHasChannelPermissions,
  Errors,
  GuildVoiceState,
} from "../../mod.ts";
import { cacheHandlers } from "../controllers/cache.ts";
import { sendRawGatewayCommand } from "../module/shard.ts";
import {
  DiscordPayload,
  GatewayOpcode,
  VoiceOpcode,
  VoiceServerUpdatePayload,
} from "../types/discord.ts";

let currentVoiceChannel: string;

export async function joinVoiceChannel(
  guildID: string,
  channelID: string,
  { self_deaf = false, self_mute = false }: Partial<JoinVoiceChannelOptions> =
    {},
) {
  currentVoiceChannel = channelID;
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
      self_deaf,
      self_mute,
    },
  });
}

export interface JoinVoiceChannelOptions {
  self_mute: boolean;
  self_deaf: boolean;
}

export async function establishVoiceConnection(
  payload: DiscordPayload,
  voiceState: GuildVoiceState,
) {
  let { endpoint, token } = payload.d as VoiceServerUpdatePayload;

  endpoint = `wss://${endpoint}`;
  const ws = new WebSocket(endpoint);

  ws.binaryType = "arraybuffer";

  ws.onopen = async () => {
    const identifyPayload = JSON.stringify({
      op: VoiceOpcode.Identify,
      d: {
        token,
        user_id: voiceState.userID,
        session_id: voiceState.sessionID,
        server_id: voiceState.channelID,
      },
    });

    ws.send(identifyPayload);
  };

  ws.onmessage = ({ data }) => {
    if (data instanceof ArrayBuffer) {
      data = new Uint8Array(data);
    }

    if (data instanceof Uint8Array) {
      data = inflate(
        data,
        0,
        (slice: Uint8Array) => new TextDecoder().decode(slice),
      );
    }
  };

  // For debugging purposes
  ws.onclose = console.log;
}
