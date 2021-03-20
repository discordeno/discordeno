import { eventHandlers } from "../bot.ts";
import { cache } from "../cache.ts";
import { handlers } from "../handlers/mod.ts";
import { Member } from "../structures/mod.ts";
import {
  DiscordBotGatewayData,
  DiscordIdentify,
  DiscordPayload,
  FetchMembersOptions,
  GatewayOpcode
} from "../types/mod.ts";
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
  shardID: number,
  lastShardID: number,
  skipChecks?: number,
) {
  // All shards on this worker have started! Cancel out.
  if (shardID >= lastShardID) return;

  if (skipChecks) {
    payload.shard = [
      shardID,
      data.shards > lastShardID ? data.shards : lastShardID,
    ];
    // Start The shard
    createShard(data, payload, false, shardID);
    // Spawn next shard
    await spawnShards(
      data,
      payload,
      shardID + 1,
      lastShardID,
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
      shardID,
      lastShardID,
      data.session_start_limit.max_concurrency,
    );
    return;
  }

  await delay(1000);
  await spawnShards(data, payload, shardID, lastShardID, skipChecks);
}

export async function handleDiscordPayload(
  data: DiscordPayload,
  shardID: number,
) {
  eventHandlers.raw?.(data);
  await eventHandlers.dispatchRequirements?.(data, shardID);

  switch (data.op) {
    case GatewayOpcode.HeartbeatACK:
      // In case the user wants to listen to heartbeat responses
      return eventHandlers.heartbeat?.();
    case GatewayOpcode.Dispatch:
      if (!data.t) return;
      // Run the appropriate handler for this event.
      return handlers[data.t]?.(data, shardID);
    default:
      return;
  }
}

export async function requestAllMembers(
  guildID: string,
  shardID: number,
  resolve: (
    value: Collection<string, Member> | PromiseLike<Collection<string, Member>>,
  ) => void,
  options?: FetchMembersOptions,
) {
  const nonce = `${guildID}-${Date.now()}`;
  cache.fetchAllMembersProcessingRequests.set(nonce, resolve);

  await requestGuildMembers(
    guildID,
    shardID,
    nonce,
    options,
  );
}
