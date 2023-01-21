import type { Camelize, DiscordGetGatewayBot } from '@discordeno/types'
import type { LeakyBucket } from '@discordeno/utils'
import { createLeakyBucket, delay } from '@discordeno/utils'
import Shard from './Shard.js'
import type { ShardEvents } from './types.js'

export function createGatewayManager(options: CreateGatewayManagerOptions): GatewayManager {
  if (!options.connection) {
    options.connection = {
      url: 'wss://gateway.discord.gg',
      shards: 1,
      sessionStartLimit: {
        maxConcurrency: 1,
        remaining: 1000,
        total: 1000,
        resetAfter: 1000 * 60 * 60 * 24,
      },
    }
  }

  const gateway: GatewayManager = {
    events: options.events,
    compress: options.compress ?? false,
    intents: options.intents ?? 0,
    properties: {
      os: options.properties?.os ?? process.platform,
      browser: options.properties?.browser ?? 'Discordeno',
      device: options.properties?.device ?? 'Discordeno',
    },
    token: options.token,
    url: options.url ?? options.connection.url ?? 'wss://gateway.discord.gg',
    version: options.version ?? 10,
    connection: options.connection,
    totalShards: options.totalShards ?? options.connection.shards ?? 1,
    lastShardId: options.lastShardId ?? 0,
    firstShardId: options.firstShardId ?? 0,
    totalWorkers: options.totalWorkers ?? 4,
    shardsPerWorker: options.shardsPerWorker ?? 25,
    spawnShardDelay: options.spawnShardDelay ?? 5300,
    shards: new Map(),
    buckets: new Map(),

    calculateTotalShards() {
      // Bots under 100k servers do not have access to total shards.
      if (gateway.totalShards < 100) return gateway.totalShards

      // Calculate a multiple of `maxConcurrency` which can be used to connect to the gateway.
      return (
        Math.ceil(
          gateway.totalShards /
            // If `maxConcurrency` is 1 we can safely use 16.
            (gateway.connection.sessionStartLimit.maxConcurrency === 1 ? 16 : gateway.connection.sessionStartLimit.maxConcurrency),
        ) * gateway.connection.sessionStartLimit.maxConcurrency
      )
    },
    calculateWorkerId(shardId) {
      // Ignore decimal numbers.
      let workerId = Math.floor(shardId / gateway.shardsPerWorker)
      // If the workerId overflows the maximal allowed workers we by default just use to last worker.
      if (workerId >= gateway.totalWorkers) {
        // The Id of the last available worker is total -1
        workerId = gateway.totalWorkers - 1
      }

      return workerId
    },
    prepareBuckets() {
      for (let i = 0; i < gateway.connection.sessionStartLimit.maxConcurrency; ++i) {
        gateway.buckets.set(i, {
          workers: [],
          leak: createLeakyBucket({
            max: 1,
            refillAmount: 1,
            // special number which is proven to be working dont change
            refillInterval: gateway.spawnShardDelay,
          }),
        })
      }

      // ORGANIZE ALL SHARDS INTO THEIR OWN BUCKETS
      for (let shardId = gateway.firstShardId; shardId <= gateway.lastShardId; ++shardId) {
        if (shardId >= gateway.totalShards) {
          throw new Error(`Shard (id: ${shardId}) is bigger or equal to the used amount of used shards which is ${gateway.totalShards}`)
        }

        const bucketId = shardId % gateway.connection.sessionStartLimit.maxConcurrency
        const bucket = gateway.buckets.get(bucketId)
        if (bucket == null) {
          throw new Error(
            `Shard (id: ${shardId}) got assigned to an illegal bucket id: ${bucketId}, expected a bucket id between 0 and ${
              gateway.connection.sessionStartLimit.maxConcurrency - 1
            }`,
          )
        }

        // FIND A QUEUE IN THIS BUCKET THAT HAS SPACE
        // const worker = bucket.workers.find((w) => w.queue.length < gateway.shardsPerWorker);
        const workerId = gateway.calculateWorkerId(shardId)
        const worker = bucket.workers.find((w) => w.id === workerId)
        if (worker) {
          // IF THE QUEUE HAS SPACE JUST ADD IT TO THIS QUEUE
          worker.queue.push(shardId)
        } else {
          bucket.workers.push({ id: workerId, queue: [shardId] })
        }
      }
    },
    async spawnShards() {
      // PREPARES ALL SHARDS IN SPECIFIC BUCKETS
      gateway.prepareBuckets()

      // Prefer concurrency of forEach instead of forof
      await Promise.all(
        [...gateway.buckets.entries()].map(async ([bucketId, bucket]) => {
          for (const worker of bucket.workers) {
            for (const shardId of worker.queue) {
              await gateway.tellWorkerToIdentify(worker.id, shardId, bucketId)
            }
          }
        }),
      )
      // gateway.buckets.forEach(async (bucket, bucketId) => {
      //   for (const worker of bucket.workers) {
      //     for (const shardId of worker.queue) {
      //       await gateway.tellWorkerToIdentify(worker.id, shardId, bucketId)
      //     }
      //   }
      // })
    },
    async shutdown(code, reason) {
      gateway.shards.forEach((shard) => shard.close(code, reason))

      await delay(5000)
    },
    async tellWorkerToIdentify(workerId, shardId, bucketId) {
      return await gateway.identify(shardId)
    },
    async identify(shardId: number) {
      let shard = this.shards.get(shardId)
      if (!shard) {
        shard = new Shard({
          id: shardId,
          connection: {
            compress: this.compress,
            intents: this.intents,
            properties: this.properties,
            token: this.token,
            totalShards: this.totalShards,
            url: this.url,
            version: this.version,
          },
          events: options.events,
        })

        this.shards.set(shardId, shard)
      }

      return await shard.identify()
    },
    async kill(shardId: number) {
      const shard = this.shards.get(shardId)
      if (!shard) return

      this.shards.delete(shardId)
      return await shard.shutdown()
    },

    async requestIdentify() {},
  }

  return gateway
}

