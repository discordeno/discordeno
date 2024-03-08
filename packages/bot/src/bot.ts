import type { CreateGatewayManagerOptions, GatewayManager } from '@discordeno/gateway'
import { ShardSocketCloseCodes, createGatewayManager } from '@discordeno/gateway'
import type { CreateRestManagerOptions, RestManager } from '@discordeno/rest'
import { createRestManager } from '@discordeno/rest'
import type { BigString, DiscordEmoji, DiscordGatewayPayload, DiscordReady, GatewayIntents } from '@discordeno/types'
import { createLogger, getBotIdFromToken, type Collection, type logger } from '@discordeno/utils'
import { createBotGatewayHandlers } from './handlers.js'
import { createBotHelpers, type BotHelpers } from './helpers.js'
import { createTransformers, type Transformers } from './transformers.js'
import type { ApplicationCommandPermission } from './transformers/applicationCommandPermission.js'
import type { AuditLogEntry } from './transformers/auditLogEntry.js'
import type { AutoModerationActionExecution } from './transformers/automodActionExecution.js'
import type { AutoModerationRule } from './transformers/automodRule.js'
import type { Channel } from './transformers/channel.js'
import type { Emoji } from './transformers/emoji.js'
import { type Entitlement } from './transformers/entitlement.js'
import type { Guild } from './transformers/guild.js'
import type { Integration } from './transformers/integration.js'
import type { Interaction } from './transformers/interaction.js'
import type { Invite } from './transformers/invite.js'
import type { Member } from './transformers/member.js'
import type { Message } from './transformers/message.js'
import type { PresenceUpdate } from './transformers/presence.js'
import type { Role } from './transformers/role.js'
import type { ScheduledEvent } from './transformers/scheduledEvent.js'
import type { Sticker } from './transformers/sticker.js'
import type { ThreadMember } from './transformers/threadMember.js'
import type { User } from './transformers/user.js'
import type { VoiceState } from './transformers/voiceState.js'
import type { BotGatewayHandlerOptions } from './typings.js'

/**
 * Create a bot object that will maintain the rest and gateway connection.
 *
 * @param options Configurations options used to manage this bot.
 * @returns Bot
 */
