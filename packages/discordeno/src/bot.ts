import { createGatewayManager } from './gateway/manager/gatewayManager.js'
import * as handlers from './handlers/mod.js'
import * as helpers from './helpers/mod.js'
import { createRestManager, CreateRestManagerOptions } from './rest/mod.js'
import { Activity, transformActivity } from './transformers/activity.js'
import { Application, transformApplication } from './transformers/application.js'
import { ApplicationCommand, transformApplicationCommand } from './transformers/applicationCommand.js'
import { ApplicationCommandOption, transformApplicationCommandOption } from './transformers/applicationCommandOption.js'
import { ApplicationCommandPermission, transformApplicationCommandPermission } from './transformers/applicationCommandPermission.js'
import { Attachment, transformAttachment } from './transformers/attachment.js'
import { AuditLogEntry, transformAuditLogEntry } from './transformers/auditLogEntry.js'
import { Component, transformComponent } from './transformers/component.js'
import { Embed, transformEmbed } from './transformers/embed.js'
import { Emoji, transformEmoji } from './transformers/emoji.js'
import { GetGatewayBot, transformGatewayBot } from './transformers/gatewayBot.js'
import { Integration, transformIntegration } from './transformers/integration.js'
import {
  Interaction,
  InteractionDataOption,
  transformInteraction,
  transformInteractionDataOption
} from './transformers/interaction.js'
import { Invite, transformInvite } from './transformers/invite.js'
import {
  Channel,
  Guild,
  Member,
  Message,
  Role,
  ScheduledEvent,
  Template,
  transformApplicationCommandToDiscordApplicationCommand,
  transformAttachmentToDiscordAttachment,
  transformChannel,
  transformGuild,
  transformMember,
  transformMessage,
  transformRole,
  transformTemplate,
  transformUser,
  transformVoiceState,
  User,
  VoiceState
} from './transformers/mod.js'
import { PresenceUpdate, transformPresence } from './transformers/presence.js'
import { transformScheduledEvent } from './transformers/scheduledEvent.js'
import { StageInstance, transformStageInstance } from './transformers/stageInstance.js'
import { Sticker, StickerPack, transformSticker, transformStickerPack } from "./transformers/sticker.js"
import { transformTeam } from "./transformers/team.js"
import { ThreadMember, transformThreadMember } from "./transformers/threadMember.js"
import { transformVoiceRegion } from "./transformers/voiceRegion.js"
import { transformWebhook } from "./transformers/webhook.js"
import { transformWelcomeScreen } from "./transformers/welcomeScreen.js"
import { transformWidget } from "./transformers/widget.js"
import { transformWidgetSettings } from "./transformers/widgetSettings.js"
import {
  DiscordAllowedMentions,
  DiscordApplicationCommandOptionChoice,
  DiscordAutoModerationActionExecution,
  DiscordAutoModerationRule,
  DiscordCreateApplicationCommand,
  DiscordEmoji,
  DiscordGatewayPayload,
  DiscordInteractionDataOption,
  DiscordInteractionResponse,
  DiscordReady,
  DiscordStickerPack,
  DiscordTemplate
} from "./types/discord.js"
import { BigString, Errors, GatewayDispatchEventNames, GatewayIntents } from "./types/shared.js"
import { bigintToSnowflake, snowflakeToBigint } from "./util/bigint.js"
import { calculateShardId } from "./util/calculateShardId.js"
import { Collection } from "./util/collection.js"
import {
  baseEndpoints,
  CHANNEL_MENTION_REGEX,
  CONTEXT_MENU_COMMANDS_NAME_REGEX, DISCORDENO_VERSION, DISCORD_SNOWFLAKE_REGEX, SLASH_COMMANDS_NAME_REGEX,
  USER_AGENT
} from "./util/constants.js"
import { iconBigintToHash, iconHashToBigInt } from "./util/hash.js"
import { calculateBits, calculatePermissions } from "./util/permissions.js"
import { urlToBase64 } from "./util/urlToBase64.js"
import { delay, formatImageURL } from "./util/utils.js"
import { validateLength } from "./util/validateLength.js"

import {
  DiscordActivity,
  DiscordApplication,
  DiscordApplicationCommand,
  DiscordApplicationCommandOption,
  DiscordAttachment,
  DiscordAuditLogEntry,
  DiscordChannel,
  DiscordComponent,
  DiscordEmbed,
  DiscordGetGatewayBot,
  DiscordGuild,
  DiscordGuildApplicationCommandPermissions,
  DiscordGuildWidget,
  DiscordGuildWidgetSettings,
  DiscordIntegrationCreateUpdate,
  DiscordInteraction,
  DiscordInviteCreate,
  DiscordMember,
  DiscordMessage,
  DiscordPresenceUpdate,
  DiscordRole,
  DiscordScheduledEvent,
  DiscordStageInstance,
  DiscordSticker,
  DiscordTeam,
  DiscordThreadMember,
  DiscordUser,
  DiscordVoiceRegion,
  DiscordVoiceState,
  DiscordWebhook,
  DiscordWelcomeScreen
} from "./types/discord.js"

