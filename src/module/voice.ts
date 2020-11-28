import { delay, secretbox } from "../../deps.ts";
import { VoiceConnection } from "../handlers/voice.ts";
import { GuildVoiceState } from "../structures/guild.ts";
import {
  DiscordHeartbeatPayload,
  DiscordPayload,
  GatewayOpcode,
  VoiceOpcode,
  VoiceServerUpdatePayload
} from "../types/discord.ts";
import { eventHandlers } from "./client.ts";

const heartbeating = new Map<string, boolean>();
export const voiceConnections = new Map<string, VoiceConnection>();

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

  console.log(identifyPayload)
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

  ws.onclose = console.log;

  ws.onmessage = async (message) => {
    const payload = JSON.parse(message.data) as DiscordPayload;
    eventHandlers.debug?.({ type: "voiceRaw", data: { ...payload } });

    switch (payload.op) {
      case VoiceOpcode.Ready:
        if (!voiceState.channelID) return;

        const { ssrc, port, modes, ip } = payload.d as any;
        frame_view.setUint32(8, ssrc, false);

        const addr: Deno.NetAddr = { port, hostname: ip, transport: "udp" };
        const mode = modes.find((x) =>
          [
            "xsalsa20_poly1305",
            // 'xsalsa20_poly1305_lite',
            // 'xsalsa20_poly1305_suffix',
          ].includes(x)
        );
        if (!mode) {
          throw new Error(`failed to select supported mode (${modes})`);
        }

        const udp = Deno.listenDatagram({
          port: 1337,
          transport: "udp",
          hostname: "0.0.0.0",
        });

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

        const buffArr = new Uint8Array(70);
        new DataView(buffArr.buffer).setUint32(0, ssrc, false);
        udp.send(buffArr, addr).catch(console.error);

        console.log(6, udp.addr, udp.rid);
        udp.receive().then(([buffer]) => {
          console.log('inside the then');
          const newaddr = {
            port: new DataView(buffer.buffer).getUint16(
              buffer.length - 2,
              false,
            ),
            hostname: Deno.core.decode(
              buffer.subarray(1 + buffer.indexOf(0, 3), buffer.indexOf(0, 4)),
            ),
          };

          ws.send(
            JSON.stringify({
              op: VoiceOpcode.SelectProtocol,
              d: {
                protocol: "udp",
                address: newaddr.hostname,
                port: newaddr.port,
                mode: mode,
              },
            }),
          );
        });
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
      default:
        console.log("Unknown OP Code", payload);
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
  console.log('hb 1');
  const interval = (payload.d as DiscordHeartbeatPayload).heartbeat_interval;
  // We lost socket connection between heartbeats, resume connection
  if (ws.readyState === WebSocket.CLOSED) {
    resumeConnection(payload, voiceState);
    heartbeating.delete(voiceState.guildID);
    return;
  }

  console.log('hb 2');
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

  console.log('hb 3');
  // Set it to false as we are issuing a new heartbeat
  heartbeating.set(voiceState.guildID, false);

  ws.send(
    JSON.stringify(
      { op: VoiceOpcode.Heartbeat, d: Date.now() },
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
