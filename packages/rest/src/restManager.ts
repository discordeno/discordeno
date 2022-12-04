import {
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
import {
  API_VERSION,
  baseEndpoints,
  bigintToSnowflake,
  removeTokenPrefix,
  snowflakeToBigint
} from '@discordeno/utils'
import { checkRateLimits } from './checkRateLimits.js'
import { cleanupQueues } from './cleanupQueues.js'
import { convertRestError } from './convertRestError.js'
import { createInvalidRequestBucket } from './createInvalidRequestBucket.js'
import { QueueBucket } from './createQueueBucket.js'
import { createRequestBody } from './createRequestBody.js'
import { processGlobalQueue } from './processGlobalQueue.js'
import { processQueue } from './processQueue.js'
import { processRateLimitedPaths } from './processRateLimitedPaths.js'
import { processRequest } from './processRequest.js'
import { processRequestHeaders } from './processRequestHeaders.js'
import { RestPayload, RestRateLimitedPath, RestRequest } from './rest.js'
import { runMethod } from './runMethod.js'
import { RestSendRequestOptions, sendRequest } from './sendRequest.js'
import { simplifyUrl } from './simplifyUrl.js'
import {
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
  transformApplicationCommandToDiscordApplicationCommand,
  transformApplicationToDiscordApplication,
  transformAttachment,
  transformAttachmentToDiscordAttachment,
  transformAuditLogEntry,
  transformAutoModerationActionExecution,
  transformAutoModerationRule,
  transformChannel,
  transformComponent,
  transformComponentToDiscordComponent,
  transformCreateApplicationCommandToDiscordCreateApplicationCommand,
  transformEmbed,
  transformEmbedToDiscordEmbed,
  transformEmoji,
  transformGatewayBot,
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
  User,
  VoiceRegions,
  VoiceState,
  Webhook,
  WelcomeScreen
} from './transformers/index.js'
import { CreateApplicationCommand, InteractionResponse } from './types.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createRestManager (options: CreateRestManagerOptions) {
  const version = options.version ?? API_VERSION

  if (options.customUrl !== undefined) {
    baseEndpoints.BASE_URL = `${options.customUrl}/v${version}`
  }

  const rest = {
    invalidBucket: createInvalidRequestBucket({}),
    version,
    token: removeTokenPrefix(options.token),
    maxRetryCount: options.maxRetryCount ?? 10,
    secretKey: options.secretKey ?? 'discordeno_best_lib_ever',
    customUrl: options.customUrl ?? '',
    pathQueues: new Map<string, QueueBucket>(),
    processingQueue: false,
    processingRateLimitedPaths: false,
    globallyRateLimited: false,
    globalQueue: [] as Array<{
      request: RestRequest
      payload: RestPayload
      basicURL: string
      urlToUse: string
    }>,
    globalQueueProcessing: false,
    rateLimitedPaths: new Map<string, RestRateLimitedPath>(),

    debug: options.debug ?? function (_text: string) {},
    checkRateLimits: options.checkRateLimits ?? checkRateLimits,
    cleanupQueues: options.cleanupQueues ?? cleanupQueues,
    processQueue: options.processQueue ?? processQueue,
    processRateLimitedPaths:
      options.processRateLimitedPaths ?? processRateLimitedPaths,
    processRequestHeaders:
      options.processRequestHeaders ?? processRequestHeaders,
    processRequest: options.processRequest ?? processRequest,
    createRequestBody: options.createRequestBody ?? createRequestBody,
    runMethod: options.runMethod ?? runMethod,
    simplifyUrl: options.simplifyUrl ?? simplifyUrl,
    processGlobalQueue: options.processGlobalQueue ?? processGlobalQueue,
    convertRestError: options.convertRestError ?? convertRestError,
    sendRequest: options.sendRequest ?? sendRequest,
    fetching:
      options.fetching ??
      function (opts: RestSendRequestOptions) {
        options.debug?.(
          `[REST - fetching] URL: ${opts.url} | ${JSON.stringify(opts)}`
        )
      },
    fetched:
      options.fetched ??
      function (opts: RestSendRequestOptions, response: Response) {
        options.debug?.(
          `[REST - fetched] URL: ${opts.url} | Status: ${
            response.status
          } ${JSON.stringify(opts)}`
        )
      },
    transformers: createTransformers(options.transformers ?? {})
  }

  return rest
}

export interface CreateRestManagerOptions {
  token: string
  customUrl?: string
  maxRetryCount?: number
  version?: number
  secretKey?: string
  debug?: (text: string) => unknown
  checkRateLimits?: typeof checkRateLimits
  cleanupQueues?: typeof cleanupQueues
  processQueue?: typeof processQueue
  processRateLimitedPaths?: typeof processRateLimitedPaths
  processRequestHeaders?: typeof processRequestHeaders
  processRequest?: typeof processRequest
  createRequestBody?: typeof createRequestBody
  runMethod?: typeof runMethod
  simplifyUrl?: typeof simplifyUrl
  processGlobalQueue?: typeof processGlobalQueue
  convertRestError?: typeof convertRestError
  sendRequest?: typeof sendRequest
  fetching?: (options: RestSendRequestOptions) => void
  fetched?: (options: RestSendRequestOptions, response: Response) => void
  transformers?: Partial<ReturnType<typeof createTransformers>>
}

export type RestManager = ReturnType<typeof createRestManager>

