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
  DiscordInviteMetadata,
  DiscordInviteStageInstance,
  DiscordLobby,
  DiscordLobbyMember,
  DiscordMediaGalleryItem,
  DiscordMember,
  DiscordMessage,
  DiscordMessageCall,
  DiscordMessageComponent,
  DiscordMessageComponentFromModalInteractionResponse,
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
} from './desiredProperties.js'
import { transformActivity, transformActivityInstance, transformActivityLocation } from './transformers/activity.js'
import { transformApplication } from './transformers/application.js'
import { transformApplicationCommand } from './transformers/applicationCommand.js'
import { transformApplicationCommandOption } from './transformers/applicationCommandOption.js'
import { transformApplicationCommandOptionChoice } from './transformers/applicationCommandOptionChoice.js'
import { transformApplicationCommandPermission } from './transformers/applicationCommandPermission.js'
import { transformAttachment } from './transformers/attachment.js'
import { transformAuditLogEntry } from './transformers/auditLogEntry.js'
import { transformAutoModerationActionExecution } from './transformers/automodActionExecution.js'
import { transformAutoModerationRule } from './transformers/automodRule.js'
import { transformAvatarDecorationData } from './transformers/avatarDecorationData.js'
import { transformChannel, transformForumTag } from './transformers/channel.js'
import { transformComponent, transformMediaGalleryItem, transformUnfurledMediaItem } from './transformers/component.js'
import { transformEmbed } from './transformers/embed.js'
import { transformDefaultReactionEmoji, transformEmoji } from './transformers/emoji.js'
import { transformEntitlement } from './transformers/entitlement.js'
import { transformGatewayBot } from './transformers/gatewayBot.js'
import { transformGuild } from './transformers/guild.js'
import { transformIncidentsData } from './transformers/incidentsData.js'
import { transformIntegration } from './transformers/integration.js'
import {
  transformInteraction,
  transformInteractionCallback,
  transformInteractionCallbackResponse,
  transformInteractionDataOption,
  transformInteractionDataResolved,
  transformInteractionResource,
} from './transformers/interaction.js'
import { transformInvite } from './transformers/invite.js'
import { transformLobby, transformLobbyMember } from './transformers/lobby.js'
import { transformMember } from './transformers/member.js'
import {
  transformMessage,
  transformMessageCall,
  transformMessageInteractionMetadata,
  transformMessagePin,
  transformMessageSnapshot,
} from './transformers/message.js'
import { transformGuildOnboarding, transformGuildOnboardingPrompt, transformGuildOnboardingPromptOption } from './transformers/onboarding.js'
import { transformPoll, transformPollMedia } from './transformers/poll.js'
import { transformPresence } from './transformers/presence.js'
import { transformActivityToDiscordActivity } from './transformers/reverse/activity.js'
import { transformAllowedMentionsToDiscordAllowedMentions } from './transformers/reverse/allowedMentions.js'
import { transformApplicationToDiscordApplication } from './transformers/reverse/application.js'
import { transformApplicationCommandToDiscordApplicationCommand } from './transformers/reverse/applicationCommand.js'
import { transformApplicationCommandOptionToDiscordApplicationCommandOption } from './transformers/reverse/applicationCommandOption.js'
import { transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice } from './transformers/reverse/applicationCommandOptionChoice.js'
import { transformAttachmentToDiscordAttachment } from './transformers/reverse/attachment.js'
import {
  transformComponentToDiscordComponent,
  transformMediaGalleryItemToDiscordMediaGalleryItem,
  transformUnfurledMediaItemToDiscordUnfurledMediaItem,
} from './transformers/reverse/component.js'
import { transformEmbedToDiscordEmbed } from './transformers/reverse/embed.js'
import { transformMemberToDiscordMember, transformUserToDiscordUser } from './transformers/reverse/member.js'
import { transformTeamToDiscordTeam } from './transformers/reverse/team.js'
import { transformRole, transformRoleColors } from './transformers/role.js'
import { transformScheduledEvent, transformScheduledEventRecurrenceRule } from './transformers/scheduledEvent.js'
import { transformSku } from './transformers/sku.js'
import { transformSoundboardSound } from './transformers/soundboardSound.js'
import { transformStageInstance } from './transformers/stageInstance.js'
import { transformInviteStageInstance } from './transformers/stageInviteInstance.js'
import { transformSticker, transformStickerPack } from './transformers/sticker.js'
import { transformSubscription } from './transformers/subscription.js'
import { transformTeam } from './transformers/team.js'
import { transformTemplate } from './transformers/template.js'
import { type ThreadMemberTransformerExtra, transformThreadMember, transformThreadMemberGuildCreate } from './transformers/threadMember.js'
import type {
  Activity,
  ActivityInstance,
  ActivityLocation,
  Application,
  ApplicationCommand,
  ApplicationCommandOption,
  ApplicationCommandOptionChoice,
  Attachment,
  AuditLogEntry,
  AutoModerationActionExecution,
  AutoModerationRule,
  AvatarDecorationData,
  Channel,
  Collectibles,
  Component,
  DefaultReactionEmoji,
  Embed,
  Emoji,
  Entitlement,
  ForumTag,
  GetGatewayBot,
  Guild,
  GuildApplicationCommandPermissions,
  GuildOnboarding,
  GuildOnboardingPrompt,
  GuildOnboardingPromptOption,
  GuildWidget,
  GuildWidgetSettings,
  IncidentsData,
  Integration,
  Interaction,
  InteractionCallback,
  InteractionCallbackResponse,
  InteractionDataOption,
  InteractionDataResolved,
  InteractionResource,
  Invite,
  InviteStageInstance,
  Lobby,
  LobbyMember,
  MediaGalleryItem,
  Member,
  Message,
  MessageCall,
  MessageInteractionMetadata,
  MessagePin,
  MessageSnapshot,
  Nameplate,
  Poll,
  PollMedia,
  PresenceUpdate,
  Role,
  RoleColors,
  ScheduledEvent,
  ScheduledEventRecurrenceRule,
  Sku,
  SoundboardSound,
  StageInstance,
  Sticker,
  StickerPack,
  Subscription,
  Team,
  Template,
  ThreadMember,
  ThreadMemberGuildCreate,
  UnfurledMediaItem,
  User,
  UserPrimaryGuild,
  VoiceRegion,
  VoiceState,
  Webhook,
  WelcomeScreen,
} from './transformers/types.js'
import { transformCollectibles, transformNameplate, transformUser, transformUserPrimaryGuild } from './transformers/user.js'
import { transformVoiceRegion } from './transformers/voiceRegion.js'
import { transformVoiceState } from './transformers/voiceState.js'
import { transformWebhook } from './transformers/webhook.js'
import { transformWelcomeScreen } from './transformers/welcomeScreen.js'
import { transformWidget } from './transformers/widget.js'
import { transformWidgetSettings } from './transformers/widgetSettings.js'

