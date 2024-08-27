import type {
  AllowedMentions,
  BigString,
  CreateApplicationCommand,
  DiscordActivity,
  DiscordAllowedMentions,
  DiscordApplication,
  DiscordApplicationCommand,
  DiscordApplicationCommandOption,
  DiscordApplicationCommandOptionChoice,
  DiscordAttachment,
  DiscordAuditLogEntry,
  DiscordAutoModerationActionExecution,
  DiscordAutoModerationRule,
  DiscordAvatarDecorationData,
  DiscordChannel,
  DiscordCreateApplicationCommand,
  DiscordDefaultReactionEmoji,
  DiscordEmbed,
  DiscordEmoji,
  DiscordEntitlement,
  DiscordForumTag,
  DiscordGetGatewayBot,
  DiscordGuild,
  DiscordGuildApplicationCommandPermissions,
  DiscordGuildOnboarding,
  DiscordGuildOnboardingPrompt,
  DiscordGuildOnboardingPromptOption,
  DiscordGuildWidget,
  DiscordGuildWidgetSettings,
  DiscordIntegrationCreateUpdate,
  DiscordInteraction,
  DiscordInteractionCallback,
  DiscordInteractionCallbackResponse,
  DiscordInteractionDataOption,
  DiscordInteractionResource,
  DiscordInviteCreate,
  DiscordInviteMetadata,
  DiscordInviteStageInstance,
  DiscordMember,
  DiscordMessage,
  DiscordMessageCall,
  DiscordMessageInteractionMetadata,
  DiscordMessageSnapshot,
  DiscordPoll,
  DiscordPollMedia,
  DiscordPresenceUpdate,
  DiscordRole,
  DiscordScheduledEvent,
  DiscordScheduledEventRecurrenceRule,
  DiscordSku,
  DiscordStageInstance,
  DiscordSticker,
  DiscordStickerPack,
  DiscordTeam,
  DiscordTemplate,
  DiscordThreadMember,
  DiscordUser,
  DiscordVoiceRegion,
  DiscordVoiceState,
  DiscordWebhook,
  DiscordWelcomeScreen,
  RecursivePartial,
} from '@discordeno/types'
import { logger } from '@discordeno/utils'
import type { Bot } from './bot.js'
import {
  type Activity,
  type Application,
  type ApplicationCommand,
  type ApplicationCommandOption,
  type ApplicationCommandOptionChoice,
  type Attachment,
  type AuditLogEntry,
  type AutoModerationActionExecution,
  type AutoModerationRule,
  type AvatarDecorationData,
  type Channel,
  type Component,
  type DefaultReactionEmoji,
  type Embed,
  type Emoji,
  type Entitlement,
  type ForumTag,
  type GetGatewayBot,
  type Guild,
  type GuildApplicationCommandPermissions,
  type GuildOnboarding,
  type GuildOnboardingPrompt,
  type GuildOnboardingPromptOption,
  type GuildWidget,
  type GuildWidgetSettings,
  type Integration,
  type Interaction,
  type InteractionCallback,
  type InteractionCallbackResponse,
  type InteractionDataOption,
  type InteractionDataResolved,
  type InteractionResource,
  type Invite,
  type InviteStageInstance,
  type Member,
  type Message,
  type MessageCall,
  type MessageInteractionMetadata,
  type MessageSnapshot,
  type Poll,
  type PollMedia,
  type PresenceUpdate,
  type Role,
  type ScheduledEvent,
  type ScheduledEventRecurrenceRule,
  type Sku,
  type StageInstance,
  type Sticker,
  type StickerPack,
  type Team,
  type Template,
  type ThreadMember,
  type ThreadMemberGuildCreate,
  type User,
  type VoiceRegion,
  type VoiceState,
  type Webhook,
  type WelcomeScreen,
  transformActivity,
  transformActivityToDiscordActivity,
  transformApplication,
  transformApplicationCommand,
  transformApplicationCommandOption,
  transformApplicationCommandOptionChoice,
  transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice,
  transformApplicationCommandOptionToDiscordApplicationCommandOption,
  transformApplicationCommandPermission,
  transformApplicationCommandToDiscordApplicationCommand,
  transformApplicationToDiscordApplication,
  transformAttachment,
  transformAttachmentToDiscordAttachment,
  transformAuditLogEntry,
  transformAutoModerationActionExecution,
  transformAutoModerationRule,
  transformAvatarDecorationData,
  transformChannel,
  transformComponent,
  transformComponentToDiscordComponent,
  transformDefaultReactionEmoji,
  transformEmbed,
  transformEmbedToDiscordEmbed,
  transformEmoji,
  transformEntitlement,
  transformForumTag,
  transformGatewayBot,
  transformGuild,
  transformGuildOnboarding,
  transformGuildOnboardingPrompt,
  transformGuildOnboardingPromptOption,
  transformIntegration,
  transformInteraction,
  transformInteractionCallback,
  transformInteractionCallbackResponse,
  transformInteractionDataOption,
  transformInteractionDataResolved,
  transformInteractionResource,
  transformInvite,
  transformInviteStageInstance,
  transformMember,
  transformMemberToDiscordMember,
  transformMessage,
  transformMessageCall,
  transformMessageInteractionMetadata,
  transformMessageSnapshot,
  transformPoll,
  transformPollMedia,
  transformPresence,
  transformRole,
  transformScheduledEvent,
  transformScheduledEventRecurrenceRule,
  transformSku,
  transformStageInstance,
  transformSticker,
  transformStickerPack,
  transformTeam,
  transformTeamToDiscordTeam,
  transformTemplate,
  transformThreadMember,
  transformThreadMemberGuildCreate,
  transformUser,
  transformUserToDiscordUser,
  transformVoiceRegion,
  transformVoiceState,
  transformWebhook,
  transformWelcomeScreen,
  transformWidget,
  transformWidgetSettings,
} from './transformers/index.js'
import {
  transformAllowedMentionsToDiscordAllowedMentions,
  transformCreateApplicationCommandToDiscordCreateApplicationCommand,
  transformInteractionResponseToDiscordInteractionResponse,
} from './transformers/reverse/index.js'
import type {
  BotInteractionResponse,
  DiscordComponent,
  DiscordInteractionDataResolved,
  DiscordInteractionResponse,
  DiscordThreadMemberGuildCreate,
} from './typings.js'
import { bigintToSnowflake, snowflakeToBigint } from './utils.js'

