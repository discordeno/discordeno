import type { CreateGatewayManagerOptions, GatewayManager } from '@discordeno/gateway'
import { ShardSocketCloseCodes, createGatewayManager } from '@discordeno/gateway'
import type { CreateRestManagerOptions, RestManager } from '@discordeno/rest'
import { createRestManager } from '@discordeno/rest'
import type { BigString, GatewayDispatchEventNames, GatewayIntents, RecursivePartial } from '@discordeno/types'
import { createLogger, getBotIdFromToken, type logger } from '@discordeno/utils'
import type {
  CompleteDesiredProperties,
  DesiredPropertiesBehavior,
  SetupDesiredProps,
  TransformersDesiredProperties,
  TransformersObjects,
} from './desiredProperties.js'
import type { EventHandlers } from './events.js'
import { type BotGatewayHandler, type GatewayHandlers, createBotGatewayHandlers } from './handlers.js'
import { type BotHelpers, createBotHelpers } from './helpers.js'
import { type Transformers, createTransformers } from './transformers.js'

/**
 * Create a bot object that will maintain the rest and gateway connection.
 *
 * @param options Configurations options used to manage this bot.
 * @returns Bot
 */

// Overloads to avoid adding CompleteDesiredProperties if we are given a complete object
export function createBot<
  TProps extends TransformersDesiredProperties,
  TBehavior extends DesiredPropertiesBehavior = DesiredPropertiesBehavior.RemoveKey,
>(options: CreateBotOptions<TProps, TBehavior>): Bot<TProps, TBehavior>
export function createBot<
  TProps extends RecursivePartial<TransformersDesiredProperties>,
  TBehavior extends DesiredPropertiesBehavior = DesiredPropertiesBehavior.RemoveKey,
>(options: CreateBotOptions<TProps, TBehavior>): Bot<CompleteDesiredProperties<TProps>, TBehavior>

export function createBot<
  TProps extends RecursivePartial<TransformersDesiredProperties>,
  TBehavior extends DesiredPropertiesBehavior = DesiredPropertiesBehavior.RemoveKey,
>(options: CreateBotOptions<TProps, TBehavior>): Bot<CompleteDesiredProperties<TProps>, TBehavior> {
  type CompleteProps = CompleteDesiredProperties<TProps>
  type TypedBot = Bot<CompleteProps, TBehavior>

  if (!options.transformers) options.transformers = {}
  if (!options.transformers.desiredProperties) options.transformers.desiredProperties = options.desiredProperties
  if (!options.rest) options.rest = { token: options.token, applicationId: options.applicationId }
  if (!options.rest.token) options.rest.token = options.token
  if (!options.rest.logger && options.loggerFactory) options.rest.logger = options.loggerFactory('REST')
  if (!options.gateway) options.gateway = { token: options.token }
  if (!options.gateway.token) options.gateway.token = options.token
  if (!options.gateway.events) options.gateway.events = {}
  if (!options.gateway.logger && options.loggerFactory) options.gateway.logger = options.loggerFactory('GATEWAY')
  if (!options.gateway.events.message) {
    options.gateway.events.message = async (shard, data) => {
      // TRIGGER RAW EVENT
      bot.events.raw?.(data, shard.id)

      if (!data.t) return

      // RUN DISPATCH CHECK
      await bot.events.dispatchRequirements?.(data, shard.id)
      bot.handlers[data.t as GatewayDispatchEventNames]?.(bot, data, shard.id)
    }
  }

  options.gateway.intents = options.intents
  options.gateway.preferSnakeCase = true

  const id = getBotIdFromToken(options.token)

  const bot: TypedBot = {
    id,
    applicationId: id,
    transformers: createTransformers(options.transformers) as TypedBot['transformers'],
    handlers: createBotGatewayHandlers<CompleteProps, TBehavior>(options.handlers ?? {}),
    rest: createRestManager(options.rest as CreateRestManagerOptions),
    gateway: createGatewayManager(options.gateway as CreateGatewayManagerOptions),
    events: options.events ?? {},
    logger: options.loggerFactory ? options.loggerFactory('BOT') : createLogger({ name: 'BOT' }),
    // Set up helpers below.
    helpers: {} as BotHelpers<CompleteProps, TBehavior>,
    async start() {
      if (!options.gateway?.connection) {
        bot.gateway.connection = await bot.rest.getSessionInfo()

        // Check for overrides in the configuration
        if (!options.gateway?.url) bot.gateway.url = bot.gateway.connection.url

        if (!options.gateway?.totalShards) bot.gateway.totalShards = bot.gateway.connection.shards

        if (!options.gateway?.lastShardId && !options.gateway?.totalShards) bot.gateway.lastShardId = bot.gateway.connection.shards - 1
      }

      if (!bot.gateway.resharding.getSessionInfo) {
        bot.gateway.resharding.getSessionInfo = async () => {
          return await bot.rest.getGatewayBot()
        }
      }

      await bot.gateway.spawnShards()
    },

    async shutdown() {
      return await bot.gateway.shutdown(ShardSocketCloseCodes.Shutdown, 'User requested bot stop')
    },
  }

  bot.helpers = createBotHelpers(bot)
  if (options.applicationId) bot.applicationId = bot.transformers.snowflake(options.applicationId)

  return bot
}