export type TransformerInformations = {
  activity: TransformerInformation<DiscordActivity, Activity, false>
  activityInstance: TransformerInformation<DiscordActivityInstance, ActivityInstance, true>
  activityLocation: TransformerInformation<DiscordActivityLocation, ActivityLocation, true>
  application: TransformerInformation<DiscordApplication, Application, true, { shardId?: number }>
  applicationCommand: TransformerInformation<DiscordApplicationCommand, ApplicationCommand, false>
  applicationCommandOption: TransformerInformation<DiscordApplicationCommandOption, ApplicationCommandOption, false>
  applicationCommandOptionChoice: TransformerInformation<DiscordApplicationCommandOptionChoice, ApplicationCommandOptionChoice, false>
  applicationCommandPermission: TransformerInformation<DiscordGuildApplicationCommandPermissions, GuildApplicationCommandPermissions, false>
  attachment: TransformerInformation<DiscordAttachment, Attachment, true>
  auditLogEntry: TransformerInformation<DiscordAuditLogEntry, AuditLogEntry, false>
  automodActionExecution: TransformerInformation<DiscordAutoModerationActionExecution, AutoModerationActionExecution, false>
  automodRule: TransformerInformation<DiscordAutoModerationRule, AutoModerationRule, false>
  avatarDecorationData: TransformerInformation<DiscordAvatarDecorationData, AvatarDecorationData, true>
  channel: TransformerInformation<DiscordChannel, Channel, true, { guildId?: BigString }>
  collectibles: TransformerInformation<DiscordCollectibles, Collectibles, true>
  component: TransformerInformation<DiscordMessageComponent | DiscordMessageComponentFromModalInteractionResponse, Component, true>
  defaultReactionEmoji: TransformerInformation<DiscordDefaultReactionEmoji, DefaultReactionEmoji, true>
  embed: TransformerInformation<DiscordEmbed, Embed, false>
  emoji: TransformerInformation<DiscordEmoji, Emoji, true>
  entitlement: TransformerInformation<DiscordEntitlement, Entitlement, true>
  forumTag: TransformerInformation<DiscordForumTag, ForumTag, true>
  gatewayBot: TransformerInformation<DiscordGetGatewayBot, GetGatewayBot, false>
  guild: TransformerInformation<DiscordGuild, Guild, true, { shardId?: number }>
  guildOnboarding: TransformerInformation<DiscordGuildOnboarding, GuildOnboarding, true>
  guildOnboardingPrompt: TransformerInformation<DiscordGuildOnboardingPrompt, GuildOnboardingPrompt, true>
  guildOnboardingPromptOption: TransformerInformation<DiscordGuildOnboardingPromptOption, GuildOnboardingPromptOption, true>
  incidentsData: TransformerInformation<DiscordIncidentsData, IncidentsData, true>
  integration: TransformerInformation<DiscordIntegrationCreateUpdate, Integration, false>
  interaction: TransformerInformation<DiscordInteraction, Interaction, true, { shardId?: number }>
  interactionCallback: TransformerInformation<DiscordInteractionCallback, InteractionCallback, true>
  interactionCallbackResponse: TransformerInformation<DiscordInteractionCallbackResponse, InteractionCallbackResponse, true, { shardId?: number }>
  interactionDataOptions: TransformerInformation<DiscordInteractionDataOption, InteractionDataOption, false>
  interactionDataResolved: TransformerInformation<
    DiscordInteractionDataResolved,
    InteractionDataResolved,
    true,
    { shardId?: number; guildId?: BigString }
  >
  interactionResource: TransformerInformation<DiscordInteractionResource, InteractionResource, true, { shardId?: number }>
  invite: TransformerInformation<DiscordInviteMetadata, Invite, true, { shardId?: number }>
  inviteStageInstance: TransformerInformation<DiscordInviteStageInstance, InviteStageInstance, true, { guildId?: BigString }>
  lobby: TransformerInformation<DiscordLobby, Lobby, true>
  lobbyMember: TransformerInformation<DiscordLobbyMember, LobbyMember, true>
  mediaGalleryItem: TransformerInformation<DiscordMediaGalleryItem, MediaGalleryItem, true>
  member: TransformerInformation<DiscordMember, Member, true, { guildId?: BigString; userId?: BigString }>
  message: TransformerInformation<DiscordMessage, Message, true, { shardId?: number }>
  messageCall: TransformerInformation<DiscordMessageCall, MessageCall, true>
  messageInteractionMetadata: TransformerInformation<DiscordMessageInteractionMetadata, MessageInteractionMetadata, true>
  messagePin: TransformerInformation<DiscordMessagePin, MessagePin, true, { shardId?: number }>
  messageSnapshot: TransformerInformation<DiscordMessageSnapshot, MessageSnapshot, true, { shardId?: number }>
  nameplate: TransformerInformation<DiscordNameplate, Nameplate, true>
  poll: TransformerInformation<DiscordPoll, Poll, true>
  pollMedia: TransformerInformation<DiscordPollMedia, PollMedia, true>
  presence: TransformerInformation<DiscordPresenceUpdate, PresenceUpdate, true>
  role: TransformerInformation<DiscordRole, Role, true, { guildId?: BigString }>
  roleColors: TransformerInformation<DiscordRoleColors, RoleColors, true>
  scheduledEvent: TransformerInformation<DiscordScheduledEvent, ScheduledEvent, true>
  scheduledEventRecurrenceRule: TransformerInformation<DiscordScheduledEventRecurrenceRule, ScheduledEventRecurrenceRule, true>
  sku: TransformerInformation<DiscordSku, Sku, true>
  soundboardSound: TransformerInformation<DiscordSoundboardSound, SoundboardSound, true>
  stageInstance: TransformerInformation<DiscordStageInstance, StageInstance, true>
  sticker: TransformerInformation<DiscordSticker, Sticker, true>
  stickerPack: TransformerInformation<DiscordStickerPack, StickerPack, false>
  subscription: TransformerInformation<DiscordSubscription, Subscription, true>
  team: TransformerInformation<DiscordTeam, Team, false>
  template: TransformerInformation<DiscordTemplate, Template, false>
  threadMember: TransformerInformation<DiscordThreadMember, ThreadMember, false, ThreadMemberTransformerExtra>
  threadMemberGuildCreate: TransformerInformation<DiscordThreadMemberGuildCreate, ThreadMemberGuildCreate, false>
  unfurledMediaItem: TransformerInformation<DiscordUnfurledMediaItem, UnfurledMediaItem, true>
  user: TransformerInformation<DiscordUser, User, true>
  userPrimaryGuild: TransformerInformation<DiscordUserPrimaryGuild, UserPrimaryGuild, true>
  voiceRegion: TransformerInformation<DiscordVoiceRegion, VoiceRegion, false>
  voiceState: TransformerInformation<DiscordVoiceState, VoiceState, true, { guildId?: BigString }>
  webhook: TransformerInformation<DiscordWebhook, Webhook, true>
  welcomeScreen: TransformerInformation<DiscordWelcomeScreen, WelcomeScreen, false>
  widget: TransformerInformation<DiscordGuildWidget, GuildWidget, false>
  widgetSettings: TransformerInformation<DiscordGuildWidgetSettings, GuildWidgetSettings, false>
}

