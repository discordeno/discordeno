import type {
  AllowedMentions,
  ApplicationCommandOption,
  ApplicationCommandOptionChoice,
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
  DiscordChannel,
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
  InteractionResponse,
} from '@discordeno/types'
import { bigintToSnowflake, Bot, snowflakeToBigint } from './index.js'
import { Activity, transformActivity } from './transformers/activity'
import { Application, transformApplication } from './transformers/application'
import { ApplicationCommand, transformApplicationCommand } from './transformers/applicationCommand'
import { transformApplicationCommandOption } from './transformers/applicationCommandOption'
import { transformApplicationCommandOptionChoice } from './transformers/applicationCommandOptionChoice'
import { ApplicationCommandPermission, transformApplicationCommandPermission } from './transformers/applicationCommandPermission'
import { Attachment, transformAttachment } from './transformers/attachment'
import { AuditLogEntry, transformAuditLogEntry } from './transformers/auditLogEntry'
import { transformAutoModerationActionExecution, type AutoModerationActionExecution } from './transformers/automodActionExecution.js'
import { AutoModerationRule, transformAutoModerationRule } from './transformers/automodRule'
import { Channel, transformChannel } from './transformers/channel'
import { Component, transformComponent } from './transformers/component'
import { Embed, transformEmbed } from './transformers/embed'
import { Emoji, transformEmoji } from './transformers/emoji'
import { GetGatewayBot, transformGatewayBot } from './transformers/gatewayBot'
import { Guild, transformGuild } from './transformers/guild'
import { Integration, transformIntegration } from './transformers/integration'
import { Interaction, InteractionDataOption, transformInteraction, transformInteractionDataOption } from './transformers/interaction'
import { Invite, transformInvite } from './transformers/invite'
import { Member, transformMember, transformUser, User } from './transformers/member'
import { Message, transformMessage } from './transformers/message'
import {
  transformActivityToDiscordActivity,
  transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice,
  transformApplicationCommandOptionToDiscordApplicationCommandOption,
  transformApplicationCommandToDiscordApplicationCommand,
  transformApplicationToDiscordApplication,
  transformAttachmentToDiscordAttachment,
  transformComponentToDiscordComponent,
  transformEmbedToDiscordEmbed,
  transformMemberToDiscordMember,
  transformTeamToDiscordTeam,
  transformUserToDiscordUser,
} from './transformers/mod'
import { PresenceUpdate, transformPresence } from './transformers/presence'
import { transformAllowedMentionsToDiscordAllowedMentions } from './transformers/reverse/allowedMentions'
import { transformCreateApplicationCommandToDiscordCreateApplicationCommand } from './transformers/reverse/createApplicationCommand.js'
import { transformInteractionResponseToDiscordInteractionResponse } from './transformers/reverse/interactionResponse.js'
import { Role, transformRole } from './transformers/role'
import { ScheduledEvent, transformScheduledEvent } from './transformers/scheduledEvent'
import { StageInstance, transformStageInstance } from './transformers/stageInstance'
import { Sticker, StickerPack, transformSticker, transformStickerPack } from './transformers/sticker'
import { Team, transformTeam } from './transformers/team'
import { Template, transformTemplate } from './transformers/template'
import { ThreadMember, transformThreadMember } from './transformers/threadMember'
import { transformVoiceRegion, VoiceRegions } from './transformers/voiceRegion'
import { transformVoiceState, VoiceState } from './transformers/voiceState'
import { transformWebhook, Webhook } from './transformers/webhook'
import { transformWelcomeScreen, WelcomeScreen } from './transformers/welcomeScreen'
import { GuildWidget, transformWidget } from './transformers/widget'
import { GuildWidgetSettings, transformWidgetSettings } from './transformers/widgetSettings'
import type { DiscordComponent, DiscordInteractionResponse } from './types.js'

