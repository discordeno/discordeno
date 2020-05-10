import { WebSocket } from "https://deno.land/std@0.50.0/ws/mod.ts";
import { GatewayOpcode } from "../types/discord.ts";
import { delay } from "https://deno.land/std@0.50.0/async/mod.ts";

// Discord requests null if no number has yet been sent by discord
export let previousSequenceNumber: number | null = null;

// TODO: If a client does not receive a heartbeat ack between its attempts at sending heartbeats, it should immediately terminate the connection with a non-1000 close code, reconnect, and attempt to resume.
export const sendConstantHeartbeats = async (
  socket: WebSocket,
  interval: number,
) => {
  await delay(interval);
  socket.send(
    JSON.stringify({ op: GatewayOpcode.Heartbeat, d: previousSequenceNumber }),
  );
  sendConstantHeartbeats(socket, interval);
};

export const updatePreviousSequenceNumber = (sequence: number) => {
  previousSequenceNumber = sequence;
};
