import type {
  AllowedMentions,
  BigString,
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
  DiscordCollectibles,
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
  DiscordIncidentsData,
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
  DiscordLobby,
  DiscordLobbyMember,
  DiscordMediaGalleryItem,
  DiscordMember,
  DiscordMessage,
  DiscordMessageCall,
  DiscordMessageComponent,
  DiscordMessageInteractionMetadata,
  DiscordMessagePin,
  DiscordMessageSnapshot,
  DiscordNameplate,
  DiscordPoll,
  DiscordPollMedia,
  DiscordPresenceUpdate,
  DiscordRole,
  DiscordRoleColors,
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
  DiscordUnfurledMediaItem,
  DiscordUser,
  DiscordUserPrimaryGuild,
  DiscordVoiceRegion,
  DiscordVoiceState,
  DiscordWebhook,
  DiscordWelcomeScreen,
  RecursivePartial,
} from '@discordeno/types'
import { bigintToSnowflake, snowflakeToBigint } from '@discordeno/utils'
import type { Bot } from './bot.js'
import {
  createDesiredPropertiesObject,
  type DesiredPropertiesBehavior,
  type SetupDesiredProps,
  type TransformersDesiredProperties,
  type TransformProperty,
} from './desiredProperties.js'
import { transformIncidentsData } from './transformers/incidentsData.js'
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
  type Collectibles,
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
  type IncidentsData,
  type Integration,
  type Interaction,
  type InteractionCallback,
  type InteractionCallbackResponse,
  type InteractionDataOption,
  type InteractionDataResolved,
  type InteractionResource,
  type Invite,
  type InviteStageInstance,
  type Lobby,
  type LobbyMember,
  type MediaGalleryItem,
  type Member,
  type Message,
  type MessageCall,
  type MessageInteractionMetadata,
  type MessagePin,
  type MessageSnapshot,
  type Nameplate,
  type Poll,
  type PollMedia,
  type PresenceUpdate,
  type Role,
  type RoleColors,
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
  type ThreadMemberTransformerExtra,
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
  transformCollectibles,
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
  transformLobby,
  transformLobbyMember,
  transformMediaGalleryItem,
  transformMember,
  transformMemberToDiscordMember,
  transformMessage,
  transformMessageCall,
  transformMessageInteractionMetadata,
  transformMessagePin,
  transformMessageSnapshot,
  transformNameplate,
  transformPoll,
  transformPollMedia,
  transformPresence,
  transformRole,
  transformRoleColors,
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
  transformUnfurledMediaItem,
  transformUser,
  transformUserPrimaryGuild,
  transformUserToDiscordUser,
  transformVoiceRegion,
  transformVoiceState,
  transformWebhook,
  transformWelcomeScreen,
  transformWidget,
  transformWidgetSettings,
  type UnfurledMediaItem,
  type User,
  type UserPrimaryGuild,
  type VoiceRegion,
  type VoiceState,
  type Webhook,
  type WelcomeScreen,
} from './transformers/index.js'
import {
  transformAllowedMentionsToDiscordAllowedMentions,
  transformMediaGalleryItemToDiscordMediaGalleryItem,
  transformUnfurledMediaItemToDiscordUnfurledMediaItem,
} from './transformers/reverse/index.js'

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
    application: (bot: Bot<TProps, TBehavior>, payload: DiscordApplication, application: Application, extra?: { shardId?: number }) => any
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
    channel: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordChannel,
      channel: SetupDesiredProps<Channel, TProps, TBehavior>,
      extra?: { guildId?: bigint },
    ) => any
    collectibles: (bot: Bot<TProps, TBehavior>, payload: DiscordCollectibles, collectibles: SetupDesiredProps<Collectibles, TProps, TBehavior>) => any
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
    guild: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordGuild,
      guild: SetupDesiredProps<Guild, TProps, TBehavior>,
      extra?: { shardId?: number },
    ) => any
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
      onboardingPromptOption: SetupDesiredProps<GuildOnboardingPromptOption, TProps, TBehavior>,
    ) => any
    incidentsData: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordIncidentsData,
      incidentsData: SetupDesiredProps<IncidentsData, TProps, TBehavior>,
    ) => any
    integration: (bot: Bot<TProps, TBehavior>, payload: DiscordIntegrationCreateUpdate, integration: Integration) => any
    interaction: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordInteraction,
      interaction: SetupDesiredProps<Interaction, TProps, TBehavior>,
      extra?: { shardId?: number },
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
      extra?: { shardId?: number },
    ) => any
    interactionDataOptions: (bot: Bot<TProps, TBehavior>, payload: DiscordInteractionDataOption, interactionDataOptions: InteractionDataOption) => any
    interactionDataResolved: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordInteractionDataResolved,
      interactionDataResolved: InteractionDataResolved,
      extra?: { shardId?: number; guildId?: bigint },
    ) => any
    interactionResource: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordInteractionResource,
      interactionResource: SetupDesiredProps<InteractionResource, TProps, TBehavior>,
      extra?: { shardId?: number },
    ) => any
    invite: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordInviteCreate | DiscordInviteMetadata,
      invite: SetupDesiredProps<Invite, TProps, TBehavior>,
      extra?: { shardId?: number },
    ) => any
    inviteStageInstance: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordInviteStageInstance,
      inviteStageInstance: SetupDesiredProps<InviteStageInstance, TProps, TBehavior>,
      extra?: { guildId?: bigint },
    ) => any
    lobby: (bot: Bot<TProps, TBehavior>, payload: DiscordLobby, lobby: SetupDesiredProps<Lobby, TProps, TBehavior>) => any
    lobbyMember: (bot: Bot<TProps, TBehavior>, payload: DiscordLobbyMember, lobbyMember: SetupDesiredProps<LobbyMember, TProps, TBehavior>) => any
    mediaGalleryItem: (bot: Bot<TProps, TBehavior>, payload: DiscordMediaGalleryItem, item: MediaGalleryItem) => any
    member: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordMember,
      member: SetupDesiredProps<Member, TProps, TBehavior>,
      extra?: { guildId?: bigint; userId?: bigint },
    ) => any
    message: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordMessage,
      message: SetupDesiredProps<Message, TProps, TBehavior>,
      extra?: { shardId?: number },
    ) => any
    messageCall: (bot: Bot<TProps, TBehavior>, payload: DiscordMessageCall, call: SetupDesiredProps<MessageCall, TProps, TBehavior>) => any
    messageInteractionMetadata: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordMessageInteractionMetadata,
      metadata: SetupDesiredProps<MessageInteractionMetadata, TProps, TBehavior>,
    ) => any
    messagePin: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordMessagePin,
      call: SetupDesiredProps<MessagePin, TProps, TBehavior>,
      extra?: { shardId?: number },
    ) => any
    messageSnapshot: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordMessageSnapshot,
      messageSnapshot: SetupDesiredProps<MessageSnapshot, TProps, TBehavior>,
      extra?: { shardId?: number },
    ) => any
    nameplate: (bot: Bot<TProps, TBehavior>, payload: DiscordNameplate, nameplate: SetupDesiredProps<Nameplate, TProps, TBehavior>) => any
    poll: (bot: Bot<TProps, TBehavior>, payload: DiscordPoll, poll: SetupDesiredProps<Poll, TProps, TBehavior>) => any
    pollMedia: (bot: Bot<TProps, TBehavior>, payload: DiscordPollMedia, pollMedia: SetupDesiredProps<PollMedia, TProps, TBehavior>) => any
    presence: (bot: Bot<TProps, TBehavior>, payload: DiscordPresenceUpdate, presence: PresenceUpdate) => any
    role: (bot: Bot<TProps, TBehavior>, payload: DiscordRole, role: SetupDesiredProps<Role, TProps, TBehavior>, extra?: { guildId?: bigint }) => any
    roleColors: (bot: Bot<TProps, TBehavior>, payload: DiscordRoleColors, roleColors: SetupDesiredProps<RoleColors, TProps, TBehavior>) => any
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
    threadMember: (bot: Bot<TProps, TBehavior>, payload: DiscordThreadMember, threadMember: ThreadMember, extra?: ThreadMemberTransformerExtra) => any
    threadMemberGuildCreate: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordThreadMemberGuildCreate,
      threadMemberGuildCreate: ThreadMemberGuildCreate,
    ) => any
    unfurledMediaItem: (bot: Bot<TProps, TBehavior>, payload: DiscordUnfurledMediaItem, unfurledMediaItem: UnfurledMediaItem) => any
    user: (bot: Bot<TProps, TBehavior>, payload: DiscordUser, user: SetupDesiredProps<User, TProps, TBehavior>) => any
    userPrimaryGuild: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordUserPrimaryGuild,
      userPrimaryGuild: SetupDesiredProps<UserPrimaryGuild, TProps, TBehavior>,
    ) => any
    voiceRegion: (bot: Bot<TProps, TBehavior>, payload: DiscordVoiceRegion, voiceRegion: VoiceRegion) => any
    voiceState: (
      bot: Bot<TProps, TBehavior>,
      payload: DiscordVoiceState,
      voiceState: SetupDesiredProps<VoiceState, TProps, TBehavior>,
      extra?: { guildId?: bigint },
    ) => any
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
    embed: (bot: Bot<TProps, TBehavior>, payload: Embed) => DiscordEmbed
    mediaGalleryItem: (bot: Bot<TProps, TBehavior>, payload: MediaGalleryItem) => DiscordMediaGalleryItem
    member: (bot: Bot<TProps, TBehavior>, payload: SetupDesiredProps<Member, TProps, TBehavior>) => DiscordMember
    snowflake: (snowflake: BigString) => string
    team: (bot: Bot<TProps, TBehavior>, payload: Team) => DiscordTeam
    unfurledMediaItem: (bot: Bot<TProps, TBehavior>, payload: UnfurledMediaItem) => DiscordUnfurledMediaItem
    user: (bot: Bot<TProps, TBehavior>, payload: SetupDesiredProps<User, TProps, TBehavior>) => DiscordUser
  }
  activity: (bot: Bot<TProps, TBehavior>, payload: DiscordActivity) => Activity
  activityInstance: (bot: Bot<TProps, TBehavior>, payload: DiscordActivityInstance) => SetupDesiredProps<ActivityInstance, TProps, TBehavior>
  activityLocation: (bot: Bot<TProps, TBehavior>, payload: DiscordActivityLocation) => SetupDesiredProps<ActivityLocation, TProps, TBehavior>
  application: (bot: Bot<TProps, TBehavior>, payload: DiscordApplication, extra?: { shardId?: number }) => Application
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
  channel: (bot: Bot<TProps, TBehavior>, payload: DiscordChannel, extra?: { guildId?: BigString }) => SetupDesiredProps<Channel, TProps, TBehavior>
  collectibles: (bot: Bot<TProps, TBehavior>, payload: DiscordCollectibles) => SetupDesiredProps<Collectibles, TProps, TBehavior>
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
  guild: (bot: Bot<TProps, TBehavior>, payload: DiscordGuild, extra?: { shardId?: number }) => SetupDesiredProps<Guild, TProps, TBehavior>
  guildOnboarding: (bot: Bot<TProps, TBehavior>, payload: DiscordGuildOnboarding) => SetupDesiredProps<GuildOnboarding, TProps, TBehavior>
  guildOnboardingPrompt: (
    bot: Bot<TProps, TBehavior>,
    payload: DiscordGuildOnboardingPrompt,
  ) => SetupDesiredProps<GuildOnboardingPrompt, TProps, TBehavior>
  guildOnboardingPromptOption: (bot: Bot<TProps, TBehavior>, payload: DiscordGuildOnboardingPromptOption) => GuildOnboardingPromptOption
  incidentsData: (bot: Bot<TProps, TBehavior>, payload: DiscordIncidentsData) => IncidentsData
  integration: (bot: Bot<TProps, TBehavior>, payload: DiscordIntegrationCreateUpdate) => Integration
  interaction: (
    bot: Bot<TProps, TBehavior>,
    payload: DiscordInteraction,
    extra?: { shardId?: number },
  ) => SetupDesiredProps<Interaction, TProps, TBehavior>
  interactionCallback: (bot: Bot<TProps, TBehavior>, payload: DiscordInteractionCallback) => SetupDesiredProps<InteractionCallback, TProps, TBehavior>
  interactionCallbackResponse: (
    bot: Bot<TProps, TBehavior>,
    payload: DiscordInteractionCallbackResponse,
    extra?: { shardId?: number },
  ) => SetupDesiredProps<InteractionCallbackResponse, TProps, TBehavior>
  interactionDataOptions: (bot: Bot<TProps, TBehavior>, payload: DiscordInteractionDataOption) => InteractionDataOption
  interactionDataResolved: (
    bot: Bot<TProps, TBehavior>,
    payload: DiscordInteractionDataResolved,
    extra?: { shardId?: number; guildId?: BigString },
  ) => TransformProperty<InteractionDataResolved, TProps, TBehavior>
  interactionResource: (
    bot: Bot<TProps, TBehavior>,
    payload: DiscordInteractionResource,
    extra?: { shardId?: number },
  ) => SetupDesiredProps<InteractionResource, TProps, TBehavior>
  invite: (
    bot: Bot<TProps, TBehavior>,
    payload: DiscordInviteCreate | DiscordInviteMetadata,
    extra?: { shardId?: number },
  ) => SetupDesiredProps<Invite, TProps, TBehavior>
  inviteStageInstance: (
    bot: Bot<TProps, TBehavior>,
    payload: DiscordInviteStageInstance,
    extra?: { guildId: BigString },
  ) => SetupDesiredProps<InviteStageInstance, TProps, TBehavior>
  lobby: (bot: Bot<TProps, TBehavior>, payload: DiscordLobby) => SetupDesiredProps<Lobby, TProps, TBehavior>
  lobbyMember: (bot: Bot<TProps, TBehavior>, payload: DiscordLobbyMember) => SetupDesiredProps<LobbyMember, TProps, TBehavior>
  mediaGalleryItem: (bot: Bot<TProps, TBehavior>, payload: DiscordMediaGalleryItem) => MediaGalleryItem
  member: (
    bot: Bot<TProps, TBehavior>,
    payload: DiscordMember,
    extra?: { guildId?: BigString; userId?: BigString },
  ) => SetupDesiredProps<Member, TProps, TBehavior>
  message: (bot: Bot<TProps, TBehavior>, payload: DiscordMessage, extra?: { shardId?: number }) => SetupDesiredProps<Message, TProps, TBehavior>
  messageCall: (bot: Bot<TProps, TBehavior>, payload: DiscordMessageCall) => SetupDesiredProps<MessageCall, TProps, TBehavior>
  messageInteractionMetadata: (
    bot: Bot<TProps, TBehavior>,
    payload: DiscordMessageInteractionMetadata,
  ) => SetupDesiredProps<MessageInteractionMetadata, TProps, TBehavior>
  messagePin: (
    bot: Bot<TProps, TBehavior>,
    payload: DiscordMessagePin,
    extra?: { shardId?: number },
  ) => SetupDesiredProps<MessagePin, TProps, TBehavior>
  messageSnapshot: (
    bot: Bot<TProps, TBehavior>,
    payload: DiscordMessageSnapshot,
    extra?: { shardId?: number },
  ) => SetupDesiredProps<MessageSnapshot, TProps, TBehavior>
  nameplate: (bot: Bot<TProps, TBehavior>, payload: DiscordNameplate) => SetupDesiredProps<Nameplate, TProps, TBehavior>
  poll: (bot: Bot<TProps, TBehavior>, payload: DiscordPoll) => SetupDesiredProps<Poll, TProps, TBehavior>
  pollMedia: (bot: Bot<TProps, TBehavior>, payload: DiscordPollMedia) => SetupDesiredProps<PollMedia, TProps, TBehavior>
  presence: (bot: Bot<TProps, TBehavior>, payload: DiscordPresenceUpdate) => PresenceUpdate
  role: (bot: Bot<TProps, TBehavior>, payload: DiscordRole, extra?: { guildId?: BigString }) => SetupDesiredProps<Role, TProps, TBehavior>
  roleColors: (bot: Bot<TProps, TBehavior>, payload: DiscordRoleColors) => SetupDesiredProps<RoleColors, TProps, TBehavior>
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
  threadMember: (bot: Bot<TProps, TBehavior>, payload: DiscordThreadMember, extra?: ThreadMemberTransformerExtra) => ThreadMember
  threadMemberGuildCreate: (bot: Bot<TProps, TBehavior>, payload: DiscordThreadMemberGuildCreate) => ThreadMemberGuildCreate
  unfurledMediaItem: (bot: Bot<TProps, TBehavior>, payload: DiscordUnfurledMediaItem) => UnfurledMediaItem
  user: (bot: Bot<TProps, TBehavior>, payload: DiscordUser) => SetupDesiredProps<User, TProps, TBehavior>
  userPrimaryGuild: (bot: Bot<TProps, TBehavior>, payload: DiscordUserPrimaryGuild) => SetupDesiredProps<UserPrimaryGuild, TProps, TBehavior>
  voiceRegion: (bot: Bot<TProps, TBehavior>, payload: DiscordVoiceRegion) => VoiceRegion
  voiceState: (
    bot: Bot<TProps, TBehavior>,
    payload: DiscordVoiceState,
    extra?: { guildId?: BigString },
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
  const _options = options as RecursivePartial<Transformers<TransformersDesiredProperties, DesiredPropertiesBehavior.RemoveKey>>

  return {
    customizers: {
      activity: _options.customizers?.activity ?? defaultCustomizer,
      activityInstance: _options.customizers?.activityInstance ?? defaultCustomizer,
      activityLocation: _options.customizers?.activityLocation ?? defaultCustomizer,
      application: _options.customizers?.application ?? defaultCustomizer,
      applicationCommand: _options.customizers?.applicationCommand ?? defaultCustomizer,
      applicationCommandOption: _options.customizers?.applicationCommandOption ?? defaultCustomizer,
      applicationCommandOptionChoice: _options.customizers?.applicationCommandOptionChoice ?? defaultCustomizer,
      applicationCommandPermission: _options.customizers?.applicationCommandPermission ?? defaultCustomizer,
      attachment: _options.customizers?.attachment ?? defaultCustomizer,
      auditLogEntry: _options.customizers?.auditLogEntry ?? defaultCustomizer,
      automodActionExecution: _options.customizers?.automodActionExecution ?? defaultCustomizer,
      automodRule: _options.customizers?.automodRule ?? defaultCustomizer,
      avatarDecorationData: _options.customizers?.avatarDecorationData ?? defaultCustomizer,
      channel: _options.customizers?.channel ?? defaultCustomizer,
      collectibles: _options.customizers?.collectibles ?? defaultCustomizer,
      component: _options.customizers?.component ?? defaultCustomizer,
      defaultReactionEmoji: _options.customizers?.defaultReactionEmoji ?? defaultCustomizer,
      embed: _options.customizers?.embed ?? defaultCustomizer,
      emoji: _options.customizers?.emoji ?? defaultCustomizer,
      entitlement: _options.customizers?.entitlement ?? defaultCustomizer,
      forumTag: _options.customizers?.forumTag ?? defaultCustomizer,
      gatewayBot: _options.customizers?.gatewayBot ?? defaultCustomizer,
      guild: _options.customizers?.guild ?? defaultCustomizer,
      guildOnboarding: _options.customizers?.guildOnboarding ?? defaultCustomizer,
      guildOnboardingPrompt: _options.customizers?.guildOnboardingPrompt ?? defaultCustomizer,
      guildOnboardingPromptOption: _options.customizers?.guildOnboardingPromptOption ?? defaultCustomizer,
      incidentsData: _options.customizers?.incidentsData ?? defaultCustomizer,
      integration: _options.customizers?.integration ?? defaultCustomizer,
      interaction: _options.customizers?.interaction ?? defaultCustomizer,
      interactionCallback: _options.customizers?.interactionCallback ?? defaultCustomizer,
      interactionCallbackResponse: _options.customizers?.interactionCallbackResponse ?? defaultCustomizer,
      interactionDataOptions: _options.customizers?.interactionDataOptions ?? defaultCustomizer,
      interactionDataResolved: _options.customizers?.interactionDataResolved ?? defaultCustomizer,
      interactionResource: _options.customizers?.interactionResource ?? defaultCustomizer,
      invite: _options.customizers?.invite ?? defaultCustomizer,
      inviteStageInstance: _options.customizers?.inviteStageInstance ?? defaultCustomizer,
      lobby: _options.customizers?.lobby ?? defaultCustomizer,
      lobbyMember: _options.customizers?.lobbyMember ?? defaultCustomizer,
      mediaGalleryItem: _options.customizers?.mediaGalleryItem ?? defaultCustomizer,
      member: _options.customizers?.member ?? defaultCustomizer,
      message: _options.customizers?.message ?? defaultCustomizer,
      messageCall: _options.customizers?.messageCall ?? defaultCustomizer,
      messageInteractionMetadata: _options.customizers?.messageInteractionMetadata ?? defaultCustomizer,
      messagePin: _options.customizers?.messagePin ?? defaultCustomizer,
      messageSnapshot: _options.customizers?.messageSnapshot ?? defaultCustomizer,
      nameplate: _options.customizers?.nameplate ?? defaultCustomizer,
      poll: _options.customizers?.poll ?? defaultCustomizer,
      pollMedia: _options.customizers?.pollMedia ?? defaultCustomizer,
      presence: _options.customizers?.presence ?? defaultCustomizer,
      role: _options.customizers?.role ?? defaultCustomizer,
      roleColors: _options.customizers?.roleColors ?? defaultCustomizer,
      scheduledEvent: _options.customizers?.scheduledEvent ?? defaultCustomizer,
      scheduledEventRecurrenceRule: _options.customizers?.scheduledEventRecurrenceRule ?? defaultCustomizer,
      sku: _options.customizers?.sku ?? defaultCustomizer,
      soundboardSound: _options.customizers?.soundboardSound ?? defaultCustomizer,
      stageInstance: _options.customizers?.stageInstance ?? defaultCustomizer,
      sticker: _options.customizers?.sticker ?? defaultCustomizer,
      stickerPack: _options.customizers?.stickerPack ?? defaultCustomizer,
      subscription: _options.customizers?.subscription ?? defaultCustomizer,
      team: _options.customizers?.team ?? defaultCustomizer,
      template: _options.customizers?.template ?? defaultCustomizer,
      threadMember: _options.customizers?.threadMember ?? defaultCustomizer,
      threadMemberGuildCreate: _options.customizers?.threadMemberGuildCreate ?? defaultCustomizer,
      unfurledMediaItem: _options.customizers?.unfurledMediaItem ?? defaultCustomizer,
      user: _options.customizers?.user ?? defaultCustomizer,
      userPrimaryGuild: _options.customizers?.userPrimaryGuild ?? defaultCustomizer,
      voiceRegion: _options.customizers?.voiceRegion ?? defaultCustomizer,
      voiceState: _options.customizers?.voiceState ?? defaultCustomizer,
      webhook: _options.customizers?.webhook ?? defaultCustomizer,
      welcomeScreen: _options.customizers?.welcomeScreen ?? defaultCustomizer,
      widget: _options.customizers?.widget ?? defaultCustomizer,
      widgetSettings: _options.customizers?.widgetSettings ?? defaultCustomizer,
    },
    desiredProperties: createDesiredPropertiesObject(_options.desiredProperties ?? {}),
    reverse: {
      activity: _options.reverse?.activity ?? transformActivityToDiscordActivity,
      allowedMentions: _options.reverse?.allowedMentions ?? transformAllowedMentionsToDiscordAllowedMentions,
      application: _options.reverse?.application ?? transformApplicationToDiscordApplication,
      applicationCommand: _options.reverse?.applicationCommand ?? transformApplicationCommandToDiscordApplicationCommand,
      applicationCommandOption: _options.reverse?.applicationCommandOption ?? transformApplicationCommandOptionToDiscordApplicationCommandOption,
      applicationCommandOptionChoice:
        _options.reverse?.applicationCommandOptionChoice ?? transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice,
      attachment: _options.reverse?.attachment ?? transformAttachmentToDiscordAttachment,
      component: _options.reverse?.component ?? transformComponentToDiscordComponent,
      embed: _options.reverse?.embed ?? transformEmbedToDiscordEmbed,
      mediaGalleryItem: _options.reverse?.mediaGalleryItem ?? transformMediaGalleryItemToDiscordMediaGalleryItem,
      member: _options.reverse?.member ?? transformMemberToDiscordMember,
      snowflake: _options.reverse?.snowflake ?? bigintToSnowflake,
      team: _options.reverse?.team ?? transformTeamToDiscordTeam,
      unfurledMediaItem: _options.reverse?.unfurledMediaItem ?? transformUnfurledMediaItemToDiscordUnfurledMediaItem,
      user: _options.reverse?.user ?? transformUserToDiscordUser,
    },
    activity: _options.activity ?? transformActivity,
    activityInstance: _options.activityInstance ?? transformActivityInstance,
    activityLocation: _options.activityLocation ?? transformActivityLocation,
    application: _options.application ?? transformApplication,
    applicationCommand: _options.applicationCommand ?? transformApplicationCommand,
    applicationCommandOption: _options.applicationCommandOption ?? transformApplicationCommandOption,
    applicationCommandOptionChoice: _options.applicationCommandOptionChoice ?? transformApplicationCommandOptionChoice,
    applicationCommandPermission: _options.applicationCommandPermission ?? transformApplicationCommandPermission,
    attachment: _options.attachment ?? transformAttachment,
    auditLogEntry: _options.auditLogEntry ?? transformAuditLogEntry,
    automodActionExecution: _options.automodActionExecution ?? transformAutoModerationActionExecution,
    automodRule: _options.automodRule ?? transformAutoModerationRule,
    avatarDecorationData: _options.avatarDecorationData ?? transformAvatarDecorationData,
    channel: _options.channel ?? transformChannel,
    collectibles: _options.collectibles ?? transformCollectibles,
    component: _options.component ?? transformComponent,
    defaultReactionEmoji: _options.defaultReactionEmoji ?? transformDefaultReactionEmoji,
    embed: _options.embed ?? transformEmbed,
    emoji: _options.emoji ?? transformEmoji,
    entitlement: _options.entitlement ?? transformEntitlement,
    forumTag: _options.forumTag ?? transformForumTag,
    gatewayBot: _options.gatewayBot ?? transformGatewayBot,
    guild: _options.guild ?? transformGuild,
    guildOnboarding: _options.guildOnboarding ?? transformGuildOnboarding,
    guildOnboardingPrompt: _options.guildOnboardingPrompt ?? transformGuildOnboardingPrompt,
    guildOnboardingPromptOption: _options.guildOnboardingPromptOption ?? transformGuildOnboardingPromptOption,
    incidentsData: _options.incidentsData ?? transformIncidentsData,
    integration: _options.integration ?? transformIntegration,
    interaction: _options.interaction ?? transformInteraction,
    interactionCallback: _options.interactionCallback ?? transformInteractionCallback,
    interactionCallbackResponse: _options.interactionCallbackResponse ?? transformInteractionCallbackResponse,
    interactionDataOptions: _options.interactionDataOptions ?? transformInteractionDataOption,
    interactionDataResolved: _options.interactionDataResolved ?? transformInteractionDataResolved,
    interactionResource: _options.interactionResource ?? transformInteractionResource,
    invite: _options.invite ?? transformInvite,
    inviteStageInstance: _options.inviteStageInstance ?? transformInviteStageInstance,
    lobby: _options.lobby ?? transformLobby,
    lobbyMember: _options.lobbyMember ?? transformLobbyMember,
    mediaGalleryItem: _options.mediaGalleryItem ?? transformMediaGalleryItem,
    member: _options.member ?? transformMember,
    message: _options.message ?? transformMessage,
    messageCall: _options.messageCall ?? transformMessageCall,
    messageInteractionMetadata: _options.messageInteractionMetadata ?? transformMessageInteractionMetadata,
    messagePin: _options.messagePin ?? transformMessagePin,
    messageSnapshot: _options.messageSnapshot ?? transformMessageSnapshot,
    nameplate: _options.nameplate ?? transformNameplate,
    poll: _options.poll ?? transformPoll,
    pollMedia: _options.pollMedia ?? transformPollMedia,
    presence: _options.presence ?? transformPresence,
    role: _options.role ?? transformRole,
    roleColors: _options.roleColors ?? transformRoleColors,
    scheduledEvent: _options.scheduledEvent ?? transformScheduledEvent,
    scheduledEventRecurrenceRule: _options.scheduledEventRecurrenceRule ?? transformScheduledEventRecurrenceRule,
    sku: _options.sku ?? transformSku,
    soundboardSound: _options.soundboardSound ?? transformSoundboardSound,
    snowflake: _options.snowflake ?? snowflakeToBigint,
    stageInstance: _options.stageInstance ?? transformStageInstance,
    sticker: _options.sticker ?? transformSticker,
    stickerPack: _options.stickerPack ?? transformStickerPack,
    subscription: _options.subscription ?? transformSubscription,
    team: _options.team ?? transformTeam,
    template: _options.template ?? transformTemplate,
    threadMember: _options.threadMember ?? transformThreadMember,
    threadMemberGuildCreate: _options.threadMemberGuildCreate ?? transformThreadMemberGuildCreate,
    unfurledMediaItem: _options.unfurledMediaItem ?? transformUnfurledMediaItem,
    user: _options.user ?? transformUser,
    userPrimaryGuild: _options.userPrimaryGuild ?? transformUserPrimaryGuild,
    voiceRegion: _options.voiceRegion ?? transformVoiceRegion,
    voiceState: _options.voiceState ?? transformVoiceState,
    webhook: _options.webhook ?? transformWebhook,
    welcomeScreen: _options.welcomeScreen ?? transformWelcomeScreen,
    widget: _options.widget ?? transformWidget,
    widgetSettings: _options.widgetSettings ?? transformWidgetSettings,
  } satisfies Transformers<TransformersDesiredProperties, DesiredPropertiesBehavior.RemoveKey> as unknown as Transformers<TProps, TBehavior>
}