export function createBot(options: CreateBotOptions): Bot {
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
      bot.handlers[data.t as keyof ReturnType<typeof createBotGatewayHandlers>]?.(bot, data, shard.id)
    }
  }

  options.gateway.intents = options.intents
  options.gateway.preferSnakeCase = true

  const id = getBotIdFromToken(options.token)

  const bot: Bot = {
    id,
    applicationId: id,
    transformers: createTransformers(options.transformers ?? {}, { defaultDesiredPropertiesValue: options.defaultDesiredPropertiesValue ?? false }),
    handlers: createBotGatewayHandlers(options.handlers ?? {}),
    rest: createRestManager(options.rest),
    gateway: createGatewayManager(options.gateway),
    events: options.events ?? {},
    logger: options.loggerFactory ? options.loggerFactory('BOT') : createLogger({ name: 'BOT' }),
    // Set up helpers below.
    helpers: {} as BotHelpers,
    async start() {
      if (!options.gateway?.connection) {
        bot.gateway.connection = await bot.rest.getSessionInfo()

        // Check for overrides in the configuration
        if (!options.gateway?.url) bot.gateway.url = bot.gateway.connection.url

        if (!options.gateway?.totalShards) bot.gateway.totalShards = bot.gateway.connection.shards

        if (!options.gateway?.lastShardId && !options.gateway?.totalShards) bot.gateway.lastShardId = bot.gateway.connection.shards - 1
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

export interface CreateBotOptions {
  /** The bot's token. */
  token: string
  /** Application Id of the bot incase it is an old bot token. */
  applicationId?: BigString
  /** The bot's intents that will be used to make a connection with discords gateway. */
  intents?: GatewayIntents
  /** Any options you wish to provide to the rest manager. */
  rest?: CreateRestManagerOptions & Partial<Pick<CreateRestManagerOptions, 'token'>>
  /** Any options you wish to provide to the gateway manager. */
  gateway?: CreateGatewayManagerOptions & Partial<Pick<CreateGatewayManagerOptions, 'token'>>
  /** The event handlers. */
  events?: Partial<EventHandlers>
  /** The functions that should transform discord objects to discordeno shaped objects. */
  transformers?: Partial<Transformers>
  /** The handler functions that should handle incoming discord payloads from gateway and call an event. */
  handlers?: Partial<BotGatewayHandlerOptions>
  /**
   * @deprecated Use with caution
   *
   * This property will be removed in the near future when the CLI is complete. It is not recommended to use whatsoever.
   * Although it is harder to create your bot without this, it is still highly recommended to do it that way.
   *
   * @default false
   */
  defaultDesiredPropertiesValue?: boolean
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

export interface Bot {
  /** The id of the bot. */
  id: bigint
  /** The application id of the bot. This is usually the same as id but in the case of old bots can be different. */
  applicationId: bigint
  /** The rest manager. */
  rest: RestManager
  /** The gateway manager. */
  gateway: GatewayManager
  /** The event handlers. */
  events: Partial<EventHandlers>
  /** A logger utility to make it easy to log nice and useful things in the bot code. */
  logger: Pick<typeof logger, 'debug' | 'info' | 'warn' | 'error' | 'fatal'>
  /** The functions that should transform discord objects to discordeno shaped objects. */
  transformers: Transformers
  /** The handler functions that should handle incoming discord payloads from gateway and call an event. */
  handlers: ReturnType<typeof createBotGatewayHandlers>
  helpers: BotHelpers
  /** Start the bot connection to the gateway. */
  start: () => Promise<void>
  /** Shuts down all the bot connections to the gateway. */
  shutdown: () => Promise<void>
}

export interface EventHandlers {
  debug: (text: string, ...args: any[]) => unknown
  applicationCommandPermissionsUpdate: (command: ApplicationCommandPermission) => unknown
  guildAuditLogEntryCreate: (log: AuditLogEntry, guildId: bigint) => unknown
  automodRuleCreate: (rule: AutoModerationRule) => unknown
  automodRuleUpdate: (rule: AutoModerationRule) => unknown
  automodRuleDelete: (rule: AutoModerationRule) => unknown
  automodActionExecution: (payload: AutoModerationActionExecution) => unknown
  threadCreate: (thread: Channel) => unknown
  threadDelete: (thread: Channel) => unknown
  threadListSync: (payload: { guildId: bigint; channelIds?: bigint[]; threads: Channel[]; members: ThreadMember[] }) => unknown
  threadMemberUpdate: (payload: { id: bigint; guildId: bigint; joinedAt: number; flags: number }) => unknown
  threadMembersUpdate: (payload: { id: bigint; guildId: bigint; addedMembers?: ThreadMember[]; removedMemberIds?: bigint[] }) => unknown
  threadUpdate: (thread: Channel) => unknown
  scheduledEventCreate: (event: ScheduledEvent) => unknown
  scheduledEventUpdate: (event: ScheduledEvent) => unknown
  scheduledEventDelete: (event: ScheduledEvent) => unknown
  /** Sent when a user has subscribed to a guild scheduled event. EXPERIMENTAL! */
  scheduledEventUserAdd: (payload: { guildScheduledEventId: bigint; guildId: bigint; userId: bigint }) => unknown
  /** Sent when a user has unsubscribed to a guild scheduled event. EXPERIMENTAL! */
  scheduledEventUserRemove: (payload: { guildScheduledEventId: bigint; guildId: bigint; userId: bigint }) => unknown
  ready: (
    payload: {
      shardId: number
      v: number
      user: User
      guilds: bigint[]
      sessionId: string
      shard?: number[]
      applicationId: bigint
    },
    rawPayload: DiscordReady,
  ) => unknown
  interactionCreate: (interaction: Interaction) => unknown
  integrationCreate: (integration: Integration) => unknown
  integrationDelete: (payload: { id: bigint; guildId: bigint; applicationId?: bigint }) => unknown
  integrationUpdate: (payload: { guildId: bigint }) => unknown
  inviteCreate: (invite: Invite) => unknown
  inviteDelete: (payload: { channelId: bigint; guildId?: bigint; code: string }) => unknown
  guildMemberAdd: (member: Member, user: User) => unknown
  guildMemberRemove: (user: User, guildId: bigint) => unknown
  guildMemberUpdate: (member: Member, user: User) => unknown
  guildStickersUpdate: (stickers: Sticker[]) => unknown
  messageCreate: (message: Message) => unknown
  messageDelete: (payload: { id: bigint; channelId: bigint; guildId?: bigint }, message?: Message) => unknown
  messageDeleteBulk: (payload: { ids: bigint[]; channelId: bigint; guildId?: bigint }) => unknown
  messageUpdate: (message: Message, oldMessage?: Message) => unknown
  reactionAdd: (payload: {
    userId: bigint
    channelId: bigint
    messageId: bigint
    guildId?: bigint
    member?: Member
    user?: User
    emoji: Emoji
    messageAuthorId?: bigint
  }) => unknown
  reactionRemove: (payload: { userId: bigint; channelId: bigint; messageId: bigint; guildId?: bigint; emoji: Emoji }) => unknown
  reactionRemoveEmoji: (payload: { channelId: bigint; messageId: bigint; guildId?: bigint; emoji: Emoji }) => unknown
  reactionRemoveAll: (payload: { channelId: bigint; messageId: bigint; guildId?: bigint }) => unknown
  presenceUpdate: (presence: PresenceUpdate, oldPresence?: PresenceUpdate) => unknown
  voiceServerUpdate: (payload: { token: string; endpoint?: string; guildId: bigint }) => unknown
  voiceStateUpdate: (voiceState: VoiceState) => unknown
  channelCreate: (channel: Channel) => unknown
  dispatchRequirements: (data: DiscordGatewayPayload, shardId: number) => unknown
  channelDelete: (channel: Channel) => unknown
  channelPinsUpdate: (data: { guildId?: bigint; channelId: bigint; lastPinTimestamp?: number }) => unknown
  channelUpdate: (channel: Channel) => unknown
  stageInstanceCreate: (data: { id: bigint; guildId: bigint; channelId: bigint; topic: string }) => unknown
  stageInstanceDelete: (data: { id: bigint; guildId: bigint; channelId: bigint; topic: string }) => unknown
  stageInstanceUpdate: (data: { id: bigint; guildId: bigint; channelId: bigint; topic: string }) => unknown
  guildEmojisUpdate: (payload: { guildId: bigint; emojis: Collection<bigint, DiscordEmoji> }) => unknown
  guildBanAdd: (user: User, guildId: bigint) => unknown
  guildBanRemove: (user: User, guildId: bigint) => unknown
  guildCreate: (guild: Guild) => unknown
  guildDelete: (id: bigint, shardId: number) => unknown
  guildUnavailable: (id: bigint, shardId: number) => unknown
  guildUpdate: (guild: Guild) => unknown
  raw: (data: DiscordGatewayPayload, shardId: number) => unknown
  roleCreate: (role: Role) => unknown
  roleDelete: (payload: { guildId: bigint; roleId: bigint }) => unknown
  roleUpdate: (role: Role) => unknown
  webhooksUpdate: (payload: { channelId: bigint; guildId: bigint }) => unknown
  botUpdate: (user: User) => unknown
  typingStart: (payload: { guildId: bigint | undefined; channelId: bigint; userId: bigint; timestamp: number; member: Member | undefined }) => unknown
  entitlementCreate: (entitlement: Entitlement) => unknown
  entitlementUpdate: (entitlement: Entitlement) => unknown
  entitlementDelete: (entitlement: Entitlement) => unknown
}
