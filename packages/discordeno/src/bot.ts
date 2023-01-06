// TODO: LIST
/**
 * 1. Trigger Gateway handlers
 * 2. Trigger Event callback
 */
import type { CreateGatewayManagerOptions, GatewayManager } from '@discordeno/gateway'
import { createGatewayManager, ShardSocketCloseCodes } from '@discordeno/gateway'
import type { CreateRestManagerOptions, RestManager } from '@discordeno/rest'
import { createRestManager } from '@discordeno/rest'
import type { GatewayDispatchEventNames } from '@discordeno/types'

/**
 * Create a bot object that will maintain the rest and gateway connection.
 *
 * @param options Configurations options used to manage this bot.
 * @returns Bot
 */
export function createBot(options: CreateBotOptions): Bot {
  if (!options.rest) options.rest = { token: options.token }
  if (!options.gateway)
    options.gateway = {
      token: options.token,
      events: {
        message: async (shard, data) => {
          // TRIGGER RAW EVENT
          bot.events.raw?.(data, shard.id)

          if (!data.t) return

          // RUN DISPATCH CHECK
          await bot.events.dispatchRequirements?.(data, shard.id)
          bot.handlers[data.t as GatewayDispatchEventNames]?.(data, shard.id)
        },
      },
    }

  options.rest.token = options.token
  options.gateway.token = options.token

  const bot: Bot = {
    rest: createRestManager(options.rest),
    gateway: createGatewayManager(options.gateway),
    events: options.events ?? {},

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
  /** Any options you wish to provide to the rest manager. */
  rest?: CreateRestManagerOptions
  /** Any options you wish to provide to the gateway manager. */
  gateway?: CreateGatewayManagerOptions
  /** The event handlers. */
  events: Partial<EventHandlers>
}

export interface Bot {
  /** The rest manager. */
  rest: RestManager
  /** The gateway manager. */
  gateway: GatewayManager
  /** The event handlers. */
  events: Partial<EventHandlers>
  /** Start the bot connection to the gateway. */
  start: () => Promise<void>
  /** Shuts down all the bot connections to the gateway. */
  shutdown: () => Promise<void>
}

export interface EventHandlers {
  debug: (text: string, ...args: any[]) => unknown
  applicationCommandPermissionsUpdate: (command: ApplicationCommandPermission) => unknown
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
  guildStickersUpdate: (payload: { guildId: bigint; stickers: Collection<bigint, DiscordSticker> }) => unknown
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

export interface ClientGatewayHandlerOptions {
  READY: typeof handlers.handleReady
  APPLICATION_COMMAND_PERMISSIONS_UPDATE: typeof handlers.handleApplicationCommandPermissionsUpdate
  AUTO_MODERATION_RULE_CREATE: typeof handlers.handleAutoModerationRuleCreate
  AUTO_MODERATION_RULE_UPDATE: typeof handlers.handleAutoModerationRuleUpdate
  AUTO_MODERATION_RULE_DELETE: typeof handlers.handleAutoModerationRuleDelete
  AUTO_MODERATION_ACTION_EXECUTION: typeof handlers.handleAutoModerationActionExecution
  CHANNEL_CREATE: typeof handlers.handleChannelCreate
  CHANNEL_UPDATE: typeof handlers.handleChannelUpdate
  CHANNEL_DELETE: typeof handlers.handleChannelDelete
  CHANNEL_PINS_UPDATE: typeof handlers.handleChannelPinsUpdate
  THREAD_CREATE: typeof handlers.handleThreadCreate
  THREAD_UPDATE: typeof handlers.handleThreadUpdate
  THREAD_DELETE: typeof handlers.handleThreadDelete
  THREAD_LIST_SYNC: typeof handlers.handleThreadListSync
  THREAD_MEMBER_UPDATE: typeof handlers.handleThreadMemberUpdate
  THREAD_MEMBERS_UPDATE: typeof handlers.handleThreadMembersUpdate
  GUILD_CREATE: typeof handlers.handleGuildCreate
  GUILD_UPDATE: typeof handlers.handleGuildUpdate
  GUILD_DELETE: typeof handlers.handleGuildDelete
  GUILD_BAN_ADD: typeof handlers.handleGuildBanAdd
  GUILD_BAN_REMOVE: typeof handlers.handleGuildBanRemove
  GUILD_EMOJIS_UPDATE: typeof handlers.handleGuildEmojisUpdate
  GUILD_STICKERS_UPDATE: typeof handlers.handleGuildStickersUpdate
  GUILD_INTEGRATIONS_UPDATE: typeof handlers.handleGuildIntegrationsUpdate
  GUILD_MEMBER_ADD: typeof handlers.handleGuildMemberAdd
  GUILD_MEMBER_REMOVE: typeof handlers.handleGuildMemberRemove
  GUILD_MEMBER_UPDATE: typeof handlers.handleGuildMemberUpdate
  GUILD_MEMBERS_CHUNK: typeof handlers.handleGuildMembersChunk
  GUILD_ROLE_CREATE: typeof handlers.handleGuildRoleCreate
  GUILD_ROLE_UPDATE: typeof handlers.handleGuildRoleUpdate
  GUILD_ROLE_DELETE: typeof handlers.handleGuildRoleDelete
  GUILD_SCHEDULED_EVENT_CREATE: typeof handlers.handleGuildScheduledEventCreate
  GUILD_SCHEDULED_EVENT_UPDATE: typeof handlers.handleGuildScheduledEventUpdate
  GUILD_SCHEDULED_EVENT_DELETE: typeof handlers.handleGuildScheduledEventDelete
  GUILD_SCHEDULED_EVENT_USER_ADD: typeof handlers.handleGuildScheduledEventUserAdd
  GUILD_SCHEDULED_EVENT_USER_REMOVE: typeof handlers.handleGuildScheduledEventUserRemove
  INTEGRATION_CREATE: typeof handlers.handleIntegrationCreate
  INTEGRATION_UPDATE: typeof handlers.handleIntegrationUpdate
  INTEGRATION_DELETE: typeof handlers.handleIntegrationDelete
  INTERACTION_CREATE: typeof handlers.handleInteractionCreate
  INVITE_CREATE: typeof handlers.handleInviteCreate
  INVITE_DELETE: typeof handlers.handleInviteCreate
  MESSAGE_CREATE: typeof handlers.handleMessageCreate
  MESSAGE_UPDATE: typeof handlers.handleMessageUpdate
  MESSAGE_DELETE: typeof handlers.handleMessageDelete
  MESSAGE_DELETE_BULK: typeof handlers.handleMessageDeleteBulk
  MESSAGE_REACTION_ADD: typeof handlers.handleMessageReactionAdd
  MESSAGE_REACTION_REMOVE: typeof handlers.handleMessageReactionRemove
  MESSAGE_REACTION_REMOVE_ALL: typeof handlers.handleMessageReactionRemoveAll
  MESSAGE_REACTION_REMOVE_EMOJI: typeof handlers.handleMessageReactionRemoveEmoji
  PRESENCE_UPDATE: typeof handlers.handlePresenceUpdate
  STAGE_INSTANCE_CREATE: typeof handlers.handleStageInstanceCreate
  STAGE_INSTANCE_UPDATE: typeof handlers.handleStageInstanceUpdate
  STAGE_INSTANCE_DELETE: typeof handlers.handleStageInstanceDelete
  TYPING_START: typeof handlers.handleTypingStart
  USER_UPDATE: typeof handlers.handleUserUpdate
  VOICE_STATE_UPDATE: typeof handlers.handleVoiceStateUpdate
  VOICE_SERVER_UPDATE: typeof handlers.handleVoiceServerUpdate
  WEBHOOKS_UPDATE: typeof handlers.handleWebhooksUpdate
}