import { CreateShardManager } from "./gateway/manager/shardManager.js"
import {
  AllowedMentions,
  CreateApplicationCommand,
  InteractionResponse,
  ShardSocketCloseCodes,
  transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice,
  transformApplicationCommandOptionToDiscordApplicationCommandOption
} from "./mod.js"
import {
  ApplicationCommandOptionChoice,
  transformApplicationCommandOptionChoice
} from './transformers/applicationCommandOptionChoice.js'
import {
  AutoModerationActionExecution,
  transformAutoModerationActionExecution
} from './transformers/automodActionExecution.js'
import { AutoModerationRule, transformAutoModerationRule } from './transformers/automodRule.js'
import { transformActivityToDiscordActivity } from './transformers/reverse/activity.js'
import { transformAllowedMentionsToDiscordAllowedMentions } from './transformers/reverse/allowedMentions.js'
import { transformApplicationToDiscordApplication } from './transformers/reverse/application.js'
import { transformComponentToDiscordComponent } from './transformers/reverse/component.js'
import { transformCreateApplicationCommandToDiscordCreateApplicationCommand } from './transformers/reverse/createApplicationCommand.js'
import { transformEmbedToDiscordEmbed } from './transformers/reverse/embed.js'
import { transformInteractionResponseToDiscordInteractionResponse } from './transformers/reverse/interactionResponse.js'
import { transformMemberToDiscordMember, transformUserToDiscordUser } from './transformers/reverse/member.js'
import { transformTeamToDiscordTeam } from './transformers/reverse/team.js'
import { Team } from './transformers/team.js'
import { VoiceRegions } from './transformers/voiceRegion.js'
import { Webhook } from './transformers/webhook.js'
import { WelcomeScreen } from './transformers/welcomeScreen.js'
import { GuildWidget } from './transformers/widget.js'
import { GuildWidgetSettings } from './transformers/widgetSettings.js'
import { routes } from './util/routes.js'
import { getBotIdFromToken, removeTokenPrefix } from './util/token.js'

export function createBot(options: CreateBotOptions): Bot {
  const bot = {
    id: options.botId ?? getBotIdFromToken(options.token),
    applicationId: options.applicationId || options.botId || getBotIdFromToken(options.token),
    token: removeTokenPrefix(options.token),
    events: createEventHandlers(options.events ?? {}),
    intents: options.intents,
    botGatewayData: options.botGatewayData,
    activeGuildIds: new Set<bigint>(),
    constants: createBotConstants(),
    handlers: createBotGatewayHandlers({}),
    utils: createUtils(options.utils ?? {}),
    transformers: createTransformers(options.transformers ?? {}),
    enabledPlugins: new Set(),
    handleDiscordPayload: options.handleDiscordPayload,
    cache: {
      unrepliedInteractions: new Set<bigint>(),
      fetchAllMembersProcessingRequests: new Map()
    },
    rest: createRestManager({
      token: options.token,
      debug: options.events?.debug,
      secretKey: options.secretKey ?? undefined
    })
  } as Bot

  bot.helpers = createHelpers(bot, options.helpers ?? {})
  bot.gateway = createGatewayManager({
    gatewayBot: bot.botGatewayData ?? {} as any,
    gatewayConfig: {
      token: options.token,
      intents: options.intents
    },

    debug: bot.events.debug,

    handleDiscordPayload: bot.handleDiscordPayload ??
      async function (shard, data: DiscordGatewayPayload) {
        // TRIGGER RAW EVENT
        bot.events.raw(bot, data, shard.id)

        if (!data.t) return

        // RUN DISPATCH CHECK
        await bot.events.dispatchRequirements(bot, data, shard.id)
        bot.handlers[data.t as GatewayDispatchEventNames]?.(
          bot,
          data,
          shard.id
        )
      }
  })

  return bot
}

