import type {
  DiscordEmoji,
  DiscordGatewayPayload,
  DiscordReady,
  DiscordSticker,
  GatewayDispatchEventNames
} from '@discordeno/types'
import type { Collection } from '@discordeno/utils'
import type { Client } from './client.js'
import * as handlers from './handlers/index.js'
import type {
  ApplicationCommandPermission,
  AutoModerationActionExecution,
  AutoModerationRule,
  Channel,
  Emoji,
  Guild,
  Integration,
  Interaction,
  Invite,
  Member,
  Message,
  PresenceUpdate,
  Role,
  ScheduledEvent,
  ThreadMember,
  User,
  VoiceState
} from './transformer.js'

export function createEventHandlers (
  events: Partial<EventHandlers>
): EventHandlers {
  function ignore (): void {}

  return {
    debug: events.debug ?? ignore,
    automodRuleCreate: events.automodRuleCreate ?? ignore,
    automodRuleUpdate: events.automodRuleUpdate ?? ignore,
    automodRuleDelete: events.automodRuleDelete ?? ignore,
    automodActionExecution: events.automodActionExecution ?? ignore,
    threadCreate: events.threadCreate ?? ignore,
    threadDelete: events.threadDelete ?? ignore,
    threadMemberUpdate: events.threadMemberUpdate ?? ignore,
    threadMembersUpdate: events.threadMembersUpdate ?? ignore,
    threadUpdate: events.threadUpdate ?? ignore,
    scheduledEventCreate: events.scheduledEventCreate ?? ignore,
    scheduledEventUpdate: events.scheduledEventUpdate ?? ignore,
    scheduledEventDelete: events.scheduledEventDelete ?? ignore,
    scheduledEventUserAdd: events.scheduledEventUserAdd ?? ignore,
    scheduledEventUserRemove: events.scheduledEventUserRemove ?? ignore,
    ready: events.ready ?? ignore,
    dispatchRequirements: events.dispatchRequirements ?? ignore,
    integrationCreate: events.integrationCreate ?? ignore,
    integrationDelete: events.integrationDelete ?? ignore,
    integrationUpdate: events.integrationUpdate ?? ignore,
    interactionCreate: events.interactionCreate ?? ignore,
    inviteCreate: events.inviteCreate ?? ignore,
    inviteDelete: events.inviteDelete ?? ignore,
    guildMemberAdd: events.guildMemberAdd ?? ignore,
    guildMemberRemove: events.guildMemberRemove ?? ignore,
    guildMemberUpdate: events.guildMemberUpdate ?? ignore,
    messageCreate: events.messageCreate ?? ignore,
    messageDelete: events.messageDelete ?? ignore,
    messageDeleteBulk: events.messageDeleteBulk ?? ignore,
    messageUpdate: events.messageUpdate ?? ignore,
    reactionAdd: events.reactionAdd ?? ignore,
    reactionRemove: events.reactionRemove ?? ignore,
    reactionRemoveAll: events.reactionRemoveAll ?? ignore,
    reactionRemoveEmoji: events.reactionRemoveEmoji ?? ignore,
    presenceUpdate: events.presenceUpdate ?? ignore,
    voiceServerUpdate: events.voiceServerUpdate ?? ignore,
    voiceStateUpdate: events.voiceStateUpdate ?? ignore,
    channelCreate: events.channelCreate ?? ignore,
    channelDelete: events.channelDelete ?? ignore,
    channelPinsUpdate: events.channelPinsUpdate ?? ignore,
    channelUpdate: events.channelUpdate ?? ignore,
    guildEmojisUpdate: events.guildEmojisUpdate ?? ignore,
    guildStickersUpdate: events.guildStickersUpdate ?? ignore,
    guildBanAdd: events.guildBanAdd ?? ignore,
    guildBanRemove: events.guildBanRemove ?? ignore,
    guildCreate: events.guildCreate ?? ignore,
    guildDelete: events.guildDelete ?? ignore,
    guildUpdate: events.guildUpdate ?? ignore,
    raw: events.raw ?? ignore,
    stageInstanceCreate: events.stageInstanceCreate ?? ignore,
    stageInstanceDelete: events.stageInstanceDelete ?? ignore,
    stageInstanceUpdate: events.stageInstanceUpdate ?? ignore,
    roleCreate: events.roleCreate ?? ignore,
    roleDelete: events.roleDelete ?? ignore,
    roleUpdate: events.roleUpdate ?? ignore,
    webhooksUpdate: events.webhooksUpdate ?? ignore,
    botUpdate: events.botUpdate ?? ignore,
    typingStart: events.typingStart ?? ignore,
    applicationCommandPermissionsUpdate:
      events.applicationCommandPermissionsUpdate ?? ignore
  }
}

