import type { DiscordGatewayPayload, DiscordReady, DiscordVoiceChannelEffectAnimationType } from '@discordeno/types'
import type { Collection } from '@discordeno/utils'
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from './desiredProperties.js'
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

export type EventHandlers<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior> = {
  debug: (text: string, ...args: any[]) => unknown
  applicationCommandPermissionsUpdate: (command: GuildApplicationCommandPermissions) => unknown
  guildAuditLogEntryCreate: (log: AuditLogEntry, guildId: bigint) => unknown
  automodRuleCreate: (rule: AutoModerationRule) => unknown
  automodRuleUpdate: (rule: AutoModerationRule) => unknown
  automodRuleDelete: (rule: AutoModerationRule) => unknown
  automodActionExecution: (payload: AutoModerationActionExecution) => unknown
  threadCreate: (thread: SetupDesiredProps<Channel, TProps, TBehavior>) => unknown
  threadDelete: (thread: SetupDesiredProps<Channel, TProps, TBehavior>) => unknown
  threadListSync: (payload: {
    guildId: bigint
    channelIds?: bigint[]
    threads: SetupDesiredProps<Channel, TProps, TBehavior>[]
    members: ThreadMember[]
  }) => unknown
  threadMemberUpdate: (payload: { id: bigint; guildId: bigint; joinedAt: number; flags: number }) => unknown
  threadMembersUpdate: (payload: { id: bigint; guildId: bigint; addedMembers?: ThreadMember[]; removedMemberIds?: bigint[] }) => unknown
  threadUpdate: (thread: SetupDesiredProps<Channel, TProps, TBehavior>) => unknown
  scheduledEventCreate: (event: SetupDesiredProps<ScheduledEvent, TProps, TBehavior>) => unknown
  scheduledEventUpdate: (event: SetupDesiredProps<ScheduledEvent, TProps, TBehavior>) => unknown
  scheduledEventDelete: (event: SetupDesiredProps<ScheduledEvent, TProps, TBehavior>) => unknown
  scheduledEventUserAdd: (payload: { guildScheduledEventId: bigint; guildId: bigint; userId: bigint }) => unknown
  scheduledEventUserRemove: (payload: { guildScheduledEventId: bigint; guildId: bigint; userId: bigint }) => unknown
  ready: (
    payload: {
      shardId: number
      v: number
      user: SetupDesiredProps<User, TProps, TBehavior>
      guilds: bigint[]
      sessionId: string
      shard?: number[]
      applicationId: bigint
    },
    rawPayload: DiscordReady,
  ) => unknown
  interactionCreate: (interaction: SetupDesiredProps<Interaction, TProps, TBehavior>) => unknown
  integrationCreate: (integration: Integration) => unknown
  integrationDelete: (payload: { id: bigint; guildId: bigint; applicationId?: bigint }) => unknown
  integrationUpdate: (payload: { guildId: bigint }) => unknown
  inviteCreate: (invite: SetupDesiredProps<Invite, TProps, TBehavior>) => unknown
  inviteDelete: (payload: { channelId: bigint; guildId?: bigint; code: string }) => unknown
  guildMemberAdd: (member: SetupDesiredProps<Member, TProps, TBehavior>, user: SetupDesiredProps<User, TProps, TBehavior>) => unknown
  guildMemberRemove: (user: SetupDesiredProps<User, TProps, TBehavior>, guildId: bigint) => unknown
  guildMemberUpdate: (member: SetupDesiredProps<Member, TProps, TBehavior>, user: SetupDesiredProps<User, TProps, TBehavior>) => unknown
  guildStickersUpdate: (payload: { guildId: bigint; stickers: SetupDesiredProps<Sticker, TProps, TBehavior>[] }) => unknown
  messageCreate: (message: SetupDesiredProps<Message, TProps, TBehavior>) => unknown
  messageDelete: (payload: { id: bigint; channelId: bigint; guildId?: bigint }, message?: SetupDesiredProps<Message, TProps, TBehavior>) => unknown
  messageDeleteBulk: (payload: { ids: bigint[]; channelId: bigint; guildId?: bigint }) => unknown
  messageUpdate: (message: SetupDesiredProps<Message, TProps, TBehavior>) => unknown
  reactionAdd: (payload: {
    userId: bigint
    channelId: bigint
    messageId: bigint
    guildId?: bigint
    member?: SetupDesiredProps<Member, TProps, TBehavior>
    user?: SetupDesiredProps<User, TProps, TBehavior>
    emoji: SetupDesiredProps<Emoji, TProps, TBehavior>
    messageAuthorId?: bigint
    burst: boolean
    burstColors?: string[]
  }) => unknown
  reactionRemove: (payload: {
    userId: bigint
    channelId: bigint
    messageId: bigint
    guildId?: bigint
    emoji: SetupDesiredProps<Emoji, TProps, TBehavior>
    burst: boolean
  }) => unknown
  reactionRemoveEmoji: (payload: {
    channelId: bigint
    messageId: bigint
    guildId?: bigint
    emoji: SetupDesiredProps<Emoji, TProps, TBehavior>
  }) => unknown
  reactionRemoveAll: (payload: { channelId: bigint; messageId: bigint; guildId?: bigint }) => unknown
  presenceUpdate: (presence: PresenceUpdate) => unknown
  voiceChannelEffectSend: (payload: {
    channelId: bigint
    guildId: bigint
    userId: bigint
    emoji?: SetupDesiredProps<Emoji, TProps, TBehavior>
    animationType?: DiscordVoiceChannelEffectAnimationType
    animationId?: number
    soundId?: bigint | number
    soundVolume?: number
  }) => unknown
  voiceServerUpdate: (payload: { token: string; endpoint?: string; guildId: bigint }) => unknown
  voiceStateUpdate: (voiceState: SetupDesiredProps<VoiceState, TProps, TBehavior>) => unknown
  channelCreate: (channel: SetupDesiredProps<Channel, TProps, TBehavior>) => unknown
  dispatchRequirements: (data: DiscordGatewayPayload, shardId: number) => unknown
  channelDelete: (channel: SetupDesiredProps<Channel, TProps, TBehavior>) => unknown
  channelPinsUpdate: (data: { guildId?: bigint; channelId: bigint; lastPinTimestamp?: number }) => unknown
  channelUpdate: (channel: SetupDesiredProps<Channel, TProps, TBehavior>) => unknown
  stageInstanceCreate: (data: { id: bigint; guildId: bigint; channelId: bigint; topic: string }) => unknown
  stageInstanceDelete: (data: { id: bigint; guildId: bigint; channelId: bigint; topic: string }) => unknown
  stageInstanceUpdate: (data: { id: bigint; guildId: bigint; channelId: bigint; topic: string }) => unknown
  guildEmojisUpdate: (payload: {
    guildId: bigint
    emojis: Collection<bigint, SetupDesiredProps<Emoji, TProps, TBehavior>>
  }) => unknown
  guildBanAdd: (user: SetupDesiredProps<User, TProps, TBehavior>, guildId: bigint) => unknown
  guildBanRemove: (user: SetupDesiredProps<User, TProps, TBehavior>, guildId: bigint) => unknown
  guildCreate: (guild: SetupDesiredProps<Guild, TProps, TBehavior>) => unknown
  guildDelete: (id: bigint, shardId: number) => unknown
  guildUnavailable: (id: bigint, shardId: number) => unknown
  guildUpdate: (guild: SetupDesiredProps<Guild, TProps, TBehavior>) => unknown
  raw: (data: DiscordGatewayPayload, shardId: number) => unknown
  roleCreate: (role: SetupDesiredProps<Role, TProps, TBehavior>) => unknown
  roleDelete: (payload: { guildId: bigint; roleId: bigint }) => unknown
  roleUpdate: (role: SetupDesiredProps<Role, TProps, TBehavior>) => unknown
  webhooksUpdate: (payload: { channelId: bigint; guildId: bigint }) => unknown
  botUpdate: (user: SetupDesiredProps<User, TProps, TBehavior>) => unknown
  typingStart: (payload: {
    guildId: bigint | undefined
    channelId: bigint
    userId: bigint
    timestamp: number
    member: SetupDesiredProps<Member, TProps, TBehavior> | undefined
  }) => unknown
  entitlementCreate: (entitlement: SetupDesiredProps<Entitlement, TProps, TBehavior>) => unknown
  entitlementUpdate: (entitlement: SetupDesiredProps<Entitlement, TProps, TBehavior>) => unknown
  entitlementDelete: (entitlement: SetupDesiredProps<Entitlement, TProps, TBehavior>) => unknown
  subscriptionCreate: (subscription: SetupDesiredProps<Subscription, TProps, TBehavior>) => unknown
  subscriptionUpdate: (subscription: SetupDesiredProps<Subscription, TProps, TBehavior>) => unknown
  subscriptionDelete: (subscription: SetupDesiredProps<Subscription, TProps, TBehavior>) => unknown
  messagePollVoteAdd: (payload: { userId: bigint; channelId: bigint; messageId: bigint; guildId?: bigint; answerId: number }) => unknown
  messagePollVoteRemove: (payload: { userId: bigint; channelId: bigint; messageId: bigint; guildId?: bigint; answerId: number }) => unknown
  soundboardSoundCreate: (payload: SetupDesiredProps<SoundboardSound, TProps, TBehavior>) => unknown
  soundboardSoundUpdate: (payload: SetupDesiredProps<SoundboardSound, TProps, TBehavior>) => unknown
  soundboardSoundDelete: (payload: { soundId: bigint; guildId: bigint }) => unknown
  soundboardSoundsUpdate: (payload: { soundboardSounds: SetupDesiredProps<SoundboardSound, TProps, TBehavior>[]; guildId: bigint }) => unknown
  soundboardSounds: (payload: { soundboardSounds: SetupDesiredProps<SoundboardSound, TProps, TBehavior>[]; guildId: bigint }) => unknown
}
