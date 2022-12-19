import { c1amelize1Activity } from './camel/activity.js'
import { c1amelize1Application } from './camel/application.js'
import { c1amelize1ApplicationCommand } from './camel/applicationCommand.js'
import { c1amelize1ApplicationCommandOption } from './camel/applicationCommandOption.js'
import { c1amelize1ApplicationCommandOptionChoice } from './camel/applicationCommandOptionChoice.js'
import { c1amelize1ApplicationCommandPermission } from './camel/applicationCommandPermission.js'
import { c1amelize1Attachment } from './camel/attachment.js'
import { c1amelize1AutoModerationActionExecution } from './camel/automodActionExecution.js'
import { c1amelize1AutoModerationRule } from './camel/automodRule.js'
import { c1amelize1Channel } from './camel/channel.js'
import { c1amelize1Emoji } from './camel/emoji.js'
import { c1amelize1GatewayBot } from './camel/gatewayBot.js'
import { c1amelize1Guild } from './camel/guild.js'
import { c1amelize1Member } from './camel/member.js'
import { c1amelize1Role } from './camel/role.js'
import { c1amelize1Sticker } from './camel/sticker.js'
import { c1amelize1Team } from './camel/team.js'
import { c1amelize1WelcomeScreen } from './camel/welcomeScreen.js'
import { c1amelize1Widget } from './camel/widget.js'
import { c1amelize1WidgetSettings } from './camel/widgetSettings.js'
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
import { s1nakelize1Member } from './snake/member.js'
import { s1nakelize1Role } from './snake/role.js'
import { s1nakelize1Sticker } from './snake/sticker.js'
import { s1nakelize1Team } from './snake/team.js'
import { s1nakelize1WelcomeScreen } from './snake/welcomeScreen.js'
import { s1nakelize1Widget } from './snake/widget.js'
import { s1nakelize1WidgetSettings } from './snake/widgetSettings.js'

export * from './camel/index.js'
export * from './snake/index.js'

export const TRANSFORMERS = {
  activity: c1amelize1Activity,
  application: c1amelize1Application,
  command: c1amelize1ApplicationCommand,
  commandOption: c1amelize1ApplicationCommandOption,
  commandOptionChoice: c1amelize1ApplicationCommandOptionChoice,
  commandPermission: c1amelize1ApplicationCommandPermission,
  attachment: c1amelize1Attachment,
  automodActionExecution: c1amelize1AutoModerationActionExecution,
  automodRule: c1amelize1AutoModerationRule,
  channel: c1amelize1Channel,
  emoji: c1amelize1Emoji,
  gatewayBot: c1amelize1GatewayBot,
  guild: c1amelize1Guild,
  member: c1amelize1Member,
  role: c1amelize1Role,
  sticker: c1amelize1Sticker,
  team: c1amelize1Team,
  welcomeScreen: c1amelize1WelcomeScreen,
  widget: c1amelize1Widget,
  widgetSettings: c1amelize1WidgetSettings,

  reverse: {
    activity: s1nakelize1Activity,
    application: s1nakelize1Application,
    command: s1nakelize1ApplicationCommand,
    commandOption: s1nakelize1ApplicationCommandOption,
    commandOptionChoice: s1nakelize1ApplicationCommandOptionChoice,
    commandPermission: s1nakelize1ApplicationCommandPermission,
    attachment: s1nakelize1Attachment,
    automodActionExecution: s1nakelize1AutoModerationActionExecution,
    automodRule: s1nakelize1AutoModerationRule,
    channel: s1nakelize1Channel,
    emoji: s1nakelize1Emoji,
    gatewayBot: s1nakelize1GatewayBot,
    guild: s1nakelize1Guild,
    member: s1nakelize1Member,
    role: s1nakelize1Role,
    sticker: s1nakelize1Sticker,
    team: s1nakelize1Team,
    welcomeScreen: s1nakelize1WelcomeScreen,
    widget: s1nakelize1Widget,
    widgetSettings: s1nakelize1WidgetSettings
  }
}

export default TRANSFORMERS
