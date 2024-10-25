import type { DiscordGatewayPayload, DiscordReady, DiscordVoiceChannelEffectAnimationType } from '@discordeno/types'
import type { Collection } from '@discordeno/utils'
import type {
  AuditLogEntry,
  AutoModerationActionExecution,
  AutoModerationRule,
  Channel,
  Emoji,
  Entitlement,
  Guild,
  GuildApplicationCommandPermissions,
  Integration,
  Interaction,
  Invite,
  Member,
  Message,
  PresenceUpdate,
  Role,
  ScheduledEvent,
  SoundboardSound,
  Sticker,
  Subscription,
  ThreadMember,
  User,
  VoiceState,
} from './transformers/types.js'

export interface EventHandlers {
  debug: (text: string, ...args: any[]) => unknown
  applicationCommandPermissionsUpdate: (command: GuildApplicationCommandPermissions) => unknown
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
  guildStickersUpdate: (payload: { guildId: bigint; stickers: Sticker[] }) => unknown
  messageCreate: (message: Message) => unknown
  messageDelete: (payload: { id: bigint; channelId: bigint; guildId?: bigint }, message?: Message) => unknown
  messageDeleteBulk: (payload: { ids: bigint[]; channelId: bigint; guildId?: bigint }) => unknown
  messageUpdate: (message: Message) => unknown
  reactionAdd: (payload: {
    userId: bigint
    channelId: bigint
    messageId: bigint
    guildId?: bigint
    member?: Member
    user?: User
    emoji: Emoji
    messageAuthorId?: bigint
    burst: boolean
    burstColors?: string[]
  }) => unknown
  reactionRemove: (payload: { userId: bigint; channelId: bigint; messageId: bigint; guildId?: bigint; emoji: Emoji; burst: boolean }) => unknown
  reactionRemoveEmoji: (payload: { channelId: bigint; messageId: bigint; guildId?: bigint; emoji: Emoji }) => unknown
  reactionRemoveAll: (payload: { channelId: bigint; messageId: bigint; guildId?: bigint }) => unknown
  presenceUpdate: (presence: PresenceUpdate) => unknown
  voiceChannelEffectSend: (payload: {
    channelId: bigint
    guildId: bigint
    userId: bigint
    emoji?: Emoji
    animationType?: DiscordVoiceChannelEffectAnimationType
    animationId?: number
    soundId?: bigint | number
    soundVolume?: number
  }) => unknown
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
  guildEmojisUpdate: (payload: { guildId: bigint; emojis: Collection<bigint, Emoji> }) => unknown
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
  subscriptionCreate: (subscription: Subscription) => unknown
  subscriptionUpdate: (subscription: Subscription) => unknown
  subscriptionDelete: (subscription: Subscription) => unknown
  messagePollVoteAdd: (payload: { userId: bigint; channelId: bigint; messageId: bigint; guildId?: bigint; answerId: number }) => unknown
  messagePollVoteRemove: (payload: { userId: bigint; channelId: bigint; messageId: bigint; guildId?: bigint; answerId: number }) => unknown
  soundboardSoundCreate: (payload: SoundboardSound) => unknown
  soundboardSoundUpdate: (payload: SoundboardSound) => unknown
  soundboardSoundDelete: (payload: { soundId: bigint; guildId: bigint }) => unknown
  soundboardSoundsUpdate: (payload: { soundboardSounds: SoundboardSound[]; guildId: bigint }) => unknown
  soundboardSounds: (payload: { soundboardSounds: SoundboardSound[]; guildId: bigint }) => unknown
}
