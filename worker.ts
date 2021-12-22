import { GAMER_TOKEN } from "./configs.ts";
import { createGatewayManager, GatewayManager } from "./mod.ts";

function spawnGateway(shardId: number, options: Partial<GatewayManager>) {
  const gateway = createGatewayManager({
    // LOAD DATA FROM DISCORDS RECOMMENDATIONS OR YOUR OWN CUSTOM ONES HERE
    shardsRecommended: options.shardsRecommended,
    sessionStartLimitTotal: options.sessionStartLimitTotal,
    sessionStartLimitRemaining: options.sessionStartLimitRemaining,
    sessionStartLimitResetAfter: options.sessionStartLimitResetAfter,
    maxConcurrency: options.maxConcurrency,
    maxShards: options.maxShards,
    // SET STARTING SHARD ID
    firstShardId: shardId,
    // SET LAST SHARD ID
    lastShardId: options.lastShardId ?? shardId,
    // THE AUTHORIZATION WE WILL USE ON OUR EVENT HANDLER PROCESS
    secretKey: "ifj893rhjn238uf9wev",
    token: GAMER_TOKEN,
    intents: ["GuildMessages", "Guilds"],
    handleDiscordPayload: async function (_, data, shardId) {
      // TODO: CHANGE FROM SENDING THROUGH HTTP TO USING A WS FOR FASTER PROCESSING! OR HTTP3 OR WHATEVER!
      // TRIGGER RAW EVENT
      if (!data.t) return;

      // IF FINAL SHARD BECAME READY TRIGGER NEXT WORKER
      if (data.t === "READY") {
        if (shardId === gateway.lastShardId) {
          // @ts-ignore
          postMessage(
            JSON.stringify({
              type: "ALL_SHARDS_READY",
            })
          );
        }
      }
      //   await fetch(`${EVENT_HANDLER_URL}:${EVENT_HANDLER_PORT}`, {
      //     headers: {
      //       Authorization: gateway.secretKey,
      //     },
      //     method: "POST",
      //     body: JSON.stringify({
      //       shardId,
      //       data,
      //     }),
      //   })
      //     // BELOW IS FOR DENO MEMORY LEAK
      //     .then((res) => res.text())
      //     .catch(() => null);
    },
  });

  // START THE GATEWAY
  gateway.spawnShards(gateway, shardId);

  return gateway;
}

interface IdentifyPayload {
  type: "IDENTIFY";
  shardId: number;
  shards: number;
  sessionStartLimit: {
    total: number;
    remaining: number;
    resetAfter: number;
    maxConcurrency: number;
  };
  shardsRecommended: number;
  sessionStartLimitTotal: number;
  sessionStartLimitRemaining: number;
  sessionStartLimitResetAfter: number;
  maxConcurrency: number;
  maxShards: number;
  lastShardId: number;
}
// @ts-ignore
self.onmessage = function (message: MessageEvent<string>) {
  const data = JSON.parse(message.data) as IdentifyPayload;

  if (data.type === "IDENTIFY") {
    spawnGateway(data.shardId, {
      shardsRecommended: data.shardsRecommended,
      sessionStartLimitTotal: data.sessionStartLimitTotal,
      sessionStartLimitRemaining: data.sessionStartLimitRemaining,
      sessionStartLimitResetAfter: data.sessionStartLimitResetAfter,
      maxConcurrency: data.maxConcurrency,
      maxShards: data.maxShards,
      lastShardId: data.lastShardId,
    });
  }
};
