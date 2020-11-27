import { delay } from "../../deps.ts";
import { VoiceConnection } from "../handlers/voice.ts";
import { GuildVoiceState } from "../structures/guild.ts";
import {
  DiscordHeartbeatPayload,
  DiscordPayload,
  GatewayOpcode,
  VoiceOpcode,
  VoiceServerUpdatePayload,
} from "../types/discord.ts";
import { eventHandlers } from "./client.ts";

const heartbeating = new Map<string, boolean>();
export const voiceConnections = new Map<string, VoiceConnection>();

export async function establishVoiceConnection(
  payload: DiscordPayload,
  voiceState: GuildVoiceState,
) {
  if (!voiceState.channelID) return;
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
    { id: voiceState.channelID, needToResume: false, ws },
  );

  ws.onopen = () => {
    // Send identify once the WebSocket is in OPEN state
    ws.send(JSON.stringify({
      op: VoiceOpcode.Identify,
      d: identifyPayload,
    }));
  };

  ws.onmessage = async (message) => {
    const payload = JSON.parse(message.data) as DiscordPayload;
    eventHandlers.debug?.({ type: "voiceRaw", data: { ...payload } });

    switch (payload.op) {
      case VoiceOpcode.Ready:
        if (!voiceState.channelID) return;
        const { ssrc, port, modes, ip } = payload.d as any;

        const udp = Deno.listenDatagram({
          port,
          transport: "udp",
        });

        const addr: Deno.NetAddr = { port, hostname: ip, transport: "udp" };

        {
          const buffArr = new Uint8Array(70);
          new DataView(buffArr.buffer).setUint32(0, ssrc, false);
          udp.send(buffArr, addr);
        }

        if (voiceConnections.has(voiceState.channelID)) {
          voiceConnections.set(
            voiceState.channelID,
            {
              ...voiceConnections.get(voiceState.channelID!)!,
              connection: udp,
              addr,
              ssrc,
            },
          );
        } else {
          voiceConnections.set(
            voiceState.channelID,
            { id: voiceState.channelID, connection: udp, addr, ssrc },
          );
        }

        const [arr] = await udp.receive();
        const newAddr = {
          port: new DataView(arr.buffer).getUint16(arr.length - 2, false),
          hostname: (Deno as any).core.decode(
            arr.subarray(1 + arr.indexOf(0, 3), arr.indexOf(0, 4)),
          ),
        };

        const selectProtocolPayload = JSON.stringify({
          op: VoiceOpcode.SelectProtocol,
          d: {
            protocol: "udp",
            data: {
              mode: modes["xsalsa20_poly1305"],
              port: newAddr.port,
              address: newAddr.hostname,
            },
          },
        });

        ws.send(selectProtocolPayload);
        break;
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
    }
  };
}

async function heartbeat(
  ws: WebSocket,
  payload: DiscordPayload,
  voiceState: GuildVoiceState,
) {
  if (!voiceState.guildID) return;
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