export type Transformers<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior> = TransformerFunctions<
  TProps,
  TBehavior
> & {
  customizers: TransformerCustomizers<TProps, TBehavior>
  desiredProperties: TProps
  reverse: {
    activity: (bot: Bot<TProps, TBehavior>, payload: Activity) => DiscordActivity
    allowedMentions: (bot: Bot<TProps, TBehavior>, payload: AllowedMentions) => DiscordAllowedMentions
    application: (bot: Bot<TProps, TBehavior>, payload: Application) => DiscordApplication
    applicationCommand: (bot: Bot<TProps, TBehavior>, payload: ApplicationCommand) => DiscordApplicationCommand
    applicationCommandOption: (bot: Bot<TProps, TBehavior>, payload: ApplicationCommandOption) => DiscordApplicationCommandOption
    applicationCommandOptionChoice: (bot: Bot<TProps, TBehavior>, payload: ApplicationCommandOptionChoice) => DiscordApplicationCommandOptionChoice
    attachment: (bot: Bot<TProps, TBehavior>, payload: SetupDesiredProps<Attachment, TProps, TBehavior>) => DiscordAttachment
    component: (bot: Bot<TProps, TBehavior>, payload: Component) => DiscordMessageComponent | DiscordMessageComponentFromModalInteractionResponse
    embed: (bot: Bot<TProps, TBehavior>, payload: Embed) => DiscordEmbed
    mediaGalleryItem: (bot: Bot<TProps, TBehavior>, payload: MediaGalleryItem) => DiscordMediaGalleryItem
    member: (bot: Bot<TProps, TBehavior>, payload: SetupDesiredProps<Member, TProps, TBehavior>) => DiscordMember
    snowflake: (snowflake: BigString) => string
    team: (bot: Bot<TProps, TBehavior>, payload: Team) => DiscordTeam
    unfurledMediaItem: (bot: Bot<TProps, TBehavior>, payload: UnfurledMediaItem) => DiscordUnfurledMediaItem
    user: (bot: Bot<TProps, TBehavior>, payload: SetupDesiredProps<User, TProps, TBehavior>) => DiscordUser
  }
  snowflake: (snowflake: BigString) => bigint
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

/**
 * Information about a transformer including its payload and transformed types.
 *
 * @template TPayload - The type of the payload received from Discord.
 * @template TTransformed - The type of the transformed object returned by the transformer.
 * @template TExtra - Additional extra information that might be needed for transformation.
 * @template TPartial - Indicates if the transformer supports partial payloads.
 */
export type TransformerInformation<TPayload, TTransformed, TPartial extends boolean, TExtra = {}> = {
  payload: TPayload
  transformed: TTransformed
  extra: TExtra
  partial: TPartial
}

/**
 * A function that transforms a payload from Discord into a desired format.
 *
 * @template TProps - The desired properties for the transformer.
 * @template TBehavior - The behavior for handling desired properties.
 * @template TPayload - The type of the payload received from Discord.
 * @template TTransformed - The type of the transformed object returned by the transformer.
 * @template TExtra - Additional extra information that might be needed for transformation.
 * @template TPartial - Indicates if the transformer supports partial payloads.
 */
export type TransformerFunction<
  TProps extends TransformersDesiredProperties,
  TBehavior extends DesiredPropertiesBehavior,
  TPayload,
  TTransformed,
  TExtra = {},
  TPartial extends boolean = false,
> = TPartial extends true
  ? // We use the method syntax for functions (...Params): ReturnType instead of the arrow syntax because it allows us to have overloads in the type
    {
      (bot: Bot<TProps, TBehavior>, payload: TPayload, extra?: TExtra & { partial?: false }): SetupDesiredProps<TTransformed, TProps, TBehavior>
      (
        bot: Bot<TProps, TBehavior>,
        payload: Partial<TPayload>,
        extra: TExtra & { partial: true },
      ): Partial<SetupDesiredProps<TTransformed, TProps, TBehavior>>
    }
  : // Even if we don't need to overload, since the 2 syntaxes have slightly different semantics, we use the method syntax in here as well
    { (bot: Bot<TProps, TBehavior>, payload: TPayload, extra?: TExtra): SetupDesiredProps<TTransformed, TProps, TBehavior> }

/**
 * A collection of transformer functions for various Discord entities.
 *
 * @template TProps - The desired properties for the transformers.
 * @template TBehavior - The behavior for handling desired properties.
 */
export type TransformerFunctions<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior> = {
  [K in keyof TransformerInformations]: TransformerFunction<
    TProps,
    TBehavior,
    TransformerInformations[K]['payload'],
    TransformerInformations[K]['transformed'],
    TransformerInformations[K]['extra'],
    TransformerInformations[K]['partial']
  >
}

/**
 * A function that customizes the transformed object after the initial transformation.
 *
 * @template TProps - The desired properties for the transformer.
 * @template TBehavior - The behavior for handling desired properties.
 * @template TPayload - The type of the payload received from Discord.
 * @template TTransformed - The type of the transformed object returned by the transformer.
 * @template TExtra - Additional extra information that might be needed for customization.
 * @template TPartial - Indicates if the transformer supports partial payloads.
 */
export type TransformerCustomizerFunction<
  TProps extends TransformersDesiredProperties,
  TBehavior extends DesiredPropertiesBehavior,
  TPayload,
  TTransformed,
  TExtra = {},
  TPartial extends boolean = false,
> = TPartial extends true
  ? // We use the method syntax for functions (...Params): ReturnType instead of the arrow syntax because it allows us to have overloads in the type
    {
      (
        bot: Bot<TProps, TBehavior>,
        payload: TPayload,
        transformed: SetupDesiredProps<TTransformed, TProps, TBehavior>,
        extra: TExtra & { partial: false },
      ): any
      (
        bot: Bot<TProps, TBehavior>,
        payload: Partial<TPayload>,
        transformed: Partial<SetupDesiredProps<TTransformed, TProps, TBehavior>>,
        extra: TExtra & { partial: true },
      ): any
    }
  : // Even if we don't need to overload, since the 2 syntaxes have slightly different semantics, we use the method syntax in here as well
    {
      (bot: Bot<TProps, TBehavior>, payload: TPayload, transformed: SetupDesiredProps<TTransformed, TProps, TBehavior>, extra?: TExtra): any
    }

/**
 * A collection of transformer customizer functions for various Discord entities.
 *
 * @template TProps - The desired properties for the transformers.
 * @template TBehavior - The behavior for handling desired properties.
 */
export type TransformerCustomizers<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior> = {
  [K in keyof TransformerInformations]: TransformerCustomizerFunction<
    TProps,
    TBehavior,
    TransformerInformations[K]['payload'],
    TransformerInformations[K]['transformed'],
    BigStringsToBigints<TransformerInformations[K]['extra']>,
    TransformerInformations[K]['partial']
  >
}

/**
 * Converting BigString properties in T to bigint, leaving other properties unchanged.
 *
 * @template T - The object type to transform.
 */
export type BigStringsToBigints<T> = {
  [K in keyof T]: BigString extends T[K] ? bigint : T[K]
}

/**
 * Calls a transformer customizer function with the provided parameters.
 *
 * @template TInfo - The key of the transformer information to use.
 * @param customizer - The key of the transformer information to use.
 * @param bot - The bot instance.
 * @param payload - The original payload from Discord.
 * @param transformed - The transformed object.
 * @param extra - Additional extra information for the customizer.
 * @returns The result of the customizer function.
 *
 * @remarks
 * This function is used because it is hard to deal with the customizer overloads directly in the transformers.
 *
 * Since the overloads are present only with partial transformers, this function requires the partial extra, for non-partial transformers the normal function call can be used
 */
export function callCustomizer<TInfo extends keyof TransformerInformations>(
  customizer: TInfo,
  bot: Bot,
  payload: TransformerInformations[TInfo]['payload'] | Partial<TransformerInformations[TInfo]['payload']>,
  transformed:
    | SetupDesiredProps<TransformerInformations[TInfo]['transformed'], TransformersDesiredProperties, DesiredPropertiesBehavior>
    | Partial<SetupDesiredProps<TransformerInformations[TInfo]['transformed'], TransformersDesiredProperties, DesiredPropertiesBehavior>>,
  extra: TransformerInformations[typeof customizer]['extra'] & { partial: boolean },
): any {
  // The type of the customizer is not generalizable, so we use unknown, callCustomizer has the correct type and we cast it here
  const customizerFn = bot.transformers.customizers[customizer] as (bot: Bot, payload: unknown, transformed: unknown, extra: unknown) => any

  return customizerFn(bot, payload, transformed, extra)
}
