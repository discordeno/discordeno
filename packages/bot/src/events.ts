import type { DiscordGatewayPayload, DiscordReady, DiscordVoiceChannelEffectAnimationType } from '@discordeno/types'
import type { Collection } from '@discordeno/utils'
import type { DesiredPropertiesBehavior, TransformersDesiredProperties } from './desiredProperties.js'
import type { Bot } from './index.js'
import type {
  AuditLogEntry,
  AutoModerationActionExecution,
  AutoModerationRule,
  GuildApplicationCommandPermissions,
  Integration,
  PresenceUpdate,
  ThreadMember,
} from './transformers/types.js'

export interface EventHandlers<
  TProps extends TransformersDesiredProperties,
  TBehavior extends DesiredPropertiesBehavior,
  TBot extends Bot<TProps, TBehavior> = Bot<TProps, TBehavior>,
> {
  debug: (text: string, ...args: any[]) => unknown
  applicationCommandPermissionsUpdate: (command: GuildApplicationCommandPermissions) => unknown
  guildAuditLogEntryCreate: (log: AuditLogEntry, guildId: bigint) => unknown
  automodRuleCreate: (rule: AutoModerationRule) => unknown
  automodRuleUpdate: (rule: AutoModerationRule) => unknown
  automodRuleDelete: (rule: AutoModerationRule) => unknown
  automodActionExecution: (payload: AutoModerationActionExecution) => unknown
  threadCreate: (thread: TBot['transformers']['$inferredTypes']['channel']) => unknown
  threadDelete: (thread: TBot['transformers']['$inferredTypes']['channel']) => unknown
  threadListSync: (payload: {
    guildId: bigint
    channelIds?: bigint[]
    threads: TBot['transformers']['$inferredTypes']['channel'][]
    members: ThreadMember[]
  }) => unknown
  threadMemberUpdate: (payload: { id: bigint; guildId: bigint; joinedAt: number; flags: number }) => unknown
  threadMembersUpdate: (payload: { id: bigint; guildId: bigint; addedMembers?: ThreadMember[]; removedMemberIds?: bigint[] }) => unknown
  threadUpdate: (thread: TBot['transformers']['$inferredTypes']['channel']) => unknown
  scheduledEventCreate: (event: TBot['transformers']['$inferredTypes']['scheduledEvent']) => unknown
  scheduledEventUpdate: (event: TBot['transformers']['$inferredTypes']['scheduledEvent']) => unknown
  scheduledEventDelete: (event: TBot['transformers']['$inferredTypes']['scheduledEvent']) => unknown
  scheduledEventUserAdd: (payload: { guildScheduledEventId: bigint; guildId: bigint; userId: bigint }) => unknown
  scheduledEventUserRemove: (payload: { guildScheduledEventId: bigint; guildId: bigint; userId: bigint }) => unknown
  ready: (
    payload: {
      shardId: number
      v: number
      user: TBot['transformers']['$inferredTypes']['user']
      guilds: bigint[]
      sessionId: string
      shard?: number[]
      applicationId: bigint
    },
    rawPayload: DiscordReady,
  ) => unknown
  interactionCreate: (interaction: TBot['transformers']['$inferredTypes']['interaction']) => unknown
  integrationCreate: (integration: Integration) => unknown
  integrationDelete: (payload: { id: bigint; guildId: bigint; applicationId?: bigint }) => unknown
  integrationUpdate: (payload: { guildId: bigint }) => unknown
  inviteCreate: (invite: TBot['transformers']['$inferredTypes']['invite']) => unknown
  inviteDelete: (payload: { channelId: bigint; guildId?: bigint; code: string }) => unknown
  guildMemberAdd: (member: TBot['transformers']['$inferredTypes']['member'], user: TBot['transformers']['$inferredTypes']['user']) => unknown
  guildMemberRemove: (user: TBot['transformers']['$inferredTypes']['user'], guildId: bigint) => unknown
  guildMemberUpdate: (member: TBot['transformers']['$inferredTypes']['member'], user: TBot['transformers']['$inferredTypes']['user']) => unknown
  guildStickersUpdate: (payload: { guildId: bigint; stickers: TBot['transformers']['$inferredTypes']['sticker'][] }) => unknown
  messageCreate: (message: TBot['transformers']['$inferredTypes']['message']) => unknown
  messageDelete: (
    payload: { id: bigint; channelId: bigint; guildId?: bigint },
    message?: TBot['transformers']['$inferredTypes']['message'],
  ) => unknown
  messageDeleteBulk: (payload: { ids: bigint[]; channelId: bigint; guildId?: bigint }) => unknown
  messageUpdate: (message: TBot['transformers']['$inferredTypes']['message']) => unknown
  reactionAdd: (payload: {
    userId: bigint
    channelId: bigint
    messageId: bigint
    guildId?: bigint
    member?: TBot['transformers']['$inferredTypes']['member']
    user?: TBot['transformers']['$inferredTypes']['user']
    emoji: TBot['transformers']['$inferredTypes']['emoji']
    messageAuthorId?: bigint
    burst: boolean
    burstColors?: string[]
  }) => unknown
  reactionRemove: (payload: {
    userId: bigint
    channelId: bigint
    messageId: bigint
    guildId?: bigint
    emoji: TBot['transformers']['$inferredTypes']['emoji']
    burst: boolean
  }) => unknown
  reactionRemoveEmoji: (payload: {
    channelId: bigint
    messageId: bigint
    guildId?: bigint
    emoji: TBot['transformers']['$inferredTypes']['emoji']
  }) => unknown
  reactionRemoveAll: (payload: { channelId: bigint; messageId: bigint; guildId?: bigint }) => unknown
  presenceUpdate: (presence: PresenceUpdate) => unknown
  voiceChannelEffectSend: (payload: {
    channelId: bigint
    guildId: bigint
    userId: bigint
    emoji?: TBot['transformers']['$inferredTypes']['emoji']
    animationType?: DiscordVoiceChannelEffectAnimationType
    animationId?: number
    soundId?: bigint | number
    soundVolume?: number
  }) => unknown
  voiceServerUpdate: (payload: { token: string; endpoint?: string; guildId: bigint }) => unknown
  voiceStateUpdate: (voiceState: TBot['transformers']['$inferredTypes']['voiceState']) => unknown
  channelCreate: (channel: TBot['transformers']['$inferredTypes']['channel']) => unknown
  dispatchRequirements: (data: DiscordGatewayPayload, shardId: number) => unknown
  channelDelete: (channel: TBot['transformers']['$inferredTypes']['channel']) => unknown
  channelPinsUpdate: (data: { guildId?: bigint; channelId: bigint; lastPinTimestamp?: number }) => unknown
  channelUpdate: (channel: TBot['transformers']['$inferredTypes']['channel']) => unknown
  stageInstanceCreate: (data: { id: bigint; guildId: bigint; channelId: bigint; topic: string }) => unknown
  stageInstanceDelete: (data: { id: bigint; guildId: bigint; channelId: bigint; topic: string }) => unknown
  stageInstanceUpdate: (data: { id: bigint; guildId: bigint; channelId: bigint; topic: string }) => unknown
  guildEmojisUpdate: (payload: {
    guildId: bigint
    emojis: Collection<bigint, TBot['transformers']['$inferredTypes']['emoji']>
  }) => unknown
  guildBanAdd: (user: TBot['transformers']['$inferredTypes']['user'], guildId: bigint) => unknown
  guildBanRemove: (user: TBot['transformers']['$inferredTypes']['user'], guildId: bigint) => unknown
  guildCreate: (guild: TBot['transformers']['$inferredTypes']['guild']) => unknown
  guildDelete: (id: bigint, shardId: number) => unknown
  guildUnavailable: (id: bigint, shardId: number) => unknown
  guildUpdate: (guild: TBot['transformers']['$inferredTypes']['guild']) => unknown
  raw: (data: DiscordGatewayPayload, shardId: number) => unknown
  roleCreate: (role: TBot['transformers']['$inferredTypes']['role']) => unknown
  roleDelete: (payload: { guildId: bigint; roleId: bigint }) => unknown
  roleUpdate: (role: TBot['transformers']['$inferredTypes']['role']) => unknown
  webhooksUpdate: (payload: { channelId: bigint; guildId: bigint }) => unknown
  botUpdate: (user: TBot['transformers']['$inferredTypes']['user']) => unknown
  typingStart: (payload: {
    guildId: bigint | undefined
    channelId: bigint
    userId: bigint
    timestamp: number
    member: TBot['transformers']['$inferredTypes']['member'] | undefined
  }) => unknown
  entitlementCreate: (entitlement: TBot['transformers']['$inferredTypes']['entitlement']) => unknown
  entitlementUpdate: (entitlement: TBot['transformers']['$inferredTypes']['entitlement']) => unknown
  entitlementDelete: (entitlement: TBot['transformers']['$inferredTypes']['entitlement']) => unknown
  subscriptionCreate: (subscription: TBot['transformers']['$inferredTypes']['subscription']) => unknown
  subscriptionUpdate: (subscription: TBot['transformers']['$inferredTypes']['subscription']) => unknown
  subscriptionDelete: (subscription: TBot['transformers']['$inferredTypes']['subscription']) => unknown
  messagePollVoteAdd: (payload: { userId: bigint; channelId: bigint; messageId: bigint; guildId?: bigint; answerId: number }) => unknown
  messagePollVoteRemove: (payload: { userId: bigint; channelId: bigint; messageId: bigint; guildId?: bigint; answerId: number }) => unknown
  soundboardSoundCreate: (payload: TBot['transformers']['$inferredTypes']['soundboardSound']) => unknown
  soundboardSoundUpdate: (payload: TBot['transformers']['$inferredTypes']['soundboardSound']) => unknown
  soundboardSoundDelete: (payload: { soundId: bigint; guildId: bigint }) => unknown
  soundboardSoundsUpdate: (payload: { soundboardSounds: TBot['transformers']['$inferredTypes']['soundboardSound'][]; guildId: bigint }) => unknown
  soundboardSounds: (payload: { soundboardSounds: TBot['transformers']['$inferredTypes']['soundboardSound'][]; guildId: bigint }) => unknown
}
