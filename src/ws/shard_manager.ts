import { controllers } from "../api/controllers/mod.ts";
import { Guild } from "../api/structures/guild.ts";
import { FetchMembersOptions } from "../api/types/mod.ts";
import { eventHandlers } from "../bot.ts";
import {
  GatewayOpcodes,
  GatewayPayload,
  GetGatewayBotPayload,
  IdentifyPayload,
} from "../types/mod.ts";
import { cache } from "../util/cache.ts";
import { BotStatusRequest, delay } from "../util/utils.ts";
import {
  botGatewayStatusRequest,
  createShard,
  requestGuildMembers,
} from "./mod.ts";

let createNextShard = true;

/** This function is meant to be used on the ready event to alert the library to start the next shard. */
export function allowNextShard(enabled = true) {
  createNextShard = enabled;
}

export async function spawnShards(
  data: GetGatewayBotPayload,
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
    await createShard(data, payload, false, shardID);
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
  data: GatewayPayload,
  shardID: number,
) {
  eventHandlers.raw?.(data);
  await eventHandlers.dispatchRequirements?.(data, shardID);

  switch (data.op) {
    case GatewayOpcodes.HeartbeatACK:
      // In case the user wants to listen to heartbeat responses
      return eventHandlers.heartbeat?.();
    case GatewayOpcodes.Dispatch:
      if (!data.t) return;
      // Run the appropriate controller for this event.
      // TODO(itohatweb): remove ts-ignore
      // @ts-ignore
      return controllers[data.t]?.(data, shardID);
    default:
      return;
  }
}

export function requestAllMembers(
  guild: Guild,
  // TODO: The parameter "resolve" should have a "stronger" type.
  // deno-lint-ignore ban-types
  resolve: Function,
  options?: FetchMembersOptions,
) {
  const nonce = `${guild.id}-${Date.now()}`;
  cache.fetchAllMembersProcessingRequests.set(nonce, resolve);
  return requestGuildMembers(guild.id, guild.shardID, nonce, options);
}

export function sendGatewayCommand(
  type: "EDIT_BOTS_STATUS",
  // deno-lint-ignore no-explicit-any
  payload: Record<string, any>,
) {
  if (type === "EDIT_BOTS_STATUS") {
    botGatewayStatusRequest(payload as BotStatusRequest);
  }

  return;
}
