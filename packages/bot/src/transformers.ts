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
  DiscordGuildWidget,
  DiscordGuildWidgetSettings,
  DiscordIntegrationCreateUpdate,
  DiscordInteraction,
  DiscordInteractionDataOption,
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
  type GuildWidget,
  type GuildWidgetSettings,
  type Integration,
  type Interaction,
  type InteractionDataOption,
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
  transformIntegration,
  transformInteraction,
  transformInteractionDataOption,
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
import type { BotInteractionResponse, DiscordComponent, DiscordInteractionResponse, DiscordThreadMemberGuildCreate } from './typings.js'
import { bigintToSnowflake, snowflakeToBigint } from './utils.js'

export interface Transformers {
  customizers: {
    channel: (bot: Bot, payload: DiscordChannel, channel: Channel) => any
    forumTag: (bot: Bot, payload: DiscordForumTag, forumTag: ForumTag) => any
    interaction: (bot: Bot, payload: { interaction: DiscordInteraction; shardId: number }, interaction: Interaction) => any
    message: (bot: Bot, payload: DiscordMessage, message: Message) => any
    messageSnapshot: (bot: Bot, payload: DiscordMessageSnapshot, messageSnapshot: MessageSnapshot) => any
    messageInteractionMetadata: (bot: Bot, payload: DiscordMessageInteractionMetadata, metadata: MessageInteractionMetadata) => any
    messageCall: (bot: Bot, payload: DiscordMessageCall, call: MessageCall) => any
    user: (bot: Bot, payload: DiscordUser, user: User) => any
    member: (bot: Bot, payload: DiscordMember, member: Member) => any
    role: (bot: Bot, payload: DiscordRole, role: Role) => any
    automodRule: (bot: Bot, payload: DiscordAutoModerationRule, automodRule: AutoModerationRule) => any
    automodActionExecution: (bot: Bot, payload: DiscordAutoModerationActionExecution, automodActionExecution: AutoModerationActionExecution) => any
    guild: (bot: Bot, payload: DiscordGuild, guild: Guild) => any
    voiceState: (bot: Bot, payload: DiscordVoiceState, voiceState: VoiceState) => any
    interactionDataOptions: (bot: Bot, payload: DiscordInteractionDataOption, interactionDataOptions: InteractionDataOption) => any
    integration: (bot: Bot, payload: DiscordIntegrationCreateUpdate, integration: Integration) => any
    invite: (bot: Bot, payload: DiscordInviteCreate | DiscordInviteMetadata, invite: Invite) => any
    application: (bot: Bot, payload: DiscordApplication, application: Application) => any
    team: (bot: Bot, payload: DiscordTeam, team: Team) => any
    emoji: (bot: Bot, payload: DiscordEmoji, emoji: Emoji) => any
    defaultReactionEmoji: (bot: Bot, payload: DiscordDefaultReactionEmoji, defaultReactionEmoji: DefaultReactionEmoji) => any
    activity: (bot: Bot, payload: DiscordActivity, activity: Activity) => any
    presence: (bot: Bot, payload: DiscordPresenceUpdate, presence: PresenceUpdate) => any
    attachment: (bot: Bot, payload: DiscordAttachment, attachment: Attachment) => any
    embed: (bot: Bot, payload: DiscordEmbed, embed: Embed) => any
    component: (bot: Bot, payload: DiscordComponent, component: Component) => any
    webhook: (bot: Bot, payload: DiscordWebhook, webhook: Webhook) => any
    auditLogEntry: (bot: Bot, payload: DiscordAuditLogEntry, auditLogEntry: AuditLogEntry) => any
    applicationCommand: (bot: Bot, payload: DiscordApplicationCommand, applicationCommand: ApplicationCommand) => any
    applicationCommandOption: (bot: Bot, payload: DiscordApplicationCommandOption, applicationCommandOption: ApplicationCommandOption) => any
    applicationCommandPermission: (
      bot: Bot,
      payload: DiscordGuildApplicationCommandPermissions,
      applicationCommandPermission: GuildApplicationCommandPermissions,
    ) => any
    scheduledEvent: (bot: Bot, payload: DiscordScheduledEvent, scheduledEvent: ScheduledEvent) => any
    threadMember: (bot: Bot, payload: DiscordThreadMember, threadMember: ThreadMember) => any
    threadMemberGuildCreate: (bot: Bot, payload: DiscordThreadMemberGuildCreate, threadMemberGuildCreate: ThreadMemberGuildCreate) => any
    welcomeScreen: (bot: Bot, payload: DiscordWelcomeScreen, welcomeScreen: WelcomeScreen) => any
    voiceRegion: (bot: Bot, payload: DiscordVoiceRegion, voiceRegion: VoiceRegion) => any
    gatewayBot: (bot: Bot, payload: DiscordGetGatewayBot, getGatewayBot: GetGatewayBot) => any
    widget: (bot: Bot, payload: DiscordGuildWidget, widget: GuildWidget) => any
    widgetSettings: (bot: Bot, payload: DiscordGuildWidgetSettings, widgetSettings: GuildWidgetSettings) => any
    stageInstance: (bot: Bot, payload: DiscordStageInstance, stageInstance: StageInstance) => any
    inviteStageInstance: (bot: Bot, payload: DiscordInviteStageInstance, inviteStageInstance: InviteStageInstance) => any
    sticker: (bot: Bot, payload: DiscordSticker, sticker: Sticker) => any
    stickerPack: (bot: Bot, payload: DiscordStickerPack, stickerPack: StickerPack) => any
    applicationCommandOptionChoice: (
      bot: Bot,
      payload: DiscordApplicationCommandOptionChoice,
      applicationCommandOptionChoice: ApplicationCommandOptionChoice,
    ) => any
    template: (bot: Bot, payload: DiscordTemplate, template: Template) => any
    guildOnboarding: (bot: Bot, payload: DiscordGuildOnboarding, onboarding: GuildOnboarding) => any
    entitlement: (bot: Bot, payload: DiscordEntitlement, entitlement: Entitlement) => any
    sku: (bot: Bot, payload: DiscordSku, sku: Sku) => any
    poll: (bot: Bot, payload: DiscordPoll, poll: Poll) => any
    pollMedia: (bot: Bot, payload: DiscordPollMedia, pollMedia: PollMedia) => any
    avatarDecorationData: (bot: Bot, payload: DiscordAvatarDecorationData, avatarDecorationData: AvatarDecorationData) => any
  }
  desiredProperties: TransformersDesiredProperties
  reverse: {
    allowedMentions: (bot: Bot, payload: AllowedMentions) => DiscordAllowedMentions
    embed: (bot: Bot, payload: Embed) => DiscordEmbed
    component: (bot: Bot, payload: Component) => DiscordComponent
    activity: (bot: Bot, payload: Activity) => DiscordActivity
    member: (bot: Bot, payload: Member) => DiscordMember
    user: (bot: Bot, payload: User) => DiscordUser
    team: (bot: Bot, payload: Team) => DiscordTeam
    application: (bot: Bot, payload: Application) => DiscordApplication
    snowflake: (snowflake: BigString) => string
    createApplicationCommand: (bot: Bot, payload: CreateApplicationCommand) => DiscordCreateApplicationCommand
    applicationCommand: (bot: Bot, payload: ApplicationCommand) => DiscordApplicationCommand
    applicationCommandOption: (bot: Bot, payload: ApplicationCommandOption) => DiscordApplicationCommandOption
    applicationCommandOptionChoice: (bot: Bot, payload: ApplicationCommandOptionChoice) => DiscordApplicationCommandOptionChoice
    interactionResponse: (bot: Bot, payload: BotInteractionResponse) => DiscordInteractionResponse
    attachment: (bot: Bot, payload: Attachment) => DiscordAttachment
  }
  snowflake: (snowflake: BigString) => bigint
  gatewayBot: (bot: Bot, payload: DiscordGetGatewayBot) => GetGatewayBot
  automodRule: (bot: Bot, payload: DiscordAutoModerationRule) => AutoModerationRule
  automodActionExecution: (bot: Bot, payload: DiscordAutoModerationActionExecution) => AutoModerationActionExecution
  channel: (bot: Bot, payload: { channel: DiscordChannel } & { guildId?: BigString }) => Channel
  forumTag: (bot: Bot, payload: DiscordForumTag) => ForumTag
  guild: (bot: Bot, payload: { guild: DiscordGuild } & { shardId: number }) => Guild
  user: (bot: Bot, payload: DiscordUser) => User
  member: (bot: Bot, payload: DiscordMember, guildId: BigString, userId: BigString) => Member
  message: (bot: Bot, payload: DiscordMessage) => Message
  messageSnapshot: (bot: Bot, payload: DiscordMessageSnapshot) => MessageSnapshot
  messageInteractionMetadata: (bot: Bot, payload: DiscordMessageInteractionMetadata) => MessageInteractionMetadata
  messageCall: (bot: Bot, payload: DiscordMessageCall) => MessageCall
  role: (bot: Bot, payload: { role: DiscordRole } & { guildId: BigString }) => Role
  voiceState: (bot: Bot, payload: { voiceState: DiscordVoiceState } & { guildId: bigint }) => VoiceState
  interaction: (bot: Bot, payload: { interaction: DiscordInteraction; shardId: number }) => Interaction
  interactionDataOptions: (bot: Bot, payload: DiscordInteractionDataOption) => InteractionDataOption
  integration: (bot: Bot, payload: DiscordIntegrationCreateUpdate) => Integration
  invite: (bot: Bot, payload: { invite: DiscordInviteCreate | DiscordInviteMetadata; shardId: number }) => Invite
  application: (bot: Bot, payload: { application: DiscordApplication; shardId: number }) => Application
  team: (bot: Bot, payload: DiscordTeam) => Team
  emoji: (bot: Bot, payload: DiscordEmoji) => Emoji
  defaultReactionEmoji: (bot: Bot, payload: DiscordDefaultReactionEmoji) => DefaultReactionEmoji
  activity: (bot: Bot, payload: DiscordActivity) => Activity
  presence: (bot: Bot, payload: DiscordPresenceUpdate) => PresenceUpdate
  attachment: (bot: Bot, payload: DiscordAttachment) => Attachment
  embed: (bot: Bot, payload: DiscordEmbed) => Embed
  component: (bot: Bot, payload: DiscordComponent) => Component
  webhook: (bot: Bot, payload: DiscordWebhook) => Webhook
  auditLogEntry: (bot: Bot, payload: DiscordAuditLogEntry) => AuditLogEntry
  applicationCommand: (bot: Bot, payload: DiscordApplicationCommand) => ApplicationCommand
  applicationCommandOption: (bot: Bot, payload: DiscordApplicationCommandOption) => ApplicationCommandOption
  applicationCommandPermission: (bot: Bot, payload: DiscordGuildApplicationCommandPermissions) => GuildApplicationCommandPermissions
  scheduledEvent: (bot: Bot, payload: DiscordScheduledEvent) => ScheduledEvent
  threadMember: (bot: Bot, payload: DiscordThreadMember) => ThreadMember
  threadMemberGuildCreate: (bot: Bot, payload: DiscordThreadMemberGuildCreate) => ThreadMemberGuildCreate
  welcomeScreen: (bot: Bot, payload: DiscordWelcomeScreen) => WelcomeScreen
  voiceRegion: (bot: Bot, payload: DiscordVoiceRegion) => VoiceRegion
  widget: (bot: Bot, payload: DiscordGuildWidget) => GuildWidget
  widgetSettings: (bot: Bot, payload: DiscordGuildWidgetSettings) => GuildWidgetSettings
  stageInstance: (bot: Bot, payload: DiscordStageInstance) => StageInstance
  inviteStageInstance: (bot: Bot, payload: DiscordInviteStageInstance & { guildId: BigString }) => InviteStageInstance