export interface Transformers {
  customizers: {
    activity: (bot: Bot, payload: DiscordActivity, activity: Activity) => any
    application: (bot: Bot, payload: DiscordApplication, application: Application) => any
    applicationCommand: (bot: Bot, payload: DiscordApplicationCommand, applicationCommand: ApplicationCommand) => any
    applicationCommandOption: (bot: Bot, payload: DiscordApplicationCommandOption, applicationCommandOption: ApplicationCommandOption) => any
    applicationCommandOptionChoice: (
      bot: Bot,
      payload: DiscordApplicationCommandOptionChoice,
      applicationCommandOptionChoice: ApplicationCommandOptionChoice,
    ) => any
    applicationCommandPermission: (
      bot: Bot,
      payload: DiscordGuildApplicationCommandPermissions,
      applicationCommandPermission: GuildApplicationCommandPermissions,
    ) => any
    attachment: (bot: Bot, payload: DiscordAttachment, attachment: Attachment) => any
    auditLogEntry: (bot: Bot, payload: DiscordAuditLogEntry, auditLogEntry: AuditLogEntry) => any
    automodActionExecution: (bot: Bot, payload: DiscordAutoModerationActionExecution, automodActionExecution: AutoModerationActionExecution) => any
    automodRule: (bot: Bot, payload: DiscordAutoModerationRule, automodRule: AutoModerationRule) => any
    avatarDecorationData: (bot: Bot, payload: DiscordAvatarDecorationData, avatarDecorationData: AvatarDecorationData) => any
    channel: (bot: Bot, payload: DiscordChannel, channel: Channel) => any
    component: (bot: Bot, payload: DiscordComponent, component: Component) => any
    defaultReactionEmoji: (bot: Bot, payload: DiscordDefaultReactionEmoji, defaultReactionEmoji: DefaultReactionEmoji) => any
    embed: (bot: Bot, payload: DiscordEmbed, embed: Embed) => any
    emoji: (bot: Bot, payload: DiscordEmoji, emoji: Emoji) => any
    entitlement: (bot: Bot, payload: DiscordEntitlement, entitlement: Entitlement) => any
    forumTag: (bot: Bot, payload: DiscordForumTag, forumTag: ForumTag) => any
    gatewayBot: (bot: Bot, payload: DiscordGetGatewayBot, getGatewayBot: GetGatewayBot) => any
    guild: (bot: Bot, payload: DiscordGuild, guild: Guild) => any
    guildOnboarding: (bot: Bot, payload: DiscordGuildOnboarding, onboarding: GuildOnboarding) => any
    guildOnboardingPrompt: (bot: Bot, payload: DiscordGuildOnboardingPrompt, onboardingPrompt: GuildOnboardingPrompt) => any
    guildOnboardingPromptOption: (bot: Bot, payload: DiscordGuildOnboardingPromptOption, onboardingPromptOption: GuildOnboardingPromptOption) => any
    integration: (bot: Bot, payload: DiscordIntegrationCreateUpdate, integration: Integration) => any
    interaction: (bot: Bot, payload: { interaction: DiscordInteraction; shardId: number }, interaction: Interaction) => any
    interactionCallback: (bot: Bot, payload: DiscordInteractionCallback, interactionCallback: InteractionCallback) => any
    interactionCallbackResponse: (
      bot: Bot,
      payload: DiscordInteractionCallbackResponse,
      interactionCallbackResponse: InteractionCallbackResponse,
    ) => any
    interactionDataOptions: (bot: Bot, payload: DiscordInteractionDataOption, interactionDataOptions: InteractionDataOption) => any
    interactionDataResolved: (
      bot: Bot,
      payload: { resolved: DiscordInteractionDataResolved; guildId?: bigint },
      interactionDataResolved: InteractionDataResolved,
    ) => any
    interactionResource: (bot: Bot, payload: DiscordInteractionResource, interactionResource: InteractionResource) => any
    invite: (bot: Bot, payload: DiscordInviteCreate | DiscordInviteMetadata, invite: Invite) => any
    inviteStageInstance: (bot: Bot, payload: DiscordInviteStageInstance, inviteStageInstance: InviteStageInstance) => any
    member: (bot: Bot, payload: DiscordMember, member: Member) => any
    message: (bot: Bot, payload: DiscordMessage, message: Message) => any
    messageCall: (bot: Bot, payload: DiscordMessageCall, call: MessageCall) => any
    messageInteractionMetadata: (bot: Bot, payload: DiscordMessageInteractionMetadata, metadata: MessageInteractionMetadata) => any
    messageSnapshot: (bot: Bot, payload: DiscordMessageSnapshot, messageSnapshot: MessageSnapshot) => any
    poll: (bot: Bot, payload: DiscordPoll, poll: Poll) => any
    pollMedia: (bot: Bot, payload: DiscordPollMedia, pollMedia: PollMedia) => any
    presence: (bot: Bot, payload: DiscordPresenceUpdate, presence: PresenceUpdate) => any
    role: (bot: Bot, payload: DiscordRole, role: Role) => any
    scheduledEvent: (bot: Bot, payload: DiscordScheduledEvent, scheduledEvent: ScheduledEvent) => any
    scheduledEventRecurrenceRule: (bot: Bot, payload: DiscordScheduledEventRecurrenceRule, scheduledEvent: ScheduledEventRecurrenceRule) => any
    sku: (bot: Bot, payload: DiscordSku, sku: Sku) => any
    stageInstance: (bot: Bot, payload: DiscordStageInstance, stageInstance: StageInstance) => any
    sticker: (bot: Bot, payload: DiscordSticker, sticker: Sticker) => any
    stickerPack: (bot: Bot, payload: DiscordStickerPack, stickerPack: StickerPack) => any
    team: (bot: Bot, payload: DiscordTeam, team: Team) => any
    template: (bot: Bot, payload: DiscordTemplate, template: Template) => any
    threadMember: (bot: Bot, payload: DiscordThreadMember, threadMember: ThreadMember) => any
    threadMemberGuildCreate: (bot: Bot, payload: DiscordThreadMemberGuildCreate, threadMemberGuildCreate: ThreadMemberGuildCreate) => any
    user: (bot: Bot, payload: DiscordUser, user: User) => any
    voiceRegion: (bot: Bot, payload: DiscordVoiceRegion, voiceRegion: VoiceRegion) => any
    voiceState: (bot: Bot, payload: DiscordVoiceState, voiceState: VoiceState) => any
    webhook: (bot: Bot, payload: DiscordWebhook, webhook: Webhook) => any
    welcomeScreen: (bot: Bot, payload: DiscordWelcomeScreen, welcomeScreen: WelcomeScreen) => any
    widget: (bot: Bot, payload: DiscordGuildWidget, widget: GuildWidget) => any
    widgetSettings: (bot: Bot, payload: DiscordGuildWidgetSettings, widgetSettings: GuildWidgetSettings) => any
  }
  desiredProperties: TransformersDesiredProperties
  reverse: {
    activity: (bot: Bot, payload: Activity) => DiscordActivity
    allowedMentions: (bot: Bot, payload: AllowedMentions) => DiscordAllowedMentions
    application: (bot: Bot, payload: Application) => DiscordApplication
    applicationCommand: (bot: Bot, payload: ApplicationCommand) => DiscordApplicationCommand
    applicationCommandOption: (bot: Bot, payload: ApplicationCommandOption) => DiscordApplicationCommandOption
    applicationCommandOptionChoice: (bot: Bot, payload: ApplicationCommandOptionChoice) => DiscordApplicationCommandOptionChoice
    attachment: (bot: Bot, payload: Attachment) => DiscordAttachment
    component: (bot: Bot, payload: Component) => DiscordComponent
    createApplicationCommand: (bot: Bot, payload: CreateApplicationCommand) => DiscordCreateApplicationCommand
    embed: (bot: Bot, payload: Embed) => DiscordEmbed
    interactionResponse: (bot: Bot, payload: BotInteractionResponse) => DiscordInteractionResponse
    member: (bot: Bot, payload: Member) => DiscordMember
    snowflake: (snowflake: BigString) => string
    team: (bot: Bot, payload: Team) => DiscordTeam
    user: (bot: Bot, payload: User) => DiscordUser
  }
  activity: (bot: Bot, payload: DiscordActivity) => Activity
  application: (bot: Bot, payload: { application: DiscordApplication; shardId: number }) => Application
  applicationCommand: (bot: Bot, payload: DiscordApplicationCommand) => ApplicationCommand
  applicationCommandOption: (bot: Bot, payload: DiscordApplicationCommandOption) => ApplicationCommandOption
  applicationCommandOptionChoice: (bot: Bot, payload: DiscordApplicationCommandOptionChoice) => ApplicationCommandOptionChoice
  applicationCommandPermission: (bot: Bot, payload: DiscordGuildApplicationCommandPermissions) => GuildApplicationCommandPermissions
  attachment: (bot: Bot, payload: DiscordAttachment) => Attachment
  auditLogEntry: (bot: Bot, payload: DiscordAuditLogEntry) => AuditLogEntry
  automodActionExecution: (bot: Bot, payload: DiscordAutoModerationActionExecution) => AutoModerationActionExecution
  automodRule: (bot: Bot, payload: DiscordAutoModerationRule) => AutoModerationRule
  avatarDecorationData: (bot: Bot, payload: DiscordAvatarDecorationData) => AvatarDecorationData
  channel: (bot: Bot, payload: { channel: DiscordChannel } & { guildId?: BigString }) => Channel
  component: (bot: Bot, payload: DiscordComponent) => Component
  defaultReactionEmoji: (bot: Bot, payload: DiscordDefaultReactionEmoji) => DefaultReactionEmoji
  embed: (bot: Bot, payload: DiscordEmbed) => Embed
  emoji: (bot: Bot, payload: DiscordEmoji) => Emoji
  entitlement: (bot: Bot, payload: DiscordEntitlement) => Entitlement
  forumTag: (bot: Bot, payload: DiscordForumTag) => ForumTag
  gatewayBot: (bot: Bot, payload: DiscordGetGatewayBot) => GetGatewayBot
  guild: (bot: Bot, payload: { guild: DiscordGuild } & { shardId: number }) => Guild
  guildOnboarding: (bot: Bot, payload: DiscordGuildOnboarding) => GuildOnboarding
  guildOnboardingPrompt: (bot: Bot, payload: DiscordGuildOnboardingPrompt) => GuildOnboardingPrompt
  guildOnboardingPromptOption: (bot: Bot, payload: DiscordGuildOnboardingPromptOption) => GuildOnboardingPromptOption
  integration: (bot: Bot, payload: DiscordIntegrationCreateUpdate) => Integration
  interaction: (bot: Bot, payload: { interaction: DiscordInteraction; shardId: number }) => Interaction
  interactionCallback: (bot: Bot, payload: DiscordInteractionCallback) => InteractionCallback
  interactionCallbackResponse: (bot: Bot, payload: DiscordInteractionCallbackResponse) => InteractionCallbackResponse
  interactionDataOptions: (bot: Bot, payload: DiscordInteractionDataOption) => InteractionDataOption
  interactionDataResolved: (bot: Bot, payload: { resolved: DiscordInteractionDataResolved; guildId?: bigint }) => InteractionDataResolved
  interactionResource: (bot: Bot, payload: DiscordInteractionResource) => InteractionResource
  invite: (bot: Bot, payload: { invite: DiscordInviteCreate | DiscordInviteMetadata; shardId: number }) => Invite
  inviteStageInstance: (bot: Bot, payload: DiscordInviteStageInstance & { guildId: BigString }) => InviteStageInstance
  member: (bot: Bot, payload: DiscordMember, guildId: BigString, userId: BigString) => Member
  message: (bot: Bot, payload: DiscordMessage) => Message
  messageCall: (bot: Bot, payload: DiscordMessageCall) => MessageCall
  messageInteractionMetadata: (bot: Bot, payload: DiscordMessageInteractionMetadata) => MessageInteractionMetadata
  messageSnapshot: (bot: Bot, payload: DiscordMessageSnapshot) => MessageSnapshot
  poll: (bot: Bot, payload: DiscordPoll) => Poll
  pollMedia: (bot: Bot, payload: DiscordPollMedia) => PollMedia
  presence: (bot: Bot, payload: DiscordPresenceUpdate) => PresenceUpdate
  role: (bot: Bot, payload: { role: DiscordRole } & { guildId: BigString }) => Role
  scheduledEvent: (bot: Bot, payload: DiscordScheduledEvent) => ScheduledEvent
  scheduledEventRecurrenceRule: (bot: Bot, payload: DiscordScheduledEventRecurrenceRule) => ScheduledEventRecurrenceRule
  sku: (bot: Bot, payload: DiscordSku) => Sku
  snowflake: (snowflake: BigString) => bigint
  stageInstance: (bot: Bot, payload: DiscordStageInstance) => StageInstance
  sticker: (bot: Bot, payload: DiscordSticker) => Sticker
  stickerPack: (bot: Bot, payload: DiscordStickerPack) => StickerPack
  team: (bot: Bot, payload: DiscordTeam) => Team
  template: (bot: Bot, payload: DiscordTemplate) => Template
  threadMember: (bot: Bot, payload: DiscordThreadMember) => ThreadMember
  threadMemberGuildCreate: (bot: Bot, payload: DiscordThreadMemberGuildCreate) => ThreadMemberGuildCreate
  user: (bot: Bot, payload: DiscordUser) => User
  voiceRegion: (bot: Bot, payload: DiscordVoiceRegion) => VoiceRegion
  voiceState: (bot: Bot, payload: { voiceState: DiscordVoiceState } & { guildId: BigString }) => VoiceState
  webhook: (bot: Bot, payload: DiscordWebhook) => Webhook
  welcomeScreen: (bot: Bot, payload: DiscordWelcomeScreen) => WelcomeScreen
  widget: (bot: Bot, payload: DiscordGuildWidget) => GuildWidget
  widgetSettings: (bot: Bot, payload: DiscordGuildWidgetSettings) => GuildWidgetSettings
}

