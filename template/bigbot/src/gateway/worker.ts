import {
  createShardManager,
  DiscordGuild,
  DiscordReady,
  DiscordUnavailableGuild,
  GatewayEventNames,
  Shard,
  ShardSocketRequest,
  ShardState,
} from "discordeno";
import { createLogger } from "discordeno/logger";
import { parentPort, workerData } from "worker_threads";
import { ManagerMessage } from "./index.js";

if (!parentPort) {
  throw new Error("Parent port is null");
}

const script: WorkerCreateData = workerData;

const log = createLogger({ name: `[WORKER #${script.workerId}]` });

const identifyPromises = new Map<number, () => void>();

// Store guild ids, loading guild ids to change GUILD_CREATE event to GUILD_LOADED_DD if needed.
const guildIds: Set<bigint> = new Set();
const loadingGuildIds: Set<bigint> = new Set();

const manager = createShardManager({
  gatewayConfig: {
    intents: script.intents,
    token: script.token,
  },
  shardIds: [],
  totalShards: script.totalShards,
  handleMessage: async (shard, message) => {
    const url = script.handlerUrls[shard.id % script.handlerUrls.length];
    if (!url) return console.log("ERROR: NO URL FOUND TO SEND MESSAGE");

    if (message.t === "READY") {
      // Marks which guilds the bot in when initial loading in cache.
      (message.d as DiscordReady).guilds.forEach((g) => loadingGuildIds.add(BigInt(g.id)));
    }

    // If GUILD_CREATE event came from a shard loaded event, change event to GUILD_LOADED_DD.
    if (message.t === "GUILD_CREATE") {
      const guild = message.d as DiscordGuild;
      const id = BigInt(guild.id);

      const existing = guildIds.has(id);
      if (existing) return;

      if (loadingGuildIds.has(id)) {
        (message.t as GatewayEventNames | "GUILD_LOADED_DD") = "GUILD_LOADED_DD";

        loadingGuildIds.delete(id);
      }

      guildIds.add(id);
    }

    // Delete guild id from cache so GUILD_CREATE from the same guild later works properly.
    if (message.t === "GUILD_DELETE") {
      const guild = message.d as DiscordUnavailableGuild;

      if (guild.unavailable) return;

      guildIds.delete(BigInt(guild.id));
    }

    await fetch(url, {
      method: "POST",
      body: JSON.stringify({ message, shardId: shard.id }),
      headers: { "Content-Type": "application/json", Authorization: script.handlerAuthorization },
    }).catch((error) => log.error(error));

    log.debug({ shardId: shard.id, message });
  },
  requestIdentify: async function (shardId: number): Promise<void> {
    return await new Promise((resolve) => {
      identifyPromises.set(shardId, resolve);

      const identifyRequest: ManagerMessage = {
        type: "REQUEST_IDENTIFY",
        shardId,
      };

      parentPort?.postMessage(identifyRequest);
    });
  },
});

function buildShardInfo(shard: Shard): WorkerShardInfo {
  return {
    workerId: script.workerId,
    shardId: shard.id,
    rtt: shard.heart.rtt || -1,
    state: shard.state,
  };
}

parentPort.on("message", async (data: WorkerMessage) => {
  switch (data.type) {
    case "IDENTIFY_SHARD": {
      log.info(`starting to identify shard #${data.shardId}`);
      await manager.identify(data.shardId);

      break;
    }
    case "ALLOW_IDENTIFY": {
      identifyPromises.get(data.shardId)?.();
      identifyPromises.delete(data.shardId);

      break;
    }
    case "SHARD_PAYLOAD": {
      manager.shards.get(data.shardId)?.send(data.data);

      break;
    }
    case "GET_SHARD_INFO": {
      const infos = manager.shards.map(buildShardInfo);

      parentPort?.postMessage({ type: "NONCE_REPLY", nonce: data.nonce, data: infos });
    }
  }
});

export type WorkerMessage = WorkerIdentifyShard | WorkerAllowIdentify | WorkerShardPayload | WorkerGetShardInfo;

export type WorkerIdentifyShard = {
  type: "IDENTIFY_SHARD";
  shardId: number;
};

export type WorkerAllowIdentify = {
  type: "ALLOW_IDENTIFY";
  shardId: number;
};

export type WorkerShardPayload = {
  type: "SHARD_PAYLOAD";
  shardId: number;
  data: ShardSocketRequest;
};

export type WorkerGetShardInfo = {
  type: "GET_SHARD_INFO";
  nonce: string;
};

export type WorkerCreateData = {
  intents: number;
  token: string;
  handlerUrls: string[];
  handlerAuthorization: string;
  path: string;
  totalShards: number;
  workerId: number;
};

export type WorkerShardInfo = {
  workerId: number;
  shardId: number;
  rtt: number;
  state: ShardState;
};