export interface CreateBotOptions<TProps extends RecursivePartial<TransformersDesiredProperties>, TBehavior extends DesiredPropertiesBehavior> {
  /** The bot's token. */
  token: string
  /** Application Id of the bot incase it is an old bot token. */
  applicationId?: BigString
  /** The bot's intents that will be used to make a connection with discords gateway. */
  intents?: GatewayIntents
  /** Any options you wish to provide to the rest manager. */
  rest?: Omit<CreateRestManagerOptions, 'token'> & Partial<Pick<CreateRestManagerOptions, 'token'>>
  /** Any options you wish to provide to the gateway manager. */
  gateway?: Omit<CreateGatewayManagerOptions, 'token'> & Partial<Pick<CreateGatewayManagerOptions, 'token'>>
  /** The event handlers. */
  events?: Partial<EventHandlers<CompleteDesiredProperties<NoInfer<TProps>>, TBehavior>>
  /** The functions that should transform discord objects to discordeno shaped objects. */
  transformers?: RecursivePartial<Transformers<CompleteDesiredProperties<NoInfer<TProps>>, TBehavior>>
  /** The handler functions that should handle incoming discord payloads from gateway and call an event. */
  handlers?: Partial<Record<GatewayDispatchEventNames, BotGatewayHandler<CompleteDesiredProperties<NoInfer<TProps>>, TBehavior>>>
  /**
   * Set the desired properties for the bot
   *
   * @default {}
   */
  desiredProperties?: TProps
  /**
   * Set the desired properties behavior for undesired properties
   *
   * @default DesiredPropertiesBehavior.RemoveKey
   */
  desiredPropertiesBehavior?: TBehavior
  /**
   * This factory will be invoked to create the logger for gateway, rest and bot
   *
   * @remarks
   * If not provided the default logger will be used with rest and gateway sharing the same logger
   *
   * This function will be invoked 3 times, one with the name of `REST`, one with `GATEWAY` and the third one with name `BOT`
   */
  loggerFactory?: (name: 'REST' | 'GATEWAY' | 'BOT') => Pick<typeof logger, 'debug' | 'info' | 'warn' | 'error' | 'fatal'>
}

export interface Bot<
  TProps extends TransformersDesiredProperties = TransformersDesiredProperties,
  TBehavior extends DesiredPropertiesBehavior = DesiredPropertiesBehavior.RemoveKey,
> {
  /** The id of the bot. */
  id: bigint
  /** The application id of the bot. This is usually the same as id but in the case of old bots can be different. */
  applicationId: bigint
  /** The rest manager. */
  rest: RestManager
  /** The gateway manager. */
  gateway: GatewayManager
  /** The event handlers. */
  events: Partial<EventHandlers<TProps, TBehavior>>
  /** A logger utility to make it easy to log nice and useful things in the bot code. */
  logger: Pick<typeof logger, 'debug' | 'info' | 'warn' | 'error' | 'fatal'>
  /** The functions that should transform discord objects to discordeno shaped objects. */
  transformers: Transformers<TProps, TBehavior> & {
    $inferredTypes: {
      [K in keyof TransformersObjects]: SetupDesiredProps<TransformersObjects[K], TProps, TBehavior>
    }
  }
  /** The handler functions that should handle incoming discord payloads from gateway and call an event. */
  handlers: GatewayHandlers<TProps, TBehavior>
  helpers: BotHelpers<TProps, TBehavior>
  /** Start the bot connection to the gateway. */
  start: () => Promise<void>
  /** Shuts down all the bot connections to the gateway. */
  shutdown: () => Promise<void>
}

/** @internal This is subject to breaking changes without notice */
export type InternalBot = Bot<CompleteDesiredProperties<{}, true>, DesiredPropertiesBehavior.RemoveKey>
