import { createShardManager, DiscordUnavailableGuild, Shard, ShardSocketRequest, ShardState } from "discordeno";
import { createLogger } from "discordeno/logger";
import { parentPort, workerData } from "worker_threads";
import { ManagerMessage } from "./index.js";

if (!parentPort) {
  throw new Error("Parent port is null");
}

const script: WorkerCreateData = workerData;

const log = createLogger({ name: `[WORKER #${script.workerId}]` });

const identifyPromises = new Map<number, () => void>();

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

    // MUST HANDLE GUILD_DELETE EVENTS FOR UNAVAILABLE
    if (message.t === "GUILD_DELETE" && (message.d as DiscordUnavailableGuild).unavailable) return;

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
