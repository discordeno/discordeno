import type { CreateGatewayManagerOptions, GatewayManager } from '@discordeno/gateway'
import { createGatewayManager, ShardSocketCloseCodes } from '@discordeno/gateway'
import type { CreateRestManagerOptions, RestManager } from '@discordeno/rest'
import { createRestManager } from '@discordeno/rest'
import type { DiscordEmoji, DiscordGatewayPayload, DiscordReady, GatewayIntents } from '@discordeno/types'
import { Collection, createLogger } from '@discordeno/utils'
import type { Transformers } from './transformer'
import type { AuditLogEntry } from './transformers/auditLogEntry'
import type { AutoModerationActionExecution } from './transformers/automodActionExecution'
import type { AutoModerationRule } from './transformers/automodRule'
import type { Channel } from './transformers/channel'
import type { Emoji } from './transformers/emoji'
import type { Guild } from './transformers/guild'
import type { Integration } from './transformers/integration'
import type { Interaction } from './transformers/interaction'
import type { Invite } from './transformers/invite'
import type { Member, User } from './transformers/member'
import type { Message } from './transformers/message'
import type { PresenceUpdate } from './transformers/presence'
import type { Role } from './transformers/role'
import type { ScheduledEvent } from './transformers/scheduledEvent'
import type { ThreadMember } from './transformers/threadMember'
import type { VoiceState } from './transformers/voiceState'
import type { bigintToSnowflake, snowflakeToBigint } from './utils.js'

/**
 * Create a bot object that will maintain the rest and gateway connection.
 *
 * @param options Configurations options used to manage this bot.
 * @returns Bot
 */
export function createBot(options: CreateBotOptions): Bot {
  if (!options.rest) options.rest = { token: options.token }
  if (!options.gateway) options.gateway = { token: options.token, events: {} }
  if (!options.gateway.events.message) {
    options.gateway.events.message = async (shard, data) => {
      // TRIGGER RAW EVENT
      bot.events.raw?.(data, shard.id)

      if (!data.t) return

      // RUN DISPATCH CHECK
      await bot.events.dispatchRequirements?.(data, shard.id)
      bot.events[
        data.t.toLowerCase().replace(/_([a-z])/g, function (g) {
          return g[1].toUpperCase()
        }) as keyof EventHandlers
        // @ts-expect-error as any gets removed by linter
      ]?.(data.d, shard.id)
    }
  }

  options.rest.token = options.token
  options.gateway.intents = options.intents

  const bot: Bot = {
    rest: createRestManager(options.rest),
    gateway: createGatewayManager(options.gateway),
    events: options.events ?? {},
    logger: createLogger({ name: 'BOT' }),

    async start() {
      if (!options.gateway?.connection) {
        bot.gateway.connection = await bot.rest.getSessionInfo()
      }
      return await bot.gateway.spawnShards()
    },

    async shutdown() {
      return await bot.gateway.shutdown(ShardSocketCloseCodes.Shutdown, 'User requested bot stop')
    },
  }

  return bot
}

export interface CreateBotOptions {
  /** The bot's token. */
  token: string
  /** The bot's intents that will be used to make a connection with discords gateway. */
  intents?: GatewayIntents
  /** Any options you wish to provide to the rest manager. */
  rest?: CreateRestManagerOptions
  /** Any options you wish to provide to the gateway manager. */
  gateway?: CreateGatewayManagerOptions
  /** The event handlers. */
  events: Partial<EventHandlers>
}

export interface Bot {
  id: bigint
  applicationId: bigint
  /** The rest manager. */
  rest: RestManager
  /** The gateway manager. */
  gateway: GatewayManager
  /** The event handlers. */
  events: Partial<EventHandlers>
  /** A logger utility to make it easy to log nice and useful things in the bot code. */
  logger: ReturnType<typeof createLogger>
  transformers: Transformers
  utils: {
    snowflakeToBigint: typeof snowflakeToBigint
    bigintToSnowflake: typeof bigintToSnowflake
  }
  /** Start the bot connection to the gateway. */
  start: () => Promise<void>
  /** Shuts down all the bot connections to the gateway. */
  shutdown: () => Promise<void>
}

export interface EventHandlers {
  debug: (text: string, ...args: any[]) => unknown
  auditLogEntryCreate: (log: AuditLogEntry, guildId: bigint) => unknown
  automodRuleCreate: (rule: AutoModerationRule) => unknown
  automodRuleUpdate: (rule: AutoModerationRule) => unknown
  automodRuleDelete: (rule: AutoModerationRule) => unknown
  automodActionExecution: (payload: AutoModerationActionExecution) => unknown
  threadCreate: (thread: Channel) => unknown
  threadDelete: (thread: Channel) => unknown
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
  guildUpdate: (guild: Guild) => unknown
  raw: (data: DiscordGatewayPayload, shardId: number) => unknown
  roleCreate: (role: Role) => unknown
  roleDelete: (payload: { guildId: bigint; roleId: bigint }) => unknown
  roleUpdate: (role: Role) => unknown
  webhooksUpdate: (payload: { channelId: bigint; guildId: bigint }) => unknown
  botUpdate: (user: User) => unknown
  typingStart: (payload: { guildId: bigint | undefined; channelId: bigint; userId: bigint; timestamp: number; member: Member | undefined }) => unknown
}
