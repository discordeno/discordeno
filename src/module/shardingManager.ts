import { delay } from "../../deps.ts";
import { controllers } from "../controllers/mod.ts";
import type { Guild } from "../structures/guild.ts";
import type {
  DiscordBotGatewayData,
  DiscordPayload,
} from "../types/discord.ts";
import { GatewayOpcode } from "../types/discord.ts";
import type { FetchMembersOptions } from "../types/guild.ts";
import { cache } from "../utils/cache.ts";
import type { BotStatusRequest } from "../utils/utils.ts";
import {
  botGatewayStatusRequest,
  createBasicShard,
  requestGuildMembers,
} from "./basicShard.ts";
import type { IdentifyPayload } from "./client.ts";
import { botGatewayData, eventHandlers, identifyPayload } from "./client.ts";

let shardCounter = 0;
let basicSharding = false;

const shards: Worker[] = [];
let createNextShard = true;

/** This function is meant to be used on the ready event to alert the library to start the next shard. */
export function allowNextShard(enabled = true) {
  createNextShard = enabled;
}

export function createShardWorker(shardID?: number) {
  const path = new URL("./shard.ts", import.meta.url).toString();
  const shard = new Worker(path, { type: "module", deno: true });
  shard.onmessage = (message) => {
    if (message.data.type === "REQUEST_CLIENT_OPTIONS") {
      identifyPayload.shard = [
        shardID || shardCounter,
        botGatewayData.shards,
      ];

      shard.postMessage(
        {
          type: "CREATE_SHARD",
          botGatewayData,
          identifyPayload,
          shardID: shardCounter,
        },
      );
      // Update the shard counter
      shardCounter++;
    } else if (message.data.type === "HANDLE_DISCORD_PAYLOAD") {
      handleDiscordPayload(
        JSON.parse(message.data.payload),
        message.data.shardID,
      );
    } else if (message.data.type === "DEBUG_LOG") {
      eventHandlers.debug?.(message.data.details);
    }
  };
  shards.push(shard);
}

export const spawnShards = async (
  data: DiscordBotGatewayData,
  payload: IdentifyPayload,
  id = 1,
) => {
  if ((data.shards === 1 && id === 1) || id <= data.shards) {
    if (createNextShard) {
      createNextShard = false;
      if (data.shards >= 25) createShardWorker();
      else {
        basicSharding = true;
        createBasicShard(data, payload, false, id - 1);
      }
      spawnShards(data, payload, id + 1);
    } else {
      await delay(1000);
      spawnShards(data, payload, id);
    }
  }
};

export async function handleDiscordPayload(
  data: DiscordPayload,
  shardID: number,
) {
  eventHandlers.raw?.(data);

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

  if (basicSharding) {
    return requestGuildMembers(guild.id, guild.shardID, nonce, options);
  }

  shards[guild.shardID].postMessage({
    type: "FETCH_MEMBERS",
    guildID: guild.id,
    nonce,
    options,
  });
}

export function sendGatewayCommand(type: "EDIT_BOTS_STATUS", payload: object) {
  if (basicSharding) {
    if (type === "EDIT_BOTS_STATUS") {
      botGatewayStatusRequest(payload as BotStatusRequest);
    }

    return;
  }
  shards.forEach((shard) => {
    shard.postMessage({
      type,
      ...payload,
    });
  });
}
