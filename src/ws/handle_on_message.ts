import { eventHandlers } from "../bot.ts";
import { handlers } from "../handlers/mod.ts";
import { DiscordGatewayOpcodes } from "../types/codes/gateway_opcodes.ts";
import { DiscordReady } from "../types/gateway/ready.ts";
import { decompressWith } from "./deps.ts";
import { identify } from "./identify.ts";
import { resume } from "./resume.ts";
import { ws } from "./ws.ts";

/** Handler for handling every message event from websocket. */
// deno-lint-ignore no-explicit-any
export async function handleOnMessage(message: any, shardId: number) {
  if (message instanceof ArrayBuffer) {
    message = new Uint8Array(message);
  }

  if (message instanceof Uint8Array) {
    message = decompressWith(
      message,
      0,
      (slice: Uint8Array) => ws.utf8decoder.decode(slice),
    );
  }

  if (typeof message !== "string") return;

  const messageData = JSON.parse(message);
  ws.log("RAW", messageData);

  switch (messageData.op) {
    case DiscordGatewayOpcodes.Hello:
      ws.heartbeat(
        shardId,
        (messageData.d as DiscordHeartbeat).heartbeat_interval,
      );
      break;
    case DiscordGatewayOpcodes.HeartbeatACK:
      if (ws.shards.has(shardId)) {
        ws.shards.get(shardId)!.heartbeat.acknowledged = true;
      }
      break;
    case DiscordGatewayOpcodes.Reconnect:
      ws.log("RECONNECT", { shardId });

      if (ws.shards.has(shardId)) {
        ws.shards.get(shardId)!.resuming = true;
      }

      await resume(shardId);
      break;
    case DiscordGatewayOpcodes.InvalidSession:
      ws.log("INVALID_SESSION", { shardId, payload: messageData });

      // When d is false we need to reidentify
      if (!messageData.d) {
        await identify(shardId, ws.maxShards);
        break;
      }

      if (ws.shards.has(shardId)) {
        ws.shards.get(shardId)!.resuming = true;
      }

      await resume(shardId);
      break;
    default:
      if (messageData.t === "RESUMED") {
        ws.log("RESUMED", { shardId });

        if (ws.shards.has(shardId)) {
          ws.shards.get(shardId)!.resuming = false;
        }
        break;
      }

      // Important for RESUME
      if (messageData.t === "READY") {
        const shard = ws.shards.get(shardId);
        if (shard) {
          shard.sessionId = (messageData.d as DiscordReady).session_id;
        }

        ws.loadingShards.get(shardId)?.resolve(true);
        ws.loadingShards.delete(shardId);
      }

      // Update the sequence number if it is present
      if (messageData.s) {
        const shard = ws.shards.get(shardId);
        if (shard) {
          shard.previousSequenceNumber = messageData.s;
        }
      }

      if (ws.url) ws.handleDiscordPayload(messageData, shardId);
      else {
        eventHandlers.raw?.(messageData);
        await eventHandlers.dispatchRequirements?.(messageData, shardId);

        if (messageData.op !== DiscordGatewayOpcodes.Dispatch) return;

        return handlers[messageData.t]?.(messageData, shardId);
      }

      break;
  }
}
