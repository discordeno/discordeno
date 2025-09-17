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
  type TransformersObjects,
  type TransformProperty,
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

export type TransformerFunctions<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior> = {
  activity: TransformerFunction<TProps, TBehavior, DiscordActivity, Activity, {}, 'unchanged'>
  activityInstance: TransformerFunction<TProps, TBehavior, DiscordActivityInstance, ActivityInstance>
  activityLocation: TransformerFunction<TProps, TBehavior, DiscordActivityLocation, ActivityLocation>
  application: TransformerFunction<TProps, TBehavior, DiscordApplication, Application, { shardId?: number }, 'unchanged'>
  applicationCommand: TransformerFunction<TProps, TBehavior, DiscordApplicationCommand, ApplicationCommand, {}, 'unchanged'>
  applicationCommandOption: TransformerFunction<TProps, TBehavior, DiscordApplicationCommandOption, ApplicationCommandOption, {}, 'unchanged'>
  applicationCommandOptionChoice: TransformerFunction<
    TProps,
    TBehavior,
    DiscordApplicationCommandOptionChoice,
    ApplicationCommandOptionChoice,
    {},
    'unchanged'
  >
  applicationCommandPermission: TransformerFunction<
    TProps,
    TBehavior,
    DiscordGuildApplicationCommandPermissions,
    GuildApplicationCommandPermissions,
    {},
    'unchanged'
  >
  attachment: TransformerFunction<TProps, TBehavior, DiscordAttachment, Attachment>
  auditLogEntry: TransformerFunction<TProps, TBehavior, DiscordAuditLogEntry, AuditLogEntry, {}, 'unchanged'>
  automodActionExecution: TransformerFunction<TProps, TBehavior, DiscordAutoModerationActionExecution, AutoModerationActionExecution, {}, 'unchanged'>
  automodRule: TransformerFunction<TProps, TBehavior, DiscordAutoModerationRule, AutoModerationRule, {}, 'unchanged'>
  avatarDecorationData: TransformerFunction<TProps, TBehavior, DiscordAvatarDecorationData, AvatarDecorationData>
  channel: TransformerFunction<TProps, TBehavior, DiscordChannel, Channel, { guildId?: BigString }>
  collectibles: TransformerFunction<TProps, TBehavior, DiscordCollectibles, Collectibles>
  component: TransformerFunction<
    TProps,
    TBehavior,
    DiscordMessageComponent | DiscordMessageComponentFromModalInteractionResponse,
    Component,
    {},
    'unchanged'
  >
  defaultReactionEmoji: TransformerFunction<TProps, TBehavior, DiscordDefaultReactionEmoji, DefaultReactionEmoji>
  embed: TransformerFunction<TProps, TBehavior, DiscordEmbed, Embed, {}, 'unchanged'>
  emoji: TransformerFunction<TProps, TBehavior, DiscordEmoji, Emoji>
  entitlement: TransformerFunction<TProps, TBehavior, DiscordEntitlement, Entitlement>
  forumTag: TransformerFunction<TProps, TBehavior, DiscordForumTag, ForumTag>
  gatewayBot: TransformerFunction<TProps, TBehavior, DiscordGetGatewayBot, GetGatewayBot, {}, 'unchanged'>
  guild: TransformerFunction<TProps, TBehavior, DiscordGuild, Guild, { shardId?: number }>
  guildOnboarding: TransformerFunction<TProps, TBehavior, DiscordGuildOnboarding, GuildOnboarding>
  guildOnboardingPrompt: TransformerFunction<TProps, TBehavior, DiscordGuildOnboardingPrompt, GuildOnboardingPrompt>
  guildOnboardingPromptOption: TransformerFunction<TProps, TBehavior, DiscordGuildOnboardingPromptOption, GuildOnboardingPromptOption>
  incidentsData: TransformerFunction<TProps, TBehavior, DiscordIncidentsData, IncidentsData>
  integration: TransformerFunction<TProps, TBehavior, DiscordIntegrationCreateUpdate, Integration, {}, 'unchanged'>
  interaction: TransformerFunction<TProps, TBehavior, DiscordInteraction, Interaction, { shardId?: number }>
  interactionCallback: TransformerFunction<TProps, TBehavior, DiscordInteractionCallback, InteractionCallback>
  interactionCallbackResponse: TransformerFunction<
    TProps,
    TBehavior,
    DiscordInteractionCallbackResponse,
    InteractionCallbackResponse,
    { shardId?: number }
  >
  interactionDataOptions: TransformerFunction<TProps, TBehavior, DiscordInteractionDataOption, InteractionDataOption, {}, 'unchanged'>
  interactionDataResolved: TransformerFunction<
    TProps,
    TBehavior,
    DiscordInteractionDataResolved,
    InteractionDataResolved,
    { shardId?: number; guildId?: BigString },
    'transform'
  >
  interactionResource: TransformerFunction<TProps, TBehavior, DiscordInteractionResource, InteractionResource, { shardId?: number }>
  invite: TransformerFunction<TProps, TBehavior, DiscordInviteCreate | DiscordInviteMetadata, Invite, { shardId?: number }>
  inviteStageInstance: TransformerFunction<TProps, TBehavior, DiscordInviteStageInstance, InviteStageInstance, { guildId?: BigString }>
  lobby: TransformerFunction<TProps, TBehavior, DiscordLobby, Lobby>
  lobbyMember: TransformerFunction<TProps, TBehavior, DiscordLobbyMember, LobbyMember>
  mediaGalleryItem: TransformerFunction<TProps, TBehavior, DiscordMediaGalleryItem, MediaGalleryItem, {}, 'unchanged'>
  member: TransformerFunction<TProps, TBehavior, DiscordMember, Member, { guildId?: BigString; userId?: BigString }>
  message: TransformerFunction<TProps, TBehavior, DiscordMessage, Message, { shardId?: number }>
  messageCall: TransformerFunction<TProps, TBehavior, DiscordMessageCall, MessageCall>
  messageInteractionMetadata: TransformerFunction<TProps, TBehavior, DiscordMessageInteractionMetadata, MessageInteractionMetadata>
  messagePin: TransformerFunction<TProps, TBehavior, DiscordMessagePin, MessagePin, { shardId?: number }>
  messageSnapshot: TransformerFunction<TProps, TBehavior, DiscordMessageSnapshot, MessageSnapshot, { shardId?: number }>
  nameplate: TransformerFunction<TProps, TBehavior, DiscordNameplate, Nameplate>
  poll: TransformerFunction<TProps, TBehavior, DiscordPoll, Poll>
  pollMedia: TransformerFunction<TProps, TBehavior, DiscordPollMedia, PollMedia>
  presence: TransformerFunction<TProps, TBehavior, DiscordPresenceUpdate, PresenceUpdate, {}, 'unchanged'>
  role: TransformerFunction<TProps, TBehavior, DiscordRole, Role, { guildId?: BigString }>
  roleColors: TransformerFunction<TProps, TBehavior, DiscordRoleColors, RoleColors>
  scheduledEvent: TransformerFunction<TProps, TBehavior, DiscordScheduledEvent, ScheduledEvent>
  scheduledEventRecurrenceRule: TransformerFunction<TProps, TBehavior, DiscordScheduledEventRecurrenceRule, ScheduledEventRecurrenceRule>
  sku: TransformerFunction<TProps, TBehavior, DiscordSku, Sku>
  soundboardSound: TransformerFunction<TProps, TBehavior, DiscordSoundboardSound, SoundboardSound>
  stageInstance: TransformerFunction<TProps, TBehavior, DiscordStageInstance, StageInstance>
  sticker: TransformerFunction<TProps, TBehavior, DiscordSticker, Sticker>
  stickerPack: TransformerFunction<TProps, TBehavior, DiscordStickerPack, StickerPack, {}, 'unchanged'>
  subscription: TransformerFunction<TProps, TBehavior, DiscordSubscription, Subscription>
  team: TransformerFunction<TProps, TBehavior, DiscordTeam, Team, {}, 'unchanged'>
  template: TransformerFunction<TProps, TBehavior, DiscordTemplate, Template, {}, 'unchanged'>
  threadMember: TransformerFunction<TProps, TBehavior, DiscordThreadMember, ThreadMember, ThreadMemberTransformerExtra, 'unchanged'>
  threadMemberGuildCreate: TransformerFunction<TProps, TBehavior, DiscordThreadMemberGuildCreate, ThreadMemberGuildCreate, {}, 'unchanged'>
  unfurledMediaItem: TransformerFunction<TProps, TBehavior, DiscordUnfurledMediaItem, UnfurledMediaItem, {}, 'unchanged'>
  user: TransformerFunction<TProps, TBehavior, DiscordUser, User>
  userPrimaryGuild: TransformerFunction<TProps, TBehavior, DiscordUserPrimaryGuild, UserPrimaryGuild>
  voiceRegion: TransformerFunction<TProps, TBehavior, DiscordVoiceRegion, VoiceRegion, {}, 'unchanged'>
  voiceState: TransformerFunction<TProps, TBehavior, DiscordVoiceState, VoiceState, { guildId?: BigString }>
  webhook: TransformerFunction<TProps, TBehavior, DiscordWebhook, Webhook>
  welcomeScreen: TransformerFunction<TProps, TBehavior, DiscordWelcomeScreen, WelcomeScreen, {}, 'unchanged'>
  widget: TransformerFunction<TProps, TBehavior, DiscordGuildWidget, GuildWidget, {}, 'unchanged'>
  widgetSettings: TransformerFunction<TProps, TBehavior, DiscordGuildWidgetSettings, GuildWidgetSettings, {}, 'unchanged'>
}

