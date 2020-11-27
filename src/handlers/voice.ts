import { delay } from "https://deno.land/std@0.75.0/async/delay.ts";
import {
  botHasChannelPermissions,
  Errors,
  GuildVoiceState,
} from "../../mod.ts";
import { cacheHandlers } from "../controllers/cache.ts";
import { eventHandlers } from "../module/client.ts";
import { sendRawGatewayCommand } from "../module/shard.ts";
import {
  DiscordHeartbeatPayload,
  DiscordPayload,
  GatewayOpcode,
  VoiceOpcode,
  VoiceServerUpdatePayload,
} from "../types/discord.ts";

const heartbeating = new Map<string, boolean>();
const voiceConnections = new Map<string, VoiceConnection>();

export interface VoiceConnection {
  /** The channel id for this connection */
  id: string;
  /** Whether this connection is need of resuming */
  needToResume: boolean;
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

export async function establishVoiceConnection(
  payload: DiscordPayload,
  voiceState: GuildVoiceState,
) {
  const data = payload.d as VoiceServerUpdatePayload;
  let { endpoint, token, guild_id } = data;

  endpoint = `wss://${endpoint}?v=4`;
  const ws = new WebSocket(endpoint);

  ws.binaryType = "arraybuffer";

  const identifyPayload = {
    token,
    server_id: guild_id,
    user_id: voiceState.userID,
    session_id: voiceState.sessionID,
  };

  voiceConnections.set(
    voiceState.channelID!,
    { id: voiceState.channelID, needToResume: false },
  );

  ws.onopen = () => {
    // Send identify once the WebSocket is in OPEN state
    ws.send(JSON.stringify({
      op: VoiceOpcode.Identify,
      d: identifyPayload,
    }));
  };

  ws.onmessage = (message) => {
    const payload = JSON.parse(message.data) as DiscordPayload;
    console.log('voiceraw', payload);
    switch (payload.op) {
      case VoiceOpcode.Hello:
        if (!heartbeating.has(guild_id)) {
          heartbeat(
            ws,
            payload,
            voiceState,
          );
        }
        break;
      case VoiceOpcode.HeartbeatACK:
        heartbeating.set(guild_id, true);
        break;
      default:
          console.error("Unknown OP code:", payload);
    }
  };

  // For debugging purposes
  ws.onclose = console.log;
}

async function heartbeat(
  ws: WebSocket,
  payload: DiscordPayload,
  voiceState: GuildVoiceState,
) {
  const interval = (payload.d as DiscordHeartbeatPayload).heartbeat_interval;
  // We lost socket connection between heartbeats, resume connection
  if (ws.readyState === WebSocket.CLOSED) {
    resumeConnection(payload, voiceState);
    heartbeating.delete(voiceState.guildID);
    return;
  }

  if (heartbeating.has(voiceState.guildID)) {
    const receivedACK = heartbeating.get(voiceState.guildID);
    // If a ACK response was not received since last heartbeat, issue invalid session close
    if (!receivedACK) {
      eventHandlers.debug?.(
        { type: "voiceHeartbeatStopped", data: { interval } },
      );
      return ws.send(JSON.stringify({ op: 4009 }));
    }
  }

  // Set it to false as we are issuing a new heartbeat
  heartbeating.set(voiceState.guildID, false);

  ws.send(
    JSON.stringify(
      { op: GatewayOpcode.Heartbeat, d: 1 },
    ),
  );

  eventHandlers.debug?.({ type: "voiceHeartbeat", data: { interval } });

  await delay(interval);
  heartbeat(ws, payload, voiceState);
}

async function resumeConnection(
  payload: DiscordPayload,
  voiceState: GuildVoiceState,
) {
  eventHandlers.debug?.({ type: "voiceResuming", data: { ...payload } });
  // Run it once
  establishVoiceConnection(payload, voiceState);
  // Then retry every 15 seconds
  await delay(1000 * 15);
  if (voiceConnections.get(voiceState.guildID!)?.needToResume) {
    resumeConnection(payload, voiceState);
  }
}