export interface Transformers {
  reverse: {
    allowedMentions: (
      rest: RestManager,
      payload: AllowedMentions
    ) => DiscordAllowedMentions
    embed: (rest: RestManager, payload: Embed) => DiscordEmbed
    component: (rest: RestManager, payload: Component) => DiscordComponent
    activity: (rest: RestManager, payload: Activity) => DiscordActivity
    member: (rest: RestManager, payload: Member) => DiscordMember
    user: (rest: RestManager, payload: User) => DiscordUser
    team: (rest: RestManager, payload: Team) => DiscordTeam
    application: (
      rest: RestManager,
      payload: Application
    ) => DiscordApplication
    snowflake: (snowflake: BigString) => string
    createApplicationCommand: (
      rest: RestManager,
      payload: CreateApplicationCommand
    ) => DiscordCreateApplicationCommand
    applicationCommand: (
      rest: RestManager,
      payload: ApplicationCommand
    ) => DiscordApplicationCommand
    applicationCommandOption: (
      rest: RestManager,
      payload: ApplicationCommandOption
    ) => DiscordApplicationCommandOption
    applicationCommandOptionChoice: (
      rest: RestManager,
      payload: ApplicationCommandOptionChoice
    ) => DiscordApplicationCommandOptionChoice
    interactionResponse: (
      rest: RestManager,
      payload: InteractionResponse
    ) => DiscordInteractionResponse
    attachment: (rest: RestManager, payload: Attachment) => DiscordAttachment
  }
  snowflake: (snowflake: BigString) => bigint
  gatewayBot: (payload: DiscordGetGatewayBot) => GetGatewayBot
  automodRule: (
    rest: RestManager,
    payload: DiscordAutoModerationRule
  ) => AutoModerationRule
  automodActionExecution: (
    rest: RestManager,
    payload: DiscordAutoModerationActionExecution
  ) => AutoModerationActionExecution
  channel: (
    rest: RestManager,
    payload: { channel: DiscordChannel } & { guildId?: bigint }
  ) => Channel
  guild: (
    rest: RestManager,
    payload: { guild: DiscordGuild } & { shardId: number }
  ) => Guild
  user: (rest: RestManager, payload: DiscordUser) => User
  member: (
    rest: RestManager,
    payload: DiscordMember,
    guildId: bigint,
    userId: bigint
  ) => Member
  message: (rest: RestManager, payload: DiscordMessage) => Message
  role: (
    rest: RestManager,
    payload: { role: DiscordRole } & { guildId: bigint }
  ) => Role
  voiceState: (
    rest: RestManager,
    payload: { voiceState: DiscordVoiceState } & { guildId: bigint }
  ) => VoiceState
  interaction: (rest: RestManager, payload: DiscordInteraction) => Interaction
  interactionDataOptions: (
    rest: RestManager,
    payload: DiscordInteractionDataOption
  ) => InteractionDataOption
  integration: (
    rest: RestManager,
    payload: DiscordIntegrationCreateUpdate
  ) => Integration
  invite: (rest: RestManager, invite: DiscordInviteCreate) => Invite
  application: (rest: RestManager, payload: DiscordApplication) => Application
  team: (rest: RestManager, payload: DiscordTeam) => Team
  emoji: (rest: RestManager, payload: DiscordEmoji) => Emoji
  activity: (rest: RestManager, payload: DiscordActivity) => Activity
  presence: (
    rest: RestManager,
    payload: DiscordPresenceUpdate
  ) => PresenceUpdate
  attachment: (rest: RestManager, payload: DiscordAttachment) => Attachment
  embed: (rest: RestManager, payload: DiscordEmbed) => Embed
  component: (rest: RestManager, payload: DiscordComponent) => Component
  webhook: (rest: RestManager, payload: DiscordWebhook) => Webhook
  auditLogEntry: (
    rest: RestManager,
    payload: DiscordAuditLogEntry
  ) => AuditLogEntry
  applicationCommand: (
    rest: RestManager,
    payload: DiscordApplicationCommand
  ) => ApplicationCommand
  applicationCommandOption: (
    rest: RestManager,
    payload: DiscordApplicationCommandOption
  ) => ApplicationCommandOption
  applicationCommandPermission: (
    rest: RestManager,
    payload: DiscordGuildApplicationCommandPermissions
  ) => ApplicationCommandPermission
  scheduledEvent: (
    rest: RestManager,
    payload: DiscordScheduledEvent
  ) => ScheduledEvent
  threadMember: (
    rest: RestManager,
    payload: DiscordThreadMember
  ) => ThreadMember
  welcomeScreen: (
    rest: RestManager,
    payload: DiscordWelcomeScreen
  ) => WelcomeScreen
  voiceRegion: (rest: RestManager, payload: DiscordVoiceRegion) => VoiceRegions
  widget: (rest: RestManager, payload: DiscordGuildWidget) => GuildWidget
  widgetSettings: (
    rest: RestManager,
    payload: DiscordGuildWidgetSettings
  ) => GuildWidgetSettings
  stageInstance: (
    rest: RestManager,
    payload: DiscordStageInstance
  ) => StageInstance
  sticker: (rest: RestManager, payload: DiscordSticker) => Sticker
  stickerPack: (rest: RestManager, payload: DiscordStickerPack) => StickerPack
  applicationCommandOptionChoice: (
    rest: RestManager,
    payload: DiscordApplicationCommandOptionChoice
  ) => ApplicationCommandOptionChoice
  template: (rest: RestManager, payload: DiscordTemplate) => Template
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
        options.reverse?.attachment ?? transformAttachmentToDiscordAttachment
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