export type Transformers<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior> = TransformerFunctions<
  TProps,
  TBehavior
> & {
  customizers: TransformerCustomizers<TProps, TBehavior>
  desiredProperties: TransformersDesiredProperties
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

export type TransformerFunction<
  TProps extends TransformersDesiredProperties,
  TBehavior extends DesiredPropertiesBehavior,
  TPayload,
  TTransformed,
  TExtra = {},
  // Detecting what kind of transformation is being applied is actually pretty hard, so we just do it manually
  TKind extends 'desired-props' | 'transform' | 'unchanged' = 'desired-props',
> = (
  bot: Bot<TProps, TBehavior>,
  payload: TPayload,
  extra?: TExtra,
) => TKind extends 'desired-props'
  ? TTransformed extends TransformersObjects[keyof TransformersObjects]
    ? SetupDesiredProps<TTransformed, TProps, TBehavior>
    : // As fair as i can tell, no transformer is actually in this case
      'ERROR: Invalid transformer kind'
  : TKind extends 'transform'
    ? TransformProperty<TTransformed, TProps, TBehavior>
    : TTransformed

export type TransformerCustomizerFunction<
  TProps extends TransformersDesiredProperties,
  TBehavior extends DesiredPropertiesBehavior,
  TPayload,
  TTransformed,
  TExtra = {},
> = (bot: Bot<TProps, TBehavior>, payload: TPayload, transformed: TTransformed, extra?: TExtra) => any

export type TransformerCustomizers<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior> = {
  [K in keyof TransformerFunctions<TProps, TBehavior>]: TransformerFunctions<TProps, TBehavior>[K] extends TransformerFunction<
    TProps,
    TBehavior,
    infer TPayload,
    infer _TTransformed,
    infer TExtra,
    infer _TKind
  >
    ? TransformerCustomizerFunction<
        TProps,
        TBehavior,
        TPayload,
        // We use ReturnType instead of inferring the transformed value so we don't need to do the logic on the kind as well
        ReturnType<Transformers<TProps, TBehavior>[K]>,
        BigStringsToBigints<TExtra>
      >
    : 'ERROR: Invalid transformer found'
}

export type BigStringsToBigints<T> = {
  [K in keyof T]: BigString extends T[K] ? bigint : T[K]
}