export interface CreateGatewayManagerOptions {
  /**
   * Id of the first Shard which should get controlled by this manager.
   * @default 0
   */
  firstShardId?: number
  /**
   * Id of the last Shard which should get controlled by this manager.
   * @default 0
   */
  lastShardId?: number
  /**
   * Delay in milliseconds to wait before spawning next shard. OPTIMAL IS ABOVE 5100. YOU DON'T WANT TO HIT THE RATE LIMIT!!!
   * @default 5300
   */
  spawnShardDelay?: number
  /**
   * Total amount of shards your bot uses. Useful for zero-downtime updates or resharding.
   * @default 1
   */
  totalShards?: number
  /**
   * The amount of shards to load per worker.
   * @default 25
   */
  shardsPerWorker?: number
  /**
   * The total amount of workers to use for your bot.
   * @default 4
   */
  totalWorkers?: number
  /** Important data which is used by the manager to connect shards to the gateway. */
  connection?: Camelize<DiscordGetGatewayBot>
  /** Whether incoming payloads are compressed using zlib.
   *
   * @default false
   */
  compress?: boolean
  /** The calculated intent value of the events which the shard should receive.
   *
   * @default 0
   */
  intents?: number
  /** Identify properties to use */
  properties?: {
    /** Operating system the shard runs on.
     *
     * @default "darwin" | "linux" | "windows"
     */
    os: string
    /** The "browser" where this shard is running on.
     *
     * @default "Discordeno"
     */
    browser: string
    /** The device on which the shard is running.
     *
     * @default "Discordeno"
     */
    device: string
  }
  /** Bot token which is used to connect to Discord */
  token: string
  /** The URL of the gateway which should be connected to.
   *
   * @default "wss://gateway.discord.gg"
   */
  url?: string
  /** The gateway version which should be used.
   *
   * @default 10
   */
  version?: number
  /** The events handlers */
  events: ShardEvents
}

export interface GatewayManager extends Required<CreateGatewayManagerOptions> {
  /** The max concurrency buckets. Those will be created when the `spawnShards` (which calls `prepareBuckets` under the hood) function gets called. */
  buckets: Map<
    number,
    {
      workers: Array<{ id: number; queue: number[] }>
      leak: LeakyBucket
    }
  >
  /** The shards that are created. */
  shards: Map<number, Shard>
  /** Determine max number of shards to use based upon the max concurrency. */
  calculateTotalShards: () => number
  /** Determine the id of the worker which is handling a shard. */
  calculateWorkerId: (shardId: number) => number
  /** Prepares all the buckets that are available for identifying the shards. */
  prepareBuckets: () => void
  /** Start identifying all the shards. */
  spawnShards: () => Promise<void>
  /** Shutdown all shards. */
  shutdown: (code: number, reason: string) => Promise<void>
  /** Allows users to hook in and change to communicate to different workers across different servers or anything they like. For example using redis pubsub to talk to other servers. */
  tellWorkerToIdentify: (workerId: number, shardId: number, bucketId: number) => Promise<void>
  /** Tell the manager to identify a Shard. If this Shard is not already managed this will also add the Shard to the manager. */
  identify: (shardId: number) => Promise<void>
  /** Kill a shard. Close a shards connection to Discord's gateway (if any) and remove it from the manager. */
  kill: (shardId: number) => Promise<void>
  /** This function communicates with the parent manager, in order to know whether this manager is allowed to identify a new shard. */
  requestIdentify: () => Promise<void>
}