export function createEventHandlers(
  events: Partial<EventHandlers>
): EventHandlers {
  function ignore() { }

  return {
    debug: events.debug ?? ignore,
    automodRuleCreate: events.automodRuleCreate ?? ignore,
    automodRuleUpdate: events.automodRuleUpdate ?? ignore,
    automodRuleDelete: events.automodRuleDelete ?? ignore,
    automodActionExecution: events.automodActionExecution ?? ignore,
    threadCreate: events.threadCreate ?? ignore,
    threadDelete: events.threadDelete ?? ignore,
    threadMemberUpdate: events.threadMemberUpdate ?? ignore,
    threadMembersUpdate: events.threadMembersUpdate ?? ignore,
    threadUpdate: events.threadUpdate ?? ignore,
    scheduledEventCreate: events.scheduledEventCreate ?? ignore,
    scheduledEventUpdate: events.scheduledEventUpdate ?? ignore,
    scheduledEventDelete: events.scheduledEventDelete ?? ignore,
    scheduledEventUserAdd: events.scheduledEventUserAdd ?? ignore,
    scheduledEventUserRemove: events.scheduledEventUserRemove ?? ignore,
    ready: events.ready ?? ignore,
    dispatchRequirements: events.dispatchRequirements ?? ignore,
    integrationCreate: events.integrationCreate ?? ignore,
    integrationDelete: events.integrationDelete ?? ignore,
    integrationUpdate: events.integrationUpdate ?? ignore,
    interactionCreate: events.interactionCreate ?? ignore,
    inviteCreate: events.inviteCreate ?? ignore,
    inviteDelete: events.inviteDelete ?? ignore,
    guildMemberAdd: events.guildMemberAdd ?? ignore,
    guildMemberRemove: events.guildMemberRemove ?? ignore,
    guildMemberUpdate: events.guildMemberUpdate ?? ignore,
    messageCreate: events.messageCreate ?? ignore,
    messageDelete: events.messageDelete ?? ignore,
    messageDeleteBulk: events.messageDeleteBulk ?? ignore,
    messageUpdate: events.messageUpdate ?? ignore,
    reactionAdd: events.reactionAdd ?? ignore,
    reactionRemove: events.reactionRemove ?? ignore,
    reactionRemoveAll: events.reactionRemoveAll ?? ignore,
    reactionRemoveEmoji: events.reactionRemoveEmoji ?? ignore,
    presenceUpdate: events.presenceUpdate ?? ignore,
    voiceServerUpdate: events.voiceServerUpdate ?? ignore,
    voiceStateUpdate: events.voiceStateUpdate ?? ignore,
    channelCreate: events.channelCreate ?? ignore,
    channelDelete: events.channelDelete ?? ignore,
    channelPinsUpdate: events.channelPinsUpdate ?? ignore,
    channelUpdate: events.channelUpdate ?? ignore,
    guildEmojisUpdate: events.guildEmojisUpdate ?? ignore,
    guildBanAdd: events.guildBanAdd ?? ignore,
    guildBanRemove: events.guildBanRemove ?? ignore,
    guildCreate: events.guildCreate ?? ignore,
    guildDelete: events.guildDelete ?? ignore,
    guildUpdate: events.guildUpdate ?? ignore,
    raw: events.raw ?? ignore,
    stageInstanceCreate: events.stageInstanceCreate ?? ignore,
    stageInstanceDelete: events.stageInstanceDelete ?? ignore,
    stageInstanceUpdate: events.stageInstanceUpdate ?? ignore,
    roleCreate: events.roleCreate ?? ignore,
    roleDelete: events.roleDelete ?? ignore,
    roleUpdate: events.roleUpdate ?? ignore,
    webhooksUpdate: events.webhooksUpdate ?? ignore,
    botUpdate: events.botUpdate ?? ignore,
    typingStart: events.typingStart ?? ignore
  }
}

export async function startBot(bot: Bot) {
  if (Object.keys(bot.botGatewayData ?? {}).length === 0) {
    bot.gateway.gatewayBot = await bot.helpers.getGatewayBot()
    bot.gateway.lastShardId = bot.gateway.gatewayBot.shards - 1
    bot.gateway.manager.totalShards = bot.gateway.gatewayBot.shards
  }

  bot.gateway.spawnShards()
}

export function createUtils(options: Partial<HelperUtils>) {
  return {
    snowflakeToBigint,
    bigintToSnowflake,
    calculateShardId,
    delay,
    iconHashToBigInt,
    iconBigintToHash,
    validateLength,
    urlToBase64,
    formatImageURL,
    calculateBits,
    calculatePermissions
  }
}

export interface HelperUtils {
  snowflakeToBigint: typeof snowflakeToBigint
  bigintToSnowflake: typeof bigintToSnowflake
  calculateShardId: typeof calculateShardId
  delay: typeof delay
  iconHashToBigInt: typeof iconHashToBigInt
  iconBigintToHash: typeof iconBigintToHash
  validateLength: typeof validateLength
  urlToBase64: typeof urlToBase64
  formatImageURL: typeof formatImageURL
  calculateBits: typeof calculateBits
  calculatePermissions: typeof calculatePermissions
}

export async function stopBot(bot: Bot) {
  await bot.gateway.stop(ShardSocketCloseCodes.Shutdown, 'User requested bot stop')

  return bot
}

export interface CreateBotOptions {
  token: string
  botId?: bigint
  applicationId?: bigint
  secretKey?: string
  events?: Partial<EventHandlers>
  intents?: GatewayIntents
  botGatewayData?: GetGatewayBot
  rest?: Omit<CreateRestManagerOptions, 'token'>
  handleDiscordPayload?: CreateShardManager['handleMessage']
  utils?: Partial<ReturnType<typeof createUtils>>
  transformers?: Partial<ReturnType<typeof createTransformers>>
  helpers?: Partial<Helpers>
}

export type UnPromise<T extends Promise<unknown>> = T extends Promise<infer K> ? K
  : never

export interface Bot {
  id: bigint
  applicationId: bigint
  token: string
  intents: GatewayIntents
  urlWSS: string
  botGatewayData?: GetGatewayBot
  utils: ReturnType<typeof createUtils>
  transformers: Transformers
  helpers: ReturnType<typeof createHelpers>
  rest: ReturnType<typeof createRestManager>
  gateway: ReturnType<typeof createGatewayManager>
  events: EventHandlers
  handlers: ReturnType<typeof createBotGatewayHandlers>
  activeGuildIds: Set<bigint>
  constants: ReturnType<typeof createBotConstants>
  cache: {
    unrepliedInteractions: Set<bigint>
    fetchAllMembersProcessingRequests: Map<string, Function>
  }
  enabledPlugins: Set<string>
  handleDiscordPayload?: CreateShardManager['handleMessage']
}

