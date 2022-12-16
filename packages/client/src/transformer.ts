import type {
  AllowedMentions,
  BigString,
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
  DiscordChannel,
  DiscordComponent,
  DiscordCreateApplicationCommand,
  DiscordEmbed,
  DiscordEmoji,
  DiscordGetGatewayBot,
  DiscordGuild,
  DiscordGuildApplicationCommandPermissions,
  DiscordGuildWidget,
  DiscordGuildWidgetSettings,
  DiscordIntegrationCreateUpdate,
  DiscordInteraction,
  DiscordInteractionDataOption,
  DiscordInteractionResponse,
  DiscordInviteCreate,
  DiscordMember,
  DiscordMessage,
  DiscordPresenceUpdate,
  DiscordRole,
  DiscordScheduledEvent,
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
  GetGatewayBot
} from '@discordeno/types'
import { bigintToSnowflake, snowflakeToBigint } from '@discordeno/utils'
import type { Client } from './client.js'
import type {
  Activity,
  Application,
  ApplicationCommand,
  ApplicationCommandOption,
  ApplicationCommandOptionChoice,
  ApplicationCommandPermission,
  Attachment,
  AuditLogEntry,
  AutoModerationActionExecution,
  AutoModerationRule,
  Channel,
  Component,
  Embed,
  Emoji,
  Guild,
  GuildWidget,
  GuildWidgetSettings,
  Integration,
  Interaction,
  InteractionDataOption,
  Invite,
  Member,
  Message,
  PresenceUpdate,
  Role,
  ScheduledEvent,
  StageInstance,
  Sticker,
  StickerPack,
  Team,
  Template,
  ThreadMember,
  User,
  VoiceRegions,
  VoiceState,
  Webhook,
  WelcomeScreen
} from './transformers/index.js'
import {
  transformActivity,
  transformActivityToDiscordActivity,
  transformAllowedMentionsToDiscordAllowedMentions,
  transformApplication,
  transformApplicationCommand,
  transformApplicationCommandOption,
  transformApplicationCommandOptionChoice,
  transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice,
  transformApplicationCommandOptionToDiscordApplicationCommandOption,
  transformApplicationCommandPermission,
  transformApplicationCommandPermissionToDiscordApplicationCommandPermission,
  transformApplicationCommandToDiscordApplicationCommand,
  transformApplicationToDiscordApplication,
  transformAttachment,
  transformAttachmentToDiscordAttachment,
  transformAuditLogEntry,
  transformAuditLogEntryToDiscordAuditLogEntry,
  transformAutoModerationActionExecution,
  transformAutoModerationRule,
  transformChannel,
  transformComponent,
  transformComponentToDiscordComponent,
  transformCreateApplicationCommandToDiscordCreateApplicationCommand,
  transformEmbed,
  transformEmbedToDiscordEmbed,
  transformEmoji,
  transformEmojiToDiscordEmoji,
  transformGatewayBot,
  transformGatewayBotToDiscordGatewayBot,
  transformGuild,
  transformIntegration,
  transformInteraction,
  transformInteractionDataOption,
  transformInteractionResponseToDiscordInteractionResponse,
  transformInvite,
  transformMember,
  transformMemberToDiscordMember,
  transformMessage,
  transformPresence,
  transformPresenceToDiscordPresence,
  transformRole,
  transformScheduledEvent,
  transformStageInstance,
  transformSticker,
  transformStickerPack,
  transformTeam,
  transformTeamToDiscordTeam,
  transformTemplate,
  transformThreadMember,
  transformUser,
  transformUserToDiscordUser,
  transformVoiceRegion,
  transformVoiceState,
  transformWebhook,
  transformWelcomeScreen,
  transformWidget,
  transformWidgetSettings,
  transformWidgetSettingsToDiscordWidgetSettings
} from './transformers/index.js'
import type { CreateApplicationCommand, InteractionResponse } from './types.js'

