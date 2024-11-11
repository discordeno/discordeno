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
import type { Bot } from './bot.js'
import { type DesiredPropertiesBehavior, type TransformersDesiredProperties, createDesiredPropertiesObject } from './desiredProperties.js'
import {
  type Activity,
  type Application,
  type ApplicationCommand,
  type ApplicationCommandOption,
  type ApplicationCommandOptionChoice,
  type AuditLogEntry,
  type AutoModerationActionExecution,
  type AutoModerationRule,
  type Component,
  type Embed,
  type GetGatewayBot,
  type GuildApplicationCommandPermissions,
  type GuildOnboardingPromptOption,
  type GuildWidget,
  type GuildWidgetSettings,
  type Integration,
  type InteractionDataOption,
  type InteractionDataResolved,
  type PresenceUpdate,
  type StickerPack,
  type Team,
  type Template,
  type ThreadMember,
  type ThreadMemberGuildCreate,
  type VoiceRegion,
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

export interface Transformers<
  TProps extends TransformersDesiredProperties,
  TBehavior extends DesiredPropertiesBehavior,
  // This is just an alias, not an actual parameter
  TBot extends Bot<TProps, TBehavior> = Bot<TProps, TBehavior>,
> {
  customizers: {
    activity: (bot: TBot, payload: DiscordActivity, activity: Activity) => any
    activityInstance: (
      bot: TBot,
      payload: DiscordActivityInstance,
      activityInstance: TBot['transformers']['$inferredTypes']['activityInstance'],
    ) => any
    activityLocation: (
      bot: TBot,
      payload: DiscordActivityLocation,
      activityLocation: TBot['transformers']['$inferredTypes']['activityLocation'],
    ) => any
    application: (bot: TBot, payload: DiscordApplication, application: Application) => any
    applicationCommand: (bot: TBot, payload: DiscordApplicationCommand, applicationCommand: ApplicationCommand) => any
    applicationCommandOption: (bot: TBot, payload: DiscordApplicationCommandOption, applicationCommandOption: ApplicationCommandOption) => any
    applicationCommandOptionChoice: (
      bot: TBot,
      payload: DiscordApplicationCommandOptionChoice,
      applicationCommandOptionChoice: ApplicationCommandOptionChoice,
    ) => any
    applicationCommandPermission: (
      bot: TBot,
      payload: DiscordGuildApplicationCommandPermissions,
      applicationCommandPermission: GuildApplicationCommandPermissions,
    ) => any
    attachment: (bot: TBot, payload: DiscordAttachment, attachment: TBot['transformers']['$inferredTypes']['attachment']) => any
    auditLogEntry: (bot: TBot, payload: DiscordAuditLogEntry, auditLogEntry: AuditLogEntry) => any
    automodActionExecution: (bot: TBot, payload: DiscordAutoModerationActionExecution, automodActionExecution: AutoModerationActionExecution) => any
    automodRule: (bot: TBot, payload: DiscordAutoModerationRule, automodRule: AutoModerationRule) => any
    avatarDecorationData: (
      bot: TBot,
      payload: DiscordAvatarDecorationData,
      avatarDecorationData: TBot['transformers']['$inferredTypes']['avatarDecorationData'],
    ) => any
    channel: (bot: TBot, payload: DiscordChannel, channel: TBot['transformers']['$inferredTypes']['channel']) => any
    component: (bot: TBot, payload: DiscordMessageComponent, component: Component) => any
    defaultReactionEmoji: (
      bot: TBot,
      payload: DiscordDefaultReactionEmoji,
      defaultReactionEmoji: TBot['transformers']['$inferredTypes']['defaultReactionEmoji'],
    ) => any
    embed: (bot: TBot, payload: DiscordEmbed, embed: Embed) => any
    emoji: (bot: TBot, payload: DiscordEmoji, emoji: TBot['transformers']['$inferredTypes']['emoji']) => any
    entitlement: (bot: TBot, payload: DiscordEntitlement, entitlement: TBot['transformers']['$inferredTypes']['entitlement']) => any
    forumTag: (bot: TBot, payload: DiscordForumTag, forumTag: TBot['transformers']['$inferredTypes']['forumTag']) => any
    gatewayBot: (bot: TBot, payload: DiscordGetGatewayBot, getGatewayBot: GetGatewayBot) => any
    guild: (bot: TBot, payload: DiscordGuild, guild: TBot['transformers']['$inferredTypes']['guild']) => any
    guildOnboarding: (bot: TBot, payload: DiscordGuildOnboarding, onboarding: TBot['transformers']['$inferredTypes']['guildOnboarding']) => any
    guildOnboardingPrompt: (
      bot: TBot,
      payload: DiscordGuildOnboardingPrompt,
      onboardingPrompt: TBot['transformers']['$inferredTypes']['guildOnboardingPrompt'],
    ) => any
    guildOnboardingPromptOption: (bot: TBot, payload: DiscordGuildOnboardingPromptOption, onboardingPromptOption: GuildOnboardingPromptOption) => any
    integration: (bot: TBot, payload: DiscordIntegrationCreateUpdate, integration: Integration) => any
    interaction: (
      bot: TBot,
      payload: { interaction: DiscordInteraction; shardId: number },
      interaction: TBot['transformers']['$inferredTypes']['interaction'],
    ) => any
    interactionCallback: (
      bot: TBot,
      payload: DiscordInteractionCallback,
      interactionCallback: TBot['transformers']['$inferredTypes']['interactionCallback'],
    ) => any
    interactionCallbackResponse: (
      bot: TBot,
      payload: DiscordInteractionCallbackResponse,
      interactionCallbackResponse: TBot['transformers']['$inferredTypes']['interactionCallbackResponse'],
    ) => any
    interactionDataOptions: (bot: TBot, payload: DiscordInteractionDataOption, interactionDataOptions: InteractionDataOption) => any
    interactionDataResolved: (
      bot: TBot,
      payload: { resolved: DiscordInteractionDataResolved; guildId?: bigint },
      interactionDataResolved: InteractionDataResolved,
    ) => any
    interactionResource: (
      bot: TBot,
      payload: DiscordInteractionResource,
      interactionResource: TBot['transformers']['$inferredTypes']['interactionResource'],
    ) => any
    invite: (bot: TBot, payload: DiscordInviteCreate | DiscordInviteMetadata, invite: TBot['transformers']['$inferredTypes']['invite']) => any
    inviteStageInstance: (
      bot: TBot,
      payload: DiscordInviteStageInstance,
      inviteStageInstance: TBot['transformers']['$inferredTypes']['inviteStageInstance'],
    ) => any
    member: (bot: TBot, payload: DiscordMember, member: TBot['transformers']['$inferredTypes']['member']) => any
    message: (bot: TBot, payload: DiscordMessage, message: TBot['transformers']['$inferredTypes']['message']) => any
    messageCall: (bot: TBot, payload: DiscordMessageCall, call: TBot['transformers']['$inferredTypes']['messageCall']) => any
    messageInteractionMetadata: (
      bot: TBot,
      payload: DiscordMessageInteractionMetadata,
      metadata: TBot['transformers']['$inferredTypes']['messageInteractionMetadata'],
    ) => any
    messageSnapshot: (bot: TBot, payload: DiscordMessageSnapshot, messageSnapshot: TBot['transformers']['$inferredTypes']['messageSnapshot']) => any
    poll: (bot: TBot, payload: DiscordPoll, poll: TBot['transformers']['$inferredTypes']['poll']) => any
    pollMedia: (bot: TBot, payload: DiscordPollMedia, pollMedia: TBot['transformers']['$inferredTypes']['pollMedia']) => any
    presence: (bot: TBot, payload: DiscordPresenceUpdate, presence: PresenceUpdate) => any
    role: (bot: TBot, payload: DiscordRole, role: TBot['transformers']['$inferredTypes']['role']) => any
    scheduledEvent: (bot: TBot, payload: DiscordScheduledEvent, scheduledEvent: TBot['transformers']['$inferredTypes']['scheduledEvent']) => any
    scheduledEventRecurrenceRule: (
      bot: TBot,
      payload: DiscordScheduledEventRecurrenceRule,
      scheduledEvent: TBot['transformers']['$inferredTypes']['scheduledEventRecurrenceRule'],
    ) => any
    sku: (bot: TBot, payload: DiscordSku, sku: TBot['transformers']['$inferredTypes']['sku']) => any
    soundboardSound: (bot: TBot, payload: DiscordSoundboardSound, soundboardSound: TBot['transformers']['$inferredTypes']['soundboardSound']) => any
    stageInstance: (bot: TBot, payload: DiscordStageInstance, stageInstance: TBot['transformers']['$inferredTypes']['stageInstance']) => any
    sticker: (bot: TBot, payload: DiscordSticker, sticker: TBot['transformers']['$inferredTypes']['sticker']) => any
    stickerPack: (bot: TBot, payload: DiscordStickerPack, stickerPack: StickerPack) => any
    subscription: (bot: TBot, payload: DiscordSubscription, subscription: TBot['transformers']['$inferredTypes']['subscription']) => any
    team: (bot: TBot, payload: DiscordTeam, team: Team) => any
    template: (bot: TBot, payload: DiscordTemplate, template: Template) => any
    threadMember: (bot: TBot, payload: DiscordThreadMember, threadMember: ThreadMember) => any
    threadMemberGuildCreate: (bot: TBot, payload: DiscordThreadMemberGuildCreate, threadMemberGuildCreate: ThreadMemberGuildCreate) => any
    user: (bot: TBot, payload: DiscordUser, user: TBot['transformers']['$inferredTypes']['user']) => any
    voiceRegion: (bot: TBot, payload: DiscordVoiceRegion, voiceRegion: VoiceRegion) => any
    voiceState: (bot: TBot, payload: DiscordVoiceState, voiceState: TBot['transformers']['$inferredTypes']['voiceState']) => any
    webhook: (bot: TBot, payload: DiscordWebhook, webhook: TBot['transformers']['$inferredTypes']['webhook']) => any
    welcomeScreen: (bot: TBot, payload: DiscordWelcomeScreen, welcomeScreen: WelcomeScreen) => any
    widget: (bot: TBot, payload: DiscordGuildWidget, widget: GuildWidget) => any
    widgetSettings: (bot: TBot, payload: DiscordGuildWidgetSettings, widgetSettings: GuildWidgetSettings) => any
  }
  desiredProperties: TransformersDesiredProperties
  reverse: {
    activity: (bot: TBot, payload: Activity) => DiscordActivity
    allowedMentions: (bot: TBot, payload: AllowedMentions) => DiscordAllowedMentions
    application: (bot: TBot, payload: Application) => DiscordApplication
    applicationCommand: (bot: TBot, payload: ApplicationCommand) => DiscordApplicationCommand
    applicationCommandOption: (bot: TBot, payload: ApplicationCommandOption) => DiscordApplicationCommandOption
    applicationCommandOptionChoice: (bot: TBot, payload: ApplicationCommandOptionChoice) => DiscordApplicationCommandOptionChoice
    attachment: (bot: TBot, payload: TBot['transformers']['$inferredTypes']['attachment']) => DiscordAttachment
    component: (bot: TBot, payload: Component) => DiscordMessageComponent
    createApplicationCommand: (bot: TBot, payload: CreateApplicationCommand) => DiscordCreateApplicationCommand
    embed: (bot: TBot, payload: Embed) => DiscordEmbed
    member: (bot: TBot, payload: TBot['transformers']['$inferredTypes']['member']) => DiscordMember
    snowflake: (snowflake: BigString) => string
    team: (bot: TBot, payload: Team) => DiscordTeam
    user: (bot: TBot, payload: TBot['transformers']['$inferredTypes']['user']) => DiscordUser
  }
  activity: (bot: TBot, payload: DiscordActivity) => Activity
  activityInstance: (bot: TBot, payload: DiscordActivityInstance) => TBot['transformers']['$inferredTypes']['activityInstance']
  activityLocation: (bot: TBot, payload: DiscordActivityLocation) => TBot['transformers']['$inferredTypes']['activityLocation']
  application: (bot: TBot, payload: { application: DiscordApplication; shardId: number }) => Application
  applicationCommand: (bot: TBot, payload: DiscordApplicationCommand) => ApplicationCommand
  applicationCommandOption: (bot: TBot, payload: DiscordApplicationCommandOption) => ApplicationCommandOption
  applicationCommandOptionChoice: (bot: TBot, payload: DiscordApplicationCommandOptionChoice) => ApplicationCommandOptionChoice
  applicationCommandPermission: (bot: TBot, payload: DiscordGuildApplicationCommandPermissions) => GuildApplicationCommandPermissions
  attachment: (bot: TBot, payload: DiscordAttachment) => TBot['transformers']['$inferredTypes']['attachment']
  auditLogEntry: (bot: TBot, payload: DiscordAuditLogEntry) => AuditLogEntry
  automodActionExecution: (bot: TBot, payload: DiscordAutoModerationActionExecution) => AutoModerationActionExecution
  automodRule: (bot: TBot, payload: DiscordAutoModerationRule) => AutoModerationRule
  avatarDecorationData: (bot: TBot, payload: DiscordAvatarDecorationData) => TBot['transformers']['$inferredTypes']['avatarDecorationData']
  channel: (bot: TBot, payload: { channel: DiscordChannel; guildId?: BigString }) => TBot['transformers']['$inferredTypes']['channel']
  component: (bot: TBot, payload: DiscordMessageComponent) => Component
  defaultReactionEmoji: (bot: TBot, payload: DiscordDefaultReactionEmoji) => TBot['transformers']['$inferredTypes']['defaultReactionEmoji']
  embed: (bot: TBot, payload: DiscordEmbed) => Embed
  emoji: (bot: TBot, payload: DiscordEmoji) => TBot['transformers']['$inferredTypes']['emoji']
  entitlement: (bot: TBot, payload: DiscordEntitlement) => TBot['transformers']['$inferredTypes']['entitlement']
  forumTag: (bot: TBot, payload: DiscordForumTag) => TBot['transformers']['$inferredTypes']['forumTag']
  gatewayBot: (bot: TBot, payload: DiscordGetGatewayBot) => GetGatewayBot
  guild: (bot: TBot, payload: { guild: DiscordGuild; shardId: number }) => TBot['transformers']['$inferredTypes']['guild']
  guildOnboarding: (bot: TBot, payload: DiscordGuildOnboarding) => TBot['transformers']['$inferredTypes']['guildOnboarding']
  guildOnboardingPrompt: (bot: TBot, payload: DiscordGuildOnboardingPrompt) => TBot['transformers']['$inferredTypes']['guildOnboardingPrompt']
  guildOnboardingPromptOption: (bot: TBot, payload: DiscordGuildOnboardingPromptOption) => GuildOnboardingPromptOption
  integration: (bot: TBot, payload: DiscordIntegrationCreateUpdate) => Integration
  interaction: (bot: TBot, payload: { interaction: DiscordInteraction; shardId: number }) => TBot['transformers']['$inferredTypes']['interaction']
  interactionCallback: (bot: TBot, payload: DiscordInteractionCallback) => TBot['transformers']['$inferredTypes']['interactionCallback']
  interactionCallbackResponse: (
    bot: TBot,
    payload: { interactionCallbackResponse: DiscordInteractionCallbackResponse; shardId: number },
  ) => TBot['transformers']['$inferredTypes']['interactionCallbackResponse']
  interactionDataOptions: (bot: TBot, payload: DiscordInteractionDataOption) => InteractionDataOption
  interactionDataResolved: (
    bot: TBot,
    payload: { resolved: DiscordInteractionDataResolved; shardId: number; guildId?: bigint },
  ) => InteractionDataResolved
  interactionResource: (
    bot: TBot,
    payload: { interactionResource: DiscordInteractionResource; shardId: number },
  ) => TBot['transformers']['$inferredTypes']['interactionResource']
  invite: (
    bot: TBot,
    payload: { invite: DiscordInviteCreate | DiscordInviteMetadata; shardId: number },
  ) => TBot['transformers']['$inferredTypes']['invite']
  inviteStageInstance: (
    bot: TBot,
    payload: DiscordInviteStageInstance & { guildId: BigString },
  ) => TBot['transformers']['$inferredTypes']['inviteStageInstance']
  member: (bot: TBot, payload: DiscordMember, guildId: BigString, userId: BigString) => TBot['transformers']['$inferredTypes']['member']
  message: (bot: TBot, payload: { message: DiscordMessage; shardId: number }) => TBot['transformers']['$inferredTypes']['message']
  messageCall: (bot: TBot, payload: DiscordMessageCall) => TBot['transformers']['$inferredTypes']['messageCall']
  messageInteractionMetadata: (
    bot: TBot,
    payload: DiscordMessageInteractionMetadata,
  ) => TBot['transformers']['$inferredTypes']['messageInteractionMetadata']
  messageSnapshot: (
    bot: TBot,
    payload: { messageSnapshot: DiscordMessageSnapshot; shardId: number },
  ) => TBot['transformers']['$inferredTypes']['messageSnapshot']
  poll: (bot: TBot, payload: DiscordPoll) => TBot['transformers']['$inferredTypes']['poll']
  pollMedia: (bot: TBot, payload: DiscordPollMedia) => TBot['transformers']['$inferredTypes']['pollMedia']
  presence: (bot: TBot, payload: DiscordPresenceUpdate) => PresenceUpdate
  role: (bot: TBot, payload: { role: DiscordRole; guildId: BigString }) => TBot['transformers']['$inferredTypes']['role']
  scheduledEvent: (bot: TBot, payload: DiscordScheduledEvent) => TBot['transformers']['$inferredTypes']['scheduledEvent']
  scheduledEventRecurrenceRule: (
    bot: TBot,
    payload: DiscordScheduledEventRecurrenceRule,
  ) => TBot['transformers']['$inferredTypes']['scheduledEventRecurrenceRule']
  sku: (bot: TBot, payload: DiscordSku) => TBot['transformers']['$inferredTypes']['sku']
  soundboardSound: (bot: TBot, payload: DiscordSoundboardSound) => TBot['transformers']['$inferredTypes']['soundboardSound']
  snowflake: (snowflake: BigString) => bigint
  stageInstance: (bot: TBot, payload: DiscordStageInstance) => TBot['transformers']['$inferredTypes']['stageInstance']
  sticker: (bot: TBot, payload: DiscordSticker) => TBot['transformers']['$inferredTypes']['sticker']
  stickerPack: (bot: TBot, payload: DiscordStickerPack) => StickerPack
  subscription: (bot: TBot, payload: DiscordSubscription) => TBot['transformers']['$inferredTypes']['subscription']
  team: (bot: TBot, payload: DiscordTeam) => Team
  template: (bot: TBot, payload: DiscordTemplate) => Template
  threadMember: (bot: TBot, payload: DiscordThreadMember) => ThreadMember
  threadMemberGuildCreate: (bot: TBot, payload: DiscordThreadMemberGuildCreate) => ThreadMemberGuildCreate
  user: (bot: TBot, payload: DiscordUser) => TBot['transformers']['$inferredTypes']['user']
  voiceRegion: (bot: TBot, payload: DiscordVoiceRegion) => VoiceRegion
  voiceState: (bot: TBot, payload: { voiceState: DiscordVoiceState; guildId: BigString }) => TBot['transformers']['$inferredTypes']['voiceState']
  webhook: (bot: TBot, payload: DiscordWebhook) => TBot['transformers']['$inferredTypes']['webhook']
  welcomeScreen: (bot: TBot, payload: DiscordWelcomeScreen) => WelcomeScreen
  widget: (bot: TBot, payload: DiscordGuildWidget) => GuildWidget
  widgetSettings: (bot: TBot, payload: DiscordGuildWidgetSettings) => GuildWidgetSettings
}

const defaultCustomizer = (_bot: unknown, _payload: unknown, structure: unknown) => structure

export function createTransformers<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior>(
  options: RecursivePartial<Transformers<TProps, TBehavior>>,
): Transformers<TProps, TBehavior> {
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
    desiredProperties: createDesiredPropertiesObject(options.desiredProperties ?? {}),
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
  } as Transformers<TProps, TBehavior>
}