export const defaultHelpers = { ...helpers }
export type DefaultHelpers = typeof defaultHelpers
// deno-lint-ignore no-empty-interface
export interface Helpers extends DefaultHelpers { } // Use interface for declaration merging

export function createHelpers(
  bot: Bot,
  customHelpers?: Partial<Helpers>
): FinalHelpers {
  const converted = {} as FinalHelpers
  for (
    const [name, fun] of Object.entries({
      ...createBaseHelpers((customHelpers != null) || {})
    })
  ) {
    // @ts-expect-error - TODO: make the types better
    converted[name as keyof FinalHelpers] = (
      // @ts-expect-error - TODO: make the types better
      ...args: RemoveFirstFromTuple<Parameters<typeof fun>>
    ) =>
      // @ts-expect-error - TODO: make the types better
      fun(bot, ...args)
  }

  return converted
}

export function createBaseHelpers(options: Partial<Helpers>) {
  return {
    ...defaultHelpers,
    ...options
  }
}

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
    applicationCommandOptionChoice: (
      bot: Bot,
      payload: ApplicationCommandOptionChoice,
    ) => DiscordApplicationCommandOptionChoice
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
  applicationCommandPermission: (
    bot: Bot,
    payload: DiscordGuildApplicationCommandPermissions,
  ) => ApplicationCommandPermission
  scheduledEvent: (bot: Bot, payload: DiscordScheduledEvent) => ScheduledEvent
  threadMember: (bot: Bot, payload: DiscordThreadMember) => ThreadMember
  welcomeScreen: (bot: Bot, payload: DiscordWelcomeScreen) => WelcomeScreen
  voiceRegion: (bot: Bot, payload: DiscordVoiceRegion) => VoiceRegions
  widget: (bot: Bot, payload: DiscordGuildWidget) => GuildWidget
  widgetSettings: (bot: Bot, payload: DiscordGuildWidgetSettings) => GuildWidgetSettings
  stageInstance: (bot: Bot, payload: DiscordStageInstance) => StageInstance
  sticker: (bot: Bot, payload: DiscordSticker) => Sticker
  stickerPack: (bot: Bot, payload: DiscordStickerPack) => StickerPack
  applicationCommandOptionChoice: (
    bot: Bot,
    payload: DiscordApplicationCommandOptionChoice,
  ) => ApplicationCommandOptionChoice
  template: (bot: Bot, payload: DiscordTemplate) => Template
}

export function createTransformers(options: Partial<Transformers>) {
  return {
    reverse: {
      allowedMentions: ((options.reverse?.allowedMentions) != null) || transformAllowedMentionsToDiscordAllowedMentions,
      embed: ((options.reverse?.embed) != null) || transformEmbedToDiscordEmbed,
      component: ((options.reverse?.component) != null) || transformComponentToDiscordComponent,
      activity: ((options.reverse?.activity) != null) || transformActivityToDiscordActivity,
      member: ((options.reverse?.member) != null) || transformMemberToDiscordMember,
      user: ((options.reverse?.user) != null) || transformUserToDiscordUser,
      team: ((options.reverse?.team) != null) || transformTeamToDiscordTeam,
      application: ((options.reverse?.application) != null) || transformApplicationToDiscordApplication,
      snowflake: ((options.reverse?.snowflake) != null) || bigintToSnowflake,
      createApplicationCommand: ((options.reverse?.createApplicationCommand) != null) ||
        transformCreateApplicationCommandToDiscordCreateApplicationCommand,
      applicationCommand: ((options.reverse?.applicationCommand) != null) ||
        transformApplicationCommandToDiscordApplicationCommand,
      applicationCommandOption: ((options.reverse?.applicationCommandOption) != null) ||
        transformApplicationCommandOptionToDiscordApplicationCommandOption,
      applicationCommandOptionChoice: ((options.reverse?.applicationCommandOptionChoice) != null) ||
        transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice,
      interactionResponse: ((options.reverse?.interactionResponse) != null) ||
        transformInteractionResponseToDiscordInteractionResponse,
      attachment: ((options.reverse?.attachment) != null) || transformAttachmentToDiscordAttachment
    },
    automodRule: (options.automodRule != null) || transformAutoModerationRule,
    automodActionExecution: (options.automodActionExecution != null) || transformAutoModerationActionExecution,
    activity: (options.activity != null) || transformActivity,
    application: (options.application != null) || transformApplication,
    attachment: (options.attachment != null) || transformAttachment,
    channel: (options.channel != null) || transformChannel,
    component: (options.component != null) || transformComponent,
    embed: (options.embed != null) || transformEmbed,
    emoji: (options.emoji != null) || transformEmoji,
    guild: (options.guild != null) || transformGuild,
    integration: (options.integration != null) || transformIntegration,
    interaction: (options.interaction != null) || transformInteraction,
    interactionDataOptions: (options.interactionDataOptions != null) || transformInteractionDataOption,
    invite: (options.invite != null) || transformInvite,
    member: (options.member != null) || transformMember,
    message: (options.message != null) || transformMessage,
    presence: (options.presence != null) || transformPresence,
    role: (options.role != null) || transformRole,
    user: (options.user != null) || transformUser,
    team: (options.team != null) || transformTeam,
    voiceState: (options.voiceState != null) || transformVoiceState,
    snowflake: (options.snowflake != null) || snowflakeToBigint,
    webhook: (options.webhook != null) || transformWebhook,
    auditLogEntry: (options.auditLogEntry != null) || transformAuditLogEntry,
    applicationCommand: (options.applicationCommand != null) ||
      transformApplicationCommand,
    applicationCommandOption: (options.applicationCommandOption != null) ||
      transformApplicationCommandOption,
    applicationCommandPermission: (options.applicationCommandPermission != null) ||
      transformApplicationCommandPermission,
    scheduledEvent: (options.scheduledEvent != null) || transformScheduledEvent,
    threadMember: (options.threadMember != null) || transformThreadMember,
    welcomeScreen: (options.welcomeScreen != null) || transformWelcomeScreen,
    voiceRegion: (options.voiceRegion != null) || transformVoiceRegion,
    widget: (options.widget != null) || transformWidget,
    widgetSettings: (options.widgetSettings != null) || transformWidgetSettings,
    stageInstance: (options.stageInstance != null) || transformStageInstance,
    sticker: (options.sticker != null) || transformSticker,
    stickerPack: (options.stickerPack != null) || transformStickerPack,
    gatewayBot: (options.gatewayBot != null) || transformGatewayBot,
    applicationCommandOptionChoice: (options.applicationCommandOptionChoice != null) || transformApplicationCommandOptionChoice,
    template: (options.template != null) || transformTemplate
  }
}

