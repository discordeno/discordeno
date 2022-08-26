import { Collection, createBot, createGatewayManager, createRestManager } from "discordeno";
import { createLogger } from "discordeno/logger";
import fastify from "fastify";
import { nanoid } from "nanoid";
import { Worker } from "worker_threads";
import {
  DISCORD_TOKEN,
  EVENT_HANDLER_AUTHORIZATION,
  EVENT_HANDLER_URL,
  GATEWAY_AUTHORIZATION,
  GATEWAY_HOST,
  GATEWAY_PORT,
  INTENTS,
  REST_AUTHORIZATION,
  REST_URL,
  SHARDS_PER_WORKER,
  TOTAL_SHARDS,
  TOTAL_WORKERS,
} from "../configs";
import { WorkerCreateData, WorkerGetShardInfo, WorkerMessage, WorkerShardInfo, WorkerShardPayload } from "./worker";

async function main() {
  const log = createLogger({ name: "[MANAGER]" });

  const bot = createBot({
    token: DISCORD_TOKEN,
  });

  bot.rest = createRestManager({
    token: DISCORD_TOKEN,
    secretKey: REST_AUTHORIZATION,
    customUrl: REST_URL,
  });

  const gatewayBot = await bot.helpers.getGatewayBot();

  const gateway = createGatewayManager({
    gatewayBot,
    gatewayConfig: {
      token: DISCORD_TOKEN,
      intents: INTENTS,
    },
    // force the total amount of shards
    totalShards: TOTAL_SHARDS,
    shardsPerWorker: SHARDS_PER_WORKER,
    totalWorkers: TOTAL_WORKERS,

    handleDiscordPayload: () => {},

    tellWorkerToIdentify: async (_gateway, workerId, shardId, _bucketId) => {
      log.info("TELL TO IDENTIFY", { workerId, shardId, _bucketId });

      let worker = workers.get(workerId);
      if (!worker) {
        worker = createWorker(workerId);
        workers.set(workerId, worker);
      }

      const identify: WorkerMessage = {
        type: "IDENTIFY_SHARD",
        shardId,
      };

      worker.postMessage(identify);
    },
  });

  const workers = new Collection<number, Worker>();
  const nonces = new Collection<string, (data: any) => void>();

  function createWorker(workerId: number) {
    console.log(TOTAL_SHARDS, gateway.manager.totalShards, "SHARDS");

    const workerData: WorkerCreateData = {
      intents: gateway.manager.gatewayConfig.intents ?? 0,
      token: DISCORD_TOKEN,
      handlerUrls: [EVENT_HANDLER_URL],
      handlerAuthorization: EVENT_HANDLER_AUTHORIZATION,
      path: `${__dirname}/worker.ts`,
      totalShards: gateway.manager.totalShards,
      workerId,
    };

    const worker = new Worker(`${__dirname}/worker.js`, {
      workerData,
    });

    worker.on("message", async (data: ManagerMessage) => {
      log.info({ data });
      switch (data.type) {
        case "REQUEST_IDENTIFY": {
          log.info("REQUESTING IDENTIFY #", data.shardId);
          await gateway.manager.requestIdentify(data.shardId);

          const allowIdentify: WorkerMessage = {
            type: "ALLOW_IDENTIFY",
            shardId: data.shardId,
          };

          worker.postMessage(allowIdentify);

          break;
        }
        case "NONCE_REPLY": {
          nonces.get(data.nonce)?.(data.data);
        }
      }
    });

    return worker;
  }

  gateway.spawnShards();

  const server = fastify();

  server.post("/", async (request, reply) => {
    if (request.headers.authorization !== GATEWAY_AUTHORIZATION) {
      reply.code(StatusCodes.Unauthorized);

      return reply.send({ processing: false, error: false, message: "Invalid authorization header." });
    }

    if (!request.body) {
      reply.code(StatusCodes.BadRequest);

      return reply.send({ processing: false, error: false, message: "Empty body." });
    }

    try {
      const data = request.body as WorkerShardPayload | Omit<WorkerGetShardInfo, "nonce">;
      switch (data.type) {
        case "SHARD_PAYLOAD": {
          const workerId = gateway.calculateWorkerId(data.shardId);
          const worker = workers.get(workerId);

          worker?.postMessage(data);

          break;
        }
        case "GET_SHARD_INFO": {
          const infos = await Promise.all(
            workers.map(async (worker) => {
              const nonce = nanoid();

              return new Promise<WorkerShardInfo[]>((resolve) => {
                worker.postMessage({ type: "GET_SHARD_INFO", nonce });

                nonces.set(nonce, resolve);
              });
            }),
          ).then((res) =>
            res.reduce((acc, cur) => {
              acc.push(...cur);
              return acc;
            }, [] as WorkerShardInfo[])
          );

          reply.code(StatusCodes.Ok);

          return reply.send(infos);
        }
      }

      reply.code(StatusCodes.Ok);

      return reply.send({ processing: true });
    } catch {
      reply.code(StatusCodes.BadRequest);

      return reply.send({ processing: false, error: true, message: "Failed to parse body." });
    }
  });

  server.listen({ host: GATEWAY_HOST, port: GATEWAY_PORT }).catch((error) => {
    log.error(["[FASTIFY ERROR", error].join("\n"));
    process.exit(1);
  });
}

main();

export type ManagerMessage = ManagerRequestIdentify | ManagerNonceReply<WorkerShardInfo[]>;

export type ManagerRequestIdentify = {
  type: "REQUEST_IDENTIFY";
  shardId: number;
};

export type ManagerNonceReply<T> = {
  type: "NONCE_REPLY";
  nonce: string;
  data: T;
};

enum StatusCodes {
  Ok = 200,

  BadRequest = 400,
  Unauthorized = 401,

  InternalServerError = 500,
}
