import { identify } from "./identify.ts";
import { resume } from "./resume.ts";
import { ws } from "./ws.ts";
import { decompressWith } from "./deps.ts";
import { DiscordGatewayOpcodes } from "../types/codes/gateway_opcodes.ts";
import { DiscordReady } from "../types/gateway/ready.ts";

/** Handler for handling every message event from websocket. */
// deno-lint-ignore no-explicit-any
export function handleOnMessage(message: any, shardID: number) {
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
        shardID,
        (messageData.d as DiscordHeartbeat).heartbeat_interval,
      );
      break;
    case DiscordGatewayOpcodes.HeartbeatACK:
      if (ws.shards.has(shardID)) {
        ws.shards.get(shardID)!.heartbeat.acknowledged = true;
      }
      break;
    case DiscordGatewayOpcodes.Reconnect:
      ws.log("RECONNECT", { shardID });

      if (ws.shards.has(shardID)) {
        ws.shards.get(shardID)!.resuming = true;
      }

      resume(shardID);
      break;
    case DiscordGatewayOpcodes.InvalidSession:
      ws.log("INVALID_SESSION", { shardID, payload: messageData });

      // When d is false we need to reidentify
      if (!messageData.d) {
        identify(shardID, ws.maxShards);
        break;
      }

      if (ws.shards.has(shardID)) {
        ws.shards.get(shardID)!.resuming = true;
      }

      resume(shardID);
      break;
    default:
      if (messageData.t === "RESUMED") {
        ws.log("RESUMED", { shardID });

        if (ws.shards.has(shardID)) {
          ws.shards.get(shardID)!.resuming = false;
        }
        break;
      }

      // Important for RESUME
      if (messageData.t === "READY") {
        const shard = ws.shards.get(shardID);
        if (shard) {
          shard.sessionID = (messageData.d as DiscordReady).session_id;
        }

        ws.loadingShards.get(shardID)?.resolve(true);
        ws.loadingShards.delete(shardID);
      }

      // Update the sequence number if it is present
      if (messageData.s) {
        const shard = ws.shards.get(shardID);
        if (shard) {
          shard.previousSequenceNumber = messageData.s;
        }
      }

      ws.handleDiscordPayload(messageData, shardID);
      break;
  }
}
