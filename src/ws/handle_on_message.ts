import {eventHandlers, GatewayManager} from "../bot.ts";
import { handlers } from "../handlers/mod.ts";
import { DiscordGatewayOpcodes } from "../types/codes/gateway_opcodes.ts";
import type { DiscordGatewayPayload } from "../types/gateway/gateway_payload.ts";
import type { DiscordHello } from "../types/gateway/hello.ts";
import type { DiscordReady } from "../types/gateway/ready.ts";
import { camelize, delay } from "../util/utils.ts";
import { decompressWith } from "./deps.ts";

/** Handler for handling every message event from websocket. */
// deno-lint-ignore no-explicit-any
export async function handleOnMessage(gateway: GatewayManager, message: any, shardId: number) {
  if (message instanceof ArrayBuffer) {
    message = new Uint8Array(message);
  }

  if (message instanceof Uint8Array) {
    message = decompressWith(message, 0, (slice: Uint8Array) => gateway.utf8decoder.decode(slice));
  }

  if (typeof message !== "string") return;

  const shard = gateway.shards.get(shardId);

  const messageData = JSON.parse(message) as DiscordGatewayPayload;
  gateway.log("RAW", { shardId, payload: messageData });

  switch (messageData.op) {
    case DiscordGatewayOpcodes.Heartbeat:
      if (shard?.gateway.readyState !== WebSocket.OPEN) return;

      shard.heartbeat.lastSentAt = Date.now();
      // Discord randomly sends this requiring an immediate heartbeat back
      gateway.sendShardMessage(
          gateway,
        shard,
        {
          op: DiscordGatewayOpcodes.Heartbeat,
          d: shard?.previousSequenceNumber,
        },
        true
      );
      break;
    case DiscordGatewayOpcodes.Hello:
      gateway.heartbeat(gateway, shardId, (messageData.d as DiscordHello).heartbeat_interval);
      break;
    case DiscordGatewayOpcodes.HeartbeatACK:
      if (gateway.shards.has(shardId)) {
        const shard = gateway.shards.get(shardId)!;
        shard.heartbeat.acknowledged = true;
        shard.heartbeat.lastReceivedAt = Date.now();
      }
      break;
    case DiscordGatewayOpcodes.Reconnect:
      gateway.log("RECONNECT", { shardId });

      if (gateway.shards.has(shardId)) {
        gateway.shards.get(shardId)!.resuming = true;
      }

      gateway.resume(gateway, shardId);
      break;
    case DiscordGatewayOpcodes.InvalidSession:
      gateway.log("INVALID_SESSION", { shardId, payload: messageData });

      // We need to wait for a random amount of time between 1 and 5: https://discord.com/developers/docs/topics/gateway#resuming
      await delay(Math.floor((Math.random() * 4 + 1) * 1000));

      // When d is false we need to reidentify
      if (!messageData.d) {
        await gateway.identify(gateway, shardId, gateway.maxShards);
        break;
      }

      if (gateway.shards.has(shardId)) {
        gateway.shards.get(shardId)!.resuming = true;
      }

      gateway.resume(gateway, shardId);
      break;
    default:
      if (messageData.t === "RESUMED") {
        gateway.log("RESUMED", { shardId });

        if (gateway.shards.has(shardId)) {
          gateway.shards.get(shardId)!.resuming = false;
        }
        break;
      }

      // Important for RESUME
      if (messageData.t === "READY") {
        const shard = gateway.shards.get(shardId);
        if (shard) {
          shard.sessionId = (messageData.d as DiscordReady).session_id;
        }

        gateway.loadingShards.get(shardId)?.resolve(true);
        gateway.loadingShards.delete(shardId);
        // Wait few seconds to spawn next shard
        setTimeout(() => {
          const bucket = gateway.buckets.get(shardId % gateway.botGatewayData.sessionStartLimit.maxConcurrency);
          if (bucket) bucket.createNextShard.shift()?.();
        }, gateway.spawnShardDelay);
      }

      // Update the sequence number if it is present
      if (messageData.s) {
        const shard = gateway.shards.get(shardId);
        if (shard) {
          shard.previousSequenceNumber = messageData.s;
        }
      }

      if (gateway.url) await gateway.handleDiscordPayload(gateway, messageData, shardId);
      else {
        eventHandlers.raw?.(messageData);
        await eventHandlers.dispatchRequirements?.(messageData, shardId);

        if (messageData.op !== DiscordGatewayOpcodes.Dispatch) return;

        if (!messageData.t) return;

        return handlers[messageData.t]?.(camelize(messageData), shardId);
      }

      break;
  }
}
