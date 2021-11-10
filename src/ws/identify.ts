import { DiscordGatewayOpcodes } from "../types/codes/gateway_opcodes.ts";
import { GatewayManager } from "../bot.ts";

export function identify(gateway: GatewayManager, shardId: number, maxShards: number) {
  gateway.debug("GW IDENTIFYING", { shardId, maxShards });

  // Need to clear the old heartbeat interval
  const oldShard = gateway.shards.get(shardId);
  if (oldShard) {
    gateway.closeWS(oldShard.ws, 3065, "Reidentifying closure of old shard");
    clearInterval(oldShard.heartbeat.intervalId);
  }

  // CREATE A SHARD
  const socket = gateway.createShard(gateway, shardId);

  // Identify can just set/reset the settings for the shard
  gateway.shards.set(shardId, {
    id: shardId,
    ws: socket,
    resumeInterval: 0,
    sessionId: "",
    previousSequenceNumber: 0,
    resuming: false,
    ready: false,
    unavailableGuildIds: new Set(),
    heartbeat: {
      lastSentAt: 0,
      lastReceivedAt: 0,
      acknowledged: false,
      keepAlive: false,
      interval: 0,
      intervalId: 0,
    },
    queue: [],
    processingQueue: false,
    queueStartedAt: Date.now(),
    queueCounter: 0,
  });

  socket.onopen = () => {
    gateway.sendShardMessage(
      gateway,
      shardId,
      {
        op: DiscordGatewayOpcodes.Identify,
        d: {
          token: gateway.token,
          compress: gateway.compress,
          properties: {
            $os: gateway.$os,
            $browser: gateway.$browser,
            $device: gateway.$device,
          },
          intents: gateway.intents,
          shard: [shardId, maxShards],
          presence: gateway.presence,
        },
      },
      true
    );
  };

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(`[Identify Failure] Shard ${shardId} has not received READY event in over a minute.`);
    }, 600000);

    gateway.loadingShards.set(shardId, {
      shardId,
      resolve: (args) => {
        clearTimeout(timeout);
        resolve(args);
      },
      startedAt: Date.now(),
    });
  });
}
