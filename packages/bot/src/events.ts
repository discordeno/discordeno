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
  threadCreate: (thread: TBot['transformers']['$inferChannel']) => unknown
  threadDelete: (thread: TBot['transformers']['$inferChannel']) => unknown
  threadListSync: (payload: {
    guildId: bigint
    channelIds?: bigint[]
    threads: TBot['transformers']['$inferChannel'][]
    members: ThreadMember[]
  }) => unknown
  threadMemberUpdate: (payload: { id: bigint; guildId: bigint; joinedAt: number; flags: number }) => unknown
  threadMembersUpdate: (payload: { id: bigint; guildId: bigint; addedMembers?: ThreadMember[]; removedMemberIds?: bigint[] }) => unknown
  threadUpdate: (thread: TBot['transformers']['$inferChannel']) => unknown
  scheduledEventCreate: (event: TBot['transformers']['$inferScheduledEvent']) => unknown
  scheduledEventUpdate: (event: TBot['transformers']['$inferScheduledEvent']) => unknown
  scheduledEventDelete: (event: TBot['transformers']['$inferScheduledEvent']) => unknown
  scheduledEventUserAdd: (payload: { guildScheduledEventId: bigint; guildId: bigint; userId: bigint }) => unknown
  scheduledEventUserRemove: (payload: { guildScheduledEventId: bigint; guildId: bigint; userId: bigint }) => unknown
  ready: (
    payload: {
      shardId: number
      v: number
      user: TBot['transformers']['$inferUser']
      guilds: bigint[]
      sessionId: string
      shard?: number[]
      applicationId: bigint
    },
    rawPayload: DiscordReady,
  ) => unknown
  interactionCreate: (interaction: TBot['transformers']['$inferInteraction']) => unknown
  integrationCreate: (integration: Integration) => unknown
  integrationDelete: (payload: { id: bigint; guildId: bigint; applicationId?: bigint }) => unknown
  integrationUpdate: (payload: { guildId: bigint }) => unknown
  inviteCreate: (invite: TBot['transformers']['$inferInvite']) => unknown
  inviteDelete: (payload: { channelId: bigint; guildId?: bigint; code: string }) => unknown
  guildMemberAdd: (member: TBot['transformers']['$inferMember'], user: TBot['transformers']['$inferUser']) => unknown
  guildMemberRemove: (user: TBot['transformers']['$inferUser'], guildId: bigint) => unknown
  guildMemberUpdate: (member: TBot['transformers']['$inferMember'], user: TBot['transformers']['$inferUser']) => unknown
  guildStickersUpdate: (payload: { guildId: bigint; stickers: TBot['transformers']['$inferSticker'][] }) => unknown
  messageCreate: (message: TBot['transformers']['$inferMessage']) => unknown
  messageDelete: (payload: { id: bigint; channelId: bigint; guildId?: bigint }, message?: TBot['transformers']['$inferMessage']) => unknown
  messageDeleteBulk: (payload: { ids: bigint[]; channelId: bigint; guildId?: bigint }) => unknown
  messageUpdate: (message: TBot['transformers']['$inferMessage']) => unknown
  reactionAdd: (payload: {
    userId: bigint
    channelId: bigint
    messageId: bigint
    guildId?: bigint
    member?: TBot['transformers']['$inferMember']
    user?: TBot['transformers']['$inferUser']
    emoji: TBot['transformers']['$inferEmoji']
    messageAuthorId?: bigint
    burst: boolean
    burstColors?: string[]
  }) => unknown
  reactionRemove: (payload: {
    userId: bigint
    channelId: bigint
    messageId: bigint
    guildId?: bigint
    emoji: TBot['transformers']['$inferEmoji']
    burst: boolean
  }) => unknown
  reactionRemoveEmoji: (payload: {
    channelId: bigint
    messageId: bigint
    guildId?: bigint
    emoji: TBot['transformers']['$inferEmoji']
  }) => unknown
  reactionRemoveAll: (payload: { channelId: bigint; messageId: bigint; guildId?: bigint }) => unknown
  presenceUpdate: (presence: PresenceUpdate) => unknown
  voiceChannelEffectSend: (payload: {
    channelId: bigint
    guildId: bigint
    userId: bigint
    emoji?: TBot['transformers']['$inferEmoji']
    animationType?: DiscordVoiceChannelEffectAnimationType
    animationId?: number
    soundId?: bigint | number
    soundVolume?: number
  }) => unknown
  voiceServerUpdate: (payload: { token: string; endpoint?: string; guildId: bigint }) => unknown
  voiceStateUpdate: (voiceState: TBot['transformers']['$inferVoiceState']) => unknown
  channelCreate: (channel: TBot['transformers']['$inferChannel']) => unknown
  dispatchRequirements: (data: DiscordGatewayPayload, shardId: number) => unknown
  channelDelete: (channel: TBot['transformers']['$inferChannel']) => unknown
  channelPinsUpdate: (data: { guildId?: bigint; channelId: bigint; lastPinTimestamp?: number }) => unknown
  channelUpdate: (channel: TBot['transformers']['$inferChannel']) => unknown
  stageInstanceCreate: (data: { id: bigint; guildId: bigint; channelId: bigint; topic: string }) => unknown
  stageInstanceDelete: (data: { id: bigint; guildId: bigint; channelId: bigint; topic: string }) => unknown
  stageInstanceUpdate: (data: { id: bigint; guildId: bigint; channelId: bigint; topic: string }) => unknown
  guildEmojisUpdate: (payload: {
    guildId: bigint
    emojis: Collection<bigint, TBot['transformers']['$inferEmoji']>
  }) => unknown
  guildBanAdd: (user: TBot['transformers']['$inferUser'], guildId: bigint) => unknown
  guildBanRemove: (user: TBot['transformers']['$inferUser'], guildId: bigint) => unknown
  guildCreate: (guild: TBot['transformers']['$inferGuild']) => unknown
  guildDelete: (id: bigint, shardId: number) => unknown
  guildUnavailable: (id: bigint, shardId: number) => unknown
  guildUpdate: (guild: TBot['transformers']['$inferGuild']) => unknown
  raw: (data: DiscordGatewayPayload, shardId: number) => unknown
  roleCreate: (role: TBot['transformers']['$inferRole']) => unknown
  roleDelete: (payload: { guildId: bigint; roleId: bigint }) => unknown
  roleUpdate: (role: TBot['transformers']['$inferRole']) => unknown
  webhooksUpdate: (payload: { channelId: bigint; guildId: bigint }) => unknown
  botUpdate: (user: TBot['transformers']['$inferUser']) => unknown
  typingStart: (payload: {
    guildId: bigint | undefined
    channelId: bigint
    userId: bigint
    timestamp: number
    member: TBot['transformers']['$inferMember'] | undefined
  }) => unknown
  entitlementCreate: (entitlement: TBot['transformers']['$inferEntitlement']) => unknown
  entitlementUpdate: (entitlement: TBot['transformers']['$inferEntitlement']) => unknown
  entitlementDelete: (entitlement: TBot['transformers']['$inferEntitlement']) => unknown
  subscriptionCreate: (subscription: TBot['transformers']['$inferSubscription']) => unknown
  subscriptionUpdate: (subscription: TBot['transformers']['$inferSubscription']) => unknown
  subscriptionDelete: (subscription: TBot['transformers']['$inferSubscription']) => unknown
  messagePollVoteAdd: (payload: { userId: bigint; channelId: bigint; messageId: bigint; guildId?: bigint; answerId: number }) => unknown
  messagePollVoteRemove: (payload: { userId: bigint; channelId: bigint; messageId: bigint; guildId?: bigint; answerId: number }) => unknown
  soundboardSoundCreate: (payload: TBot['transformers']['$inferSoundboardSound']) => unknown
  soundboardSoundUpdate: (payload: TBot['transformers']['$inferSoundboardSound']) => unknown
  soundboardSoundDelete: (payload: { soundId: bigint; guildId: bigint }) => unknown
  soundboardSoundsUpdate: (payload: { soundboardSounds: TBot['transformers']['$inferSoundboardSound'][]; guildId: bigint }) => unknown
  soundboardSounds: (payload: { soundboardSounds: TBot['transformers']['$inferSoundboardSound'][]; guildId: bigint }) => unknown
}
