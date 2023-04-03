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
} from '@discordeno/types'
import { bigintToSnowflake, snowflakeToBigint, type Bot } from './index.js'
import { transformActivity, type Activity } from './transformers/activity.js'
import { transformApplication, type Application } from './transformers/application.js'
import { transformApplicationCommand, type ApplicationCommand } from './transformers/applicationCommand.js'
import { transformApplicationCommandOption, type ApplicationCommandOption } from './transformers/applicationCommandOption.js'
import { transformApplicationCommandOptionChoice, type ApplicationCommandOptionChoice } from './transformers/applicationCommandOptionChoice.js'
import { transformApplicationCommandPermission, type ApplicationCommandPermission } from './transformers/applicationCommandPermission.js'
import { transformAttachment, type Attachment } from './transformers/attachment.js'
import { transformAuditLogEntry, type AuditLogEntry } from './transformers/auditLogEntry.js'
import { transformAutoModerationActionExecution, type AutoModerationActionExecution } from './transformers/automodActionExecution.js'
import { transformAutoModerationRule, type AutoModerationRule } from './transformers/automodRule.js'
import { transformChannel, type Channel } from './transformers/channel.js'
import { transformComponent, type Component } from './transformers/component.js'
import { transformEmbed, type Embed } from './transformers/embed.js'
import { transformEmoji, type Emoji } from './transformers/emoji.js'
import { transformGatewayBot, type GetGatewayBot } from './transformers/gatewayBot.js'
import { transformGuild, type Guild } from './transformers/guild.js'
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
} from './transformers/index.js'
import { transformIntegration, type Integration } from './transformers/integration.js'
import { transformInteraction, transformInteractionDataOption, type Interaction, type InteractionDataOption } from './transformers/interaction.js'
import { transformInvite, type Invite } from './transformers/invite.js'
import { transformMember, transformUser, type Member, type User } from './transformers/member.js'
import { transformMessage, type Message } from './transformers/message.js'
import { transformPresence, type PresenceUpdate } from './transformers/presence.js'
import { transformAllowedMentionsToDiscordAllowedMentions } from './transformers/reverse/allowedMentions.js'
import { transformCreateApplicationCommandToDiscordCreateApplicationCommand } from './transformers/reverse/createApplicationCommand.js'
import { transformInteractionResponseToDiscordInteractionResponse } from './transformers/reverse/interactionResponse.js'
import { transformRole, type Role } from './transformers/role.js'
import { transformScheduledEvent, type ScheduledEvent } from './transformers/scheduledEvent.js'
import { transformStageInstance, type StageInstance } from './transformers/stageInstance.js'
import { transformSticker, transformStickerPack, type Sticker, type StickerPack } from './transformers/sticker.js'
import { transformTeam, type Team } from './transformers/team.js'
import { transformTemplate, type Template } from './transformers/template.js'
import { transformThreadMember, type ThreadMember } from './transformers/threadMember.js'
import { transformVoiceRegion, type VoiceRegions } from './transformers/voiceRegion.js'
import { transformVoiceState, type VoiceState } from './transformers/voiceState.js'
import { transformWebhook, type Webhook } from './transformers/webhook.js'
import { transformWelcomeScreen, type WelcomeScreen } from './transformers/welcomeScreen.js'
import { transformWidget, type GuildWidget } from './transformers/widget.js'
import { transformWidgetSettings, type GuildWidgetSettings } from './transformers/widgetSettings.js'
import type { BotInteractionResponse, DiscordComponent, DiscordInteractionResponse } from './typings.js'

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
    interactionResponse: (bot: Bot, payload: BotInteractionResponse) => DiscordInteractionResponse
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

export function createTransformers(options: Partial<Transformers>): Transformers {
  return {
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
    component: options.component ?? transformComponent,
    embed: options.embed ?? transformEmbed,
    emoji: options.emoji ?? transformEmoji,
    guild: options.guild ?? transformGuild,
    integration: options.integration ?? transformIntegration,
    interaction: options.interaction ?? transformInteraction,
    interactionDataOptions: options.interactionDataOptions ?? transformInteractionDataOption,
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
    applicationCommand: options.applicationCommand ?? transformApplicationCommand,
    applicationCommandOption: options.applicationCommandOption ?? transformApplicationCommandOption,
    applicationCommandPermission: options.applicationCommandPermission ?? transformApplicationCommandPermission,
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
    applicationCommandOptionChoice: options.applicationCommandOptionChoice ?? transformApplicationCommandOptionChoice,
    template: options.template ?? transformTemplate,
  }
}
