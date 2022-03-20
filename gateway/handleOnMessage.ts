import { GatewayManager } from "./gateway_manager.ts";
import { snowflakeToBigint } from "../util/bigint.ts";
import { delay } from "../util/utils.ts";
import { decompressWith } from "./deps.ts";
import {
  DiscordGatewayPayload,
  DiscordGuild,
  DiscordHello,
  DiscordMessage,
  DiscordReady,
  DiscordUnavailableGuild,
} from "../types/discord.ts";
import { GatewayOpcodes } from "../types/shared.ts";

/** Handler for handling every message event from websocket. */
// deno-lint-ignore no-explicit-any
export async function handleOnMessage(gateway: GatewayManager, message: any, shardId: number) {
  if (gateway.compress && message instanceof Blob) {
    message = decompressWith(
      new Uint8Array(await message.arrayBuffer()),
      0,
      (slice: Uint8Array) => gateway.utf8decoder.decode(slice),
    );
  }

  if (typeof message !== "string") return;

  const shard = gateway.shards.get(shardId);

  const messageData = JSON.parse(message) as DiscordGatewayPayload;
  gateway.debug("GW RAW", { shardId, payload: messageData });

  switch (messageData.op) {
    case GatewayOpcodes.Heartbeat:
      if (shard?.ws.readyState !== WebSocket.OPEN) return;

      shard.heartbeat.lastSentAt = Date.now();
      // Discord randomly sends this requiring an immediate heartbeat back
      gateway.sendShardMessage(
        gateway,
        shard,
        {
          op: GatewayOpcodes.Heartbeat,
          d: shard?.previousSequenceNumber,
        },
        true,
      );
      break;
    case GatewayOpcodes.Hello:
      gateway.heartbeat(gateway, shardId, (messageData.d as DiscordHello).heartbeat_interval);
      // UPDATES THE SAFE AMOUNT OF SHARDS BASED ON THE INTERVAL
      if (shard) shard.safeRequestsPerShard = gateway.safeRequestsPerShard(gateway, shard);
      break;
    case GatewayOpcodes.HeartbeatACK:
      if (gateway.shards.has(shardId)) {
        const shard = gateway.shards.get(shardId)!;
        shard.heartbeat.acknowledged = true;
        shard.heartbeat.lastReceivedAt = Date.now();
      }
      break;
    case GatewayOpcodes.Reconnect:
      gateway.debug("GW RECONNECT", { shardId });

      if (gateway.shards.has(shardId)) {
        gateway.shards.get(shardId)!.resuming = true;
      }

      gateway.resume(gateway, shardId);
      break;
    case GatewayOpcodes.InvalidSession:
      gateway.debug("GW INVALID_SESSION", { shardId, payload: messageData });

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
        gateway.debug("GW RESUMED", { shardId });

        if (gateway.shards.has(shardId)) {
          gateway.shards.get(shardId)!.resuming = false;
        }
        break;
      }

      // Important for RESUME
      if (messageData.t === "READY") {
        const shard = gateway.shards.get(shardId);
        const payload = messageData.d as DiscordReady;
        if (shard) {
          shard.sessionId = payload.session_id;
          shard.ready = true;
        }

        payload.guilds.forEach((g) => gateway.cache.loadingGuildIds.add(snowflakeToBigint(g.id)));

        gateway.loadingShards.get(shardId)?.resolve(true);
        gateway.loadingShards.delete(shardId);
        // Wait few seconds to spawn next shard
        const bucket = gateway.buckets.get(shardId % gateway.maxConcurrency);
        if (bucket?.createNextShard.length) {
          setTimeout(() => {
            bucket.createNextShard.shift()?.();
          }, gateway.spawnShardDelay);
        }
      }

      // Update the sequence number if it is present
      if (messageData.s) {
        const shard = gateway.shards.get(shardId);
        if (shard) {
          shard.previousSequenceNumber = messageData.s;
        }
      }

      // MUST HANDLE GUILD_CREATE EVENTS AS THEY ARE EXPENSIVE WITHOUT GATEWAY CACHE
      if (messageData.t === "GUILD_CREATE") {
        const id = snowflakeToBigint((messageData.d as DiscordGuild).id);

        // SHARD RESUMED MOST LIKELY, THEY EMIT GUILD CREATES. OR GUILD BECAME AVAILABLE AGAIN
        if (gateway.cache.guildIds.has(id)) return;

        // GUILD WAS MARKED LOADING IN READY EVENT, THIS WAS THE FIRST GUILD_CREATE TO ARRIVE
        if (gateway.cache.loadingGuildIds.has(id)) {
          // @ts-ignore override with a custom event
          messageData.t = "GUILD_LOADED_DD";
          gateway.cache.loadingGuildIds.delete(id);
        }

        gateway.cache.guildIds.add(id);
      }

      // MESSAGE_UPDATE CAN SPAM FOR NO REASON USE THIS TO IGNORE
      if (messageData.t === "MESSAGE_UPDATE") {
        const payload = messageData.d as DiscordMessage;

        const id = snowflakeToBigint(payload.id);
        const content = payload.content || "";
        const cached = gateway.cache.editedMessages.get(id);

        if (cached === content) return;
        else {
          // ADD TO LOCAL CACHE FOR FUTURE EVENTS.
          gateway.cache.editedMessages.set(id, content);
          // REMOVE AFTER 10 SECONDS FROM CACHE
          setTimeout(() => {
            gateway.cache.editedMessages.delete(id);
          }, 10000);
        }
      }

      // MUST HANDLE GUILD_DELETE EVENTS FOR UNAVAILABLE
      if (messageData.t === "GUILD_DELETE") {
        if ((messageData.d as DiscordUnavailableGuild).unavailable) return;
      }

      // IF NO TYPE THEN THIS SHOULD NOT BE SENT FORWARD
      if (!messageData.t) return;

      await gateway.handleDiscordPayload(gateway, messageData, shardId);

      break;
  }
}
