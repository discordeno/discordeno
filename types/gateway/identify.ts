import { IdentifyConnectionProperties } from "./identifyConnectionProperties.ts";
import { StatusUpdate } from "./statusUpdate.ts";

/** https://discord.com/developers/docs/topics/gateway#identify */
export interface Identify {
  /** Authentication token */
  token: string;
  /** Connection properties */
  properties: IdentifyConnectionProperties;
  /** Whether this connection supports compression of packets */
  compress?: boolean;
  /** Value between 50 and 250, total number of members where the gateway will stop sending offline members in the guild member list */
  largeThreshold?: number;
  /** Used for Guild Sharding */
  shard?: [shardId: number, numberOfShards: number];
  /** Presence structure for initial presence information */
  presence?: StatusUpdate;
  /** The Gateway Intents you wish to receive */
  intents: number;
}
