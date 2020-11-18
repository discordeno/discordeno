import { delay } from "../../deps.ts";
import { controllers } from "../controllers/mod.ts";
import { Guild } from "../structures/guild.ts";
import {
  DiscordBotGatewayData,
  DiscordPayload,
  GatewayOpcode,
} from "../types/discord.ts";
import { FetchMembersOptions } from "../types/guild.ts";
import { cache } from "../utils/cache.ts";
import { BotStatusRequest } from "../utils/utils.ts";
import {
  botGatewayStatusRequest,
  createShard,
  requestGuildMembers,
} from "./shard.ts";
import { eventHandlers, IdentifyPayload } from "./client.ts";

let createNextShard = true;

/** This function is meant to be used on the ready event to alert the library to start the next shard. */
export function allowNextShard(enabled = true) {
  createNextShard = enabled;
}

export async function spawnShards(
  data: DiscordBotGatewayData,
  payload: IdentifyPayload,
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
    spawnShards(
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
    spawnShards(
      data,
      payload,
      shardID,
      lastShardID,
      data.session_start_limit.max_concurrency,
    );
    return;
  }

  await delay(1000);
  spawnShards(data, payload, shardID, lastShardID, skipChecks);
}

export async function handleDiscordPayload(
  data: DiscordPayload,
  shardID: number,
) {
  eventHandlers.raw?.(data);
  await eventHandlers.dispatchRequirements?.(data, shardID);

  switch (data.op) {
    case GatewayOpcode.HeartbeatACK:
      // Incase the user wants to listen to heartbeat responses
      return eventHandlers.heartbeat?.();
    case GatewayOpcode.Dispatch:
      if (!data.t) return;
      // Run the appropriate controller for this event.
      return controllers[data.t]?.(data, shardID);
    default:
      return;
  }
}

export async function requestAllMembers(
  guild: Guild,
  resolve: Function,
  options?: FetchMembersOptions,
) {
  const nonce = `${guild.id}-${Math.random().toString()}`;
  cache.fetchAllMembersProcessingRequests.set(nonce, resolve);

  return requestGuildMembers(guild.id, guild.shardID, nonce, options);
}

export function sendGatewayCommand(type: "EDIT_BOTS_STATUS", payload: object) {
  if (type === "EDIT_BOTS_STATUS") {
    botGatewayStatusRequest(payload as BotStatusRequest);
  }

  return;
}