export interface EventHandlers {
  debug: (text: string, ...args: any[]) => unknown
  automodRuleCreate: (bot: Bot, rule: AutoModerationRule) => unknown
  automodRuleUpdate: (bot: Bot, rule: AutoModerationRule) => unknown
  automodRuleDelete: (bot: Bot, rule: AutoModerationRule) => unknown
  automodActionExecution: (bot: Bot, payload: AutoModerationActionExecution) => unknown
  threadCreate: (bot: Bot, thread: Channel) => unknown
  threadDelete: (bot: Bot, thread: Channel) => unknown
  threadMemberUpdate: (bot: Bot, payload: {
    id: bigint
    guildId: bigint
    joinedAt: number
    flags: number
  }) => unknown
  threadMembersUpdate: (
    bot: Bot,
    payload: {
      id: bigint
      guildId: bigint
      addedMembers?: ThreadMember[]
      removedMemberIds?: bigint[]
    },
  ) => unknown
  threadUpdate: (bot: Bot, thread: Channel) => unknown
  scheduledEventCreate: (bot: Bot, event: ScheduledEvent) => unknown
  scheduledEventUpdate: (bot: Bot, event: ScheduledEvent) => unknown
  scheduledEventDelete: (bot: Bot, event: ScheduledEvent) => unknown
  /** Sent when a user has subscribed to a guild scheduled event. EXPERIMENTAL! */
  scheduledEventUserAdd: (
    bot: Bot,
    payload: {
      guildScheduledEventId: bigint
      guildId: bigint
      userId: bigint
    },
  ) => unknown
  /** Sent when a user has unsubscribed to a guild scheduled event. EXPERIMENTAL! */
  scheduledEventUserRemove: (
    bot: Bot,
    payload: {
      guildScheduledEventId: bigint
      guildId: bigint
      userId: bigint
    },
  ) => unknown
  ready: (
    bot: Bot,
    payload: {
      shardId: number
      v: number
      user: User
      guilds: bigint[]
      sessionId: string
      shard?: number[]
      applicationId: bigint
    },
    rawPayload: DiscordReady,
  ) => unknown
  interactionCreate: (bot: Bot, interaction: Interaction) => unknown
  integrationCreate: (bot: Bot, integration: Integration) => unknown
  integrationDelete: (
    bot: Bot,
    payload: { id: bigint, guildId: bigint, applicationId?: bigint },
  ) => unknown
  integrationUpdate: (bot: Bot, payload: { guildId: bigint }) => unknown
  inviteCreate: (bot: Bot, invite: Invite) => unknown
  inviteDelete: (
    bot: Bot,
    payload: {
      channelId: bigint
      guildId?: bigint
      code: string
    },
  ) => unknown
  guildMemberAdd: (
    bot: Bot,
    member: Member,
    user: User,
  ) => unknown
  guildMemberRemove: (bot: Bot, user: User, guildId: bigint) => unknown
  guildMemberUpdate: (
    bot: Bot,
    member: Member,
    user: User,
  ) => unknown
  messageCreate: (bot: Bot, message: Message) => unknown
  messageDelete: (
    bot: Bot,
    payload: { id: bigint, channelId: bigint, guildId?: bigint },
    message?: Message,
  ) => unknown
  messageDeleteBulk: (bot: Bot, payload: { ids: bigint[], channelId: bigint, guildId?: bigint }) => unknown
  messageUpdate: (
    bot: Bot,
    message: Message,
    oldMessage?: Message,
  ) => unknown
  reactionAdd: (
    bot: Bot,
    payload: {
      userId: bigint
      channelId: bigint
      messageId: bigint
      guildId?: bigint
      member?: Member
      user?: User
      emoji: Emoji
    },
  ) => unknown
  reactionRemove: (
    bot: Bot,
    payload: {
      userId: bigint
      channelId: bigint
      messageId: bigint
      guildId?: bigint
      emoji: Emoji
    },
  ) => unknown
  reactionRemoveEmoji: (
    bot: Bot,
    payload: {
      channelId: bigint
      messageId: bigint
      guildId?: bigint
      emoji: Emoji
    },
  ) => unknown
  reactionRemoveAll: (
    bot: Bot,
    payload: {
      channelId: bigint
      messageId: bigint
      guildId?: bigint
    },
  ) => unknown
  presenceUpdate: (
    bot: Bot,
    presence: PresenceUpdate,
    oldPresence?: PresenceUpdate,
  ) => unknown
  voiceServerUpdate: (
    bot: Bot,
    payload: { token: string, endpoint?: string, guildId: bigint },
  ) => unknown
  voiceStateUpdate: (
    bot: Bot,
    voiceState: VoiceState,
  ) => unknown
  channelCreate: (bot: Bot, channel: Channel) => unknown
  dispatchRequirements: (
    bot: Bot,
    data: DiscordGatewayPayload,
    shardId: number,
  ) => unknown
  channelDelete: (bot: Bot, channel: Channel) => unknown
  channelPinsUpdate: (
    bot: Bot,
    data: { guildId?: bigint, channelId: bigint, lastPinTimestamp?: number },
  ) => unknown
  channelUpdate: (bot: Bot, channel: Channel) => unknown
  stageInstanceCreate: (
    bot: Bot,
    data: {
      id: bigint
      guildId: bigint
      channelId: bigint
      topic: string
    },
  ) => unknown
  stageInstanceDelete: (
    bot: Bot,
    data: {
      id: bigint
      guildId: bigint
      channelId: bigint
      topic: string
    },
  ) => unknown
  stageInstanceUpdate: (
    bot: Bot,
    data: {
      id: bigint
      guildId: bigint
      channelId: bigint
      topic: string
    },
  ) => unknown
  guildEmojisUpdate: (
    bot: Bot,
    payload: {
      guildId: bigint
      emojis: Collection<bigint, DiscordEmoji>
    },
  ) => unknown
  guildBanAdd: (bot: Bot, user: User, guildId: bigint) => unknown
  guildBanRemove: (bot: Bot, user: User, guildId: bigint) => unknown
  guildCreate: (bot: Bot, guild: Guild) => unknown
  guildDelete: (bot: Bot, id: bigint, shardId: number) => unknown
  guildUpdate: (bot: Bot, guild: Guild) => unknown
  raw: (bot: Bot, data: DiscordGatewayPayload, shardId: number) => unknown
  roleCreate: (bot: Bot, role: Role) => unknown
  roleDelete: (bot: Bot, payload: { guildId: bigint, roleId: bigint }) => unknown
  roleUpdate: (bot: Bot, role: Role) => unknown
  webhooksUpdate: (
    bot: Bot,
    payload: { channelId: bigint, guildId: bigint },
  ) => unknown
  botUpdate: (bot: Bot, user: User) => unknown
  typingStart: (
    bot: Bot,
    payload: {
      guildId: bigint | undefined
      channelId: bigint
      userId: bigint
      timestamp: number
      member: Member | undefined
    },
  ) => unknown
}