export interface TransformersDesiredProperties {
  attachment: {
    id: boolean
    filename: boolean
    title: boolean
    contentType: boolean
    size: boolean
    url: boolean
    proxyUrl: boolean
    height: boolean
    width: boolean
    ephemeral: boolean
    description: boolean
    duration_secs: boolean
    waveform: boolean
    flags: boolean
  }
  channel: {
    type: boolean
    position: boolean
    name: boolean
    topic: boolean
    nsfw: boolean
    bitrate: boolean
    userLimit: boolean
    rateLimitPerUser: boolean
    rtcRegion: boolean
    videoQualityMode: boolean
    guildId: boolean
    lastPinTimestamp: boolean
    permissionOverwrites: boolean
    id: boolean
    permissions: boolean
    lastMessageId: boolean
    ownerId: boolean
    applicationId: boolean
    managed: boolean
    parentId: boolean
    memberCount: boolean
    messageCount: boolean
    archiveTimestamp: boolean
    defaultAutoArchiveDuration: boolean
    autoArchiveDuration: boolean
    botIsMember: boolean
    archived: boolean
    locked: boolean
    invitable: boolean
    createTimestamp: boolean
    newlyCreated: boolean
    flags: boolean
    recipients: boolean
    icon: boolean
    member: boolean
    totalMessageSent: boolean
    availableTags: boolean
    appliedTags: boolean
    defaultReactionEmoji: boolean
    defaultThreadRateLimitPerUser: boolean
    defaultSortOrder: boolean
    defaultForumLayout: boolean
  }
  forumTag: {
    id: boolean
    name: boolean
    moderated: boolean
    emojiId: boolean
    emojiName: boolean
  }
  emoji: {
    id: boolean
    name: boolean
    roles: boolean
    user: boolean
  }
  defaultReactionEmoji: {
    emojiId: boolean
    emojiName: boolean
  }
  guild: {
    afkTimeout: boolean
    approximateMemberCount: boolean
    approximatePresenceCount: boolean
    defaultMessageNotifications: boolean
    description: boolean
    explicitContentFilter: boolean
    maxMembers: boolean
    maxPresences: boolean
    maxVideoChannelUsers: boolean
    mfaLevel: boolean
    name: boolean
    nsfwLevel: boolean
    preferredLocale: boolean
    premiumSubscriptionCount: boolean
    premiumTier: boolean
    toggles: boolean
    stageInstances: boolean
    channels: boolean
    members: boolean
    roles: boolean
    emojis: boolean
    stickers: boolean
    threads: boolean
    voiceStates: boolean
    large: boolean
    owner: boolean
    widgetEnabled: boolean
    unavailable: boolean
    iconHash: boolean
    presences: boolean
    systemChannelFlags: boolean
    vanityUrlCode: boolean
    verificationLevel: boolean
    welcomeScreen: boolean
    discoverySplash: boolean
    joinedAt: boolean
    memberCount: boolean
    shardId: boolean
    icon: boolean
    banner: boolean
    splash: boolean
    id: boolean
    ownerId: boolean
    permissions: boolean
    afkChannelId: boolean
    widgetChannelId: boolean
    applicationId: boolean
    systemChannelId: boolean
    rulesChannelId: boolean
    publicUpdatesChannelId: boolean
    premiumProgressBarEnabled: boolean
    safetyAlertsChannelId: boolean
  }
  interaction: {
    id: boolean
    applicationId: boolean
    type: boolean
    guild: boolean
    guildId: boolean
    channel: boolean
    channelId: boolean
    member: boolean
    user: boolean
    token: boolean
    version: boolean
    message: boolean
    data: boolean
    locale: boolean
    guildLocale: boolean
    appPermissions: boolean
    authorizingIntegrationOwners: boolean
    context: boolean
  }
  interactionCallback: {
    id: boolean
    type: boolean
    activityInstanceId: boolean
    responseMessageId: boolean
    responseMessageLoading: boolean
    responseMessageEphemeral: boolean
  }
  interactionCallbackResponse: {
    interaction: boolean
    resource: boolean
  }
  interactionResource: {
    type: boolean
    activityInstance: boolean
    message: boolean
  }
  invite: {
    type: boolean
    channelId: boolean
    code: boolean
    createdAt: boolean
    guildId: boolean
    inviter: boolean
    maxAge: boolean
    maxUses: boolean
    targetType: boolean
    targetUser: boolean
    targetApplication: boolean
    temporary: boolean
    uses: boolean
    approximateMemberCount: boolean
    approximatePresenceCount: boolean
    guildScheduledEvent: boolean
    stageInstance: boolean
    expiresAt: boolean
  }
  member: {
    id: boolean
    guildId: boolean
    user: boolean
    nick: boolean
    roles: boolean
    joinedAt: boolean
    premiumSince: boolean
    avatar: boolean
    permissions: boolean
    communicationDisabledUntil: boolean
    flags: boolean
    toggles: boolean
    avatarDecorationData: boolean
  }
  message: {
    activity: boolean
    application: boolean
    applicationId: boolean
    attachments: boolean
    author: boolean
    channelId: boolean
    components: boolean
    content: boolean
    editedTimestamp: boolean
    embeds: boolean
    guildId: boolean
    id: boolean
    interactionMetadata: boolean
    interaction: boolean
    member: boolean
    mentionedChannelIds: boolean
    mentionedRoleIds: boolean
    mentions: boolean
    messageReference: boolean
    referencedMessage: boolean
    messageSnapshots: boolean
    nonce: boolean
    reactions: boolean
    stickerItems: boolean
    thread: boolean
    type: boolean
    webhookId: boolean
    poll: boolean
    call: boolean
  }
  messageSnapshot: {
    message: boolean
  }
  messageInteractionMetadata: {
    id: boolean
    type: boolean
    user: boolean
    authorizingIntegrationOwners: boolean
    originalResponseMessageId: boolean
    interactedMessageId: boolean
    triggeringInteractionMetadata: boolean
  }
  messageInteraction: {
    id: boolean
    member: boolean
    name: boolean
    user: boolean
    type: boolean
  }
  messageReference: {
    messageId: boolean
    channelId: boolean
    guildId: boolean
  }
  messageCall: {
    participants: boolean
    endedTimestamp: boolean
  }
  role: {
    name: boolean
    guildId: boolean
    position: boolean
    color: boolean
    id: boolean
    permissions: boolean
    icon: boolean
    unicodeEmoji: boolean
    flags: boolean
    tags: boolean
    toggles: boolean
  }
  scheduledEvent: {
    id: boolean
    guildId: boolean
    channelId: boolean
    creatorId: boolean
    scheduledStartTime: boolean
    scheduledEndTime: boolean
    entityId: boolean
    creator: boolean
    name: boolean
    description: boolean
    privacyLevel: boolean
    status: boolean
    entityType: boolean
    userCount: boolean
    location: boolean
    image: boolean
    recurrenceRule: boolean
  }
  scheduledEventRecurrenceRule: {
    start: boolean
    end: boolean
    frequency: boolean
    interval: boolean
    byWeekday: boolean
    byNWeekday: boolean
    byMonth: boolean
    byMonthDay: boolean
    byYearDay: boolean
    count: boolean
  }
  stageInstance: {
    id: boolean
    guildId: boolean
    channelId: boolean
    topic: boolean
    guildScheduledEventId: boolean
  }
  inviteStageInstance: {
    members: boolean
    participantCount: boolean
    speakerCount: boolean
    topic: boolean
  }
  sticker: {
    id: boolean
    packId: boolean
    name: boolean
    description: boolean
    tags: boolean
    type: boolean
    formatType: boolean
    available: boolean
    guildId: boolean
    user: boolean
    sortValue: boolean
  }
  user: {
    username: boolean
    globalName: boolean
    locale: boolean
    flags: boolean
    premiumType: boolean
    publicFlags: boolean
    accentColor: boolean
    id: boolean
    discriminator: boolean
    avatar: boolean
    email: boolean
    banner: boolean
    avatarDecorationData: boolean
    toggles: boolean
  }
  avatarDecorationData: {
    asset: boolean
    skuId: boolean
  }
  webhook: {
    id: boolean
    type: boolean
    guildId: boolean
    channelId: boolean
    user: boolean
    name: boolean
    avatar: boolean
    token: boolean
    applicationId: boolean
    sourceGuild: boolean
    sourceChannel: boolean
    url: boolean
  }
  guildOnboarding: {
    guildId: boolean
    prompts: boolean
    defaultChannelIds: boolean
    enabled: boolean
    mode: boolean
  }
  guildOnboardingPrompt: {
    id: boolean
    type: boolean
    options: boolean
    title: boolean
    singleSelect: boolean
    required: boolean
    inOnboarding: boolean
  }
  guildOnboardingPromptOption: {
    id: boolean
    channelIds: boolean
    roleIds: boolean
    emoji: boolean
    title: boolean
    description: boolean
  }
  entitlement: {
    id: boolean
    skuId: boolean
    userId: boolean
    guildId: boolean
    applicationId: boolean
    type: boolean
    deleted: boolean
    startsAt: boolean
    endsAt: boolean
    consumed: boolean
  }
  sku: {
    id: boolean
    type: boolean
    applicationId: boolean
    name: boolean
    slug: boolean
    flags: boolean
  }
  voiceState: {
    requestToSpeakTimestamp: boolean
    channelId: boolean
    guildId: boolean
    toggles: boolean
    sessionId: boolean
    userId: boolean
  }
  poll: {
    question: boolean
    answers: boolean
    expiry: boolean
    allowMultiselect: boolean
    layoutType: boolean
    results: boolean
  }
  pollAnswer: {
    answerId: boolean
    pollMedia: boolean
  }
  pollResult: {
    isFinalized: boolean
    answerCounts: boolean
  }
  pollAnswerCount: {
    id: boolean
    count: boolean
    meVoted: boolean
  }
  pollMedia: {
    text: boolean
    emoji: boolean
  }
}

