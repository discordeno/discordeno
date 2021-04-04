import { eventHandlers } from "../bot.ts";
import { cache } from "../cache.ts";
import { handlers } from "../handlers/mod.ts";
import { Member } from "../structures/mod.ts";
import { DiscordGatewayOpcodes } from "../types/codes/gateway_opcodes.ts";
import { Collection } from "../util/collection.ts";
import { delay } from "../util/utils.ts";
import { createShard, requestGuildMembers } from "./mod.ts";

let createNextShard = true;

/** This function is meant to be used on the ready event to alert the library to start the next shard. */
export function allowNextShard(enabled = true) {
  createNextShard = enabled;
}

export async function spawnShards(
  data: DiscordBotGatewayData,
  payload: DiscordIdentify,
  shardId: number,
  lastShardId: number,
  skipChecks?: number,
) {
  // All shards on this worker have started! Cancel out.
  if (shardId >= lastShardId) return;

  if (skipChecks) {
    payload.shard = [
      shardId,
      data.shards > lastShardId ? data.shards : lastShardId,
    ];
    // Start The shard
    createShard(data, payload, false, shardId);
    // Spawn next shard
    await spawnShards(
      data,
      payload,
      shardId + 1,
      lastShardId,
      skipChecks - 1,
    );
    return;
  }

  // Make sure we can create a shard or we are waiting for shards to connect still.
  if (createNextShard) {
    createNextShard = false;
    // Start the next few shards based on max concurrency
    await spawnShards(
      data,
      payload,
      shardId,
      lastShardId,
      data.session_start_limit.max_concurrency,
    );
    return;
  }

  await delay(1000);
  await spawnShards(data, payload, shardId, lastShardId, skipChecks);
}

export async function handleDiscordPayload(
  data: DiscordPayload,
  shardId: number,
) {
  eventHandlers.raw?.(data);
  await eventHandlers.dispatchRequirements?.(data, shardId);

  switch (data.op) {
    case DiscordGatewayOpcodes.HeartbeatACK:
      // In case the user wants to listen to heartbeat responses
      return eventHandlers.heartbeat?.();
    case DiscordGatewayOpcodes.Dispatch:
      if (!data.t) return;
      // Run the appropriate handler for this event.
      return handlers[data.t]?.(data, shardId);
    default:
      return;
  }
}

export async function requestAllMembers(
  guildId: string,
  shardId: number,
  resolve: (
    value: Collection<string, Member> | PromiseLike<Collection<string, Member>>,
  ) => void,
  options?: FetchMembersOptions,
) {
  const nonce = `${guildId}-${Date.now()}`;
  cache.fetchAllMembersProcessingRequests.set(nonce, resolve);

  await requestGuildMembers(
    guildId,
    shardId,
    nonce,
    options,
  );
}