export interface Transformers {
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
    interactionResponse: (bot: Bot, payload: InteractionResponse) => DiscordInteractionResponse
    attachment: (bot: Bot, payload: Attachment) => DiscordAttachment
  }
  snowflake: (snowflake: BigString) => bigint
  gatewayBot: (payload: DiscordGetGatewayBot) => GetGatewayBot
  automodRule: (bot: Bot, payload: DiscordAutoModerationRule) => AutoModerationRule
  automodActionExecution: (bot: Bot, payload: DiscordAutoModerationActionExecution) => AutoModerationActionExecution
  channel: (bot: Bot, payload: { channel: DiscordChannel } & { guildId?: bigint }) => Channel
  guild: (bot: Bot, payload: { guild: DiscordGuild } & { shardId: number }) => Guild
  user: (bot: Bot, payload: DiscordUser) => User
  member: (bot: Bot, payload: DiscordMember, guildId: bigint, userId: bigint) => Member
  message: (bot: Bot, payload: DiscordMessage) => Message
  role: (bot: Bot, payload: { role: DiscordRole } & { guildId: bigint }) => Role
  voiceState: (bot: Bot, payload: { voiceState: DiscordVoiceState } & { guildId: bigint }) => VoiceState
  interaction: (bot: Bot, payload: DiscordInteraction) => Interaction
  interactionDataOptions: (bot: Bot, payload: DiscordInteractionDataOption) => InteractionDataOption
  integration: (bot: Bot, payload: DiscordIntegrationCreateUpdate) => Integration
  invite: (bot: Bot, invite: DiscordInviteCreate) => Invite
  application: (bot: Bot, payload: DiscordApplication) => Application
  team: (bot: Bot, payload: DiscordTeam) => Team
  emoji: (bot: Bot, payload: DiscordEmoji) => Emoji
  activity: (bot: Bot, payload: DiscordActivity) => Activity
  presence: (bot: Bot, payload: DiscordPresenceUpdate) => PresenceUpdate
  attachment: (bot: Bot, payload: DiscordAttachment) => Attachment
  embed: (bot: Bot, payload: DiscordEmbed) => Embed
  component: (bot: Bot, payload: DiscordComponent) => Component
  webhook: (bot: Bot, payload: DiscordWebhook) => Webhook
  auditLogEntry: (bot: Bot, payload: DiscordAuditLogEntry) => AuditLogEntry
  applicationCommand: (bot: Bot, payload: DiscordApplicationCommand) => ApplicationCommand
  applicationCommandOption: (bot: Bot, payload: DiscordApplicationCommandOption) => ApplicationCommandOption
  applicationCommandPermission: (bot: Bot, payload: DiscordGuildApplicationCommandPermissions) => ApplicationCommandPermission
  scheduledEvent: (bot: Bot, payload: DiscordScheduledEvent) => ScheduledEvent
  threadMember: (bot: Bot, payload: DiscordThreadMember) => ThreadMember
  welcomeScreen: (bot: Bot, payload: DiscordWelcomeScreen) => WelcomeScreen
  voiceRegion: (bot: Bot, payload: DiscordVoiceRegion) => VoiceRegions
  widget: (bot: Bot, payload: DiscordGuildWidget) => GuildWidget
  widgetSettings: (bot: Bot, payload: DiscordGuildWidgetSettings) => GuildWidgetSettings
  stageInstance: (bot: Bot, payload: DiscordStageInstance) => StageInstance
  sticker: (bot: Bot, payload: DiscordSticker) => Sticker
  stickerPack: (bot: Bot, payload: DiscordStickerPack) => StickerPack
  applicationCommandOptionChoice: (bot: Bot, payload: DiscordApplicationCommandOptionChoice) => ApplicationCommandOptionChoice
  template: (bot: Bot, payload: DiscordTemplate) => Template
}

export function createTransformers(options: Partial<Transformers>) {
  return {
    reverse: {
      allowedMentions: options.reverse?.allowedMentions || transformAllowedMentionsToDiscordAllowedMentions,
      embed: options.reverse?.embed || transformEmbedToDiscordEmbed,
      component: options.reverse?.component || transformComponentToDiscordComponent,
      activity: options.reverse?.activity || transformActivityToDiscordActivity,
      member: options.reverse?.member || transformMemberToDiscordMember,
      user: options.reverse?.user || transformUserToDiscordUser,
      team: options.reverse?.team || transformTeamToDiscordTeam,
      application: options.reverse?.application || transformApplicationToDiscordApplication,
      snowflake: options.reverse?.snowflake || bigintToSnowflake,
      createApplicationCommand: options.reverse?.createApplicationCommand || transformCreateApplicationCommandToDiscordCreateApplicationCommand,
      applicationCommand: options.reverse?.applicationCommand || transformApplicationCommandToDiscordApplicationCommand,
      applicationCommandOption: options.reverse?.applicationCommandOption || transformApplicationCommandOptionToDiscordApplicationCommandOption,
      applicationCommandOptionChoice:
        options.reverse?.applicationCommandOptionChoice || transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice,
      interactionResponse: options.reverse?.interactionResponse || transformInteractionResponseToDiscordInteractionResponse,
      attachment: options.reverse?.attachment || transformAttachmentToDiscordAttachment,
    },
    automodRule: options.automodRule || transformAutoModerationRule,
    automodActionExecution: options.automodActionExecution || transformAutoModerationActionExecution,
    activity: options.activity || transformActivity,
    application: options.application || transformApplication,
    attachment: options.attachment || transformAttachment,
    channel: options.channel || transformChannel,
    component: options.component || transformComponent,
    embed: options.embed || transformEmbed,
    emoji: options.emoji || transformEmoji,
    guild: options.guild || transformGuild,
    integration: options.integration || transformIntegration,
    interaction: options.interaction || transformInteraction,
    interactionDataOptions: options.interactionDataOptions || transformInteractionDataOption,
    invite: options.invite || transformInvite,
    member: options.member || transformMember,
    message: options.message || transformMessage,
    presence: options.presence || transformPresence,
    role: options.role || transformRole,
    user: options.user || transformUser,
    team: options.team || transformTeam,
    voiceState: options.voiceState || transformVoiceState,
    snowflake: options.snowflake || snowflakeToBigint,
    webhook: options.webhook || transformWebhook,
    auditLogEntry: options.auditLogEntry || transformAuditLogEntry,
    applicationCommand: options.applicationCommand || transformApplicationCommand,
    applicationCommandOption: options.applicationCommandOption || transformApplicationCommandOption,
    applicationCommandPermission: options.applicationCommandPermission || transformApplicationCommandPermission,
    scheduledEvent: options.scheduledEvent || transformScheduledEvent,
    threadMember: options.threadMember || transformThreadMember,
    welcomeScreen: options.welcomeScreen || transformWelcomeScreen,
    voiceRegion: options.voiceRegion || transformVoiceRegion,
    widget: options.widget || transformWidget,
    widgetSettings: options.widgetSettings || transformWidgetSettings,
    stageInstance: options.stageInstance || transformStageInstance,
    sticker: options.sticker || transformSticker,
    stickerPack: options.stickerPack || transformStickerPack,
    gatewayBot: options.gatewayBot || transformGatewayBot,
    applicationCommandOptionChoice: options.applicationCommandOptionChoice || transformApplicationCommandOptionChoice,
    template: options.template || transformTemplate,
  }
}
