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
import {
  type DesiredPropertiesBehavior,
  type SetupDesiredProps,
  type TransformersDesiredProperties,
  createDesiredPropertiesObject,
} from './desiredProperties.js'
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

export type Transformers<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior> = {
  customizers: {
    activity: (bot: Bot<TProps, TBehavior>, payload: DiscordActivity, activity: Activity) => any
    activityInstance: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordActivityInstance,
      activityInstance: SetupDesiredProps<ActivityInstance, TProps, TBehavior>,
    ) => any
    activityLocation: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordActivityLocation,
      activityLocation: SetupDesiredProps<ActivityLocation, TProps, TBehavior>,
    ) => any
    application: (bot: Bot<TProps, TBehavior>, payload: DiscordApplication, application: Application) => any
    applicationCommand: (bot: Bot<TProps, TBehavior>, payload: DiscordApplicationCommand, applicationCommand: ApplicationCommand) => any
    applicationCommandOption: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordApplicationCommandOption,
      applicationCommandOption: ApplicationCommandOption,
    ) => any
    applicationCommandOptionChoice: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordApplicationCommandOptionChoice,
      applicationCommandOptionChoice: ApplicationCommandOptionChoice,
    ) => any
    applicationCommandPermission: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordGuildApplicationCommandPermissions,
      applicationCommandPermission: GuildApplicationCommandPermissions,
    ) => any
    attachment: (bot: Bot<TProps, TBehavior>, payload: DiscordAttachment, attachment: SetupDesiredProps<Attachment, TProps, TBehavior>) => any
    auditLogEntry: (bot: Bot<TProps, TBehavior>, payload: DiscordAuditLogEntry, auditLogEntry: AuditLogEntry) => any
    automodActionExecution: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordAutoModerationActionExecution,
      automodActionExecution: AutoModerationActionExecution,
    ) => any
    automodRule: (bot: Bot<TProps, TBehavior>, payload: DiscordAutoModerationRule, automodRule: AutoModerationRule) => any
    avatarDecorationData: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordAvatarDecorationData,
      avatarDecorationData: SetupDesiredProps<AvatarDecorationData, TProps, TBehavior>,
    ) => any
    channel: (bot: Bot<TProps, TBehavior>, payload: DiscordChannel, channel: SetupDesiredProps<Channel, TProps, TBehavior>) => any
    component: (bot: Bot<TProps, TBehavior>, payload: DiscordMessageComponent, component: Component) => any
    defaultReactionEmoji: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordDefaultReactionEmoji,
      defaultReactionEmoji: SetupDesiredProps<DefaultReactionEmoji, TProps, TBehavior>,
    ) => any
    embed: (bot: Bot<TProps, TBehavior>, payload: DiscordEmbed, embed: Embed) => any
    emoji: (bot: Bot<TProps, TBehavior>, payload: DiscordEmoji, emoji: SetupDesiredProps<Emoji, TProps, TBehavior>) => any
    entitlement: (bot: Bot<TProps, TBehavior>, payload: DiscordEntitlement, entitlement: SetupDesiredProps<Entitlement, TProps, TBehavior>) => any
    forumTag: (bot: Bot<TProps, TBehavior>, payload: DiscordForumTag, forumTag: SetupDesiredProps<ForumTag, TProps, TBehavior>) => any
    gatewayBot: (bot: Bot<TProps, TBehavior>, payload: DiscordGetGatewayBot, getGatewayBot: GetGatewayBot) => any
    guild: (bot: Bot<TProps, TBehavior>, payload: DiscordGuild, guild: SetupDesiredProps<Guild, TProps, TBehavior>) => any
    guildOnboarding: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordGuildOnboarding,
      onboarding: SetupDesiredProps<GuildOnboarding, TProps, TBehavior>,
    ) => any
    guildOnboardingPrompt: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordGuildOnboardingPrompt,
      onboardingPrompt: SetupDesiredProps<GuildOnboardingPrompt, TProps, TBehavior>,
    ) => any
    guildOnboardingPromptOption: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordGuildOnboardingPromptOption,
      onboardingPromptOption: GuildOnboardingPromptOption,
    ) => any
    integration: (bot: Bot<TProps, TBehavior>, payload: DiscordIntegrationCreateUpdate, integration: Integration) => any
    interaction: (
      bot: Bot<TProps, TBehavior>,
      payload: { interaction: DiscordInteraction; shardId: number },
      interaction: SetupDesiredProps<Interaction, TProps, TBehavior>,
    ) => any
    interactionCallback: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordInteractionCallback,
      interactionCallback: SetupDesiredProps<InteractionCallback, TProps, TBehavior>,
    ) => any
    interactionCallbackResponse: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordInteractionCallbackResponse,
      interactionCallbackResponse: SetupDesiredProps<InteractionCallbackResponse, TProps, TBehavior>,
    ) => any
    interactionDataOptions: (bot: Bot<TProps, TBehavior>, payload: DiscordInteractionDataOption, interactionDataOptions: InteractionDataOption) => any
    interactionDataResolved: (
      bot: Bot<TProps, TBehavior>,
      payload: { resolved: DiscordInteractionDataResolved; guildId?: bigint },
      interactionDataResolved: InteractionDataResolved,
    ) => any
    interactionResource: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordInteractionResource,
      interactionResource: SetupDesiredProps<InteractionResource, TProps, TBehavior>,
    ) => any
    invite: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordInviteCreate | DiscordInviteMetadata,
      invite: SetupDesiredProps<Invite, TProps, TBehavior>,
    ) => any
    inviteStageInstance: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordInviteStageInstance,
      inviteStageInstance: SetupDesiredProps<InviteStageInstance, TProps, TBehavior>,
    ) => any
    member: (bot: Bot<TProps, TBehavior>, payload: DiscordMember, member: SetupDesiredProps<Member, TProps, TBehavior>) => any
    message: (bot: Bot<TProps, TBehavior>, payload: DiscordMessage, message: SetupDesiredProps<Message, TProps, TBehavior>) => any
    messageCall: (bot: Bot<TProps, TBehavior>, payload: DiscordMessageCall, call: SetupDesiredProps<MessageCall, TProps, TBehavior>) => any
    messageInteractionMetadata: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordMessageInteractionMetadata,
      metadata: SetupDesiredProps<MessageInteractionMetadata, TProps, TBehavior>,
    ) => any
    messageSnapshot: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordMessageSnapshot,
      messageSnapshot: SetupDesiredProps<MessageSnapshot, TProps, TBehavior>,
    ) => any
    poll: (bot: Bot<TProps, TBehavior>, payload: DiscordPoll, poll: SetupDesiredProps<Poll, TProps, TBehavior>) => any
    pollMedia: (bot: Bot<TProps, TBehavior>, payload: DiscordPollMedia, pollMedia: SetupDesiredProps<PollMedia, TProps, TBehavior>) => any
    presence: (bot: Bot<TProps, TBehavior>, payload: DiscordPresenceUpdate, presence: PresenceUpdate) => any
    role: (bot: Bot<TProps, TBehavior>, payload: DiscordRole, role: SetupDesiredProps<Role, TProps, TBehavior>) => any
    scheduledEvent: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordScheduledEvent,
      scheduledEvent: SetupDesiredProps<ScheduledEvent, TProps, TBehavior>,
    ) => any
    scheduledEventRecurrenceRule: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordScheduledEventRecurrenceRule,
      scheduledEvent: SetupDesiredProps<ScheduledEventRecurrenceRule, TProps, TBehavior>,
    ) => any
    sku: (bot: Bot<TProps, TBehavior>, payload: DiscordSku, sku: SetupDesiredProps<Sku, TProps, TBehavior>) => any
    soundboardSound: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordSoundboardSound,
      soundboardSound: SetupDesiredProps<SoundboardSound, TProps, TBehavior>,
    ) => any
    stageInstance: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordStageInstance,
      stageInstance: SetupDesiredProps<StageInstance, TProps, TBehavior>,
    ) => any
    sticker: (bot: Bot<TProps, TBehavior>, payload: DiscordSticker, sticker: SetupDesiredProps<Sticker, TProps, TBehavior>) => any
    stickerPack: (bot: Bot<TProps, TBehavior>, payload: DiscordStickerPack, stickerPack: StickerPack) => any
    subscription: (bot: Bot<TProps, TBehavior>, payload: DiscordSubscription, subscription: SetupDesiredProps<Subscription, TProps, TBehavior>) => any
    team: (bot: Bot<TProps, TBehavior>, payload: DiscordTeam, team: Team) => any
    template: (bot: Bot<TProps, TBehavior>, payload: DiscordTemplate, template: Template) => any
    threadMember: (bot: Bot<TProps, TBehavior>, payload: DiscordThreadMember, threadMember: ThreadMember) => any
    threadMemberGuildCreate: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordThreadMemberGuildCreate,
      threadMemberGuildCreate: ThreadMemberGuildCreate,
    ) => any
    user: (bot: Bot<TProps, TBehavior>, payload: DiscordUser, user: SetupDesiredProps<User, TProps, TBehavior>) => any
    voiceRegion: (bot: Bot<TProps, TBehavior>, payload: DiscordVoiceRegion, voiceRegion: VoiceRegion) => any
    voiceState: (bot: Bot<TProps, TBehavior>, payload: DiscordVoiceState, voiceState: SetupDesiredProps<VoiceState, TProps, TBehavior>) => any
    webhook: (bot: Bot<TProps, TBehavior>, payload: DiscordWebhook, webhook: SetupDesiredProps<Webhook, TProps, TBehavior>) => any
    welcomeScreen: (bot: Bot<TProps, TBehavior>, payload: DiscordWelcomeScreen, welcomeScreen: WelcomeScreen) => any
    widget: (bot: Bot<TProps, TBehavior>, payload: DiscordGuildWidget, widget: GuildWidget) => any
    widgetSettings: (bot: Bot<TProps, TBehavior>, payload: DiscordGuildWidgetSettings, widgetSettings: GuildWidgetSettings) => any
  }
  desiredProperties: TransformersDesiredProperties
  reverse: {
    activity: (bot: Bot<TProps, TBehavior>, payload: Activity) => DiscordActivity
    allowedMentions: (bot: Bot<TProps, TBehavior>, payload: AllowedMentions) => DiscordAllowedMentions
    application: (bot: Bot<TProps, TBehavior>, payload: Application) => DiscordApplication
    applicationCommand: (bot: Bot<TProps, TBehavior>, payload: ApplicationCommand) => DiscordApplicationCommand
    applicationCommandOption: (bot: Bot<TProps, TBehavior>, payload: ApplicationCommandOption) => DiscordApplicationCommandOption
    applicationCommandOptionChoice: (bot: Bot<TProps, TBehavior>, payload: ApplicationCommandOptionChoice) => DiscordApplicationCommandOptionChoice
    attachment: (bot: Bot<TProps, TBehavior>, payload: SetupDesiredProps<Attachment, TProps, TBehavior>) => DiscordAttachment
    component: (bot: Bot<TProps, TBehavior>, payload: Component) => DiscordMessageComponent
    createApplicationCommand: (bot: Bot<TProps, TBehavior>, payload: CreateApplicationCommand) => DiscordCreateApplicationCommand
    embed: (bot: Bot<TProps, TBehavior>, payload: Embed) => DiscordEmbed
    member: (bot: Bot<TProps, TBehavior>, payload: SetupDesiredProps<Member, TProps, TBehavior>) => DiscordMember
    snowflake: (snowflake: BigString) => string
    team: (bot: Bot<TProps, TBehavior>, payload: Team) => DiscordTeam
    user: (bot: Bot<TProps, TBehavior>, payload: SetupDesiredProps<User, TProps, TBehavior>) => DiscordUser
  }
  activity: (bot: Bot<TProps, TBehavior>, payload: DiscordActivity) => Activity
  activityInstance: (bot: Bot<TProps, TBehavior>, payload: DiscordActivityInstance) => SetupDesiredProps<ActivityInstance, TProps, TBehavior>
  activityLocation: (bot: Bot<TProps, TBehavior>, payload: DiscordActivityLocation) => SetupDesiredProps<ActivityLocation, TProps, TBehavior>
  application: (bot: Bot<TProps, TBehavior>, payload: { application: DiscordApplication; shardId: number }) => Application
  applicationCommand: (bot: Bot<TProps, TBehavior>, payload: DiscordApplicationCommand) => ApplicationCommand
  applicationCommandOption: (bot: Bot<TProps, TBehavior>, payload: DiscordApplicationCommandOption) => ApplicationCommandOption
  applicationCommandOptionChoice: (bot: Bot<TProps, TBehavior>, payload: DiscordApplicationCommandOptionChoice) => ApplicationCommandOptionChoice
  applicationCommandPermission: (
    bot: Bot<TProps, TBehavior>,
    payload: DiscordGuildApplicationCommandPermissions,
  ) => GuildApplicationCommandPermissions
  attachment: (bot: Bot<TProps, TBehavior>, payload: DiscordAttachment) => SetupDesiredProps<Attachment, TProps, TBehavior>
  auditLogEntry: (bot: Bot<TProps, TBehavior>, payload: DiscordAuditLogEntry) => AuditLogEntry
  automodActionExecution: (bot: Bot<TProps, TBehavior>, payload: DiscordAutoModerationActionExecution) => AutoModerationActionExecution
  automodRule: (bot: Bot<TProps, TBehavior>, payload: DiscordAutoModerationRule) => AutoModerationRule
  avatarDecorationData: (
    bot: Bot<TProps, TBehavior>,
    payload: DiscordAvatarDecorationData,
  ) => SetupDesiredProps<AvatarDecorationData, TProps, TBehavior>
  channel: (bot: Bot<TProps, TBehavior>, payload: { channel: DiscordChannel; guildId?: BigString }) => SetupDesiredProps<Channel, TProps, TBehavior>
  component: (bot: Bot<TProps, TBehavior>, payload: DiscordMessageComponent) => Component
  defaultReactionEmoji: (
    bot: Bot<TProps, TBehavior>,
    payload: DiscordDefaultReactionEmoji,
  ) => SetupDesiredProps<DefaultReactionEmoji, TProps, TBehavior>
  embed: (bot: Bot<TProps, TBehavior>, payload: DiscordEmbed) => Embed
  emoji: (bot: Bot<TProps, TBehavior>, payload: DiscordEmoji) => SetupDesiredProps<Emoji, TProps, TBehavior>
  entitlement: (bot: Bot<TProps, TBehavior>, payload: DiscordEntitlement) => SetupDesiredProps<Entitlement, TProps, TBehavior>
  forumTag: (bot: Bot<TProps, TBehavior>, payload: DiscordForumTag) => SetupDesiredProps<ForumTag, TProps, TBehavior>
  gatewayBot: (bot: Bot<TProps, TBehavior>, payload: DiscordGetGatewayBot) => GetGatewayBot
  guild: (bot: Bot<TProps, TBehavior>, payload: { guild: DiscordGuild; shardId: number }) => SetupDesiredProps<Guild, TProps, TBehavior>
  guildOnboarding: (bot: Bot<TProps, TBehavior>, payload: DiscordGuildOnboarding) => SetupDesiredProps<GuildOnboarding, TProps, TBehavior>
  guildOnboardingPrompt: (
    bot: Bot<TProps, TBehavior>,
    payload: DiscordGuildOnboardingPrompt,
  ) => SetupDesiredProps<GuildOnboardingPrompt, TProps, TBehavior>
  guildOnboardingPromptOption: (bot: Bot<TProps, TBehavior>, payload: DiscordGuildOnboardingPromptOption) => GuildOnboardingPromptOption
  integration: (bot: Bot<TProps, TBehavior>, payload: DiscordIntegrationCreateUpdate) => Integration
  interaction: (
    bot: Bot<TProps, TBehavior>,
    payload: { interaction: DiscordInteraction; shardId: number },
  ) => SetupDesiredProps<Interaction, TProps, TBehavior>
  interactionCallback: (bot: Bot<TProps, TBehavior>, payload: DiscordInteractionCallback) => SetupDesiredProps<InteractionCallback, TProps, TBehavior>
  interactionCallbackResponse: (
    bot: Bot<TProps, TBehavior>,
    payload: { interactionCallbackResponse: DiscordInteractionCallbackResponse; shardId: number },
  ) => SetupDesiredProps<InteractionCallbackResponse, TProps, TBehavior>
  interactionDataOptions: (bot: Bot<TProps, TBehavior>, payload: DiscordInteractionDataOption) => InteractionDataOption
  interactionDataResolved: (
    bot: Bot<TProps, TBehavior>,
    payload: { resolved: DiscordInteractionDataResolved; shardId: number; guildId?: bigint },
  ) => InteractionDataResolved
  interactionResource: (
    bot: Bot<TProps, TBehavior>,
    payload: { interactionResource: DiscordInteractionResource; shardId: number },
  ) => SetupDesiredProps<InteractionResource, TProps, TBehavior>
  invite: (
    bot: Bot<TProps, TBehavior>,
    payload: { invite: DiscordInviteCreate | DiscordInviteMetadata; shardId: number },
  ) => SetupDesiredProps<Invite, TProps, TBehavior>
  inviteStageInstance: (
    bot: Bot<TProps, TBehavior>,
    payload: DiscordInviteStageInstance & { guildId: BigString },
  ) => SetupDesiredProps<InviteStageInstance, TProps, TBehavior>
  member: (bot: Bot<TProps, TBehavior>, payload: DiscordMember, guildId: BigString, userId: BigString) => SetupDesiredProps<Member, TProps, TBehavior>
  message: (bot: Bot<TProps, TBehavior>, payload: { message: DiscordMessage; shardId: number }) => SetupDesiredProps<Message, TProps, TBehavior>
  messageCall: (bot: Bot<TProps, TBehavior>, payload: DiscordMessageCall) => SetupDesiredProps<MessageCall, TProps, TBehavior>
  messageInteractionMetadata: (
    bot: Bot<TProps, TBehavior>,
    payload: DiscordMessageInteractionMetadata,
  ) => SetupDesiredProps<MessageInteractionMetadata, TProps, TBehavior>
  messageSnapshot: (
    bot: Bot<TProps, TBehavior>,
    payload: { messageSnapshot: DiscordMessageSnapshot; shardId: number },
  ) => SetupDesiredProps<MessageSnapshot, TProps, TBehavior>
  poll: (bot: Bot<TProps, TBehavior>, payload: DiscordPoll) => SetupDesiredProps<Poll, TProps, TBehavior>
  pollMedia: (bot: Bot<TProps, TBehavior>, payload: DiscordPollMedia) => SetupDesiredProps<PollMedia, TProps, TBehavior>
  presence: (bot: Bot<TProps, TBehavior>, payload: DiscordPresenceUpdate) => PresenceUpdate
  role: (bot: Bot<TProps, TBehavior>, payload: { role: DiscordRole; guildId: BigString }) => SetupDesiredProps<Role, TProps, TBehavior>
  scheduledEvent: (bot: Bot<TProps, TBehavior>, payload: DiscordScheduledEvent) => SetupDesiredProps<ScheduledEvent, TProps, TBehavior>
  scheduledEventRecurrenceRule: (
    bot: Bot<TProps, TBehavior>,
    payload: DiscordScheduledEventRecurrenceRule,
  ) => SetupDesiredProps<ScheduledEventRecurrenceRule, TProps, TBehavior>
  sku: (bot: Bot<TProps, TBehavior>, payload: DiscordSku) => SetupDesiredProps<Sku, TProps, TBehavior>
  soundboardSound: (bot: Bot<TProps, TBehavior>, payload: DiscordSoundboardSound) => SetupDesiredProps<SoundboardSound, TProps, TBehavior>
  snowflake: (snowflake: BigString) => bigint
  stageInstance: (bot: Bot<TProps, TBehavior>, payload: DiscordStageInstance) => SetupDesiredProps<StageInstance, TProps, TBehavior>
  sticker: (bot: Bot<TProps, TBehavior>, payload: DiscordSticker) => SetupDesiredProps<Sticker, TProps, TBehavior>
  stickerPack: (bot: Bot<TProps, TBehavior>, payload: DiscordStickerPack) => StickerPack
  subscription: (bot: Bot<TProps, TBehavior>, payload: DiscordSubscription) => SetupDesiredProps<Subscription, TProps, TBehavior>
  team: (bot: Bot<TProps, TBehavior>, payload: DiscordTeam) => Team
  template: (bot: Bot<TProps, TBehavior>, payload: DiscordTemplate) => Template
  threadMember: (bot: Bot<TProps, TBehavior>, payload: DiscordThreadMember) => ThreadMember
  threadMemberGuildCreate: (bot: Bot<TProps, TBehavior>, payload: DiscordThreadMemberGuildCreate) => ThreadMemberGuildCreate
  user: (bot: Bot<TProps, TBehavior>, payload: DiscordUser) => SetupDesiredProps<User, TProps, TBehavior>
  voiceRegion: (bot: Bot<TProps, TBehavior>, payload: DiscordVoiceRegion) => VoiceRegion
  voiceState: (
    bot: Bot<TProps, TBehavior>,
    payload: { voiceState: DiscordVoiceState; guildId: BigString },
  ) => SetupDesiredProps<VoiceState, TProps, TBehavior>
  webhook: (bot: Bot<TProps, TBehavior>, payload: DiscordWebhook) => SetupDesiredProps<Webhook, TProps, TBehavior>
  welcomeScreen: (bot: Bot<TProps, TBehavior>, payload: DiscordWelcomeScreen) => WelcomeScreen
  widget: (bot: Bot<TProps, TBehavior>, payload: DiscordGuildWidget) => GuildWidget
  widgetSettings: (bot: Bot<TProps, TBehavior>, payload: DiscordGuildWidgetSettings) => GuildWidgetSettings
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
