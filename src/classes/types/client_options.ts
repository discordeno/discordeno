import { DiscordGatewayIntents } from "../../types/mod.ts";

export interface ClientOptions {
  /** The bot's token */
  token: string;
  /** The gateway intents to use for connecting. */
  intents: (DiscordGatewayIntents | keyof typeof DiscordGatewayIntents)[];
  /** Whether or not to use compression in the gateway. */
  compress?: boolean;
  /** The maximum number of shards to use. */
  maxShards?: number;
  /** The last shard id to use. */
  firstShardId?: number;
  /** The last shard id to use. */
  lastShardId?: number;
  /** The gateway version to use. */
  gatewayVersion?: number;
}