export interface EventHandlers {
  debug: (text: string, ...args: any[]) => unknown
  applicationCommandPermissionsUpdate: (
    client: Client,
    command: ApplicationCommandPermission
  ) => unknown
  automodRuleCreate: (client: Client, rule: AutoModerationRule) => unknown
  automodRuleUpdate: (client: Client, rule: AutoModerationRule) => unknown
  automodRuleDelete: (client: Client, rule: AutoModerationRule) => unknown
  automodActionExecution: (
    client: Client,
    payload: AutoModerationActionExecution
  ) => unknown
  threadCreate: (client: Client, thread: Channel) => unknown
  threadDelete: (client: Client, thread: Channel) => unknown
  threadMemberUpdate: (
    client: Client,
    payload: {
      id: bigint
      guildId: bigint
      joinedAt: number
      flags: number
    }
  ) => unknown
  threadMembersUpdate: (
    client: Client,
    payload: {
      id: bigint
      guildId: bigint
      addedMembers?: ThreadMember[]
      removedMemberIds?: bigint[]
    }
  ) => unknown
  threadUpdate: (client: Client, thread: Channel) => unknown
  scheduledEventCreate: (client: Client, event: ScheduledEvent) => unknown
  scheduledEventUpdate: (client: Client, event: ScheduledEvent) => unknown
  scheduledEventDelete: (client: Client, event: ScheduledEvent) => unknown
  /** Sent when a user has subscribed to a guild scheduled event. EXPERIMENTAL! */
  scheduledEventUserAdd: (
    client: Client,
    payload: {
      guildScheduledEventId: bigint
      guildId: bigint
      userId: bigint
    }
  ) => unknown
  /** Sent when a user has unsubscribed to a guild scheduled event. EXPERIMENTAL! */
  scheduledEventUserRemove: (
    client: Client,
    payload: {
      guildScheduledEventId: bigint
      guildId: bigint
      userId: bigint
    }
  ) => unknown
  ready: (
    client: Client,
    payload: {
      shardId: number
      v: number
      user: User
      guilds: bigint[]
      sessionId: string
      shard?: number[]
      applicationId: bigint
    },
    rawPayload: DiscordReady
  ) => unknown
  interactionCreate: (client: Client, interaction: Interaction) => unknown
  integrationCreate: (client: Client, integration: Integration) => unknown
  integrationDelete: (
    client: Client,
    payload: { id: bigint, guildId: bigint, applicationId?: bigint }
  ) => unknown
  integrationUpdate: (client: Client, payload: { guildId: bigint }) => unknown
  inviteCreate: (client: Client, invite: Invite) => unknown
  inviteDelete: (
    client: Client,
    payload: {
      channelId: bigint
      guildId?: bigint
      code: string
    }
  ) => unknown
  guildMemberAdd: (client: Client, member: Member, user: User) => unknown
  guildMemberRemove: (client: Client, user: User, guildId: bigint) => unknown
  guildMemberUpdate: (client: Client, member: Member, user: User) => unknown
  messageCreate: (client: Client, message: Message) => unknown
  messageDelete: (
    client: Client,
    payload: { id: bigint, channelId: bigint, guildId?: bigint },
    message?: Message
  ) => unknown
  messageDeleteBulk: (
    client: Client,
    payload: { ids: bigint[], channelId: bigint, guildId?: bigint }
  ) => unknown
  messageUpdate: (
    client: Client,
    message: Message,
    oldMessage?: Message
  ) => unknown
  reactionAdd: (
    client: Client,
    payload: {
      userId: bigint
      channelId: bigint
      messageId: bigint
      guildId?: bigint
      member?: Member
      user?: User
      emoji: Emoji
    }
  ) => unknown
  reactionRemove: (
    client: Client,
    payload: {
      userId: bigint
      channelId: bigint
      messageId: bigint
      guildId?: bigint
      emoji: Emoji
    }
  ) => unknown
  reactionRemoveEmoji: (
    client: Client,
    payload: {
      channelId: bigint
      messageId: bigint
      guildId?: bigint
      emoji: Emoji
    }
  ) => unknown
  reactionRemoveAll: (
    client: Client,
    payload: {
      channelId: bigint
      messageId: bigint
      guildId?: bigint
    }
  ) => unknown
  presenceUpdate: (
    client: Client,
    presence: PresenceUpdate,
    oldPresence?: PresenceUpdate
  ) => unknown
  voiceServerUpdate: (
    client: Client,
    payload: { token: string, endpoint?: string, guildId: bigint }
  ) => unknown
  voiceStateUpdate: (client: Client, voiceState: VoiceState) => unknown
  channelCreate: (client: Client, channel: Channel) => unknown
  dispatchRequirements: (
    client: Client,
    data: DiscordGatewayPayload,
    shardId: number
  ) => unknown
  channelDelete: (client: Client, channel: Channel) => unknown
  channelPinsUpdate: (
    client: Client,
    data: { guildId?: bigint, channelId: bigint, lastPinTimestamp?: number }
  ) => unknown
  channelUpdate: (client: Client, channel: Channel) => unknown
  stageInstanceCreate: (
    client: Client,
    data: {
      id: bigint
      guildId: bigint
      channelId: bigint
      topic: string
    }
  ) => unknown
  stageInstanceDelete: (
    client: Client,
    data: {
      id: bigint
      guildId: bigint
      channelId: bigint
      topic: string
    }
  ) => unknown
  stageInstanceUpdate: (
    client: Client,
    data: {
      id: bigint
      guildId: bigint
      channelId: bigint
      topic: string
    }
  ) => unknown
  guildEmojisUpdate: (
    client: Client,
    payload: {
      guildId: bigint
      emojis: Collection<bigint, DiscordEmoji>
    }
  ) => unknown
  guildStickersUpdate: (
    client: Client,
    payload: {
      guildId: bigint
      stickers: Collection<bigint, DiscordSticker>
    }
  ) => unknown
  guildBanAdd: (client: Client, user: User, guildId: bigint) => unknown
  guildBanRemove: (client: Client, user: User, guildId: bigint) => unknown
  guildCreate: (client: Client, guild: Guild) => unknown
  guildDelete: (client: Client, id: bigint, shardId: number) => unknown
  guildUpdate: (client: Client, guild: Guild) => unknown
  raw: (
    client: Client,
    data: DiscordGatewayPayload,
    shardId: number
  ) => unknown
  roleCreate: (client: Client, role: Role) => unknown
  roleDelete: (
    client: Client,
    payload: { guildId: bigint, roleId: bigint }
  ) => unknown
  roleUpdate: (client: Client, role: Role) => unknown
  webhooksUpdate: (
    client: Client,
    payload: { channelId: bigint, guildId: bigint }
  ) => unknown
  botUpdate: (client: Client, user: User) => unknown
  typingStart: (
    client: Client,
    payload: {
      guildId: bigint | undefined
      channelId: bigint
      userId: bigint
      timestamp: number
      member: Member | undefined
    }
  ) => unknown
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

export function createClientGatewayHandlers (
  options: Partial<ClientGatewayHandlerOptions>
): Record<
  GatewayDispatchEventNames,
  (client: Client, data: DiscordGatewayPayload, shardId: number) => any
  > {
  return {
    // misc
    READY: options.READY ?? handlers.handleReady,
    // command
    APPLICATION_COMMAND_PERMISSIONS_UPDATE:
      options.APPLICATION_COMMAND_PERMISSIONS_UPDATE ??
      handlers.handleApplicationCommandPermissionsUpdate,
    // automod
    AUTO_MODERATION_RULE_CREATE:
      options.AUTO_MODERATION_RULE_CREATE ??
      handlers.handleAutoModerationRuleCreate,
    AUTO_MODERATION_RULE_UPDATE:
      options.AUTO_MODERATION_RULE_UPDATE ??
      handlers.handleAutoModerationRuleUpdate,
    AUTO_MODERATION_RULE_DELETE:
      options.AUTO_MODERATION_RULE_DELETE ??
      handlers.handleAutoModerationRuleDelete,
    AUTO_MODERATION_ACTION_EXECUTION:
      options.AUTO_MODERATION_ACTION_EXECUTION ??
      handlers.handleAutoModerationActionExecution,
    // channels
    CHANNEL_CREATE: options.CHANNEL_CREATE ?? handlers.handleChannelCreate,
    CHANNEL_DELETE: options.CHANNEL_DELETE ?? handlers.handleChannelDelete,
    CHANNEL_PINS_UPDATE:
      options.CHANNEL_PINS_UPDATE ?? handlers.handleChannelPinsUpdate,
    CHANNEL_UPDATE: options.CHANNEL_UPDATE ?? handlers.handleChannelUpdate,
    THREAD_CREATE: options.THREAD_CREATE ?? handlers.handleThreadCreate,
    THREAD_UPDATE: options.THREAD_UPDATE ?? handlers.handleThreadUpdate,
    THREAD_DELETE: options.THREAD_DELETE ?? handlers.handleThreadDelete,
    THREAD_LIST_SYNC: options.THREAD_LIST_SYNC ?? handlers.handleThreadListSync,
    THREAD_MEMBER_UPDATE:
      options.THREAD_MEMBER_UPDATE ?? handlers.handleThreadMembersUpdate,
    THREAD_MEMBERS_UPDATE:
      options.THREAD_MEMBERS_UPDATE ?? handlers.handleThreadMembersUpdate,
    STAGE_INSTANCE_CREATE:
      options.STAGE_INSTANCE_CREATE ?? handlers.handleStageInstanceCreate,
    STAGE_INSTANCE_UPDATE:
      options.STAGE_INSTANCE_UPDATE ?? handlers.handleStageInstanceUpdate,
    STAGE_INSTANCE_DELETE:
      options.STAGE_INSTANCE_DELETE ?? handlers.handleStageInstanceDelete,
    // guilds
    GUILD_BAN_ADD: options.GUILD_BAN_ADD ?? handlers.handleGuildBanAdd,
    GUILD_BAN_REMOVE: options.GUILD_BAN_REMOVE ?? handlers.handleGuildBanRemove,
    GUILD_CREATE: options.GUILD_CREATE ?? handlers.handleGuildCreate,
    GUILD_DELETE: options.GUILD_DELETE ?? handlers.handleGuildDelete,
    GUILD_EMOJIS_UPDATE:
      options.GUILD_EMOJIS_UPDATE ?? handlers.handleGuildEmojisUpdate,
    GUILD_INTEGRATIONS_UPDATE:
      options.GUILD_INTEGRATIONS_UPDATE ??
      handlers.handleGuildIntegrationsUpdate,
    GUILD_MEMBER_ADD: options.GUILD_MEMBER_ADD ?? handlers.handleGuildMemberAdd,
    GUILD_MEMBER_REMOVE:
      options.GUILD_MEMBER_REMOVE ?? handlers.handleGuildMemberRemove,
    GUILD_MEMBER_UPDATE:
      options.GUILD_MEMBER_UPDATE ?? handlers.handleGuildMemberUpdate,
    GUILD_MEMBERS_CHUNK:
      options.GUILD_MEMBERS_CHUNK ?? handlers.handleGuildMembersChunk,
    GUILD_ROLE_CREATE:
      options.GUILD_ROLE_CREATE ?? handlers.handleGuildRoleCreate,
    GUILD_ROLE_DELETE:
      options.GUILD_ROLE_DELETE ?? handlers.handleGuildRoleDelete,
    GUILD_ROLE_UPDATE:
      options.GUILD_ROLE_UPDATE ?? handlers.handleGuildRoleUpdate,
    GUILD_UPDATE: options.GUILD_UPDATE ?? handlers.handleGuildUpdate,
    GUILD_STICKERS_UPDATE:
      options.GUILD_STICKERS_UPDATE ?? handlers.handleGuildStickersUpdate,
    // guild events
    GUILD_SCHEDULED_EVENT_CREATE:
      options.GUILD_SCHEDULED_EVENT_CREATE ??
      handlers.handleGuildScheduledEventCreate,
    GUILD_SCHEDULED_EVENT_DELETE:
      options.GUILD_SCHEDULED_EVENT_DELETE ??
      handlers.handleGuildScheduledEventDelete,
    GUILD_SCHEDULED_EVENT_UPDATE:
      options.GUILD_SCHEDULED_EVENT_UPDATE ??
      handlers.handleGuildScheduledEventUpdate,
    GUILD_SCHEDULED_EVENT_USER_ADD:
      options.GUILD_SCHEDULED_EVENT_USER_ADD ??
      handlers.handleGuildScheduledEventUserAdd,
    GUILD_SCHEDULED_EVENT_USER_REMOVE:
      options.GUILD_SCHEDULED_EVENT_USER_REMOVE ??
      handlers.handleGuildScheduledEventUserRemove,
    // interactions
    INTERACTION_CREATE:
      options.INTERACTION_CREATE ?? handlers.handleInteractionCreate,
    // invites
    INVITE_CREATE: options.INVITE_CREATE ?? handlers.handleInviteCreate,
    INVITE_DELETE: options.INVITE_DELETE ?? handlers.handleInviteCreate,
    // messages
    MESSAGE_CREATE: options.MESSAGE_CREATE ?? handlers.handleMessageCreate,
    MESSAGE_DELETE_BULK:
      options.MESSAGE_DELETE_BULK ?? handlers.handleMessageDeleteBulk,
    MESSAGE_DELETE: options.MESSAGE_DELETE ?? handlers.handleMessageDelete,
    MESSAGE_REACTION_ADD:
      options.MESSAGE_REACTION_ADD ?? handlers.handleMessageReactionAdd,
    MESSAGE_REACTION_REMOVE_ALL:
      options.MESSAGE_REACTION_REMOVE_ALL ??
      handlers.handleMessageReactionRemoveAll,
    MESSAGE_REACTION_REMOVE_EMOJI:
      options.MESSAGE_REACTION_REMOVE_EMOJI ??
      handlers.handleMessageReactionRemoveEmoji,
    MESSAGE_REACTION_REMOVE:
      options.MESSAGE_REACTION_REMOVE ?? handlers.handleMessageReactionRemove,
    MESSAGE_UPDATE: options.MESSAGE_UPDATE ?? handlers.handleMessageUpdate,
    // presence
    PRESENCE_UPDATE: options.PRESENCE_UPDATE ?? handlers.handlePresenceUpdate,
    TYPING_START: options.TYPING_START ?? handlers.handleTypingStart,
    USER_UPDATE: options.USER_UPDATE ?? handlers.handleUserUpdate,
    // voice
    VOICE_SERVER_UPDATE:
      options.VOICE_SERVER_UPDATE ?? handlers.handleVoiceServerUpdate,
    VOICE_STATE_UPDATE:
      options.VOICE_STATE_UPDATE ?? handlers.handleVoiceStateUpdate,
    // webhooks
    WEBHOOKS_UPDATE: options.WEBHOOKS_UPDATE ?? handlers.handleWebhooksUpdate,
    // integrations
    INTEGRATION_CREATE:
      options.INTEGRATION_CREATE ?? handlers.handleIntegrationCreate,
    INTEGRATION_UPDATE:
      options.INTEGRATION_UPDATE ?? handlers.handleIntegrationUpdate,
    INTEGRATION_DELETE:
      options.INTEGRATION_DELETE ?? handlers.handleIntegrationDelete
  }
}
