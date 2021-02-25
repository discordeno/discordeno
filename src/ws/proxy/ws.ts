import { Collection } from "../../util/collection.ts";
import {
  cleanupLoadingShards,
  spawnShards,
  startGateway,
  tellClusterToIdentify,
} from "./manager.ts";
import {
  createShard,
  handleDiscordPayload,
  handleOnMessage,
  heartbeat,
  identify,
} from "./shard.ts";
import { log } from "./events.ts";
import { resharder } from "./resharder.ts";

// CONTROLLER LIKE INTERFACE FOR WS HANDLING
export const ws = {
  /** The secret key authorization header the bot will expect when sending payloads */
  secretKey: "",
  /** The url that all discord payloads for the dispatch type should be sent to. */
  url: "",
  /** Whether or not to automatically reshard. */
  reshard: true,
  /** The percentage at which resharding should occur. */
  reshardPercentage: 80,
  /** The maximum shard ID number. Useful for zero-downtime updates or resharding. */
  maxShards: 1,
  /** The amount of shards to load per cluster */
  shardsPerCluster: 25,
  /** The maximum amount of clusters to use for your bot. */
  maxClusters: 4,
  /** The first shard ID to start spawning. */
  firstShardID: 0,
  /** The last shard ID for this cluster. */
  lastShardID: 1,
  /** This prop decides whether Discord allows our next shard to be started. When 1 starts, this is set to false until it is ready for the next one. */
  createNextShard: true,
  /** The identify payload holds the necessary data to connect and stay connected with Discords WSS. */
  identifyPayload: {
    token: "",
    compress: false,
    properties: {
      $os: "linux",
      $browser: "Discordeno",
      $device: "Discordeno",
    },
    intents: 0,
    shard: [0, 0],
  },
  botGatewayData: {
    /** The WSS URL that can be used for connecting to the gateway. */
    url: "wss://gateway.discord.gg/?v=8&encoding=json",
    /** The recommended number of shards to use when connecting. */
    shards: 1,
    /** Info on the current start limit. */
    sessionStartLimit: {
      /** The total number of session starts the current user is allowed. */
      total: 1000,
      /** The remaining number of session starts the current user is allowed. */
      remaining: 1000,
      /** Milliseconds left until limit is reset. */
      resetAfter: 0,
      /** The number of identify requests allowed per 5 seconds.
       * So, if you had a max concurrency of 16, and 16 shards for example, you could start them all up at the same time.
       * Whereas if you had 32 shards, if you tried to start up shard 0 and 16 at the same time for example, it would not work. You can start shards 0-15 concurrently, then 16-31...
       */
      maxConcurrency: 1,
    },
  },
  shards: new Collection<number, DiscordenoShard>(),
  loadingShards: new Collection<
    number,
    {
      shardID: number;
      resolve: (value: unknown) => void;
      reject: (reason?: unknown) => void;
      startedAt: number;
    }
  >(),
  utf8decoder: new TextDecoder(),

  // METHODS

  /** The handler function that starts the gateway. */
  startGateway,
  /** The handler for spawning ALL the shards. */
  spawnShards,
  /** Create the websocket and adds the proper handlers to the websocket. */
  createShard,
  /** Begins identification of the shard to discord */
  identify,
  /** Begins heartbeating of the shard to keep it alive */
  heartbeat,
  /** Sends the discord payload to another server. */
  handleDiscordPayload,
  /** Tell the cluster/worker to begin identifying this shard  */
  tellClusterToIdentify,
  /** Handle the different logs. Used for debugging. */
  log,
  /** Handles resharding the bot when necessary. */
  resharder,
  /** Cleanups loading shards that were unable to load. */
  cleanupLoadingShards,
  /** Handles the message events from websocket */
  handleOnMessage,
};

export interface DiscordenoShard {
  /** The shard id number */
  id: number;
  /** The websocket for this shard */
  ws: WebSocket;
  /** The amount of milliseconds to wait between heartbeats */
  resumeInterval: number;
  /** The session id important for resuming connections. */
  sessionID: string;
  /** The previous sequence number, important for resuming connections. */
  previousSequenceNumber: number | null;
  /** Whether the shard is currently resuming. */
  resuming: boolean;
  heartbeat: {
    /** The exact timestamp the last heartbeat was sent */
    lastSentAt: number;
    /** The timestamp the last heartbeat ACK was received from discord. */
    lastReceivedAt: number;
    /** Whether or not the heartbeat was acknowledged  by discord in time. */
    acknowledged: boolean;
    /** Whether or not to keep heartbeating. Useful for when needing to stop heartbeating. */
    keepAlive: boolean;
    /** The interval between heartbeats requested by discord. */
    interval: number;
    /** The id of the interval, useful for stopping the interval if ws closed. */
    intervalID: number;
  };
}
