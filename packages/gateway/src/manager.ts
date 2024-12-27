import { randomBytes } from 'node:crypto'
import {
  type AtLeastOne,
  type BigString,
  type Camelize,
  type DiscordGetGatewayBot,
  type DiscordMemberWithUser,
  type DiscordReady,
  GatewayIntents,
  GatewayOpcodes,
  type RequestGuildMembers,
} from '@discordeno/types'
import { Collection, delay, logger } from '@discordeno/utils'
import Shard from './Shard.js'
import {
  type BotStatusUpdate,
  type ShardEvents,
  ShardSocketCloseCodes,
  type ShardSocketRequest,
  type StatusUpdate,
  type TransportCompression,
  type UpdateVoiceState,
} from './types.js'

export function createGatewayManager(options: CreateGatewayManagerOptions): GatewayManager {
  const connectionOptions = options.connection ?? {
    url: 'wss://gateway.discord.gg',
    shards: 1,
    sessionStartLimit: {
      maxConcurrency: 1,
      remaining: 1000,
      total: 1000,
      resetAfter: 1000 * 60 * 60 * 24,
    },
  }

  const gateway: GatewayManager = {
    events: options.events ?? {},
    compress: options.compress ?? false,
    transportCompression: options.transportCompression ?? null,
    intents: options.intents ?? 0,
    properties: {
      os: options.properties?.os ?? process.platform,
      browser: options.properties?.browser ?? 'Discordeno',
      device: options.properties?.device ?? 'Discordeno',
    },
    token: options.token,
    url: options.url ?? connectionOptions.url ?? 'wss://gateway.discord.gg',
    version: options.version ?? 10,
    connection: connectionOptions,
    totalShards: options.totalShards ?? connectionOptions.shards ?? 1,
    lastShardId: options.lastShardId ?? (options.totalShards ? options.totalShards - 1 : connectionOptions ? connectionOptions.shards - 1 : 0),
    firstShardId: options.firstShardId ?? 0,
    totalWorkers: options.totalWorkers ?? 4,
    shardsPerWorker: options.shardsPerWorker ?? 25,
    spawnShardDelay: options.spawnShardDelay ?? 5300,
    preferSnakeCase: options.preferSnakeCase ?? false,
    shards: new Map(),
    buckets: new Map(),
    cache: {
      requestMembers: {
        enabled: options.cache?.requestMembers?.enabled ?? false,
        pending: new Collection(),
      },
    },
    logger: options.logger ?? logger,
    makePresence: options.makePresence ?? (() => Promise.resolve(undefined)),
    resharding: {
      enabled: options.resharding?.enabled ?? true,
      shardsFullPercentage: options.resharding?.shardsFullPercentage ?? 80,
      checkInterval: options.resharding?.checkInterval ?? 28800000, // 8 hours
      shards: new Collection(),
      pendingShards: new Collection(),
      getSessionInfo: options.resharding?.getSessionInfo,
      updateGuildsShardId: options.resharding?.updateGuildsShardId,
      async checkIfReshardingIsNeeded() {
        gateway.logger.debug('[Resharding] Checking if resharding is needed.')

        if (!gateway.resharding.enabled) {
          gateway.logger.debug('[Resharding] Resharding is disabled.')

          return { needed: false }
        }

        if (!gateway.resharding.getSessionInfo) {
          throw new Error("[Resharding] Resharding is enabled but no 'resharding.getSessionInfo()' is not provided.")
        }

        gateway.logger.debug('[Resharding] Resharding is enabled.')

        const sessionInfo = await gateway.resharding.getSessionInfo()

        gateway.logger.debug(`[Resharding] Session info retrieved: ${JSON.stringify(sessionInfo)}`)

        // Don't have enough identify limits to try resharding
        if (sessionInfo.sessionStartLimit.remaining < sessionInfo.shards) {
          gateway.logger.debug('[Resharding] Not enough session start limits left to reshard.')

          return { needed: false, info: sessionInfo }
        }

        gateway.logger.debug('[Resharding] Able to reshard, checking whether necessary now.')

        // 2500 is the max amount of guilds a single shard can handle
        // 1000 is the amount of guilds discord uses to determine how many shards to recommend.
        // This algo helps check if your bot has grown enough to reshard.
        // While this is imprecise as discord changes the recommended number of shard every 1000 guilds it is good enough
        // The alternative is to store the guild count for each shard and require the Guilds intent for `GUILD_CREATE` and `GUILD_DELETE` events
        const percentage = (sessionInfo.shards / ((gateway.totalShards * 2500) / 1000)) * 100

        // Less than necessary% being used so do nothing
        if (percentage < gateway.resharding.shardsFullPercentage) {
          gateway.logger.debug('[Resharding] Resharding not needed.')

          return { needed: false, info: sessionInfo }
        }

        gateway.logger.info('[Resharding] Resharding is needed.')

        return { needed: true, info: sessionInfo }
      },
      async reshard(info) {
        gateway.logger.info(`[Resharding] Starting the reshard process. Previous total shards: ${gateway.totalShards}`)
        // Set values on gateway
        gateway.totalShards = info.shards
        // Handles preparing mid sized bots for LBS
        gateway.totalShards = gateway.calculateTotalShards()
        // Set first shard id if provided in info
        if (typeof info.firstShardId === 'number') gateway.firstShardId = info.firstShardId
        // Set last shard id if provided in info
        if (typeof info.lastShardId === 'number') gateway.lastShardId = info.lastShardId
        gateway.logger.info(`[Resharding] Starting the reshard process. New total shards: ${gateway.totalShards}`)

        // Resetting buckets
        gateway.buckets.clear()
        // Refilling buckets with new values
        gateway.prepareBuckets()

        // SPREAD THIS OUT TO DIFFERENT WORKERS TO BEGIN STARTING UP
        gateway.buckets.forEach(async (bucket, bucketId) => {
          for (const worker of bucket.workers) {
            for (const shardId of worker.queue) {
              await gateway.resharding.tellWorkerToPrepare(worker.id, shardId, bucketId)
            }
          }
        })
      },
      async tellWorkerToPrepare(workerId, shardId, bucketId) {
        gateway.logger.debug(`[Resharding] Telling worker to prepare. Worker: ${workerId} | Shard: ${shardId} | Bucket: ${bucketId}.`)
        const shard = new Shard({
          id: shardId,
          connection: {
            compress: gateway.compress,
            transportCompression: gateway.transportCompression ?? null,
            intents: gateway.intents,
            properties: gateway.properties,
            token: gateway.token,
            totalShards: gateway.totalShards,
            url: gateway.url,
            version: gateway.version,
          },
          // Ignore events until we are ready
          events: {
            async message(_shard, payload) {
              if (payload.t === 'READY') {
                await gateway.resharding.updateGuildsShardId?.(
                  (payload.d as DiscordReady).guilds.map((g) => g.id),
                  shardId,
                )
              }
            },
          },
          logger: gateway.logger,
          requestIdentify: async () => {
            await gateway.identify(shardId)
          },
          shardIsReady: async () => {
            gateway.logger.debug(`[Shard] Shard #${shardId} is ready`)
            await delay(gateway.spawnShardDelay)
            gateway.logger.debug(`[Shard] Resolving shard identify request`)
            gateway.buckets.get(shardId % gateway.connection.sessionStartLimit.maxConcurrency)!.identifyRequests.shift()?.()
          },
          makePresence: gateway.makePresence,
        })

        if (gateway.preferSnakeCase) {
          shard.forwardToBot = async (payload) => {
            shard.events?.message?.(shard, payload)
          }
        }

        gateway.resharding.shards.set(shardId, shard)

        const bucket = gateway.buckets.get(shardId % gateway.connection.sessionStartLimit.maxConcurrency)
        if (!bucket) return

        return await new Promise((resolve) => {
          // Mark that we are making an identify request so another is not made.
          bucket.identifyRequests.push(resolve)
          gateway.logger.debug(`[Gateway] Identifying Shard #${shardId}.`)
          // This will trigger identify and when READY is received it will resolve the above request.
          shard?.identify().then(async () => {
            // Tell the manager that this shard is online
            return await gateway.resharding.shardIsPending(shard)
          })
        })
      },
      async shardIsPending(shard) {
        // Save this in pending at the moment, until all shards are online
        gateway.resharding.pendingShards.set(shard.id, shard)
        gateway.logger.debug(`[Resharding] Shard #${shard.id} is now pending.`)

        // Check if all shards are now online.
        if (gateway.lastShardId - gateway.firstShardId >= gateway.resharding.pendingShards.size) return

        gateway.logger.info(`[Resharding] All shards are now online.`)

        // New shards start processing events
        for (const shard of gateway.resharding.shards.values()) {
          for (const event in options.events) {
            shard.events[event as keyof ShardEvents] = options.events[event as keyof ShardEvents] as (...args: unknown[]) => unknown
          }
        }

        // Old shards stop processing events
        for (const shard of gateway.shards.values()) {
          const oldHandler = shard.events.message

          // Change with spread operator to not affect new shards, as changing anything on shard.events will directly change options.events, which changes new shards' events
          shard.events = {
            ...shard.events,
            message: async function (_, message) {
              // Member checks need to continue but others can stop
              if (message.t === 'GUILD_MEMBERS_CHUNK') {
                oldHandler?.(shard, message)
              }
            },
          }
        }

        gateway.logger.info(`[Resharding] Shutting down old shards.`)
        // Close old shards
        await gateway.shutdown(ShardSocketCloseCodes.Resharded, 'Resharded!', false)

        gateway.logger.info(`[Resharding] Completed.`)

        // Replace old shards
        gateway.shards = new Collection(gateway.resharding.shards)

        // Clear our collections and keep only one reference to the shards, the one in gateway.shards
        gateway.resharding.shards.clear()
        gateway.resharding.pendingShards.clear()
      },
    },

    calculateTotalShards() {
      // Bots under 100k servers do not have access to LBS.
      if (gateway.totalShards < 100) {
        gateway.logger.debug(`[Gateway] Calculating total shards: ${gateway.totalShards}`)
        return gateway.totalShards
      }

      gateway.logger.debug(`[Gateway] Calculating total shards`, gateway.totalShards, gateway.connection.sessionStartLimit.maxConcurrency)
      // Calculate a multiple of `maxConcurrency` which can be used to connect to the gateway.
      return (
        Math.ceil(
          gateway.totalShards /
            // If `maxConcurrency` is 1, we can safely use 16 to get `totalShards` to be in a multiple of 16 so that we can prepare bots with 100k servers for LBS.
            (gateway.connection.sessionStartLimit.maxConcurrency === 1 ? 16 : gateway.connection.sessionStartLimit.maxConcurrency),
        ) * (gateway.connection.sessionStartLimit.maxConcurrency === 1 ? 16 : gateway.connection.sessionStartLimit.maxConcurrency)
      )
    },
    calculateWorkerId(shardId) {
      const workerId = Math.min(shardId % gateway.shardsPerWorker, gateway.totalWorkers - 1)
      gateway.logger.debug(
        `[Gateway] Calculating workerId: Shard: ${shardId} -> Worker: ${workerId} -> Per Worker: ${gateway.shardsPerWorker} -> Total: ${gateway.totalWorkers}`,
      )
      return workerId
    },
    prepareBuckets() {
      for (let i = 0; i < gateway.connection.sessionStartLimit.maxConcurrency; ++i) {
        gateway.logger.debug(`[Gateway] Preparing buckets for concurrency: ${i}`)
        gateway.buckets.set(i, {
          workers: [],
          identifyRequests: [],
        })
      }

      // ORGANIZE ALL SHARDS INTO THEIR OWN BUCKETS
      for (let shardId = gateway.firstShardId; shardId <= gateway.lastShardId; ++shardId) {
        gateway.logger.debug(`[Gateway] Preparing buckets for shard: ${shardId}`)
        if (shardId >= gateway.totalShards) {
          throw new Error(`Shard (id: ${shardId}) is bigger or equal to the used amount of used shards which is ${gateway.totalShards}`)
        }

        const bucketId = shardId % gateway.connection.sessionStartLimit.maxConcurrency
        const bucket = gateway.buckets.get(bucketId)
        if (!bucket) {
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

      for (const bucket of gateway.buckets.values()) {
        for (const worker of bucket.workers.values()) {
          worker.queue = worker.queue.sort((a, b) => a - b)
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

      // Check and reshard automatically if auto resharding is enabled.
      if (gateway.resharding.enabled && gateway.resharding.checkInterval !== -1) {
        // It is better to ensure there is always only one
        clearInterval(gateway.resharding.checkIntervalId)

        if (!gateway.resharding.getSessionInfo) {
          gateway.resharding.enabled = false
          gateway.logger.warn("[Resharding] Resharding is enabled but 'resharding.getSessionInfo()' was not provided. Disabling resharding.")

          return
        }

        gateway.resharding.checkIntervalId = setInterval(async () => {
          const reshardingInfo = await gateway.resharding.checkIfReshardingIsNeeded()

          if (reshardingInfo.needed && reshardingInfo.info) await gateway.resharding.reshard(reshardingInfo.info)
        }, gateway.resharding.checkInterval)
      }
    },
    async shutdown(code, reason, clearReshardingInterval = true) {
      if (clearReshardingInterval) clearInterval(gateway.resharding.checkIntervalId)

      await Promise.all(Array.from(gateway.shards.values()).map((shard) => shard.close(code, reason)))
    },
    async sendPayload(shardId, payload) {
      const shard = gateway.shards.get(shardId)

      if (!shard) {
        throw new Error(`Shard (id: ${shardId} not found`)
      }

      await shard.send(payload)
    },
    async tellWorkerToIdentify(workerId, shardId, bucketId) {
      gateway.logger.debug(`[Gateway] Tell worker to identify (${workerId}, ${shardId}, ${bucketId})`)
      await gateway.identify(shardId)
    },
    async identify(shardId: number) {
      let shard = this.shards.get(shardId)
      gateway.logger.debug(`[Gateway] Identifying ${shard ? 'existing' : 'new'} shard (${shardId})`)

      if (!shard) {
        shard = new Shard({
          id: shardId,
          connection: {
            compress: this.compress,
            transportCompression: gateway.transportCompression,
            intents: this.intents,
            properties: this.properties,
            token: this.token,
            totalShards: this.totalShards,
            url: this.url,
            version: this.version,
          },
          events: options.events ?? {},
          logger: this.logger,
          requestIdentify: async () => {
            await gateway.identify(shardId)
          },
          shardIsReady: async () => {
            gateway.logger.debug(`[Shard] Shard #${shardId} is ready`)
            await delay(gateway.spawnShardDelay)
            gateway.logger.debug(`[Shard] Resolving shard identify request`)
            gateway.buckets.get(shardId % gateway.connection.sessionStartLimit.maxConcurrency)!.identifyRequests.shift()?.()
          },
          makePresence: gateway.makePresence,
        })

        if (this.preferSnakeCase) {
          shard.forwardToBot = async (payload) => {
            shard!.events.message?.(shard!, payload)
          }
        }

        this.shards.set(shardId, shard)
      }

      const bucket = gateway.buckets.get(shardId % gateway.connection.sessionStartLimit.maxConcurrency)
      if (!bucket) return

      return await new Promise((resolve) => {
        // Mark that we are making an identify request so another is not made.
        bucket.identifyRequests.push(resolve)
        gateway.logger.debug(`[Gateway] Identifying Shard #${shardId}.`)
        // This will trigger identify and when READY is received it will resolve the above request.
        shard?.identify()
      })
    },
    async kill(shardId: number) {
      const shard = this.shards.get(shardId)
      if (!shard) {
        return gateway.logger.debug(`[Gateway] A kill for Shard #${shardId} was requested, but the shard could not be found`)
      }

      gateway.logger.debug(`[Gateway] Killing Shard #${shardId}`)
      this.shards.delete(shardId)
      await shard.shutdown()
    },
    async requestIdentify(_shardId: number) {
      gateway.logger.debug(`[Gateway] Requesting identify`)
    },

    // Helpers methods below this

    calculateShardId(guildId, totalShards) {
      // If none is provided, use the total shards number from gateway object.
      if (!totalShards) totalShards = gateway.totalShards
      // If it is only 1 shard, it will always be shard id 0
      if (totalShards === 1) {
        gateway.logger.debug(`[Gateway] calculateShardId (1 shard)`)
        return 0
      }

      gateway.logger.debug(`[Gateway] calculateShardId (guildId: ${guildId}, totalShards: ${totalShards})`)
      return Number((BigInt(guildId) >> 22n) % BigInt(totalShards))
    },

    async joinVoiceChannel(guildId, channelId, options) {
      const shardId = gateway.calculateShardId(guildId)

      gateway.logger.debug(`[Gateway] joinVoiceChannel guildId: ${guildId} channelId: ${channelId}`)

      await gateway.sendPayload(shardId, {
        op: GatewayOpcodes.VoiceStateUpdate,
        d: {
          guild_id: guildId.toString(),
          channel_id: channelId.toString(),
          self_mute: options?.selfMute ?? false,
          self_deaf: options?.selfDeaf ?? true,
        },
      })
    },

    async editBotStatus(data) {
      gateway.logger.debug(`[Gateway] editBotStatus data: ${JSON.stringify(data)}`)

      await Promise.all(
        [...gateway.shards.values()].map(async (shard) => {
          gateway.editShardStatus(shard.id, data)
        }),
      )
    },

    async editShardStatus(shardId, data) {
      gateway.logger.debug(`[Gateway] editShardStatus shardId: ${shardId} -> data: ${JSON.stringify(data)}`)

      await gateway.sendPayload(shardId, {
        op: GatewayOpcodes.PresenceUpdate,
        d: {
          since: null,
          afk: false,
          activities: data.activities,
          status: data.status,
        },
      })
    },

    async requestMembers(guildId, options) {
      const shardId = gateway.calculateShardId(guildId)

      if (gateway.intents && (!options?.limit || options.limit > 1) && !(gateway.intents & GatewayIntents.GuildMembers))
        throw new Error('Cannot fetch more then 1 member without the GUILD_MEMBERS intent')

      gateway.logger.debug(`[Gateway] requestMembers guildId: ${guildId} -> data: ${JSON.stringify(options)}`)

      if (options?.userIds?.length) {
        gateway.logger.debug(`[Gateway] requestMembers guildId: ${guildId} -> setting user limit based on userIds length: ${options.userIds.length}`)

        options.limit = options.userIds.length
      }

      if (!options?.nonce) {
        let nonce = ''

        while (!nonce || gateway.cache.requestMembers.pending.has(nonce)) {
          nonce = randomBytes(16).toString('hex')
        }

        options ??= { limit: 0 }
        options.nonce = nonce
      }

      const members = !gateway.cache.requestMembers.enabled
        ? []
        : new Promise<Camelize<DiscordMemberWithUser[]>>((resolve, reject) => {
            // Should never happen.
            if (!gateway.cache.requestMembers.enabled || !options?.nonce) {
              reject(new Error("Can't request the members without the nonce or with the feature disabled."))
              return
            }

            gateway.cache.requestMembers.pending.set(options.nonce, {
              nonce: options.nonce,
              resolve,
              members: [],
            })
          })

      await gateway.sendPayload(shardId, {
        op: GatewayOpcodes.RequestGuildMembers,
        d: {
          guild_id: guildId.toString(),
          // If a query is provided use it, OR if a limit is NOT provided use ""
          query: options?.query ?? (options?.limit ? undefined : ''),
          limit: options?.limit ?? 0,
          presences: options?.presences ?? false,
          user_ids: options?.userIds?.map((id) => id.toString()),
          nonce: options?.nonce,
        },
      })

      return await members
    },

    async leaveVoiceChannel(guildId) {
      const shardId = gateway.calculateShardId(guildId)

      gateway.logger.debug(`[Gateway] leaveVoiceChannel guildId: ${guildId} Shard ${shardId}`)

      await gateway.sendPayload(shardId, {
        op: GatewayOpcodes.VoiceStateUpdate,
        d: {
          guild_id: guildId.toString(),
          channel_id: null,
          self_mute: false,
          self_deaf: false,
        },
      })
    },

    async requestSoundboardSounds(guildIds) {
      /**
       * Discord will send the events for the guilds that are "under the shard" that sends the opcode.
       * For this reason we need to group the ids with the shard the calculateShardId method gives
       */

      const map = new Map<number, BigString[]>()

      for (const guildId of guildIds) {
        const shardId = gateway.calculateShardId(guildId)

        const ids = map.get(shardId) ?? []
        map.set(shardId, ids)

        ids.push(guildId)
      }

      await Promise.all(
        [...map.entries()].map(([shardId, ids]) =>
          gateway.sendPayload(shardId, {
            op: GatewayOpcodes.RequestSoundboardSounds,
            d: {
              guild_ids: ids,
            },
          }),
        ),
      )
    },
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
   * Whether to send the discord packets in snake case form.
   * @default false
   */
  preferSnakeCase?: boolean
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
  /** What transport compression should be used */
  transportCompression?: TransportCompression | null
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
  events?: ShardEvents
  /** This managers cache related settings. */
  cache?: {
    requestMembers?: {
      /**
       * Whether or not request member requests should be cached.
       * @default false
       */
      enabled?: boolean
    }
  }
  /**
   * The logger that the gateway manager will use.
   * @default logger // The logger exported by `@discordeno/utils`
   */
  logger?: Pick<typeof logger, 'debug' | 'info' | 'warn' | 'error' | 'fatal'>
  /**
   * Make the presence for when the bot connects to the gateway
   *
   * @remarks
   * This function will be called each time a Shard is going to identify
   */
  makePresence?: () => Promise<BotStatusUpdate | undefined>
  /** Options related to resharding. */
  resharding?: {
    /**
     * Whether or not automated resharding should be enabled.
     * @default true
     */
    enabled: boolean
    /**
     * The % of how full a shard is when resharding should be triggered.
     *
     * @remarks
     * We use discord recommended shard value to get an **approximation** of the shard full percentage to compare with this value so the bot may not reshard at the exact percentage provided but may reshard when it is a bit higher than the provided percentage.
     * For accurate calculation, you may override the `checkIfReshardingIsNeeded` function
     *
     * @default 80 as in 80%
     */
    shardsFullPercentage: number
    /**
     * The interval in milliseconds, of how often to check whether resharding is needed and reshard automatically. Set to -1 to disable auto resharding.
     * @default 28800000 (8 hours)
     */
    checkInterval: number
    /** Handler to get shard count and other session info. */
    getSessionInfo?: () => Promise<Camelize<DiscordGetGatewayBot>>
    /** Handler to edit the shard id on any cached guilds. */
    updateGuildsShardId?: (guildIds: string[], shardId: number) => Promise<void>
  }
}

export interface GatewayManager extends Required<CreateGatewayManagerOptions> {
  /** The max concurrency buckets. Those will be created when the `spawnShards` (which calls `prepareBuckets` under the hood) function gets called. */
  buckets: Map<
    number,
    {
      workers: Array<{ id: number; queue: number[] }>
      /** Requests to identify shards are made based on whether it is available to be made. */
      identifyRequests: Array<(value: void | PromiseLike<void>) => void>
    }
  >
  /** The shards that are created. */
  shards: Map<number, Shard>
  /** The logger for the gateway manager. */
  logger: Pick<typeof logger, 'debug' | 'info' | 'warn' | 'error' | 'fatal'>
  /** Everything related to resharding. */
  resharding: CreateGatewayManagerOptions['resharding'] & {
    /**
     * The interval id of the check interval. This is used to clear the interval when the manager is shutdown.
     */
    checkIntervalId?: NodeJS.Timeout | undefined
    /** Holds the shards that resharding has created. Once resharding is done, this replaces the gateway.shards */
    shards: Collection<number, Shard>
    /** Holds the pending shards that have been created and are pending all shards finish loading. */
    pendingShards: Collection<number, Shard>
    /** Handler to check if resharding is necessary. */
    checkIfReshardingIsNeeded: () => Promise<{ needed: boolean; info?: Camelize<DiscordGetGatewayBot> }>
    /** Handler to begin resharding. */
    reshard: (info: Camelize<DiscordGetGatewayBot> & { firstShardId?: number; lastShardId?: number }) => Promise<void>
    /** Handler to communicate to a worker that a shard needs to be created. */
    tellWorkerToPrepare: (workerId: number, shardId: number, bucketId: number) => Promise<void>
    /** Handler to alert the gateway that a shard(resharded) is online. It should now wait for all shards to be pending before shutting off old shards. */
    shardIsPending: (shard: Shard) => Promise<void>
  }
  /** Determine max number of shards to use based upon the max concurrency. */
  calculateTotalShards: () => number
  /** Determine the id of the worker which is handling a shard. */
  calculateWorkerId: (shardId: number) => number
  /** Prepares all the buckets that are available for identifying the shards. */
  prepareBuckets: () => void
  /** Start identifying all the shards. */
  spawnShards: () => Promise<void>
  /** Shutdown all shards. */
  shutdown: (code: number, reason: string, clearReshardingInterval?: boolean) => Promise<void>
  sendPayload: (shardId: number, payload: ShardSocketRequest) => Promise<void>
  /** Allows users to hook in and change to communicate to different workers across different servers or anything they like. For example using redis pubsub to talk to other servers. */
  tellWorkerToIdentify: (workerId: number, shardId: number, bucketId: number) => Promise<void>
  /** Tell the manager to identify a Shard. If this Shard is not already managed this will also add the Shard to the manager. */
  identify: (shardId: number) => Promise<void>
  /** Kill a shard. Close a shards connection to Discord's gateway (if any) and remove it from the manager. */
  kill: (shardId: number) => Promise<void>
  /** This function makes sure that the bucket is allowed to make the next identify request. */
  requestIdentify: (shardId: number) => Promise<void>
  /** Calculates the number of shards based on the guild id and total shards. */
  calculateShardId: (guildId: BigString, totalShards?: number) => number
  /**
   * Connects the bot user to a voice or stage channel.
   *
   * This function sends the _Update Voice State_ gateway command over the gateway behind the scenes.
   *
   * @param guildId - The ID of the guild the voice channel to leave is in.
   * @param channelId - The ID of the channel you want to join.
   *
   * @remarks
   * Requires the `CONNECT` permission.
   *
   * Fires a _Voice State Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/topics/gateway#update-voice-state}
   */
  joinVoiceChannel: (guildId: BigString, channelId: BigString, options?: AtLeastOne<Omit<UpdateVoiceState, 'guildId' | 'channelId'>>) => Promise<void>
  /**
   * Edits the bot status in all shards that this gateway manages.
   *
   * @param data The status data to set the bots status to.
   * @returns nothing
   */
  editBotStatus: (data: StatusUpdate) => Promise<void>
  /**
   * Edits the bot's status on one shard.
   *
   * @param shardId The shard id to edit the status for.
   * @param data The status data to set the bots status to.
   * @returns nothing
   */
  editShardStatus: (shardId: number, data: StatusUpdate) => Promise<void>
  /**
   * Fetches the list of members for a guild over the gateway. If `gateway.cache.requestMembers.enabled` is not set, this function will return an empty array and you'll have to handle the `GUILD_MEMBERS_CHUNK` events yourself.
   *
   * @param guildId - The ID of the guild to get the list of members for.
   * @param options - The parameters for the fetching of the members.
   *
   * @remarks
   * If requesting the entire member list:
   * - Requires the `GUILD_MEMBERS` intent.
   *
   * If requesting presences ({@link RequestGuildMembers.presences | presences} set to `true`):
   * - Requires the `GUILD_PRESENCES` intent.
   *
   * If requesting a prefix ({@link RequestGuildMembers.query | query} non-`undefined`):
   * - Returns a maximum of 100 members.
   *
   * If requesting a users by ID ({@link RequestGuildMembers.userIds | userIds} non-`undefined`):
   * - Returns a maximum of 100 members.
   *
   * Fires a _Guild Members Chunk_ gateway event for every 1000 members fetched.
   *
   * @see {@link https://discord.com/developers/docs/topics/gateway#request-guild-members}
   */
  requestMembers: (guildId: BigString, options?: Omit<RequestGuildMembers, 'guildId'>) => Promise<Camelize<DiscordMemberWithUser[]>>
  /**
   * Leaves the voice channel the bot user is currently in.
   *
   * This function sends the _Update Voice State_ gateway command over the gateway behind the scenes.
   *
   * @param guildId - The ID of the guild the voice channel to leave is in.
   *
   * @remarks
   * Fires a _Voice State Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/topics/gateway#update-voice-state}
   */
  leaveVoiceChannel: (guildId: BigString) => Promise<void>
  /**
   * Used to request soundboard sounds for a list of guilds.
   *
   * This function sends multiple (see remarks) _Request Soundboard Sounds_ gateway command over the gateway behind the scenes.
   *
   * @param guildIds - The guilds to get the sounds from
   *
   * @remarks
   * Fires a _Soundboard Sounds_ gateway event.
   *
   * ⚠️ Discord will send the _Soundboard Sounds_ for each of the guild ids
   * however you may not receive the same number of events as the ids passed to _Request Soundboard Sounds_ for one of the following reasons:
   * - The bot is not in the server provided
   * - The shard the message has been sent from does not receive events for the specified guild
   *
   * To avoid this Discordeno will automatically try to group the ids based on what shard they will need to be sent, but this involves sending multiple messages in multiple shards
   *
   * @see {@link https://discord.com/developers/docs/topics/gateway-events#request-soundboard-sounds}
   */
  requestSoundboardSounds: (guildIds: BigString[]) => Promise<void>
  /** This managers cache related settings. */
  cache: {
    requestMembers: {
      /**
       * Whether or not request member requests should be cached.
       * @default false
       */
      enabled: boolean
      /** The pending requests. */
      pending: Collection<string, RequestMemberRequest>
    }
  }
}

export interface RequestMemberRequest {
  /** The unique nonce for this request. */
  nonce: string
  /** The resolver handler to run when all members arrive. */
  resolve: (value: Camelize<DiscordMemberWithUser[]> | PromiseLike<Camelize<DiscordMemberWithUser[]>>) => void
  /** The members that have already arrived for this request. */
  members: DiscordMemberWithUser[]
}