export interface Transformers {
  reverse: {
    allowedMentions: (
      client: Client,
      payload: AllowedMentions
    ) => DiscordAllowedMentions
    embed: (client: Client, payload: Embed) => DiscordEmbed
    component: (client: Client, payload: Component) => DiscordComponent
    activity: (client: Client, payload: Activity) => DiscordActivity
    member: (client: Client, payload: Member) => DiscordMember
    user: (client: Client, payload: User) => DiscordUser
    team: (client: Client, payload: Team) => DiscordTeam
    application: (client: Client, payload: Application) => DiscordApplication
    snowflake: (snowflake: BigString) => string
    createApplicationCommand: (
      client: Client,
      payload: CreateApplicationCommand
    ) => DiscordCreateApplicationCommand
    applicationCommand: (
      client: Client,
      payload: ApplicationCommand
    ) => DiscordApplicationCommand
    applicationCommandOption: (
      client: Client,
      payload: ApplicationCommandOption
    ) => DiscordApplicationCommandOption
    applicationCommandOptionChoice: (
      client: Client,
      payload: ApplicationCommandOptionChoice
    ) => DiscordApplicationCommandOptionChoice
    interactionResponse: (
      client: Client,
      payload: InteractionResponse
    ) => DiscordInteractionResponse
    attachment: (client: Client, payload: Attachment) => DiscordAttachment
    applicationCommandPermission: (
      client: Client,
      payload: ApplicationCommandPermission
    ) => DiscordGuildApplicationCommandPermissions
    auditLogEntry: (
      client: Client,
      payload: AuditLogEntry
    ) => DiscordAuditLogEntry
    emoji: (client: Client, payload: Emoji) => DiscordEmoji
    gatewayBot: (payload: GetGatewayBot) => DiscordGetGatewayBot
    presence: (
      client: Client,
      payload: PresenceUpdate
    ) => DiscordPresenceUpdate
    widgetSettings: (
      client: Client,
      payload: GuildWidgetSettings
    ) => DiscordGuildWidgetSettings
  }
  snowflake: (snowflake: BigString) => bigint
  gatewayBot: (payload: DiscordGetGatewayBot) => GetGatewayBot
  automodRule: (
    client: Client,
    payload: DiscordAutoModerationRule
  ) => AutoModerationRule
  automodActionExecution: (
    client: Client,
    payload: DiscordAutoModerationActionExecution
  ) => AutoModerationActionExecution
  channel: (
    client: Client,
    payload: { channel: DiscordChannel } & { guildId?: bigint }
  ) => Channel
  guild: (
    client: Client,
    payload: { guild: DiscordGuild } & { shardId: number }
  ) => Guild
  user: (client: Client, payload: DiscordUser) => User
  member: (
    client: Client,
    payload: DiscordMember,
    guildId: bigint,
    userId: bigint
  ) => Member
  message: (client: Client, payload: DiscordMessage) => Message
  role: (
    client: Client,
    payload: { role: DiscordRole } & { guildId: bigint }
  ) => Role
  voiceState: (
    client: Client,
    payload: { voiceState: DiscordVoiceState } & { guildId: bigint }
  ) => VoiceState
  interaction: (client: Client, payload: DiscordInteraction) => Interaction
  interactionDataOptions: (
    client: Client,
    payload: DiscordInteractionDataOption
  ) => InteractionDataOption
  integration: (
    client: Client,
    payload: DiscordIntegrationCreateUpdate
  ) => Integration
  invite: (client: Client, invite: DiscordInviteCreate) => Invite
  application: (client: Client, payload: DiscordApplication) => Application
  team: (client: Client, payload: DiscordTeam) => Team
  emoji: (client: Client, payload: DiscordEmoji) => Emoji
  activity: (client: Client, payload: DiscordActivity) => Activity
  presence: (client: Client, payload: DiscordPresenceUpdate) => PresenceUpdate
  attachment: (client: Client, payload: DiscordAttachment) => Attachment
  embed: (client: Client, payload: DiscordEmbed) => Embed
  component: (client: Client, payload: DiscordComponent) => Component
  webhook: (client: Client, payload: DiscordWebhook) => Webhook
  auditLogEntry: (
    client: Client,
    payload: DiscordAuditLogEntry
  ) => AuditLogEntry
  applicationCommand: (
    client: Client,
    payload: DiscordApplicationCommand
  ) => ApplicationCommand
  applicationCommandOption: (
    client: Client,
    payload: DiscordApplicationCommandOption
  ) => ApplicationCommandOption
  applicationCommandPermission: (
    client: Client,
    payload: DiscordGuildApplicationCommandPermissions
  ) => ApplicationCommandPermission
  scheduledEvent: (
    client: Client,
    payload: DiscordScheduledEvent
  ) => ScheduledEvent
  threadMember: (client: Client, payload: DiscordThreadMember) => ThreadMember
  welcomeScreen: (
    client: Client,
    payload: DiscordWelcomeScreen
  ) => WelcomeScreen
  voiceRegion: (client: Client, payload: DiscordVoiceRegion) => VoiceRegions
  widget: (client: Client, payload: DiscordGuildWidget) => GuildWidget
  widgetSettings: (
    client: Client,
    payload: DiscordGuildWidgetSettings
  ) => GuildWidgetSettings
  stageInstance: (
    client: Client,
    payload: DiscordStageInstance
  ) => StageInstance
  sticker: (client: Client, payload: DiscordSticker) => Sticker
  stickerPack: (client: Client, payload: DiscordStickerPack) => StickerPack
  applicationCommandOptionChoice: (
    client: Client,
    payload: DiscordApplicationCommandOptionChoice
  ) => ApplicationCommandOptionChoice
  template: (client: Client, payload: DiscordTemplate) => Template
}

