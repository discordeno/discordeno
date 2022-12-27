import type { CreateShardManager, GatewayManager } from '@discordeno/gateway'
import type { CreateRestManagerOptions } from '@discordeno/rest'
import type {
  DiscordGatewayPayload,
  GatewayDispatchEventNames,
  GatewayIntents,
  GetGatewayBot
} from '@discordeno/types'
import { Errors } from '@discordeno/types'
import {
  baseEndpoints,
  bigintToSnowflake,
  calculateBits,
  calculatePermissions,
  calculateShardId,
  CHANNEL_MENTION_REGEX,
  CONTEXT_MENU_COMMANDS_NAME_REGEX,
  delay,
  DISCORDENO_VERSION,
  DISCORD_SNOWFLAKE_REGEX,
  formatImageURL,
  getBotIdFromToken,
  iconBigintToHash,
  iconHashToBigInt,
  removeTokenPrefix,
  SLASH_COMMANDS_NAME_REGEX,
  snowflakeToBigint,
  urlToBase64,
  USER_AGENT,
  validateLength
} from '@discordeno/utils'
import {
  createClientGatewayHandlers,
  createEventHandlers,
  type EventHandlers
} from './handlers.js'
import type { Transformers } from './transformer.js'
import { createTransformers } from './transformer.js'

export function createClient (options: CreateClientOptions): Client {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const client = {
    id: options.botId ?? getBotIdFromToken(options.token),
    applicationId:
      options.applicationId ??
      options.botId ??
      getBotIdFromToken(options.token),
    token: removeTokenPrefix(options.token),
    events: createEventHandlers(options.events ?? {}),
    intents: options.intents,
    activeGuildIds: new Set<bigint>(),
    constants: createClientConstants(),
    handlers: createClientGatewayHandlers({}),
    utils: createUtils(options.utils ?? {}),
    transformers: createTransformers(options.transformers ?? {}),
    enabledPlugins: new Set(),
    handleDiscordPayload:
      options.handleDiscordPayload ??
      async function (shard, data: DiscordGatewayPayload) {
        // TRIGGER RAW EVENT
        client.events.raw(client, data, shard.id)

        if (!data.t) return

        // RUN DISPATCH CHECK
        await client.events.dispatchRequirements(client, data, shard.id)
        client.handlers[data.t as GatewayDispatchEventNames]?.(
          client,
          data,
          shard.id
        )
      },
    cache: {
      unrepliedInteractions: new Set<bigint>(),
      fetchAllMembersProcessingRequests: new Map()
    }
  } as Client

  return client
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createUtils (options: Partial<HelperUtils>) {
  return {
    snowflakeToBigint,
    bigintToSnowflake,
    calculateShardId: (gateway: GatewayManager, guildId: bigint) =>
      calculateShardId(gateway.manager.totalShards, guildId),
    delay,
    iconHashToBigInt,
    iconBigintToHash,
    validateLength,
    urlToBase64,
    formatImageURL,
    calculateBits,
    calculatePermissions
  }
}

export interface HelperUtils {
  snowflakeToBigint: typeof snowflakeToBigint
  bigintToSnowflake: typeof bigintToSnowflake
  calculateShardId: (
    gateway: GatewayManager,
    guildId: bigint
  ) => ReturnType<typeof calculateShardId>
  delay: typeof delay
  iconHashToBigInt: typeof iconHashToBigInt
  iconBigintToHash: typeof iconBigintToHash
  validateLength: typeof validateLength
  urlToBase64: typeof urlToBase64
  formatImageURL: typeof formatImageURL
  calculateBits: typeof calculateBits
  calculatePermissions: typeof calculatePermissions
}

export interface CreateClientOptions {
  token: string
  botId?: bigint
  applicationId?: bigint
  secretKey?: string
  events?: Partial<EventHandlers>
  intents?: GatewayIntents
  botGatewayData?: GetGatewayBot
  rest?: Omit<CreateRestManagerOptions, 'token'>
  handleDiscordPayload?: CreateShardManager['handleMessage']
  utils?: Partial<ReturnType<typeof createUtils>>
  transformers?: Partial<ReturnType<typeof createTransformers>>
}

export type UnPromise<T extends Promise<unknown>> = T extends Promise<infer K>
  ? K
  : never

export interface Client {
  id: bigint
  applicationId: bigint
  token: string
  intents: GatewayIntents
  urlWSS: string
  utils: ReturnType<typeof createUtils>
  transformers: Transformers
  events: EventHandlers
  handlers: ReturnType<typeof createClientGatewayHandlers>
  activeGuildIds: Set<bigint>
  constants: ReturnType<typeof createClientConstants>
  cache: {
    unrepliedInteractions: Set<bigint>
    fetchAllMembersProcessingRequests: Map<string, Function>
  }
  enabledPlugins: Set<string>
  handleDiscordPayload?: CreateShardManager['handleMessage']
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createClientConstants () {
  return {
    DISCORDENO_VERSION,
    USER_AGENT,
    BASE_URL: baseEndpoints.BASE_URL,
    CDN_URL: baseEndpoints.CDN_URL,
    regexes: {
      SLASH_COMMANDS_NAME_REGEX,
      CONTEXT_MENU_COMMANDS_NAME_REGEX,
      CHANNEL_MENTION_REGEX,
      DISCORD_SNOWFLAKE_REGEX
    },
    Errors
  }
}