export function createBotConstants() {
  return {
    DISCORDENO_VERSION,
    USER_AGENT,
    BASE_URL: baseEndpoints.BASE_URL,
    CDN_URL: baseEndpoints.CDN_URL,
    routes,
    regexes: {
      SLASH_COMMANDS_NAME_REGEX,
      CONTEXT_MENU_COMMANDS_NAME_REGEX,
      CHANNEL_MENTION_REGEX,
      DISCORD_SNOWFLAKE_REGEX
    },
    Errors
  }
}

export interface BotGatewayHandlerOptions {
  READY: typeof handlers.handleReady
  CHANNEL_CREATE: typeof handlers.handleChannelCreate
  CHANNEL_DELETE: typeof handlers.handleChannelDelete
  CHANNEL_PINS_UPDATE: typeof handlers.handleChannelPinsUpdate
  CHANNEL_UPDATE: typeof handlers.handleChannelUpdate
  THREAD_CREATE: typeof handlers.handleThreadCreate
  THREAD_UPDATE: typeof handlers.handleThreadUpdate
  THREAD_DELETE: typeof handlers.handleThreadDelete
  THREAD_LIST_SYNC: typeof handlers.handleThreadListSync
  THREAD_MEMBERS_UPDATE: typeof handlers.handleThreadMembersUpdate
  STAGE_INSTANCE_CREATE: typeof handlers.handleStageInstanceCreate
  STAGE_INSTANCE_UPDATE: typeof handlers.handleStageInstanceUpdate
  STAGE_INSTANCE_DELETE: typeof handlers.handleStageInstanceDelete
  GUILD_BAN_ADD: typeof handlers.handleGuildBanAdd
  GUILD_BAN_REMOVE: typeof handlers.handleGuildBanRemove
  GUILD_CREATE: typeof handlers.handleGuildCreate
  GUILD_DELETE: typeof handlers.handleGuildDelete
  GUILD_EMOJIS_UPDATE: typeof handlers.handleGuildEmojisUpdate
  GUILD_INTEGRATIONS_UPDATE: typeof handlers.handleGuildIntegrationsUpdate
  GUILD_MEMBER_ADD: typeof handlers.handleGuildMemberAdd
  GUILD_MEMBER_REMOVE: typeof handlers.handleGuildMemberRemove
  GUILD_MEMBER_UPDATE: typeof handlers.handleGuildMemberUpdate
  GUILD_MEMBERS_CHUNK: typeof handlers.handleGuildMembersChunk
  GUILD_ROLE_CREATE: typeof handlers.handleGuildRoleCreate
  GUILD_ROLE_DELETE: typeof handlers.handleGuildRoleDelete
  GUILD_ROLE_UPDATE: typeof handlers.handleGuildRoleUpdate
  GUILD_SCHEDULED_EVENT_CREATE: typeof handlers.handleGuildScheduledEventCreate
  GUILD_SCHEDULED_EVENT_DELETE: typeof handlers.handleGuildScheduledEventDelete
  GUILD_SCHEDULED_EVENT_UPDATE: typeof handlers.handleGuildScheduledEventUpdate
  GUILD_SCHEDULED_EVENT_USER_ADD: typeof handlers.handleGuildScheduledEventUserAdd
  GUILD_SCHEDULED_EVENT_USER_REMOVE: typeof handlers.handleGuildScheduledEventUserRemove
  GUILD_UPDATE: typeof handlers.handleGuildUpdate
  INTERACTION_CREATE: typeof handlers.handleInteractionCreate
  INVITE_CREATE: typeof handlers.handleInviteCreate
  INVITE_DELETE: typeof handlers.handleInviteCreate
  MESSAGE_CREATE: typeof handlers.handleMessageCreate
  MESSAGE_DELETE_BULK: typeof handlers.handleMessageDeleteBulk
  MESSAGE_DELETE: typeof handlers.handleMessageDelete
  MESSAGE_REACTION_ADD: typeof handlers.handleMessageReactionAdd
  MESSAGE_REACTION_REMOVE_ALL: typeof handlers.handleMessageReactionRemoveAll
  MESSAGE_REACTION_REMOVE_EMOJI: typeof handlers.handleMessageReactionRemoveEmoji
  MESSAGE_REACTION_REMOVE: typeof handlers.handleMessageReactionRemove
  MESSAGE_UPDATE: typeof handlers.handleMessageUpdate
  PRESENCE_UPDATE: typeof handlers.handlePresenceUpdate
  TYPING_START: typeof handlers.handleTypingStart
  USER_UPDATE: typeof handlers.handleUserUpdate
  VOICE_SERVER_UPDATE: typeof handlers.handleVoiceServerUpdate
  VOICE_STATE_UPDATE: typeof handlers.handleVoiceStateUpdate
  WEBHOOKS_UPDATE: typeof handlers.handleWebhooksUpdate
  INTEGRATION_CREATE: typeof handlers.handleIntegrationCreate
  INTEGRATION_UPDATE: typeof handlers.handleIntegrationUpdate
  INTEGRATION_DELETE: typeof handlers.handleIntegrationDelete
}

