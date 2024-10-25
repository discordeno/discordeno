import type {
  AllowedMentions,
  BigString,
  CreateApplicationCommand,
  DiscordActivity,
  DiscordActivityInstance,
  DiscordActivityLocation,
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
  DiscordInteractionDataResolved,
  DiscordInteractionResource,
  DiscordInviteCreate,
  DiscordInviteMetadata,
  DiscordInviteStageInstance,
  DiscordMember,
  DiscordMessage,
  DiscordMessageCall,
  DiscordMessageComponent,
  DiscordMessageInteractionMetadata,
  DiscordMessageSnapshot,
  DiscordPoll,
  DiscordPollMedia,
  DiscordPresenceUpdate,
  DiscordRole,
  DiscordScheduledEvent,
  DiscordScheduledEventRecurrenceRule,
  DiscordSku,
  DiscordSoundboardSound,
  DiscordStageInstance,
  DiscordSticker,
  DiscordStickerPack,
  DiscordSubscription,
  DiscordTeam,
  DiscordTemplate,
  DiscordThreadMember,
  DiscordThreadMemberGuildCreate,
  DiscordUser,
  DiscordVoiceRegion,
  DiscordVoiceState,
  DiscordWebhook,
  DiscordWelcomeScreen,
  RecursivePartial,
} from '@discordeno/types'
import { logger } from '@discordeno/utils'
import type { Bot } from './bot.js'
import { type TransformersDesiredProperties, createDesiredPropertiesObject } from './desiredProprieties.js'
import {
  type Activity,
  type ActivityInstance,
  type ActivityLocation,
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
  type SoundboardSound,
  type StageInstance,
  type Sticker,
  type StickerPack,
  type Subscription,
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
  transformActivityInstance,
  transformActivityLocation,
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
  transformSoundboardSound,
  transformStageInstance,
  transformSticker,
  transformStickerPack,
  transformSubscription,
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
} from './transformers/reverse/index.js'
import { bigintToSnowflake, snowflakeToBigint } from './utils.js'

export interface Transformers {
  customizers: {
    activity: (bot: Bot, payload: DiscordActivity, activity: Activity) => any
    activityInstance: (bot: Bot, payload: DiscordActivityInstance, activityInstance: ActivityInstance) => any
    activityLocation: (bot: Bot, payload: DiscordActivityLocation, activityLocation: ActivityLocation) => any
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
    component: (bot: Bot, payload: DiscordMessageComponent, component: Component) => any
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
    soundboardSound: (bot: Bot, payload: DiscordSoundboardSound, soundboardSound: SoundboardSound) => any
    stageInstance: (bot: Bot, payload: DiscordStageInstance, stageInstance: StageInstance) => any
    sticker: (bot: Bot, payload: DiscordSticker, sticker: Sticker) => any
    stickerPack: (bot: Bot, payload: DiscordStickerPack, stickerPack: StickerPack) => any
    subscription: (bot: Bot, payload: DiscordSubscription, subscription: Subscription) => any
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
    component: (bot: Bot, payload: Component) => DiscordMessageComponent
    createApplicationCommand: (bot: Bot, payload: CreateApplicationCommand) => DiscordCreateApplicationCommand
    embed: (bot: Bot, payload: Embed) => DiscordEmbed
    member: (bot: Bot, payload: Member) => DiscordMember
    snowflake: (snowflake: BigString) => string
    team: (bot: Bot, payload: Team) => DiscordTeam
    user: (bot: Bot, payload: User) => DiscordUser
  }
  activity: (bot: Bot, payload: DiscordActivity) => Activity
  activityInstance: (bot: Bot, payload: DiscordActivityInstance) => ActivityInstance
  activityLocation: (bot: Bot, payload: DiscordActivityLocation) => ActivityLocation
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
  component: (bot: Bot, payload: DiscordMessageComponent) => Component
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
  soundboardSound: (bot: Bot, payload: DiscordSoundboardSound) => SoundboardSound
  snowflake: (snowflake: BigString) => bigint
  stageInstance: (bot: Bot, payload: DiscordStageInstance) => StageInstance
  sticker: (bot: Bot, payload: DiscordSticker) => Sticker
  stickerPack: (bot: Bot, payload: DiscordStickerPack) => StickerPack
  subscription: (bot: Bot, payload: DiscordSubscription) => Subscription
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
      activityInstance: options.customizers?.activityInstance ?? defaultCustomizer,
      activityLocation: options.customizers?.activityLocation ?? defaultCustomizer,
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
      soundboardSound: options.customizers?.soundboardSound ?? defaultCustomizer,
      stageInstance: options.customizers?.stageInstance ?? defaultCustomizer,
      sticker: options.customizers?.sticker ?? defaultCustomizer,
      stickerPack: options.customizers?.stickerPack ?? defaultCustomizer,
      subscription: options.customizers?.subscription ?? defaultCustomizer,
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
      member: options.reverse?.member ?? transformMemberToDiscordMember,
      snowflake: options.reverse?.snowflake ?? bigintToSnowflake,
      team: options.reverse?.team ?? transformTeamToDiscordTeam,
      user: options.reverse?.user ?? transformUserToDiscordUser,
    },
    activity: options.activity ?? transformActivity,
    activityInstance: options.activityInstance ?? transformActivityInstance,
    activityLocation: options.activityLocation ?? transformActivityLocation,
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
    soundboardSound: options.soundboardSound ?? transformSoundboardSound,
    snowflake: options.snowflake ?? snowflakeToBigint,
    stageInstance: options.stageInstance ?? transformStageInstance,
    sticker: options.sticker ?? transformSticker,
    stickerPack: options.stickerPack ?? transformStickerPack,
    subscription: options.subscription ?? transformSubscription,
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
