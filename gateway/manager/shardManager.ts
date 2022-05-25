import { DiscordGatewayPayload } from "../../types/discord.ts";
import { PickPartial } from "../../types/shared.ts";
import { Collection } from "../../util/collection.ts";
import { CreateShard, createShard } from "../shard/createShard.ts";
import { Shard, ShardGatewayConfig } from "../shard/types.ts";

// TODO: debug

/** This is a Shard manager.
 * This does not manage a specific range of Shard but the provided Shards on create or when an identify is requested.
 * The aim of this is to provide an easy to use manager which can be used by workers or any other kind of separate process.
 */
export type ShardManager = ReturnType<typeof createShardManager>;

/** Create a new Shard manager.
 * This does not manage a specific range of Shard but the provided Shards on create or when an identify is requested.
 * The aim of this is to provide an easy to use manager which can be used by workers or any other kind of separate process.
 */
export function createShardManager(options: CreateShardManager) {
  return {
    // ----------
    // PROPERTIES
    // ----------

    /** Options which are used to create a new Shard. */
    createShardOptions: {
      ...options.createShardOptions,
      events: {
        ...options.createShardOptions?.events,
        message: options.createShardOptions?.events?.message ?? options.handleMessage,
      },
    },
    /** Gateway configuration which is used when creating a Shard. */
    gatewayConfig: options.gatewayConfig,
    /** Managed Shards. */
    shards: new Collection(
      options.shardIds.map((shardId) => {
        const shard = createShard({
          ...options.createShardOptions,
          id: shardId,
          totalShards: options.totalShards,
          gatewayConfig: options.gatewayConfig,
          requestIdentify: async function () {
            return await options.requestIdentify(shardId);
          },
        });

        return [shardId, shard] as const;
      }),
    ),
    /** Total amount of Shards used by the bot. */
    totalShards: options.totalShards,

    // ----------
    // METHODS
    // ----------

    /** Tell the manager to identify a Shard.
     * If this Shard is not already managed this will also add the Shard to the manager.
     */
    identify: async function (shardId: number) {
      let shard = this.shards.get(shardId);
      if (!shard) {
        shard = createShard({
          ...this.createShardOptions,
          id: shardId,
          totalShards: this.totalShards,
          gatewayConfig: this.gatewayConfig,
          requestIdentify: async function () {
            return await options.requestIdentify(shardId);
          },
        });

        this.shards.set(shardId, shard);
      }

      return await shard.identify();
    },

    /** Kill a shard.
     * Close a shards connection to Discord's gateway (if any) and remove it from the manager.
     */
    kill: async function (shardId: number) {
      const shard = this.shards.get(shardId);
      if (!shard) return;

      this.shards.delete(shardId);
      return await shard.shutdown();
    },

    /** This function communicates with the parent manager,
     * in order to know whether this manager is allowed to identify a new shard.
     */
    requestIdentify: options.requestIdentify,
  };
}

export interface CreateShardManager {
  // ----------
  // PROPERTIES
  // ----------
  /** Options which are used to create a new Shard. */
  createShardOptions?: Omit<CreateShard, "id" | "totalShards" | "requestIdentify" | "gatewayConfig">;
  /** Gateway configuration which is used when creating a Shard. */
  gatewayConfig: PickPartial<ShardGatewayConfig, "token">;
  /** Ids of the Shards which should be managed. */
  shardIds: number[];
  /** Total amount of Shard used by the bot. */
  totalShards: number;

  // ----------
  // METHODS
  // ----------

  /** This function is used when a shard receives any message from Discord. */
  handleMessage(shard: Shard, message: DiscordGatewayPayload): unknown;

  /** This function communicates with the parent manager,
   * in order to know whether this manager is allowed to identify a new shard. #
   */
  requestIdentify(shardId: number): Promise<void>;
}