  sticker: (bot: Bot, payload: DiscordSticker) => Sticker
  stickerPack: (bot: Bot, payload: DiscordStickerPack) => StickerPack
  applicationCommandOptionChoice: (bot: Bot, payload: DiscordApplicationCommandOptionChoice) => ApplicationCommandOptionChoice
  template: (bot: Bot, payload: DiscordTemplate) => Template
  guildOnboarding: (bot: Bot, payload: DiscordGuildOnboarding) => GuildOnboarding
  entitlement: (bot: Bot, payload: DiscordEntitlement) => Entitlement
  sku: (bot: Bot, payload: DiscordSku) => Sku
  poll: (bot: Bot, payload: DiscordPoll) => Poll
  pollMedia: (bot: Bot, payload: DiscordPollMedia) => PollMedia
  avatarDecorationData: (bot: Bot, payload: DiscordAvatarDecorationData) => AvatarDecorationData
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
      channel: options.customizers?.channel ?? defaultCustomizer,
      forumTag: options.customizers?.forumTag ?? defaultCustomizer,
      interaction: options.customizers?.interaction ?? defaultCustomizer,
      member: options.customizers?.member ?? defaultCustomizer,
      message: options.customizers?.message ?? defaultCustomizer,
      messageSnapshot: options.customizers?.messageSnapshot ?? defaultCustomizer,
      messageInteractionMetadata: options.customizers?.messageInteractionMetadata ?? defaultCustomizer,
      messageCall: options.customizers?.messageCall ?? defaultCustomizer,
      role: options.customizers?.role ?? defaultCustomizer,
      user: options.customizers?.user ?? defaultCustomizer,
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
      component: options.customizers?.component ?? defaultCustomizer,
      embed: options.customizers?.embed ?? defaultCustomizer,
      emoji: options.customizers?.emoji ?? defaultCustomizer,
      defaultReactionEmoji: options.customizers?.defaultReactionEmoji ?? defaultCustomizer,
      guild: options.customizers?.guild ?? defaultCustomizer,
      integration: options.customizers?.integration ?? defaultCustomizer,
      interactionDataOptions: options.customizers?.interactionDataOptions ?? defaultCustomizer,
      invite: options.customizers?.invite ?? defaultCustomizer,
      presence: options.customizers?.presence ?? defaultCustomizer,
      scheduledEvent: options.customizers?.scheduledEvent ?? defaultCustomizer,
      stageInstance: options.customizers?.stageInstance ?? defaultCustomizer,
      inviteStageInstance: options.customizers?.inviteStageInstance ?? defaultCustomizer,
      sticker: options.customizers?.sticker ?? defaultCustomizer,
      stickerPack: options.customizers?.stickerPack ?? defaultCustomizer,
      team: options.customizers?.team ?? defaultCustomizer,
      template: options.customizers?.template ?? defaultCustomizer,
      threadMember: options.customizers?.threadMember ?? defaultCustomizer,
      threadMemberGuildCreate: options.customizers?.threadMemberGuildCreate ?? defaultCustomizer,
      voiceRegion: options.customizers?.voiceRegion ?? defaultCustomizer,
      voiceState: options.customizers?.voiceState ?? defaultCustomizer,
      gatewayBot: options.customizers?.gatewayBot ?? defaultCustomizer,
      webhook: options.customizers?.webhook ?? defaultCustomizer,
      welcomeScreen: options.customizers?.welcomeScreen ?? defaultCustomizer,
      widget: options.customizers?.widget ?? defaultCustomizer,
      widgetSettings: options.customizers?.widgetSettings ?? defaultCustomizer,
      guildOnboarding: options.customizers?.guildOnboarding ?? defaultCustomizer,
      entitlement: options.customizers?.entitlement ?? defaultCustomizer,
      sku: options.customizers?.sku ?? defaultCustomizer,
      poll: options.customizers?.poll ?? defaultCustomizer,
      pollMedia: options.customizers?.pollMedia ?? defaultCustomizer,
      avatarDecorationData: options.customizers?.avatarDecorationData ?? defaultCustomizer,
    },
    desiredProperties: createDesiredPropertiesObject(options.desiredProperties ?? {}, opts?.defaultDesiredPropertiesValue ?? false),
    reverse: {
      allowedMentions: options.reverse?.allowedMentions ?? transformAllowedMentionsToDiscordAllowedMentions,
      embed: options.reverse?.embed ?? transformEmbedToDiscordEmbed,
      component: options.reverse?.component ?? transformComponentToDiscordComponent,
      activity: options.reverse?.activity ?? transformActivityToDiscordActivity,
      member: options.reverse?.member ?? transformMemberToDiscordMember,
      user: options.reverse?.user ?? transformUserToDiscordUser,
      team: options.reverse?.team ?? transformTeamToDiscordTeam,
      application: options.reverse?.application ?? transformApplicationToDiscordApplication,
      snowflake: options.reverse?.snowflake ?? bigintToSnowflake,
      createApplicationCommand: options.reverse?.createApplicationCommand ?? transformCreateApplicationCommandToDiscordCreateApplicationCommand,
      applicationCommand: options.reverse?.applicationCommand ?? transformApplicationCommandToDiscordApplicationCommand,
      applicationCommandOption: options.reverse?.applicationCommandOption ?? transformApplicationCommandOptionToDiscordApplicationCommandOption,
      applicationCommandOptionChoice:
        options.reverse?.applicationCommandOptionChoice ?? transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice,
      interactionResponse: options.reverse?.interactionResponse ?? transformInteractionResponseToDiscordInteractionResponse,
      attachment: options.reverse?.attachment ?? transformAttachmentToDiscordAttachment,
    },
    automodRule: options.automodRule ?? transformAutoModerationRule,
    automodActionExecution: options.automodActionExecution ?? transformAutoModerationActionExecution,
    activity: options.activity ?? transformActivity,
    application: options.application ?? transformApplication,
    attachment: options.attachment ?? transformAttachment,
    channel: options.channel ?? transformChannel,
    forumTag: options.forumTag ?? transformForumTag,
    component: options.component ?? transformComponent,
    embed: options.embed ?? transformEmbed,
    emoji: options.emoji ?? transformEmoji,
    defaultReactionEmoji: options.defaultReactionEmoji ?? transformDefaultReactionEmoji,
    guild: options.guild ?? transformGuild,
    integration: options.integration ?? transformIntegration,
    interaction: options.interaction ?? transformInteraction,
    interactionDataOptions: options.interactionDataOptions ?? transformInteractionDataOption,
    invite: options.invite ?? transformInvite,
    member: options.member ?? transformMember,
    message: options.message ?? transformMessage,
    messageSnapshot: options.messageSnapshot ?? transformMessageSnapshot,
    messageInteractionMetadata: options.messageInteractionMetadata ?? transformMessageInteractionMetadata,
    messageCall: options.messageCall ?? transformMessageCall,
    presence: options.presence ?? transformPresence,
    role: options.role ?? transformRole,
    user: options.user ?? transformUser,
    team: options.team ?? transformTeam,
    voiceState: options.voiceState ?? transformVoiceState,
    snowflake: options.snowflake ?? snowflakeToBigint,
    webhook: options.webhook ?? transformWebhook,
    auditLogEntry: options.auditLogEntry ?? transformAuditLogEntry,
    applicationCommand: options.applicationCommand ?? transformApplicationCommand,
    applicationCommandOption: options.applicationCommandOption ?? transformApplicationCommandOption,
    applicationCommandPermission: options.applicationCommandPermission ?? transformApplicationCommandPermission,
    scheduledEvent: options.scheduledEvent ?? transformScheduledEvent,
    threadMember: options.threadMember ?? transformThreadMember,
    threadMemberGuildCreate: options.threadMemberGuildCreate ?? transformThreadMemberGuildCreate,
    welcomeScreen: options.welcomeScreen ?? transformWelcomeScreen,
    voiceRegion: options.voiceRegion ?? transformVoiceRegion,
    widget: options.widget ?? transformWidget,
    widgetSettings: options.widgetSettings ?? transformWidgetSettings,
    stageInstance: options.stageInstance ?? transformStageInstance,
    inviteStageInstance: options.inviteStageInstance ?? transformInviteStageInstance,
    sticker: options.sticker ?? transformSticker,
    stickerPack: options.stickerPack ?? transformStickerPack,
    gatewayBot: options.gatewayBot ?? transformGatewayBot,
    applicationCommandOptionChoice: options.applicationCommandOptionChoice ?? transformApplicationCommandOptionChoice,
    template: options.template ?? transformTemplate,
    guildOnboarding: options.guildOnboarding ?? transformGuildOnboarding,
    entitlement: options.entitlement ?? transformEntitlement,
    sku: options.sku ?? transformSku,
    poll: options.poll ?? transformPoll,
    pollMedia: options.pollMedia ?? transformPollMedia,
    avatarDecorationData: options.avatarDecorationData ?? transformAvatarDecorationData,
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
      ...desiredProperties.scheduledEvent,
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
