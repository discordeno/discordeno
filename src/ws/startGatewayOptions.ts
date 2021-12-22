import { GatewayIntents } from "../types/gateway/gatewayIntents.ts";

export interface StartGatewayOptions {
  /** The bot token. */
  token: string;
  /** Whether or not to use compression for gateway payloads. */
  compress?: boolean;
  /** The intents you would like to enable. */
  intents: (GatewayIntents | keyof typeof GatewayIntents)[];
  /** The max amount of shards used for identifying. This can be useful for zero-downtime updates or resharding. */
  maxShards?: number;
  /** The first shard Id for this group of shards. */
  firstShardId: number;
  /** The last shard Id for this group. If none is provided, it will default to loading all shards. */
  lastShardId?: number;
  /** The url to forward all payloads to. */
  url: string;
  /** The amount of shards per worker. By default this is 25. Use this to spread the load from shards to different CPU cores. */
  shardsPerWorker?: number;
  /** The maximum amount of workers available. By default this is 4. Another way to think of worker is how many CPU cores does your server/machine have. */
  maxWorkers?: number;
  /** Whether or not you want to allow automated sharding. By default this is true. */
  reshard?: boolean;
  /** The authorization key that the bot http server will expect. */
  secretKey: string;
}