export function createTransformers (
  options: Partial<Transformers>
): Transformers {
  return {
    reverse: {
      allowedMentions:
        options.reverse?.allowedMentions ??
        transformAllowedMentionsToDiscordAllowedMentions,
      embed: options.reverse?.embed ?? transformEmbedToDiscordEmbed,
      component:
        options.reverse?.component ?? transformComponentToDiscordComponent,
      activity: options.reverse?.activity ?? transformActivityToDiscordActivity,
      member: options.reverse?.member ?? transformMemberToDiscordMember,
      user: options.reverse?.user ?? transformUserToDiscordUser,
      team: options.reverse?.team ?? transformTeamToDiscordTeam,
      application:
        options.reverse?.application ??
        transformApplicationToDiscordApplication,
      snowflake: options.reverse?.snowflake ?? bigintToSnowflake,
      createApplicationCommand:
        options.reverse?.createApplicationCommand ??
        transformCreateApplicationCommandToDiscordCreateApplicationCommand,
      applicationCommand:
        options.reverse?.applicationCommand ??
        transformApplicationCommandToDiscordApplicationCommand,
      applicationCommandOption:
        options.reverse?.applicationCommandOption ??
        transformApplicationCommandOptionToDiscordApplicationCommandOption,
      applicationCommandOptionChoice:
        options.reverse?.applicationCommandOptionChoice ??
        transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice,
      interactionResponse:
        options.reverse?.interactionResponse ??
        transformInteractionResponseToDiscordInteractionResponse,
      attachment:
        options.reverse?.attachment ?? transformAttachmentToDiscordAttachment,
      applicationCommandPermission:
        options.reverse?.applicationCommandPermission ??
        transformApplicationCommandPermissionToDiscordApplicationCommandPermission,
      auditLogEntry:
        options.reverse?.auditLogEntry ??
        transformAuditLogEntryToDiscordAuditLogEntry,
      emoji: options.reverse?.emoji ?? transformEmojiToDiscordEmoji,
      gatewayBot:
        options.reverse?.gatewayBot ?? transformGatewayBotToDiscordGatewayBot,
      presence: options.reverse?.presence ?? transformPresenceToDiscordPresence,
      widgetSettings:
        options.reverse?.widgetSettings ??
        transformWidgetSettingsToDiscordWidgetSettings
    },
    automodRule: options.automodRule ?? transformAutoModerationRule,
    automodActionExecution:
      options.automodActionExecution ?? transformAutoModerationActionExecution,
    activity: options.activity ?? transformActivity,
    application: options.application ?? transformApplication,
    attachment: options.attachment ?? transformAttachment,
    channel: options.channel ?? transformChannel,
    component: options.component ?? transformComponent,
    embed: options.embed ?? transformEmbed,
    emoji: options.emoji ?? transformEmoji,
    guild: options.guild ?? transformGuild,
    integration: options.integration ?? transformIntegration,
    interaction: options.interaction ?? transformInteraction,
    interactionDataOptions:
      options.interactionDataOptions ?? transformInteractionDataOption,
    invite: options.invite ?? transformInvite,
    member: options.member ?? transformMember,
    message: options.message ?? transformMessage,
    presence: options.presence ?? transformPresence,
    role: options.role ?? transformRole,
    user: options.user ?? transformUser,
    team: options.team ?? transformTeam,
    voiceState: options.voiceState ?? transformVoiceState,
    snowflake: options.snowflake ?? snowflakeToBigint,
    webhook: options.webhook ?? transformWebhook,
    auditLogEntry: options.auditLogEntry ?? transformAuditLogEntry,
    applicationCommand:
      options.applicationCommand ?? transformApplicationCommand,
    applicationCommandOption:
      options.applicationCommandOption ?? transformApplicationCommandOption,
    applicationCommandPermission:
      options.applicationCommandPermission ??
      transformApplicationCommandPermission,
    scheduledEvent: options.scheduledEvent ?? transformScheduledEvent,
    threadMember: options.threadMember ?? transformThreadMember,
    welcomeScreen: options.welcomeScreen ?? transformWelcomeScreen,
    voiceRegion: options.voiceRegion ?? transformVoiceRegion,
    widget: options.widget ?? transformWidget,
    widgetSettings: options.widgetSettings ?? transformWidgetSettings,
    stageInstance: options.stageInstance ?? transformStageInstance,
    sticker: options.sticker ?? transformSticker,
    stickerPack: options.stickerPack ?? transformStickerPack,
    gatewayBot: options.gatewayBot ?? transformGatewayBot,
    applicationCommandOptionChoice:
      options.applicationCommandOptionChoice ??
      transformApplicationCommandOptionChoice,
    template: options.template ?? transformTemplate
  }
}

export * from './transformers/index.js'
