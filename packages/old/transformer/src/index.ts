import { c1amelize1Activity } from './camel/activity.js'
import { c1amelize1Application } from './camel/application.js'
import { c1amelize1ApplicationCommand } from './camel/applicationCommand.js'
import { c1amelize1ApplicationCommandOption } from './camel/applicationCommandOption.js'
import { c1amelize1ApplicationCommandOptionChoice } from './camel/applicationCommandOptionChoice.js'
import { c1amelize1ApplicationCommandPermission } from './camel/applicationCommandPermission.js'
import { c1amelize1Attachment } from './camel/attachment.js'
import { c1amelize1AuditLogEntry } from './camel/auditLogEntry.js'
import { c1amelize1Auditlogs } from './camel/auditlogs.js'
import { c1amelize1AutoModerationActionExecution } from './camel/automodActionExecution.js'
import { c1amelize1AutoModerationRule } from './camel/automodRule.js'
import { c1amelize1Channel } from './camel/channel.js'
import { c1amelize1Emoji } from './camel/emoji.js'
import { c1amelize1ScheduledEvent } from './camel/event.js'
import { c1amelize1FollowedChannel } from './camel/followedChannel.js'
import { c1amelize1GatewayBot } from './camel/gatewayBot.js'
import { c1amelize1Guild } from './camel/guild.js'
import {
  c1amelize1AllowedMentions, c1amelize1Component,
  c1amelize1Embed, c1amelize1Message
} from './camel/index.js'
import { c1amelize1Integration } from './camel/integration.js'
import { c1amelize1Invite, c1amelize1StageInvite, c1amelizeInviteMetadata } from './camel/invite.js'
import { c1amelize1Member, c1amelize1User } from './camel/member.js'
import { c1amelize1GuildPreview } from './camel/preview.js'
import { c1amelize1Role } from './camel/role.js'
import { c1amelize1Sticker } from './camel/sticker.js'
import { c1amelize1Team } from './camel/team.js'
import { c1amelize1VoiceRegion } from './camel/voice.js'
import { c1amelize1Webhook } from './camel/webhook.js'
import { c1amelize1WelcomeScreen } from './camel/welcomeScreen.js'
import { c1amelize1Widget } from './camel/widget.js'
import { c1amelize1WidgetSettings } from './camel/widgetSettings.js'
import { makeCreateCommandBody } from './modifiers/commands.js'
import { s1nakelize1Activity } from './snake/activity.js'
import { s1nakelize1Application } from './snake/application.js'
import { s1nakelize1ApplicationCommand } from './snake/applicationCommand.js'
import { s1nakelize1ApplicationCommandOption } from './snake/applicationCommandOption.js'
import { s1nakelize1ApplicationCommandOptionChoice } from './snake/applicationCommandOptionChoice.js'
import { s1nakelize1ApplicationCommandPermission } from './snake/applicationCommandPermission.js'
import { s1nakelize1Attachment } from './snake/attachment.js'
import { s1nakelize1AutoModerationActionExecution } from './snake/automodActionExecution.js'
import { s1nakelize1AutoModerationRule } from './snake/automodRule.js'
import { s1nakelize1Channel } from './snake/channel.js'
import { s1nakelize1Emoji } from './snake/emoji.js'
import { s1nakelize1GatewayBot } from './snake/gatewayBot.js'
import { s1nakelize1Guild } from './snake/guild.js'
import {
  s1nakelize1AllowedMentions, s1nakelize1Component,
  s1nakelize1Embed, s1nakelize1InteractionResponse, s1nakelize1Message, s1nakelize1Webhook
} from './snake/index.js'
import { s1nakelize1Member, s1nakelize1User } from './snake/member.js'
import { s1nakelize1Role } from './snake/role.js'
import { s1nakelize1Sticker } from './snake/sticker.js'
import { s1nakelize1Team } from './snake/team.js'
import { s1nakelize1WelcomeScreen } from './snake/welcomeScreen.js'
import { s1nakelize1Widget } from './snake/widget.js'
import { s1nakelize1WidgetSettings } from './snake/widgetSettings.js'

export * from './camel/index.js'
export * from './modifiers/index.js'
export * from './snake/index.js'

export const TRANSFORMERS = {
  activity: c1amelize1Activity,
  allowedMentions: c1amelize1AllowedMentions,
  application: c1amelize1Application,
  auditlogs: {
    log: c1amelize1Auditlogs,
    entry: c1amelize1AuditLogEntry
  },
  command: c1amelize1ApplicationCommand,
  commandOption: c1amelize1ApplicationCommandOption,
  commandOptionChoice: c1amelize1ApplicationCommandOptionChoice,
  commandPermission: c1amelize1ApplicationCommandPermission,
  attachment: c1amelize1Attachment,
  automodActionExecution: c1amelize1AutoModerationActionExecution,
  automodRule: c1amelize1AutoModerationRule,
  channel: c1amelize1Channel,
  component: c1amelize1Component,
  embed: c1amelize1Embed,
  emoji: c1amelize1Emoji,
  event: c1amelize1ScheduledEvent,
  followedChannel: c1amelize1FollowedChannel,
  gatewayBot: c1amelize1GatewayBot,
  guild: c1amelize1Guild,
  integration: c1amelize1Integration,
  invites: {
    invite: c1amelize1Invite,
    metadata: c1amelizeInviteMetadata,
    stage: c1amelize1StageInvite
  },
  preview: c1amelize1GuildPreview,
  user: c1amelize1User,
  member: c1amelize1Member,
  message: c1amelize1Message,
  role: c1amelize1Role,
  sticker: c1amelize1Sticker,
  team: c1amelize1Team,
  voice: c1amelize1VoiceRegion,
  webhook: c1amelize1Webhook,
  welcomeScreen: c1amelize1WelcomeScreen,
  widget: c1amelize1Widget,
  widgetSettings: c1amelize1WidgetSettings,

  reverse: {
    activity: s1nakelize1Activity,
    allowedMentions: s1nakelize1AllowedMentions,
    application: s1nakelize1Application,
    commands: {
      command: s1nakelize1ApplicationCommand,
      option: s1nakelize1ApplicationCommandOption,
      optionChoice: s1nakelize1ApplicationCommandOptionChoice,
      permission: s1nakelize1ApplicationCommandPermission
    },
    attachment: s1nakelize1Attachment,
    automodActionExecution: s1nakelize1AutoModerationActionExecution,
    automodRule: s1nakelize1AutoModerationRule,
    channel: s1nakelize1Channel,
    component: s1nakelize1Component,
    embed: s1nakelize1Embed,
    emoji: s1nakelize1Emoji,
    gatewayBot: s1nakelize1GatewayBot,
    guild: s1nakelize1Guild,
    interactionResponse: s1nakelize1InteractionResponse,
    user: s1nakelize1User,
    member: s1nakelize1Member,
    message: s1nakelize1Message,
    role: s1nakelize1Role,
    sticker: s1nakelize1Sticker,
    team: s1nakelize1Team,
    webhook: s1nakelize1Webhook,
    welcomeScreen: s1nakelize1WelcomeScreen,
    widget: s1nakelize1Widget,
    widgetSettings: s1nakelize1WidgetSettings
  },

  modifiers: {
    command: makeCreateCommandBody
  }
}

export default TRANSFORMERS