export function createBotGatewayHandlers(
  options: Partial<BotGatewayHandlerOptions>
): Record<
  GatewayDispatchEventNames,
  (bot: Bot, data: DiscordGatewayPayload, shardId: number) => any
> {
  return {
    // misc
    READY: options.READY ?? handlers.handleReady,
    // channels
    CHANNEL_CREATE: options.CHANNEL_CREATE ?? handlers.handleChannelCreate,
    CHANNEL_DELETE: options.CHANNEL_DELETE ?? handlers.handleChannelDelete,
    CHANNEL_PINS_UPDATE: options.CHANNEL_PINS_UPDATE ??
      handlers.handleChannelPinsUpdate,
    CHANNEL_UPDATE: options.CHANNEL_UPDATE ?? handlers.handleChannelUpdate,
    THREAD_CREATE: options.THREAD_CREATE ?? handlers.handleThreadCreate,
    THREAD_UPDATE: options.THREAD_UPDATE ?? handlers.handleThreadUpdate,
    THREAD_DELETE: options.THREAD_DELETE ?? handlers.handleThreadDelete,
    THREAD_LIST_SYNC: options.THREAD_LIST_SYNC ?? handlers.handleThreadListSync,
    THREAD_MEMBERS_UPDATE: options.THREAD_MEMBERS_UPDATE ?? handlers.handleThreadMembersUpdate,
    STAGE_INSTANCE_CREATE: options.STAGE_INSTANCE_CREATE ??
      handlers.handleStageInstanceCreate,
    STAGE_INSTANCE_UPDATE: options.STAGE_INSTANCE_UPDATE ??
      handlers.handleStageInstanceUpdate,
    STAGE_INSTANCE_DELETE: options.STAGE_INSTANCE_DELETE ??
      handlers.handleStageInstanceDelete,

    // guilds
    GUILD_BAN_ADD: options.GUILD_BAN_ADD ?? handlers.handleGuildBanAdd,
    GUILD_BAN_REMOVE: options.GUILD_BAN_REMOVE ?? handlers.handleGuildBanRemove,
    GUILD_CREATE: options.GUILD_CREATE ?? handlers.handleGuildCreate,
    GUILD_DELETE: options.GUILD_DELETE ?? handlers.handleGuildDelete,
    GUILD_EMOJIS_UPDATE: options.GUILD_EMOJIS_UPDATE ??
      handlers.handleGuildEmojisUpdate,
    GUILD_INTEGRATIONS_UPDATE: options.GUILD_INTEGRATIONS_UPDATE ??
      handlers.handleGuildIntegrationsUpdate,
    GUILD_MEMBER_ADD: options.GUILD_MEMBER_ADD ?? handlers.handleGuildMemberAdd,
    GUILD_MEMBER_REMOVE: options.GUILD_MEMBER_REMOVE ??
      handlers.handleGuildMemberRemove,
    GUILD_MEMBER_UPDATE: options.GUILD_MEMBER_UPDATE ??
      handlers.handleGuildMemberUpdate,
    GUILD_MEMBERS_CHUNK: options.GUILD_MEMBERS_CHUNK ??
      handlers.handleGuildMembersChunk,
    GUILD_ROLE_CREATE: options.GUILD_ROLE_CREATE ??
      handlers.handleGuildRoleCreate,
    GUILD_ROLE_DELETE: options.GUILD_ROLE_DELETE ??
      handlers.handleGuildRoleDelete,
    GUILD_ROLE_UPDATE: options.GUILD_ROLE_UPDATE ??
      handlers.handleGuildRoleUpdate,
    GUILD_UPDATE: options.GUILD_UPDATE ?? handlers.handleGuildUpdate,
    // guild events
    GUILD_SCHEDULED_EVENT_CREATE: options.GUILD_SCHEDULED_EVENT_CREATE ??
      handlers.handleGuildScheduledEventCreate,
    GUILD_SCHEDULED_EVENT_DELETE: options.GUILD_SCHEDULED_EVENT_DELETE ??
      handlers.handleGuildScheduledEventDelete,
    GUILD_SCHEDULED_EVENT_UPDATE: options.GUILD_SCHEDULED_EVENT_UPDATE ??
      handlers.handleGuildScheduledEventUpdate,
    GUILD_SCHEDULED_EVENT_USER_ADD: options.GUILD_SCHEDULED_EVENT_USER_ADD ??
      handlers.handleGuildScheduledEventUserAdd,
    GUILD_SCHEDULED_EVENT_USER_REMOVE: options.GUILD_SCHEDULED_EVENT_USER_REMOVE ??
      handlers.handleGuildScheduledEventUserRemove,
    // interactions
    INTERACTION_CREATE: options.INTERACTION_CREATE ??
      handlers.handleInteractionCreate,
    // invites
    INVITE_CREATE: options.INVITE_CREATE ?? handlers.handleInviteCreate,
    INVITE_DELETE: options.INVITE_DELETE ?? handlers.handleInviteCreate,
    // messages
    MESSAGE_CREATE: options.MESSAGE_CREATE ?? handlers.handleMessageCreate,
    MESSAGE_DELETE_BULK: options.MESSAGE_DELETE_BULK ??
      handlers.handleMessageDeleteBulk,
    MESSAGE_DELETE: options.MESSAGE_DELETE ?? handlers.handleMessageDelete,
    MESSAGE_REACTION_ADD: options.MESSAGE_REACTION_ADD ??
      handlers.handleMessageReactionAdd,
    MESSAGE_REACTION_REMOVE_ALL: options.MESSAGE_REACTION_REMOVE_ALL ??
      handlers.handleMessageReactionRemoveAll,
    MESSAGE_REACTION_REMOVE_EMOJI: options.MESSAGE_REACTION_REMOVE_EMOJI ??
      handlers.handleMessageReactionRemoveEmoji,
    MESSAGE_REACTION_REMOVE: options.MESSAGE_REACTION_REMOVE ??
      handlers.handleMessageReactionRemove,
    MESSAGE_UPDATE: options.MESSAGE_UPDATE ?? handlers.handleMessageUpdate,
    // presence
    PRESENCE_UPDATE: options.PRESENCE_UPDATE ?? handlers.handlePresenceUpdate,
    TYPING_START: options.TYPING_START ?? handlers.handleTypingStart,
    USER_UPDATE: options.USER_UPDATE ?? handlers.handleUserUpdate,
    // voice
    VOICE_SERVER_UPDATE: options.VOICE_SERVER_UPDATE ??
      handlers.handleVoiceServerUpdate,
    VOICE_STATE_UPDATE: options.VOICE_STATE_UPDATE ??
      handlers.handleVoiceStateUpdate,
    // webhooks
    WEBHOOKS_UPDATE: options.WEBHOOKS_UPDATE ?? handlers.handleWebhooksUpdate,
    // integrations
    INTEGRATION_CREATE: options.INTEGRATION_CREATE ??
      handlers.handleIntegrationCreate,
    INTEGRATION_UPDATE: options.INTEGRATION_UPDATE ??
      handlers.handleIntegrationUpdate,
    INTEGRATION_DELETE: options.INTEGRATION_DELETE ??
      handlers.handleIntegrationDelete
  }
}

export type RemoveFirstFromTuple<T extends any[]> = T['length'] extends 0 ? []
  : ((...b: T) => void) extends (a: any, ...b: infer I) => void ? I
  : []
export type FinalHelpers = {
  [K in keyof Helpers]: (
    ...args: RemoveFirstFromTuple<Parameters<Helpers[K]>>
  ) => ReturnType<Helpers[K]>;
}