export interface CreateTransformerOptions {
  defaultDesiredPropertiesValue: boolean
  logger?: Pick<typeof logger, 'debug' | 'info' | 'warn' | 'error' | 'fatal'>
}

const defaultCustomizer = (_bot: unknown, _payload: unknown, structure: unknown) => structure

export function createTransformers(options: RecursivePartial<Transformers>, opts?: CreateTransformerOptions): Transformers {
  if (opts?.defaultDesiredPropertiesValue) {
    const log = opts.logger ?? logger

    log.warn('[Transformers] WARNING WARNING WARNING!')
    log.warn(
      '[Transformers] The defaultDesiredPropertiesValue property is being used and it is NOT RECOMMENDED. In fact it was WARNED AGAINST. It is extremely bad practice.',
    )
    log.warn('[Transformers] It is a bit painful to work with and get started, but it has massive long term benefits.')
    log.warn('[Transformers] ----------------------------------------------------------------')
  }

  return {
    customizers: {
      activity: options.customizers?.activity ?? defaultCustomizer,
      application: options.customizers?.application ?? defaultCustomizer,
      applicationCommand: options.customizers?.applicationCommand ?? defaultCustomizer,
      applicationCommandOption: options.customizers?.applicationCommandOption ?? defaultCustomizer,
      applicationCommandOptionChoice: options.customizers?.applicationCommandOptionChoice ?? defaultCustomizer,
      applicationCommandPermission: options.customizers?.applicationCommandPermission ?? defaultCustomizer,
      attachment: options.customizers?.attachment ?? defaultCustomizer,
      auditLogEntry: options.customizers?.auditLogEntry ?? defaultCustomizer,
      automodActionExecution: options.customizers?.automodActionExecution ?? defaultCustomizer,
      automodRule: options.customizers?.automodRule ?? defaultCustomizer,
      avatarDecorationData: options.customizers?.avatarDecorationData ?? defaultCustomizer,
      channel: options.customizers?.channel ?? defaultCustomizer,
      component: options.customizers?.component ?? defaultCustomizer,
      defaultReactionEmoji: options.customizers?.defaultReactionEmoji ?? defaultCustomizer,
      embed: options.customizers?.embed ?? defaultCustomizer,
      emoji: options.customizers?.emoji ?? defaultCustomizer,
      entitlement: options.customizers?.entitlement ?? defaultCustomizer,
      forumTag: options.customizers?.forumTag ?? defaultCustomizer,
      gatewayBot: options.customizers?.gatewayBot ?? defaultCustomizer,
      guild: options.customizers?.guild ?? defaultCustomizer,
      guildOnboarding: options.customizers?.guildOnboarding ?? defaultCustomizer,
      guildOnboardingPrompt: options.customizers?.guildOnboardingPrompt ?? defaultCustomizer,
      guildOnboardingPromptOption: options.customizers?.guildOnboardingPromptOption ?? defaultCustomizer,
      integration: options.customizers?.integration ?? defaultCustomizer,
      interaction: options.customizers?.interaction ?? defaultCustomizer,
      interactionCallback: options.customizers?.interactionCallback ?? defaultCustomizer,
      interactionCallbackResponse: options.customizers?.interactionCallbackResponse ?? defaultCustomizer,
      interactionDataOptions: options.customizers?.interactionDataOptions ?? defaultCustomizer,
      interactionDataResolved: options.customizers?.interactionDataResolved ?? defaultCustomizer,
      interactionResource: options?.customizers?.interactionResource ?? defaultCustomizer,
      invite: options.customizers?.invite ?? defaultCustomizer,
      inviteStageInstance: options.customizers?.inviteStageInstance ?? defaultCustomizer,
      member: options.customizers?.member ?? defaultCustomizer,
      message: options.customizers?.message ?? defaultCustomizer,
      messageCall: options.customizers?.messageCall ?? defaultCustomizer,
      messageInteractionMetadata: options.customizers?.messageInteractionMetadata ?? defaultCustomizer,
      messageSnapshot: options.customizers?.messageSnapshot ?? defaultCustomizer,
      poll: options.customizers?.poll ?? defaultCustomizer,
      pollMedia: options.customizers?.pollMedia ?? defaultCustomizer,
      presence: options.customizers?.presence ?? defaultCustomizer,
      role: options.customizers?.role ?? defaultCustomizer,
      scheduledEvent: options.customizers?.scheduledEvent ?? defaultCustomizer,
      scheduledEventRecurrenceRule: options.customizers?.scheduledEventRecurrenceRule ?? defaultCustomizer,
      sku: options.customizers?.sku ?? defaultCustomizer,
      stageInstance: options.customizers?.stageInstance ?? defaultCustomizer,
      sticker: options.customizers?.sticker ?? defaultCustomizer,
      stickerPack: options.customizers?.stickerPack ?? defaultCustomizer,
      team: options.customizers?.team ?? defaultCustomizer,
      template: options.customizers?.template ?? defaultCustomizer,
      threadMember: options.customizers?.threadMember ?? defaultCustomizer,
      threadMemberGuildCreate: options.customizers?.threadMemberGuildCreate ?? defaultCustomizer,
      user: options.customizers?.user ?? defaultCustomizer,
      voiceRegion: options.customizers?.voiceRegion ?? defaultCustomizer,
      voiceState: options.customizers?.voiceState ?? defaultCustomizer,
      webhook: options.customizers?.webhook ?? defaultCustomizer,
      welcomeScreen: options.customizers?.welcomeScreen ?? defaultCustomizer,
      widget: options.customizers?.widget ?? defaultCustomizer,
      widgetSettings: options.customizers?.widgetSettings ?? defaultCustomizer,
    },
    desiredProperties: createDesiredPropertiesObject(options.desiredProperties ?? {}, opts?.defaultDesiredPropertiesValue ?? false),
    reverse: {
      activity: options.reverse?.activity ?? transformActivityToDiscordActivity,
      allowedMentions: options.reverse?.allowedMentions ?? transformAllowedMentionsToDiscordAllowedMentions,
      application: options.reverse?.application ?? transformApplicationToDiscordApplication,
      applicationCommand: options.reverse?.applicationCommand ?? transformApplicationCommandToDiscordApplicationCommand,
      applicationCommandOption: options.reverse?.applicationCommandOption ?? transformApplicationCommandOptionToDiscordApplicationCommandOption,
      applicationCommandOptionChoice:
        options.reverse?.applicationCommandOptionChoice ?? transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice,
      attachment: options.reverse?.attachment ?? transformAttachmentToDiscordAttachment,
      component: options.reverse?.component ?? transformComponentToDiscordComponent,
      createApplicationCommand: options.reverse?.createApplicationCommand ?? transformCreateApplicationCommandToDiscordCreateApplicationCommand,
      embed: options.reverse?.embed ?? transformEmbedToDiscordEmbed,
      interactionResponse: options.reverse?.interactionResponse ?? transformInteractionResponseToDiscordInteractionResponse,
      member: options.reverse?.member ?? transformMemberToDiscordMember,
      snowflake: options.reverse?.snowflake ?? bigintToSnowflake,
      team: options.reverse?.team ?? transformTeamToDiscordTeam,
      user: options.reverse?.user ?? transformUserToDiscordUser,
    },
    activity: options.activity ?? transformActivity,
    application: options.application ?? transformApplication,
    applicationCommand: options.applicationCommand ?? transformApplicationCommand,
    applicationCommandOption: options.applicationCommandOption ?? transformApplicationCommandOption,
    applicationCommandOptionChoice: options.applicationCommandOptionChoice ?? transformApplicationCommandOptionChoice,
    applicationCommandPermission: options.applicationCommandPermission ?? transformApplicationCommandPermission,
    attachment: options.attachment ?? transformAttachment,
    auditLogEntry: options.auditLogEntry ?? transformAuditLogEntry,
    automodActionExecution: options.automodActionExecution ?? transformAutoModerationActionExecution,
    automodRule: options.automodRule ?? transformAutoModerationRule,
    avatarDecorationData: options.avatarDecorationData ?? transformAvatarDecorationData,
    channel: options.channel ?? transformChannel,
    component: options.component ?? transformComponent,
    defaultReactionEmoji: options.defaultReactionEmoji ?? transformDefaultReactionEmoji,
    embed: options.embed ?? transformEmbed,
    emoji: options.emoji ?? transformEmoji,
    entitlement: options.entitlement ?? transformEntitlement,
    forumTag: options.forumTag ?? transformForumTag,
    gatewayBot: options.gatewayBot ?? transformGatewayBot,
    guild: options.guild ?? transformGuild,
    guildOnboarding: options.guildOnboarding ?? transformGuildOnboarding,
    guildOnboardingPrompt: options.guildOnboardingPrompt ?? transformGuildOnboardingPrompt,
    guildOnboardingPromptOption: options.guildOnboardingPromptOption ?? transformGuildOnboardingPromptOption,
    integration: options.integration ?? transformIntegration,
    interaction: options.interaction ?? transformInteraction,
    interactionCallback: options.interactionCallback ?? transformInteractionCallback,
    interactionCallbackResponse: options.interactionCallbackResponse ?? transformInteractionCallbackResponse,
    interactionDataOptions: options.interactionDataOptions ?? transformInteractionDataOption,
    interactionDataResolved: options.interactionDataResolved ?? transformInteractionDataResolved,
    interactionResource: options.interactionResource ?? transformInteractionResource,
    invite: options.invite ?? transformInvite,
    inviteStageInstance: options.inviteStageInstance ?? transformInviteStageInstance,
    member: options.member ?? transformMember,
    message: options.message ?? transformMessage,
    messageCall: options.messageCall ?? transformMessageCall,
    messageInteractionMetadata: options.messageInteractionMetadata ?? transformMessageInteractionMetadata,
    messageSnapshot: options.messageSnapshot ?? transformMessageSnapshot,
    poll: options.poll ?? transformPoll,
    pollMedia: options.pollMedia ?? transformPollMedia,
    presence: options.presence ?? transformPresence,
    role: options.role ?? transformRole,
    scheduledEvent: options.scheduledEvent ?? transformScheduledEvent,
    scheduledEventRecurrenceRule: options.scheduledEventRecurrenceRule ?? transformScheduledEventRecurrenceRule,
    sku: options.sku ?? transformSku,
    snowflake: options.snowflake ?? snowflakeToBigint,
    stageInstance: options.stageInstance ?? transformStageInstance,
    sticker: options.sticker ?? transformSticker,
    stickerPack: options.stickerPack ?? transformStickerPack,
    team: options.team ?? transformTeam,
    template: options.template ?? transformTemplate,
    threadMember: options.threadMember ?? transformThreadMember,
    threadMemberGuildCreate: options.threadMemberGuildCreate ?? transformThreadMemberGuildCreate,
    user: options.user ?? transformUser,
    voiceRegion: options.voiceRegion ?? transformVoiceRegion,
    voiceState: options.voiceState ?? transformVoiceState,
    webhook: options.webhook ?? transformWebhook,
    welcomeScreen: options.welcomeScreen ?? transformWelcomeScreen,
    widget: options.widget ?? transformWidget,
    widgetSettings: options.widgetSettings ?? transformWidgetSettings,
  }
}

export function createDesiredPropertiesObject(
  desiredProperties: RecursivePartial<TransformersDesiredProperties>,
  defaultValue = false,
): TransformersDesiredProperties {
  return {
    attachment: {
      id: defaultValue,
      filename: defaultValue,
      title: defaultValue,
      contentType: defaultValue,
      size: defaultValue,
      url: defaultValue,
      proxyUrl: defaultValue,
      height: defaultValue,
      width: defaultValue,
      ephemeral: defaultValue,
      description: defaultValue,
      duration_secs: defaultValue,
      waveform: defaultValue,
      flags: defaultValue,
      ...desiredProperties.attachment,
    },
    channel: {
      type: defaultValue,
      position: defaultValue,
      name: defaultValue,
      topic: defaultValue,
      nsfw: defaultValue,
      bitrate: defaultValue,
      userLimit: defaultValue,
      rateLimitPerUser: defaultValue,
      rtcRegion: defaultValue,
      videoQualityMode: defaultValue,
      guildId: defaultValue,
      lastPinTimestamp: defaultValue,
      permissionOverwrites: defaultValue,
      id: defaultValue,
      permissions: defaultValue,
      lastMessageId: defaultValue,
      ownerId: defaultValue,
      applicationId: defaultValue,
      managed: defaultValue,
      parentId: defaultValue,
      memberCount: defaultValue,
      messageCount: defaultValue,
      archiveTimestamp: defaultValue,
      defaultAutoArchiveDuration: defaultValue,
      autoArchiveDuration: defaultValue,
      botIsMember: defaultValue,
      archived: defaultValue,
      locked: defaultValue,
      invitable: defaultValue,
      createTimestamp: defaultValue,
      newlyCreated: defaultValue,
      flags: defaultValue,
      appliedTags: defaultValue,
      availableTags: defaultValue,
      defaultForumLayout: defaultValue,
      defaultReactionEmoji: defaultValue,
      defaultSortOrder: defaultValue,
      defaultThreadRateLimitPerUser: defaultValue,
      icon: defaultValue,
      member: defaultValue,
      recipients: defaultValue,
      totalMessageSent: defaultValue,
      ...desiredProperties.channel,
    },
    forumTag: {
      emojiId: defaultValue,
      emojiName: defaultValue,
      id: defaultValue,
      moderated: defaultValue,
      name: defaultValue,
      ...desiredProperties.forumTag,
    },
    emoji: {
      id: defaultValue,
      name: defaultValue,
      roles: defaultValue,
      user: defaultValue,
      ...desiredProperties.emoji,
    },
    defaultReactionEmoji: {
      emojiId: defaultValue,
      emojiName: defaultValue,
      ...desiredProperties.defaultReactionEmoji,
    },
    guild: {
      afkTimeout: defaultValue,
      approximateMemberCount: defaultValue,
      approximatePresenceCount: defaultValue,
      defaultMessageNotifications: defaultValue,
      description: defaultValue,
      explicitContentFilter: defaultValue,
      maxMembers: defaultValue,
      maxPresences: defaultValue,
      maxVideoChannelUsers: defaultValue,
      mfaLevel: defaultValue,
      name: defaultValue,
      channels: defaultValue,
      emojis: defaultValue,
      iconHash: defaultValue,
      large: defaultValue,
      members: defaultValue,
      owner: defaultValue,
      presences: defaultValue,
      roles: defaultValue,
      stickers: defaultValue,
      threads: defaultValue,
      toggles: defaultValue,
      unavailable: defaultValue,
      voiceStates: defaultValue,
      widgetEnabled: defaultValue,
      nsfwLevel: defaultValue,
      preferredLocale: defaultValue,
      premiumSubscriptionCount: defaultValue,
      premiumTier: defaultValue,
      stageInstances: defaultValue,
      systemChannelFlags: defaultValue,
      vanityUrlCode: defaultValue,
      verificationLevel: defaultValue,
      welcomeScreen: defaultValue,
      discoverySplash: defaultValue,
      joinedAt: defaultValue,
      memberCount: defaultValue,
      shardId: defaultValue,
      icon: defaultValue,
      banner: defaultValue,
      splash: defaultValue,
      id: defaultValue,
      ownerId: defaultValue,
      permissions: defaultValue,
      afkChannelId: defaultValue,
      widgetChannelId: defaultValue,
      applicationId: defaultValue,
      systemChannelId: defaultValue,
      rulesChannelId: defaultValue,
      publicUpdatesChannelId: defaultValue,
      premiumProgressBarEnabled: defaultValue,
      safetyAlertsChannelId: defaultValue,
      ...desiredProperties.guild,
    },
    interaction: {
      id: defaultValue,
      applicationId: defaultValue,
      type: defaultValue,
      guild: defaultValue,
      guildId: defaultValue,
      channel: defaultValue,
      channelId: defaultValue,
      member: defaultValue,
      user: defaultValue,
      token: defaultValue,
      version: defaultValue,
      message: defaultValue,
      data: defaultValue,
      locale: defaultValue,
      guildLocale: defaultValue,
      appPermissions: defaultValue,
      authorizingIntegrationOwners: defaultValue,
      context: defaultValue,
      ...desiredProperties.interaction,
    },
    interactionCallback: {
      type: defaultValue,
      id: defaultValue,
      activityInstanceId: defaultValue,
      responseMessageEphemeral: defaultValue,
      responseMessageId: defaultValue,
      responseMessageLoading: defaultValue,
      ...desiredProperties.interactionCallback,
    },
    interactionCallbackResponse: {
      interaction: defaultValue,
      resource: defaultValue,
      ...desiredProperties.interactionCallbackResponse,
    },
    interactionResource: {
      type: defaultValue,
      activityInstance: defaultValue,
      message: defaultValue,
      ...desiredProperties.interactionResource,
    },
    invite: {
      type: defaultValue,
      channelId: defaultValue,
      code: defaultValue,
      createdAt: defaultValue,
      guildId: defaultValue,
      inviter: defaultValue,
      maxAge: defaultValue,
      maxUses: defaultValue,
      targetType: defaultValue,
      targetUser: defaultValue,
      targetApplication: defaultValue,
      temporary: defaultValue,
      uses: defaultValue,
      approximateMemberCount: defaultValue,
      approximatePresenceCount: defaultValue,
      guildScheduledEvent: defaultValue,
      stageInstance: defaultValue,
      expiresAt: defaultValue,
      ...desiredProperties.invite,
    },
    member: {
      id: defaultValue,
      guildId: defaultValue,
      user: defaultValue,
      nick: defaultValue,
      roles: defaultValue,
      joinedAt: defaultValue,
      premiumSince: defaultValue,
      avatar: defaultValue,
      permissions: defaultValue,
      communicationDisabledUntil: defaultValue,
      flags: defaultValue,
      toggles: defaultValue,
      avatarDecorationData: defaultValue,
      ...desiredProperties.member,
    },
    message: {
      activity: defaultValue,
      application: defaultValue,
      applicationId: defaultValue,
      attachments: defaultValue,
      author: defaultValue,
      channelId: defaultValue,
      components: defaultValue,
      content: defaultValue,
      editedTimestamp: defaultValue,
      embeds: defaultValue,
      guildId: defaultValue,
      id: defaultValue,
      interactionMetadata: defaultValue,
      interaction: defaultValue,
      member: defaultValue,
      mentionedChannelIds: defaultValue,
      mentionedRoleIds: defaultValue,
      mentions: defaultValue,
      messageReference: defaultValue,
      messageSnapshots: defaultValue,
      referencedMessage: defaultValue,
      nonce: defaultValue,
      reactions: defaultValue,
      stickerItems: defaultValue,
      thread: defaultValue,
      type: defaultValue,
      webhookId: defaultValue,
      poll: defaultValue,
      call: defaultValue,
      ...desiredProperties.message,
    },
    messageSnapshot: {
      message: defaultValue,
      ...desiredProperties.messageSnapshot,
    },
    messageInteractionMetadata: {
      id: defaultValue,
      type: defaultValue,
      user: defaultValue,
      authorizingIntegrationOwners: defaultValue,
      originalResponseMessageId: defaultValue,
      interactedMessageId: defaultValue,
      triggeringInteractionMetadata: defaultValue,
      ...desiredProperties.messageInteractionMetadata,
    },
    messageInteraction: {
      id: defaultValue,
      member: defaultValue,
      name: defaultValue,
      type: defaultValue,
      user: defaultValue,
      ...desiredProperties.messageInteraction,
    },
    messageReference: {
      messageId: defaultValue,
      channelId: defaultValue,
      guildId: defaultValue,
      ...desiredProperties.messageReference,
    },
    messageCall: {
      participants: defaultValue,
      endedTimestamp: defaultValue,
      ...desiredProperties.messageCall,
    },
    role: {
      name: defaultValue,
      guildId: defaultValue,
      position: defaultValue,
      color: defaultValue,
      id: defaultValue,
      permissions: defaultValue,
      icon: defaultValue,
      unicodeEmoji: defaultValue,
      flags: defaultValue,
      tags: defaultValue,
      toggles: defaultValue,
      ...desiredProperties.role,
    },
    scheduledEvent: {
      id: defaultValue,
      guildId: defaultValue,
      channelId: defaultValue,
      creatorId: defaultValue,
      scheduledStartTime: defaultValue,
      scheduledEndTime: defaultValue,
      entityId: defaultValue,
      creator: defaultValue,
      name: defaultValue,
      description: defaultValue,
      privacyLevel: defaultValue,
      status: defaultValue,
      entityType: defaultValue,
      userCount: defaultValue,
      location: defaultValue,
      image: defaultValue,
      recurrenceRule: defaultValue,
      ...desiredProperties.scheduledEvent,
    },
    scheduledEventRecurrenceRule: {
      start: defaultValue,
      end: defaultValue,
      frequency: defaultValue,
      interval: defaultValue,
      byWeekday: defaultValue,
      byNWeekday: defaultValue,
      byMonth: defaultValue,
      byMonthDay: defaultValue,
      byYearDay: defaultValue,
      count: defaultValue,
      ...desiredProperties.scheduledEventRecurrenceRule,
    },
    stageInstance: {
      id: defaultValue,
      guildId: defaultValue,
      channelId: defaultValue,
      topic: defaultValue,
      guildScheduledEventId: defaultValue,
      ...desiredProperties.stageInstance,
    },
    inviteStageInstance: {
      members: defaultValue,
      participantCount: defaultValue,
      speakerCount: defaultValue,
      topic: defaultValue,
      ...desiredProperties.inviteStageInstance,
    },
    sticker: {
      id: defaultValue,
      packId: defaultValue,
      name: defaultValue,
      description: defaultValue,
      tags: defaultValue,
      type: defaultValue,
      formatType: defaultValue,
      available: defaultValue,
      guildId: defaultValue,
      user: defaultValue,
      sortValue: defaultValue,
      ...desiredProperties.sticker,
    },
    user: {
      username: defaultValue,
      globalName: defaultValue,
      locale: defaultValue,
      flags: defaultValue,
      premiumType: defaultValue,
      publicFlags: defaultValue,
      accentColor: defaultValue,
      id: defaultValue,
      discriminator: defaultValue,
      avatar: defaultValue,
      email: defaultValue,
      banner: defaultValue,
      avatarDecorationData: defaultValue,
      toggles: defaultValue,
      ...desiredProperties.user,
    },
    avatarDecorationData: {
      asset: defaultValue,
      skuId: defaultValue,
      ...desiredProperties.avatarDecorationData,
    },
    webhook: {
      id: defaultValue,
      type: defaultValue,
      guildId: defaultValue,
      channelId: defaultValue,
      user: defaultValue,
      name: defaultValue,
      avatar: defaultValue,
      token: defaultValue,
      applicationId: defaultValue,
      sourceGuild: defaultValue,
      sourceChannel: defaultValue,
      url: defaultValue,
      ...desiredProperties.webhook,
    },
    guildOnboarding: {
      defaultChannelIds: defaultValue,
      enabled: defaultValue,
      guildId: defaultValue,
      mode: defaultValue,
      prompts: defaultValue,
      ...desiredProperties.guildOnboarding,
    },
    guildOnboardingPrompt: {
      id: defaultValue,
      inOnboarding: defaultValue,
      options: defaultValue,
      required: defaultValue,
      singleSelect: defaultValue,
      title: defaultValue,
      type: defaultValue,
      ...desiredProperties.guildOnboardingPrompt,
    },
    guildOnboardingPromptOption: {
      channelIds: defaultValue,
      description: defaultValue,
      emoji: defaultValue,
      id: defaultValue,
      roleIds: defaultValue,
      title: defaultValue,
      ...desiredProperties.guildOnboardingPromptOption,
    },
    entitlement: {
      id: defaultValue,
      skuId: defaultValue,
      userId: defaultValue,
      guildId: defaultValue,
      applicationId: defaultValue,
      type: defaultValue,
      deleted: defaultValue,
      startsAt: defaultValue,
      endsAt: defaultValue,
      consumed: defaultValue,
      ...desiredProperties.entitlement,
    },
    sku: {
      id: defaultValue,
      type: defaultValue,
      applicationId: defaultValue,
      name: defaultValue,
      slug: defaultValue,
      flags: defaultValue,
      ...desiredProperties.sku,
    },
    voiceState: {
      requestToSpeakTimestamp: defaultValue,
      channelId: defaultValue,
      guildId: defaultValue,
      toggles: defaultValue,
      sessionId: defaultValue,
      userId: defaultValue,
      ...desiredProperties.voiceState,
    },
    poll: {
      question: defaultValue,
      answers: defaultValue,
      expiry: defaultValue,
      layoutType: defaultValue,
      allowMultiselect: defaultValue,
      results: defaultValue,
      ...desiredProperties.poll,
    },
    pollAnswer: {
      answerId: defaultValue,
      pollMedia: defaultValue,
      ...desiredProperties.pollAnswer,
    },
    pollResult: {
      isFinalized: defaultValue,
      answerCounts: defaultValue,
      ...desiredProperties.pollResult,
    },
    pollAnswerCount: {
      id: defaultValue,
      count: defaultValue,
      meVoted: defaultValue,
      ...desiredProperties.pollAnswerCount,
    },
    pollMedia: {
      text: defaultValue,
      emoji: defaultValue,
      ...desiredProperties.pollMedia,
    },
  }
}
