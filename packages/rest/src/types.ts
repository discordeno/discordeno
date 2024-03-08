import type {
  AddDmRecipientOptions,
  AddGuildMemberOptions,
  ApplicationCommandPermissions,
  AtLeastOne,
  BeginGuildPrune,
  BigString,
  Camelize,
  CamelizedDiscordAccessTokenResponse,
  CamelizedDiscordActiveThreads,
  CamelizedDiscordApplication,
  CamelizedDiscordApplicationCommand,
  CamelizedDiscordApplicationRoleConnection,
  CamelizedDiscordArchivedThreads,
  CamelizedDiscordAuditLog,
  CamelizedDiscordAutoModerationRule,
  CamelizedDiscordBan,
  CamelizedDiscordChannel,
  CamelizedDiscordConnection,
  CamelizedDiscordCurrentAuthorization,
  CamelizedDiscordEmoji,
  CamelizedDiscordEntitlement,
  CamelizedDiscordFollowedChannel,
  CamelizedDiscordGetGatewayBot,
  CamelizedDiscordGuild,
  CamelizedDiscordGuildApplicationCommandPermissions,
  CamelizedDiscordGuildOnboarding,
  CamelizedDiscordGuildPreview,
  CamelizedDiscordGuildWidget,
  CamelizedDiscordGuildWidgetSettings,
  CamelizedDiscordIntegration,
  CamelizedDiscordInvite,
  CamelizedDiscordInviteMetadata,
  CamelizedDiscordMember,
  CamelizedDiscordMemberWithUser,
  CamelizedDiscordMessage,
  CamelizedDiscordModifyGuildWelcomeScreen,
  CamelizedDiscordPartialGuild,
  CamelizedDiscordPrunedCount,
  CamelizedDiscordRole,
  CamelizedDiscordScheduledEvent,
  CamelizedDiscordSku,
  CamelizedDiscordStageInstance,
  CamelizedDiscordSticker,
  CamelizedDiscordStickerPack,
  CamelizedDiscordTemplate,
  CamelizedDiscordThreadMember,
  CamelizedDiscordTokenExchange,
  CamelizedDiscordTokenRevocation,
  CamelizedDiscordUser,
  CamelizedDiscordVanityUrl,
  CamelizedDiscordVoiceRegion,
  CamelizedDiscordWebhook,
  CamelizedDiscordWelcomeScreen,
  // Type is required for typedoc
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ChannelTypes,
  CreateApplicationCommand,
  CreateAutoModerationRuleOptions,
  CreateChannelInvite,
  CreateEntitlement,
  CreateForumPostWithMessage,
  CreateGlobalApplicationCommandOptions,
  CreateGuild,
  CreateGuildApplicationCommandOptions,
  CreateGuildBan,
  CreateGuildChannel,
  CreateGuildEmoji,
  CreateGuildFromTemplate,
  CreateGuildRole,
  CreateGuildStickerOptions,
  CreateMessageOptions,
  CreateScheduledEvent,
  CreateStageInstance,
  CreateTemplate,
  DeleteWebhookMessageOptions,
  EditApplication,
  EditAutoModerationRuleOptions,
  EditBotMemberOptions,
  EditChannelPermissionOverridesOptions,
  EditGuildOnboarding,
  EditGuildRole,
  EditGuildStickerOptions,
  EditMessage,
  EditOwnVoiceState,
  EditScheduledEvent,
  EditUserVoiceState,
  ExecuteWebhook,
  FileContent,
  GetApplicationCommandPermissionOptions,
  GetBans,
  GetEntitlements,
  GetGroupDmOptions,
  GetGuildAuditLog,
  GetGuildPruneCountQuery,
  GetInvite,
  GetMessagesOptions,
  GetReactions,
  GetScheduledEventUsers,
  GetScheduledEvents,
  GetUserGuilds,
  GetWebhookMessageOptions,
  // Type is required for typedoc
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  GuildFeatures,
  InteractionCallbackData,
  InteractionResponse,
  ListArchivedThreads,
  ListGuildMembers,
  MfaLevels,
  ModifyChannel,
  ModifyGuild,
  ModifyGuildChannelPositions,
  ModifyGuildEmoji,
  ModifyGuildMember,
  ModifyGuildTemplate,
  ModifyRolePositions,
  ModifyWebhook,
  // Type is required for typedoc
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ScheduledEventEntityType,
  // Type is required for typedoc
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ScheduledEventStatus,
  SearchMembers,
  StartThreadWithMessage,
  StartThreadWithoutMessage,
  UpsertGlobalApplicationCommandOptions,
  UpsertGuildApplicationCommandOptions,
} from '@discordeno/types'
import type { logger } from '@discordeno/utils'
import type { InvalidRequestBucket } from './invalidBucket.js'
import type { Queue } from './queue.js'
import type { RestRoutes } from './typings/routes.js'

export interface CreateRestManagerOptions {
  /** The bot token which will be used to make requests. */
  token: string
  /**
   * For old bots that have a different bot id and application id.
   * @default bot id from token
   */
  applicationId?: BigString
  /** Configuration when using a proxy. */
  proxy?: {
    /**
     * The base url to connect to. If you create a proxy rest, that url would go here.
     * IT SHOULD NOT END WITH A /
     * @default https://discord.com/api
     */
    baseUrl: string
    /** The authorization header value to attach when sending requests to the proxy. */
    authorization: string
    /**
     * The authorization header name to use when sending requests to the proxy
     *
     * @remarks
     * If the `authorization` header is used it will override any authorization that is given even if
     * the requests uses OAuth2 Bearer tokens / Basic tokens
     *
     * @default "authorization" // For compatibility purposes
     */
    authorizationHeader?: string
  }
  /**
   * The api versions which can be used to make requests.
   * @default 10
   */
  version?: ApiVersions
  /**
   * The logger that the rest manager will use
   * @default logger // The logger exported by `@discordeno/utils`
   */
  logger?: Pick<typeof logger, 'debug' | 'info' | 'warn' | 'error' | 'fatal'>
}

export interface RestManager {
  /** The bot token which will be used to make requests. */
  token: string
  /** The application id. Normally this is not required for recent bots but old bot's application id is sometimes different from the bot id so it is required for those bots. */
  applicationId: bigint
  /** The api version to use when making requests. Only the latest supported version will be tested. */
  version: ApiVersions
  /**
   * The base url to connect to. If you create a proxy rest, that url would go here.
   * IT SHOULD NOT END WITH A /
   * @default https://discord.com/api
   */
  baseUrl: string
  /**
   * `true` if the `baseUrl` does not start with `https://discord.com/api`.
   *
   * Mostly used only for intern functions.
   */
  isProxied: boolean
  /** The authorization header value to attach when sending requests to the proxy. */
  authorization?: string
  /** The authorization header name to attach when sending requests to the proxy */
  authorizationHeader: string
  /** The maximum amount of times a request should be retried. Defaults to Infinity */
  maxRetryCount: number
  /** Whether or not the manager is rate limited globally across all requests. Defaults to false. */
  globallyRateLimited: boolean
  /** Whether or not the rate limited paths are being processed to allow requests to be made once time is up. Defaults to false. */
  processingRateLimitedPaths: boolean
  /** The time in milliseconds to wait before deleting this queue if it is empty. Defaults to 60000(one minute). */
  deleteQueueDelay: number
  /** The queues that hold all the requests to be processed. */
  queues: Map<string, Queue>
  /** The paths that are currently rate limited. */
  rateLimitedPaths: Map<string, RestRateLimitedPath>
  /** The bucket for handling any invalid requests.  */
  invalidBucket: InvalidRequestBucket
  /** The routes that are available for this manager. */
  routes: RestRoutes
  /** The logger to use for the rest manager */
  logger: Pick<typeof logger, 'debug' | 'info' | 'warn' | 'error' | 'fatal'>
  /** Allows the user to inject custom headers that will be sent with every request. */
  createBaseHeaders: () => Record<string, string>
  /** Whether or not the rest manager should keep objects in raw snake case from discord. */
  preferSnakeCase: (enabled: boolean) => RestManager
  /** Check the rate limits for a url or a bucket. */
  checkRateLimits: (url: string, headers?: Record<string, string>) => number | false
  /** Reshapes and modifies the obj as needed to make it ready for discords api. */
  changeToDiscordFormat: (obj: any) => any
  /** Creates the request body and headers that are necessary to send a request. Will handle different types of methods and everything necessary for discord. */
  createRequestBody: (method: RequestMethods, options?: CreateRequestBodyOptions) => RequestBody
  /** This will create a infinite loop running in 1 seconds using tail recursion to keep rate limits clean. When a rate limit resets, this will remove it so the queue can proceed. */
  processRateLimitedPaths: () => void
  /**
   * Processes the rate limit headers and determines if it needs to be rate limited and returns the bucket id if available
   *
   * @remarks
   * The authenticationHeader should be defined ONLY if the request was done using a OAuth2 Access Token, in other cases it should be passed as an empty string
   */
  processHeaders: (url: string, headers: Headers, authenticationHeader?: string) => string | undefined
  /** Sends a request to the api. */
  sendRequest: (options: SendRequestOptions) => Promise<void>
  /** Split a url to separate rate limit buckets based on major/minor parameters. */
  simplifyUrl: (url: string, method: RequestMethods) => string
  /** Make a request to be sent to the api. */
  makeRequest: <T = unknown>(method: RequestMethods, url: string, options?: MakeRequestOptions) => Promise<T>
  /** Takes a request and processes it into a queue. */
  processRequest: (request: SendRequestOptions) => Promise<void>
  /** Make a get request to the api */
  get: <T = void>(url: string, options?: Omit<MakeRequestOptions, 'body'>) => Promise<Camelize<T>>
  /** Make a post request to the api. */
  post: <T = void>(url: string, options?: MakeRequestOptions) => Promise<Camelize<T>>
  /** Make a put request to the api. */
  put: <T = void>(url: string, options?: MakeRequestOptions) => Promise<Camelize<T>>
  /** Make a delete request to the api. */
  delete: (url: string, options?: Omit<MakeRequestOptions, 'body'>) => Promise<void>
  /** Make a patch request to the api. */
  patch: <T = void>(url: string, options?: MakeRequestOptions) => Promise<Camelize<T>>
  /**
   * Adds a reaction to a message.
   *
   * @param channelId - The ID of the channel the message to add a reaction to is in.
   * @param messageId - The ID of the message to add a reaction to.
   * @param reaction - The reaction to add to the message.
   * @returns
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * If nobody else has reacted to the message:
   * - Requires the `ADD_REACTIONS` permission.
   *
   * Fires a _Message Reaction Add_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#create-reaction}
   */
  addReaction: (channelId: BigString, messageId: BigString, reaction: string) => Promise<void>
  /**
   * Adds multiple a reaction to a message.
   *
   * This function uses the `addReaction()` helper behind the scenes.
   *
   * @param channelId - The ID of the channel the message to add reactions to is in.
   * @param messageId - The ID of the message to add the reactions to.
   * @param reactions - The reactions to add to the message.
   * @param ordered - Whether the reactions must be added in order or not.
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * If nobody else has reacted to the message:
   * - Requires the `ADD_REACTIONS` permission.
   *
   * Fires a _Message Reaction Add_ gateway event for every reaction added.
   */
  addReactions: (channelId: BigString, messageId: BigString, reactions: string[], ordered?: boolean) => Promise<void>
  /**
   * Adds a role to a member.
   *
   * @param guildId - The ID of the guild the member to add the role to is in.
   * @param userId - The user ID of the member to add the role to.
   * @param roleId - The ID of the role to add to the member.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `MANAGE_ROLES` permission.
   *
   * Fires a _Guild Member Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#add-guild-member-role}
   */
  addRole: (guildId: BigString, userId: BigString, roleId: BigString, reason?: string) => Promise<void>
  /**
   * Adds a member to a thread.
   *
   * @param channelId - The ID of the thread to add the member to.
   * @param userId - The user ID of the member to add to the thread.
   *
   * @remarks
   * Requires the ability to send messages in the thread.
   * Requires the thread not be archived.
   *
   * Fires a _Thread Members Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#add-thread-member}
   */
  addThreadMember: (channelId: BigString, userId: BigString) => Promise<void>
  /**
   * Adds a recipient to a group DM.
   *
   * @param channelId - The ID of the group dm to add the user to.
   * @param userId - The user ID of the user to add to the group dm.
   * @param options - The options for adding the user
   *
   * @remarks
   * Requires an OAuth2 access token with the `gdm.join` scope
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#group-dm-add-recipient}
   */
  addDmRecipient: (channelId: BigString, userId: BigString, options: AddDmRecipientOptions) => Promise<void>
  /**
   * Adds a member to a guild.
   *
   * @param guildId - The ID of the thread to add the member to.
   * @param userId - The user ID of the member to add to the thread.
   * @param options - The options for the add of a guild member
   *
   * @remarks
   * Requires the bot to be in the specified server
   * Requires an OAuth2 access token with the `guilds.join` scope
   *
   * Fires a _Guild Member Add_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#add-guild-member}
   */
  addGuildMember: (guildId: BigString, userId: BigString, options: AddGuildMemberOptions) => Promise<void>
  /**
   * Creates an automod rule in a guild.
   *
   * @param guildId - The ID of the guild to create the rule in.
   * @param options - The parameters for the creation of the rule.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the created {@link CamelizedDiscordAutoModerationRule}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires an _Auto Moderation Rule Create_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule}
   */
  createAutomodRule: (guildId: BigString, options: CreateAutoModerationRuleOptions, reason?: string) => Promise<CamelizedDiscordAutoModerationRule>
  /**
   * Creates a channel within a guild.
   *
   * @param guildId - The ID of the guild to create the channel within.
   * @param options - The parameters for the creation of the channel.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the created {@link CamelizedDiscordChannel}.
   *
   * @remarks
   * Requires the `MANAGE_CHANNELS` permission.
   *
   * If setting permission overwrites, only the permissions the bot user has in the guild can be allowed or denied.
   *
   * Setting the `MANAGE_ROLES` permission is only possible for guild administrators.
   *
   * Fires a _Channel Create_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#create-guild-channel}
   */
  createChannel: (guildId: BigString, options: CreateGuildChannel, reason?: string) => Promise<CamelizedDiscordChannel>
  /**
   * Creates an emoji in a guild.
   *
   * @param guildId - The ID of the guild in which to create the emoji.
   * @param options - The parameters for the creation of the emoji.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the created {@link CamelizedDiscordEmoji}.
   *
   * @remarks
   * Requires the `CREATE_GUILD_EXPRESSIONS` permission.
   *
   * Emojis have a maximum file size of 256 kilobits. Attempting to upload a larger emoji will cause the route to return 400 Bad Request.
   *
   * Fires a _Guild Emojis Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/emoji#create-guild-emoji}
   */
  createEmoji: (guildId: BigString, options: CreateGuildEmoji, reason?: string) => Promise<CamelizedDiscordEmoji>
  /**
   * Creates a new thread in a forum channel or media channel, and sends a message within the created thread.
   *
   * @param channelId - The ID of the forum channel to create the thread within.
   * @param options - The parameters for the creation of the thread.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of {@link CamelizedDiscordChannel} with a nested {@link CamelizedDiscordChannel} object.
   *
   * @remarks
   * Requires the `CREATE_MESSAGES` permission.
   *
   * Fires a _Thread Create_ gateway event.
   * Fires a _Message Create_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#start-thread-in-forum-or-media-channel}
   */
  createForumThread: (channelId: BigString, options: CreateForumPostWithMessage, reason?: string) => Promise<CamelizedDiscordChannel>
  /**
   * Creates an application command accessible globally; across different guilds and channels.
   *
   * @param command - The command to create.
   * @param options - Additional options for the endpoint
   * @returns An instance of the created {@link CamelizedDiscordApplicationCommand}.
   *
   * @remarks
   * ⚠️ Creating a command with the same name as an existing command for your application will overwrite the old command.
   * ⚠️ Global commands once created are cached for periods of __an hour__, so changes made to existing commands will take an hour to surface.
   * ⚠️ You can only create up to 200 _new_ commands daily.
   *
   * When using the bearer token the token needs the `applications.commands.update` scope and must be a `Client grant` token.
   *  You will be able to update only your own application commands
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#create-global-application-command}
   */
  createGlobalApplicationCommand: (
    command: CreateApplicationCommand,
    options?: CreateGlobalApplicationCommandOptions,
  ) => Promise<CamelizedDiscordApplicationCommand>
  /**
   * Creates a guild.
   *
   * @param options - The parameters for the creation of the guild.
   * @returns An instance of the created {@link CamelizedDiscordGuild}.
   *
   * @remarks
   * ⚠️ This route can only be used by bots in __fewer than 10 guilds__.
   *
   * Fires a _Guild Create_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#create-guild}
   */
  createGuild: (options: CreateGuild) => Promise<CamelizedDiscordGuild>
  /**
   * Creates an application command only accessible in a specific guild.
   *
   * @param command - The command to create.
   * @param guildId - The ID of the guild to create the command for.
   * @param options - Additional options for the endpoint
   * @returns An instance of the created {@link CamelizedDiscordApplicationCommand}.
   *
   * @remarks
   * ⚠️ Creating a command with the same name as an existing command for your application will overwrite the old command.
   * ⚠️ You can only create up to 200 _new_ commands daily.
   *
   * When using the bearer token the token needs the `applications.commands.update` scope and must be a `Client grant` token.
   *  You will be able to update only your own application commands
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command}
   */
  createGuildApplicationCommand: (
    command: CreateApplicationCommand,
    guildId: BigString,
    options?: CreateGuildApplicationCommandOptions,
  ) => Promise<CamelizedDiscordApplicationCommand>
  /**
   * Creates a guild from a template.
   *
   * @param templateCode - The code of the template.
   * @param options - The parameters for the creation of the guild.
   * @returns An instance of the created {@link CamelizedDiscordGuild}.
   *
   * @remarks
   * ⚠️ This route can only be used by bots in __fewer than 10 guilds__.
   *
   * Fires a _Guild Create_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-template#create-guild-from-guild-template}
   */
  createGuildFromTemplate: (templateCode: string, options: CreateGuildFromTemplate) => Promise<CamelizedDiscordGuild>
  /**
   * Create a new sticker for the guild.
   *
   * @param guildId The ID of the guild to get
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @return A {@link CamelizedDiscordSticker}
   *
   * @remarks
   * Requires the `CREATE_GUILD_EXPRESSIONS` permission.
   * Fires a Guild Stickers Update Gateway event.
   * Every guilds has five free sticker slots by default, and each Boost level will grant access to more slots.
   * Lottie stickers can only be uploaded on guilds that have either the `VERIFIED` and/or the `PARTNERED` guild feature.
   *
   * @see {@link https://discord.com/developers/docs/resources/sticker#create-guild-sticker}
   */
  createGuildSticker: (guildId: BigString, options: CreateGuildStickerOptions, reason?: string) => Promise<CamelizedDiscordSticker>
  /**
   * Creates a template from a guild.
   *
   * @param guildId - The ID of the guild to create the template from.
   * @param options - The parameters for the creation of the template.
   * @returns An instance of the created {@link CamelizedDiscordTemplate}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires a _Guild Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-template#create-guild-template}
   */
  createGuildTemplate: (guildId: BigString, options: CreateTemplate) => Promise<CamelizedDiscordTemplate>
  /**
   * Creates an invite to a channel in a guild.
   *
   * @param channelId - The ID of the channel to create the invite to.
   * @param options - The parameters for the creation of the invite.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the created {@link CamelizedDiscordInvite}.
   *
   * @remarks
   * Requires the `CREATE_INSTANT_INVITE` permission.
   *
   * Fires an _Invite Create_ gateway event.
   *
   * @privateRemarks
   * The request body is not optional, and an empty JSON object must be sent regardless of whether any fields are being transmitted.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#create-channel-invite}
   */
  createInvite: (channelId: BigString, options?: CreateChannelInvite, reason?: string) => Promise<CamelizedDiscordInvite>
  /**
   * Creates a role in a guild.
   *
   * @param guildId - The ID of the guild to create the role in.
   * @param options - The parameters for the creation of the role.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the created {@link CamelizedDiscordRole}.
   *
   * @remarks
   * Requires the `MANAGE_ROLES` permission.
   *
   * Fires a _Guild Role Create_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#create-guild-role}
   */
  createRole: (guildId: BigString, options: CreateGuildRole, reason?: string) => Promise<CamelizedDiscordRole>
  /**
   * Creates a scheduled event in a guild.
   *
   * @param guildId - The ID of the guild to create the scheduled event in.
   * @param options - The parameters for the creation of the scheduled event.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the created {@link CamelizedDiscordScheduledEvent}.
   *
   * @remarks
   * Requires the `MANAGE_EVENTS` permission.
   *
   * A guild can only have a maximum of 100 events with a status of {@link ScheduledEventStatus}.Active or {@link ScheduledEventStatus}.Scheduled (inclusive).
   *
   * Fires a _Guild Scheduled Event Create_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event}
   */
  createScheduledEvent: (guildId: BigString, options: CreateScheduledEvent, reason?: string) => Promise<CamelizedDiscordScheduledEvent>
  /**
   * Creates a stage instance associated with a stage channel.
   *
   * @param options - The parameters for the creation of the stage instance.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the created {@link CamelizedDiscordStageInstance}.
   *
   * @remarks
   * Requires the user to be a moderator of the stage channel.
   *
   * Fires a _Stage Instance Create_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/stage-instance#create-stage-instance}
   */
  createStageInstance: (options: CreateStageInstance, reason?: string) => Promise<CamelizedDiscordStageInstance>
  /**
   * Creates a webhook.
   *
   * @param channelId - The ID of the channel to create the webhook in.
   * @param options - The parameters for the creation of the webhook.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the created {@link CamelizedDiscordWebhook}.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission.
   *
   * ⚠️ The webhook name must not contain the substrings 'clyde', or 'discord' (case-insensitive).
   *
   * Fires a _Webhooks Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#create-webhook}
   */
  createWebhook: (channelId: BigString, options: CreateWebhook, reason?: string) => Promise<CamelizedDiscordWebhook>
  /**
   * Deletes an automod rule.
   *
   * @param guildId - The ID of the guild to delete the rule from.
   * @param ruleId - The ID of the automod rule to delete.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires an _Auto Moderation Rule Delete_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/auto-moderation#delete-auto-moderation-rule}
   */
  deleteAutomodRule: (guildId: BigString, ruleId: BigString, reason?: string) => Promise<void>
  /**
   * Deletes a channel from within a guild.
   *
   * @param channelId - The ID of the channel to delete.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns nothing
   *
   * @remarks
   * For community guilds, the _Rules_, _Guidelines_ and _Community Update_ channels cannot be deleted.
   *
   * If the channel is a thread:
   * - Requires the `MANAGE_THREADS` permission.
   *
   * - Fires a _Thread Delete_ gateway event.
   *
   * Otherwise:
   * - Requires the `MANAGE_CHANNELS` permission.
   *
   * - ⚠️ Deleting a category channel does not delete its child channels.
   *   Instead, they will have their `parent_id` property removed, and a `Channel Update` gateway event will fire for each of them.
   *
   * - Fires a _Channel Delete_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#deleteclose-channel}
   */
  deleteChannel: (channelId: BigString, reason?: string) => Promise<void>
  /**
   * Deletes a permission override for a user or role in a channel.
   *
   * @param channelId - The ID of the channel to delete the permission override of.
   * @param overwriteId - The ID of the permission override to delete.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `MANAGE_ROLES` permission.
   *
   * Fires a _Channel Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#delete-channel-permission}
   */
  deleteChannelPermissionOverride: (channelId: BigString, overwriteId: BigString, reason?: string) => Promise<void>
  /**
   * Deletes an emoji from a guild.
   *
   * @param guildId - The ID of the guild from which to delete the emoji.
   * @param id - The ID of the emoji to delete.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * For emojis created by the current user, requires either the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
   * For other emojis, requires the `MANAGE_GUILD_EXPRESSIONS` permission.
   *
   * Fires a _Guild Emojis Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/emoji#delete-guild-emoji}
   */
  deleteEmoji: (guildId: BigString, id: BigString, reason?: string) => Promise<void>
  /**
   * Deletes a follow-up message to an interaction.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   * @param messageId - The ID of the message to delete.
   *
   * @remarks
   * Unlike `deleteMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
   *
   * Fires a _Message Delete_ event.
   *
   * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message}
   */
  deleteFollowupMessage: (token: string, messageId: BigString) => Promise<void>
  /**
   * Deletes an application command registered globally.
   *
   * @param commandId - The ID of the command to delete.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#delete-global-application-command}
   */
  deleteGlobalApplicationCommand: (commandId: BigString) => Promise<void>
  /**
   * Deletes a guild.
   *
   * @param guildId - The ID of the guild to delete.
   *
   * @remarks
   * The bot user must be the owner of the guild.
   *
   * Fires a _Guild Delete_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#delete-guild}
   */
  deleteGuild: (guildId: BigString) => Promise<void>
  /**
   * Deletes an application command registered in a guild.
   *
   * @param guildId - The ID of the guild to delete the command from.
   * @param commandId - The ID of the command to delete from the guild.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command}
   */
  deleteGuildApplicationCommand: (commandId: BigString, guildId: BigString) => Promise<void>
  /**
   * Delete a new sticker for the guild.
   *
   * @param guildId The ID of the guild to get
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @return A {@link CamelizedDiscordSticker}
   *
   * @remarks
   * For stickers created by the current user, requires either the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
   * For other stickers, requires the `MANAGE_GUILD_EXPRESSIONS` permission.
   * Fires a Guild Stickers Update Gateway event.
   * Every guilds has five free sticker slots by default, and each Boost level will grant access to more slots.
   * Lottie stickers can only be uploaded on guilds that have either the `VERIFIED` and/or the `PARTNERED` guild feature.
   *
   * @see {@link https://discord.com/developers/docs/resources/sticker#delete-guild-sticker}
   */
  deleteGuildSticker: (guildId: BigString, stickerId: BigString, reason?: string) => Promise<void>
  /**
   * Deletes a template from a guild.
   *
   * @param guildId - The ID of the guild to delete the template from.
   * @param templateCode - The code of the template to delete.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires a _Guild Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-template#delete-guild-template}
   */
  deleteGuildTemplate: (guildId: BigString, templateCode: string) => Promise<void>
  /**
   * Deletes an integration attached to a guild.
   *
   * @param guildId - The ID of the guild from which to delete the integration.
   * @param integrationId - The ID of the integration to delete from the guild.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Deletes all webhooks associated with the integration, and kicks the associated bot if there is one.
   *
   * Fires a _Guild Integrations Update_ gateway event.
   * Fires a _Integration Delete_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#delete-guild-integration}
   */
  deleteIntegration: (guildId: BigString, integrationId: BigString, reason?: string) => Promise<void>
  /**
   * Deletes an invite to a channel.
   *
   * @param inviteCode - The invite code of the invite to delete.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `MANAGE_CHANNELS` permission.
   *
   * Fires an _Invite Delete_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#delete-channel-invite}
   */
  deleteInvite: (inviteCode: string, reason?: string) => Promise<void>
  /**
   * Deletes a message from a channel.
   *
   * @param channelId - The ID of the channel to delete the message from.
   * @param messageId - The ID of the message to delete from the channel.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * If not deleting own message:
   * - Requires the `MANAGE_MESSAGES` permission.
   *
   * Fires a _Message Delete_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#delete-message}
   */
  deleteMessage: (channelId: BigString, messageId: BigString, reason?: string) => Promise<void>
  /**
   * Deletes multiple messages from a channel.
   *
   * @param channelId - The ID of the channel to delete the messages from.
   * @param messageIds - The IDs of the messages to delete from the channel.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `MANAGE_MESSAGES` permission.
   *
   * ⚠️ Messages older than 2 weeks old cannot be deleted.
   *
   * Fires a _Message Delete Bulk_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#bulk-delete-messages}
   */
  deleteMessages: (channelId: BigString, messageIds: BigString[], reason?: string) => Promise<void>
  /**
   * Deletes the initial message response to an interaction.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   *
   * @remarks
   * Unlike `deleteMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
   *
   * Fires a _Message Delete_ event.
   *
   * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response}
   */
  deleteOriginalInteractionResponse: (token: string) => Promise<void>
  /**
   * Deletes a reaction added by the bot user from a message.
   *
   * @param channelId - The ID of the channel the message to delete the reaction from is in.
   * @param messageId - The ID of the message to delete the reaction from.
   * @param reaction - The reaction to delete from the message.
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * Fires a _Message Reaction Remove_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#delete-own-reaction}
   */
  deleteOwnReaction: (channelId: BigString, messageId: BigString, reaction: string) => Promise<void>
  /**
   * Deletes all reactions for all emojis from a message.
   *
   * @param channelId - The ID of the channel the message to delete the reactions from is in.
   * @param messageId - The ID of the message to delete the reactions from.
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * Requires the `MANAGE_MESSAGES` permission.
   *
   * Fires a _Message Reaction Remove All_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#delete-all-reactions}
   */
  deleteReactionsAll: (channelId: BigString, messageId: BigString) => Promise<void>
  /**
   * Deletes all reactions for an emoji from a message.
   *
   * @param channelId - The ID of the channel the message to delete the reactions from is in.
   * @param messageId - The ID of the message to delete the reactions from.
   * @param reaction - The reaction to remove from the message.
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * Requires the `MANAGE_MESSAGES` permission.
   *
   * Fires a _Message Reaction Remove Emoji_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#delete-all-reactions-for-emoji}
   */
  deleteReactionsEmoji: (channelId: BigString, messageId: BigString, reaction: string) => Promise<void>
  /**
   * Deletes a role from a guild.
   *
   * @param guildId - The ID of the guild to delete the role from.
   * @param roleId - The ID of the role to delete.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `MANAGE_ROLES` permission.
   *
   * Fires a _Guild Role Delete_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#delete-guild-role}
   */
  deleteRole: (guildId: BigString, roleId: BigString, reason?: string) => Promise<void>
  /**
   * Deletes a scheduled event from a guild.
   *
   * @param guildId - The ID of the guild to delete the scheduled event from.
   * @param eventId - The ID of the scheduled event to delete.
   *
   * @remarks
   * Requires the `MANAGE_EVENTS` permission.
   *
   * Fires a _Guild Scheduled Event Delete_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#delete-guild-scheduled-event}
   */
  deleteScheduledEvent: (guildId: BigString, eventId: BigString) => Promise<void>
  /**
   * Deletes the stage instance associated with a stage channel, if one exists.
   *
   * @param channelId - The ID of the stage channel the stage instance is associated with.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the user to be a moderator of the stage channel.
   *
   * Fires a _Stage Instance Delete_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/stage-instance#delete-stage-instance}
   */
  deleteStageInstance: (channelId: BigString, reason?: string) => Promise<void>
  /**
   * Deletes a user's reaction from a message.
   *
   * @param channelId - The ID of the channel the message to delete the reaction from is in.
   * @param messageId - The ID of the message to delete the reaction from.
   * @param userId - The ID of the user whose reaction to delete.
   * @param reaction - The reaction to delete from the message.
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * Requires the `MANAGE_MESSAGES` permission.
   *
   * Fires a _Message Reaction Remove_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#delete-user-reaction}
   */
  deleteUserReaction: (channelId: BigString, messageId: BigString, userId: BigString, reaction: string) => Promise<void>
  /**
   * Deletes a webhook.
   *
   * @param webhookId - The ID of the webhook to delete.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission.
   *
   * Fires a _Webhooks Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#delete-webhook}
   */
  deleteWebhook: (webhookId: BigString, reason?: string) => Promise<void>
  /**
   * Deletes a webhook message.
   *
   * @param webhookId - The ID of the webhook to delete the message belonging to.
   * @param token - The webhook token, used to manage the webhook.
   * @param messageId - The ID of the message to delete.
   * @param options - The parameters for the deletion of the message.
   *
   * @remarks
   * Fires a _Message Delete_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#delete-webhook}
   */
  deleteWebhookMessage: (webhookId: BigString, token: string, messageId: BigString, options?: DeleteWebhookMessageOptions) => Promise<void>
  /**
   * Deletes a webhook message using the webhook token, thereby bypassing the need for authentication + permissions.
   *
   * @param webhookId - The ID of the webhook to delete the message belonging to.
   * @param token - The webhook token, used to delete the webhook.
   *
   * @remarks
   * Fires a _Message Delete_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token}
   */
  deleteWebhookWithToken: (webhookId: BigString, token: string) => Promise<void>
  /**
   * Edits the permissions for a guild application command.
   *
   * @param guildId - The ID of the guild the command is registered in.
   * @param commandId - The ID of the command to edit the permissions of.
   * @param bearerToken - The bearer token to use to make the request.
   * @param options - The parameters for the edit of the command permissions.
   * @returns An instance of the edited {@link CamelizedDiscordGuildApplicationCommandPermissions}.
   *
   * @remarks
   * The bearer token requires the `applications.commands.permissions.update` scope to be enabled, and to have access to the guild whose ID has been provided in the parameters.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions}
   */
  editApplicationCommandPermissions: (
    guildId: BigString,
    commandId: BigString,
    bearerToken: string,
    options: ApplicationCommandPermissions[],
  ) => Promise<CamelizedDiscordGuildApplicationCommandPermissions>
  /**
   * Edits an automod rule.
   *
   * @param guildId - The ID of the guild to edit the rule in.
   * @param ruleId - The ID of the rule to edit.
   * @param options - The parameters for the edit of the rule.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the edited {@link CamelizedDiscordAutoModerationRule}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires an _Auto Moderation Rule Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule}
   */
  editAutomodRule: (
    guildId: BigString,
    ruleId: BigString,
    options: Partial<EditAutoModerationRuleOptions>,
    reason?: string,
  ) => Promise<CamelizedDiscordAutoModerationRule>
  /**
   * Modifies the bot's username or avatar.
   * NOTE: username: if changed may cause the bot's discriminator to be randomized.
   */
  editBotProfile: (options: { username?: string; botAvatarURL?: string | null }) => Promise<CamelizedDiscordUser>
  /**
   * Edits a channel's settings.
   *
   * @param channelId - The ID of the channel to edit.
   * @param options - The parameters for the edit of the channel.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the edited {@link CamelizedDiscordChannel}.
   *
   * @remarks
   * If editing a channel of type {@link ChannelTypes}.GroupDm:
   * - Fires a _Channel Update_ gateway event.
   *
   * If editing a thread channel:
   * - Requires the `MANAGE_THREADS` permission __unless__ if setting the `archived` property to `false` when the `locked` property is also `false`, in which case only the `SEND_MESSAGES` permission is required.
   *
   * - Fires a _Thread Update_ gateway event.
   *
   * If editing a guild channel:
   * - Requires the `MANAGE_CHANNELS` permission.
   *
   * - If modifying permission overrides:
   *   - Requires the `MANAGE_ROLES` permission.
   *
   *   - Only permissions the bot user has in the guild or parent channel can be allowed/denied __unless__ the bot user has a `MANAGE_ROLES` permission override in the channel.
   *
   * - If modifying a channel of type {@link ChannelTypes}.GuildCategory:
   *     - Fires a _Channel Update_ gateway event for each child channel impacted in this change.
   * - Otherwise:
   *     - Fires a _Channel Update_ gateway event.
   */
  editChannel: (channelId: BigString, options: ModifyChannel, reason?: string) => Promise<CamelizedDiscordChannel>
  /**
   * Edits the permission overrides for a user or role in a channel.
   *
   * @param channelId - The ID of the channel to edit the permission overrides of.
   * @param options - The permission override.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `MANAGE_ROLES` permission.
   *
   * Only permissions the bot user has in the guild or parent channel can be allowed/denied __unless__ the bot user has a `MANAGE_ROLES` permission override in the channel.
   *
   * Fires a _Channel Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#edit-channel-permissions}
   */
  editChannelPermissionOverrides: (channelId: BigString, options: EditChannelPermissionOverridesOptions, reason?: string) => Promise<void>
  /**
   * Edits the positions of a set of channels in a guild.
   *
   * @param guildId - The ID of the guild in which to edit the positions of the channels.
   * @param channelPositions - A set of objects defining the updated positions of the channels.
   *
   * @remarks
   * Requires the `MANAGE_CHANNELS` permission.
   *
   * Fires a _Channel Update_ gateway event for every channel impacted in this change.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions}
   */
  editChannelPositions: (guildId: BigString, channelPositions: ModifyGuildChannelPositions[]) => Promise<void>
  /**
   * Edits an emoji.
   *
   * @param guildId - The ID of the guild in which to edit the emoji.
   * @param id - The ID of the emoji to edit.
   * @param options - The parameters for the edit of the emoji.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the updated {@link CamelizedDiscordEmoji}.
   *
   * @remarks
   * For emojis created by the current user, requires either the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
   * For other emojis, requires the `MANAGE_GUILD_EXPRESSIONS` permission.
   *
   * Fires a `Guild Emojis Update` gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/emoji#modify-guild-emoji}
   */
  editEmoji: (guildId: BigString, id: BigString, options: ModifyGuildEmoji, reason?: string) => Promise<CamelizedDiscordEmoji>
  /**
   * Edits a follow-up message to an interaction.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   * @param messageId - The ID of the message to edit.
   * @param options - The parameters for the edit of the message.
   * @returns An instance of the edited {@link CamelizedDiscordMessage}.
   *
   * @remarks
   * Unlike `editMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
   *
   * Does not support ephemeral follow-up messages due to these being stateless.
   *
   * Fires a _Message Update_ event.
   *
   * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message}
   */
  editFollowupMessage: (token: string, messageId: BigString, options: InteractionCallbackData) => Promise<CamelizedDiscordMessage>
  /**
   * Edits a global application command.
   *
   * @param commandId - The ID of the command to edit.
   * @param options - The parameters for the edit of the command.
   * @returns An instance of the edited {@link CamelizedDiscordApplicationCommand}.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command}
   */
  editGlobalApplicationCommand: (commandId: BigString, options: CreateApplicationCommand) => Promise<CamelizedDiscordApplicationCommand>
  /**
   * Edits a guild's settings.
   *
   * @param guildId - The ID of the guild to edit.
   * @param shardId - The ID of the shard the guild is in.
   * @param options - The parameters for the edit of the guild.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the edited {@link CamelizedDiscordGuild}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * If attempting to add or remove the {@link GuildFeatures}.Community feature:
   * - Requires the `ADMINISTRATOR` permission.
   *
   * Fires a _Guild Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild}
   */
  editGuild: (guildId: BigString, options: ModifyGuild, reason?: string) => Promise<CamelizedDiscordGuild>
  /**
   * Edits an application command registered in a guild.
   *
   * @param guildId - The ID of the guild the command is registered in.
   * @param commandId - The ID of the command to edit.
   * @param options - The parameters for the edit of the command.
   * @returns An instance of the edited {@link CamelizedDiscordApplicationCommand}.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command}
   */
  editGuildApplicationCommand: (
    commandId: BigString,
    guildId: BigString,
    options: CreateApplicationCommand,
  ) => Promise<CamelizedDiscordApplicationCommand>
  /** Modify a guild's MFA level. Requires guild ownership.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   */
  editGuildMfaLevel: (guildId: BigString, mfaLevel: MfaLevels, reason?: string) => Promise<void>
  /**
   * Edit the given sticker.
   *
   * @param guildId The ID of the guild to get
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @return A {@link CamelizedDiscordSticker}
   *
   * @remarks
   * For stickers created by the current user, requires either the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
   * For other stickers, requires the `MANAGE_GUILD_EXPRESSIONS` permission.
   * Fires a Guild Stickers Update Gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/sticker#modify-guild-sticker}
   */
  editGuildSticker: (
    guildId: BigString,
    stickerId: BigString,
    options: AtLeastOne<EditGuildStickerOptions>,
    reason?: string,
  ) => Promise<CamelizedDiscordSticker>
  /**
   * Edits a template's settings.
   *
   * @param guildId - The ID of the guild to edit a template of.
   * @param templateCode - The code of the template to edit.
   * @param options - The parameters for the edit of the template.
   * @returns An instance of the edited {@link CamelizedDiscordTemplate}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires a _Guild Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-template#modify-guild-template}
   */
  editGuildTemplate: (guildId: BigString, templateCode: string, options: ModifyGuildTemplate) => Promise<CamelizedDiscordTemplate>
  /**
   * Edits a message.
   *
   * @param channelId - The ID of the channel to edit the message in.
   * @param messageId - The IDs of the message to edit.
   * @param options - The parameters for the edit of the message.
   * @returns An instance of the edited {@link CamelizedDiscordMessage}.
   *
   * @remarks
   * If editing another user's message:
   * - Requires the `MANAGE_MESSAGES` permission.
   * - Only the {@link EditMessage.flags | flags} property of the {@link options} object parameter can be edited.
   *
   * Fires a _Message Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#edit-message}
   */
  editMessage: (channelId: BigString, messageId: BigString, options: EditMessage) => Promise<CamelizedDiscordMessage>
  /**
   * Edits the initial message response to an interaction.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   * @param options - The parameters for the edit of the response.
   * @returns An instance of the edited {@link CamelizedDiscordMessage}.
   *
   * @remarks
   * Unlike `editMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
   *
   * Does not support ephemeral follow-up messages due to these being stateless.
   *
   * Fires a _Message Update_ event.
   *
   * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response}
   */
  editOriginalInteractionResponse: (token: string, options: InteractionCallbackData) => Promise<CamelizedDiscordMessage>
  /**
   * Edits the original webhook message.
   *
   * @param webhookId - The ID of the webhook to edit the original message of.
   * @param token - The webhook token, used to edit the message.
   * @param options - The parameters for the edit of the message.
   * @returns An instance of the edited {@link CamelizedDiscordMessage}.
   *
   * @remarks
   * Fires a _Message Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#edit-webhook-message}
   */
  editOriginalWebhookMessage: (
    webhookId: BigString,
    token: string,
    options: InteractionCallbackData & { threadId?: BigString },
  ) => Promise<CamelizedDiscordMessage>
  /**
   * Edits the voice state of the bot user.
   *
   * @param guildId - The ID of the guild in which to edit the voice state of the bot user.
   * @param options - The parameters for the edit of the voice state.
   *
   * @remarks
   * The {@link EditOwnVoiceState.channelId | channelId} property of the {@link options} object parameter must point to a stage channel, and the bot user must already have joined it.
   *
   * If attempting to unmute oneself:
   * - Requires the `MUTE_MEMBERS` permission.
   *
   * If attempting to request to speak:
   * - Requires the `REQUEST_TO_SPEAK` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state}
   */
  editOwnVoiceState: (guildId: BigString, options: EditOwnVoiceState) => Promise<void>
  /**
   * Edits a role in a guild.
   *
   * @param guildId - The ID of the guild to edit the role in.
   * @param roleId - The ID of the role to edit.
   * @param options - The parameters for the edit of the role.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the edited {@link CamelizedDiscordRole}.
   *
   * @remarks
   * Requires the `MANAGE_ROLES` permission.
   *
   * Fires a _Guild Role Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild-role}
   */
  editRole: (guildId: BigString, roleId: BigString, options: EditGuildRole, reason?: string) => Promise<CamelizedDiscordRole>
  /**
   * Edits the positions of a set of roles.
   *
   * @param guildId - The ID of the guild to edit the role positions in.
   * @param options - The parameters for the edit of the role positions.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns A collection of {@link CamelizedDiscordRole} objects assorted by role ID.
   *
   * @remarks
   * Requires the `MANAGE_ROLES` permission.
   *
   * Fires a _Guild Role Update_ gateway event for every role impacted in this change.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild-role-positions}
   */
  editRolePositions: (guildId: BigString, options: ModifyRolePositions[], reason?: string) => Promise<CamelizedDiscordRole[]>
  /**
   * Edits a scheduled event.
   *
   * @param guildId - The ID of the guild to edit the scheduled event in.
   * @param eventId - The ID of the scheduled event to edit.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the edited {@link CamelizedDiscordScheduledEvent}.
   *
   * @remarks
   * Requires the `MANAGE_EVENTS` permission.
   *
   * To start or end an event, modify the event's `status` property.
   *
   * The `entity_metadata` property is discarded for events whose `entity_type` is not {@link ScheduledEventEntityType}.External.
   *
   * Fires a _Guild Scheduled Event Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event}
   */
  editScheduledEvent: (
    guildId: BigString,
    eventId: BigString,
    options: Partial<EditScheduledEvent>,
    reason?: string,
  ) => Promise<CamelizedDiscordScheduledEvent>
  /**
   * Edits a stage instance.
   *
   * @param channelId - The ID of the stage channel the stage instance is associated with.
   * @param topic - Topic of the Stage instance (1-120 characters).
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the updated {@link CamelizedDiscordStageInstance}.
   *
   * @remarks
   * Requires the user to be a moderator of the stage channel.
   *
   * Fires a _Stage Instance Update_ event.
   *
   * @see {@link https://discord.com/developers/docs/resources/stage-instance#modify-stage-instance}
   */
  editStageInstance: (channelId: BigString, topic: string, reason?: string) => Promise<CamelizedDiscordStageInstance>
  /**
   * Edits the voice state of another user.
   *
   * @param guildId - The ID of the guild in which to edit the voice state of the bot user.
   * @param options - The parameters for the edit of the voice state.
   *
   * @remarks
   * The {@link EditOwnVoiceState.channelId | channelId} property of the {@link options} object parameter must point to a stage channel, and the user must already have joined it.
   *
   * Requires the `MUTE_MEMBERS` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state}
   */
  editUserVoiceState: (guildId: BigString, options: EditUserVoiceState) => Promise<void>
  /**
   * Edit the current user application role connection for the application.
   *
   * @param bearerToken - The access token of the user
   * @param applicationId - The id of the application to edit the role connection
   * @param options - The options to edit
   * @returns {CamelizedDiscordApplicationRoleConnection}
   *
   * @remarks
   * This requires the `role_connections.write` scope.
   *
   * @see {@link https://discord.com/developers/docs/resources/user#update-user-application-role-connection}
   */
  editUserApplicationRoleConnection: (
    bearerToken: string,
    applicationId: BigString,
    options: CamelizedDiscordApplicationRoleConnection,
  ) => Promise<CamelizedDiscordApplicationRoleConnection>
  /**
   * Edits a webhook.
   *
   * @param webhookId - The ID of the webhook to edit.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the edited {@link CamelizedDiscordWebhook}.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission.
   *
   * Fires a _Webhooks Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#edit-webhook}
   */
  editWebhook: (webhookId: BigString, options: ModifyWebhook, reason?: string) => Promise<CamelizedDiscordWebhook>
  /**
   * Edits a webhook message.
   *
   * @param webhookId - The ID of the webhook to edit the message of.
   * @param token - The webhook token, used to edit the message.
   * @param messageId - The ID of the message to edit.
   * @param options - The parameters for the edit of the message.
   * @returns An instance of the edited {@link CamelizedDiscordMessage}.
   *
   * @remarks
   * Fires a _Message Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#edit-webhook-message}
   */
  editWebhookMessage: (
    webhookId: BigString,
    token: string,
    messageId: BigString,
    options: InteractionCallbackData & { threadId?: BigString },
  ) => Promise<CamelizedDiscordMessage>
  /**
   * Edits a webhook using the webhook token, thereby bypassing the need for authentication + permissions.
   *
   * @param webhookId - The ID of the webhook to edit.
   * @param token - The webhook token, used to edit the webhook.
   * @returns An instance of the edited {@link CamelizedDiscordWebhook}.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission.
   *
   * Fires a _Webhooks Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token}
   */
  editWebhookWithToken: (webhookId: BigString, token: string, options: Omit<ModifyWebhook, 'channelId'>) => Promise<CamelizedDiscordWebhook>
  /**
   * Edits a guild's welcome screen.
   *
   * @param guildId - The ID of the guild to edit the welcome screen of.
   * @param options - The parameters for the edit of the welcome screen.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the edited {@link CamelizedDiscordWelcomeScreen}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires a _Guild Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen}
   */
  editWelcomeScreen: (
    guildId: BigString,
    options: CamelizedDiscordModifyGuildWelcomeScreen,
    reason?: string,
  ) => Promise<CamelizedDiscordWelcomeScreen>
  /**
   * Edits the settings of a guild's widget.
   *
   * @param guildId - The ID of the guild to edit the settings of the widget of.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the edited {@link CamelizedDiscordGuildWidgetSettings}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires a _Guild Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild-widget}
   */
  editWidgetSettings: (
    guildId: BigString,
    options: CamelizedDiscordGuildWidgetSettings,
    reason?: string,
  ) => Promise<CamelizedDiscordGuildWidgetSettings>
  /**
   * Executes a webhook, causing a message to be posted in the channel configured for the webhook.
   *
   * @param webhookId - The ID of the webhook to execute.
   * @param token - The webhook token, used to execute the webhook.
   * @param options - The parameters for the execution of the webhook.
   * @returns An instance of the created {@link CamelizedDiscordMessage}, or `undefined` if the {@link ExecuteWebhook.wait | wait} property of the {@link options} object parameter is set to `false`.
   *
   * @remarks
   * If the webhook channel is a forum channel, you must provide a value for either `threadId` or `threadName`.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#execute-webhook}
   */
  executeWebhook: (webhookId: BigString, token: string, options: ExecuteWebhook) => Promise<CamelizedDiscordMessage | undefined>
  /**
   * Follows an announcement channel, allowing messages posted within it to be cross-posted into the target channel.
   *
   * @param sourceChannelId - The ID of the announcement channel to follow.
   * @param targetChannelId - The ID of the target channel - the channel to cross-post to.
   * @returns An instance of {@link CamelizedDiscordFollowedChannel}.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission in the __target channel__.
   *
   * Fires a _Webhooks Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#follow-announcement-channel}
   */
  followAnnouncement: (sourceChannelId: BigString, targetChannelId: BigString) => Promise<CamelizedDiscordFollowedChannel>
  /**
   * Gets the list of all active threads for a guild.
   *
   * @param guildId - The ID of the guild to get the threads of.
   * @returns An instance of {@link CamelizedDiscordActiveThreads}.
   *
   * @remarks
   * Returns both public and private threads.
   *
   * Threads are ordered by the `id` property in descending order.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#list-active-guild-threads}
   */
  getActiveThreads: (guildId: BigString) => Promise<CamelizedDiscordActiveThreads>
  /** Get the applications info */
  getApplicationInfo: () => Promise<CamelizedDiscordApplication>
  /**
   * Edit properties of the app associated with the requesting bot user.
   *
   * @remarks
   * Only properties that are passed will be updated.
   */
  editApplicationInfo: (body: EditApplication) => Promise<CamelizedDiscordApplication>
  /**
   * Get the current authentication info for the authenticated user
   *
   * @param bearerToken - Any OAuth2 derived access token
   * @returns An instance of {@link CamelizedDiscordCurrentAuthorization}
   *
   * @remarks
   * The user object is not defined if the scopes do not include `identify`.
   * In the user object, if defined, the email is not included if the scopes do not include `email`
   */
  getCurrentAuthenticationInfo: (bearerToken: string) => Promise<CamelizedDiscordCurrentAuthorization>
  /**
   * Exchange the information to get a OAuth2 accessToken token
   *
   * @param clientId - Application's client id
   * @param clientSecret - application's client secret
   * @param options - The options to make the exchange with discord
   */
  exchangeToken: (clientId: BigString, clientSecret: string, options: CamelizedDiscordTokenExchange) => Promise<CamelizedDiscordAccessTokenResponse>
  /**
   * Revoke an access_token
   *
   * @param clientId - Application's client id
   * @param clientSecret - application's client secret
   * @param options - The options to revoke the access_token
   */
  revokeToken: (clientId: BigString, clientSecret: string, options: CamelizedDiscordTokenRevocation) => Promise<void>
  /**
   * Gets the permissions of a guild application command.
   *
   * @param guildId - The ID of the guild the command is registered in.
   * @param commandId - The ID of the command to get the permissions of.
   * @param options - The OAuth2 related optional parameters for the endpoint
   * @returns An instance of {@link CamelizedDiscordGuildApplicationCommandPermissions}.
   *
   * @remarks
   * Then specifying the options object the access token passed-in requires the OAuth2 scope `applications.commands.permissions.update`
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions}
   */
  getApplicationCommandPermission: (
    guildId: BigString,
    commandId: BigString,
    options?: GetApplicationCommandPermissionOptions,
  ) => Promise<CamelizedDiscordGuildApplicationCommandPermissions>
  /**
   * Gets the permissions of all application commands registered in a guild by the ID of the guild and optionally an external application.
   *
   * @param guildId - The ID of the guild to get the permissions objects of.
   * @param options - The OAuth2 related optional parameters for the endpoint
   * @returns A collection of {@link CamelizedDiscordGuildApplicationCommandPermissions} objects assorted by command ID.
   *
   * @remarks
   * Then specifying the options object the access token passed-in requires the OAuth2 scope `applications.commands.permissions.update`
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions}
   */
  getApplicationCommandPermissions: (
    guildId: BigString,
    options?: GetApplicationCommandPermissionOptions,
  ) => Promise<CamelizedDiscordGuildApplicationCommandPermissions[]>
  /**
   * Gets a guild's audit log.
   *
   * @param guildId - The ID of the guild to get the audit log of.
   * @param options - The parameters for the fetching of the audit log.
   * @returns An instance of {@link CamelizedDiscordAuditLog}.
   *
   * @remarks
   * Requires the `VIEW_AUDIT_LOG` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log}
   */
  getAuditLog: (guildId: BigString, options?: GetGuildAuditLog) => Promise<CamelizedDiscordAuditLog>
  /**
   * Gets an automod rule by its ID.
   *
   * @param guildId - The ID of the guild to get the rule of.
   * @param ruleId - The ID of the rule to get.
   * @returns An instance of {@link CamelizedDiscordAutoModerationRule}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/auto-moderation#get-auto-moderation-rule}
   */
  getAutomodRule: (guildId: BigString, ruleId: BigString) => Promise<CamelizedDiscordAutoModerationRule>
  /**
   * Gets the list of automod rules for a guild.
   *
   * @param guildId - The ID of the guild to get the rules from.
   * @returns A collection of {@link CamelizedDiscordAutoModerationRule} objects assorted by rule ID.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/auto-moderation#list-auto-moderation-rules-for-guild}
   */
  getAutomodRules: (guildId: BigString) => Promise<CamelizedDiscordAutoModerationRule[]>
  /**
   * Gets the list of available voice regions.
   *
   * @returns A collection of {@link CamelizedDiscordVoiceRegion} objects assorted by voice region ID.
   */
  getAvailableVoiceRegions: () => Promise<CamelizedDiscordVoiceRegion[]>
  /**
   * Gets a ban by user ID.
   *
   * @param guildId - The ID of the guild to get the ban from.
   * @param userId - The ID of the user to get the ban for.
   * @returns An instance of {@link CamelizedDiscordBan}.
   *
   * @remarks
   * Requires the `BAN_MEMBERS` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-ban}
   */
  getBan: (guildId: BigString, userId: BigString) => Promise<CamelizedDiscordBan>
  /**
   * Gets the list of bans for a guild.
   *
   * @param guildId - The ID of the guild to get the list of bans for.
   * @param options - The parameters for the fetching of the list of bans.
   * @returns A collection of {@link CamelizedDiscordBan} objects assorted by user ID.
   *
   * @remarks
   * Requires the `BAN_MEMBERS` permission.
   *
   * Users are ordered by their IDs in _ascending_ order.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-bans}
   */
  getBans: (guildId: BigString, options?: GetBans) => Promise<CamelizedDiscordBan[]>
  /**
   * Gets a channel by its ID.
   *
   * @param channelId - The ID of the channel to get.
   * @returns An instance of {@link CamelizedDiscordChannel}.
   *
   * @remarks
   * If the channel is a thread, a {@link CamelizedDiscordThreadMember} object is included in the result.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#get-channel}
   */
  getChannel: (channelId: BigString) => Promise<CamelizedDiscordChannel>
  /**
   * Gets the list of invites for a channel.
   *
   * @param channelId - The ID of the channel to get the invites of.
   * @returns A collection of {@link CamelizedDiscordInviteMetadata} objects assorted by invite code.
   *
   * @remarks
   * Requires the `MANAGE_CHANNELS` permission.
   *
   * Only usable for guild channels.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#get-channel-invites}
   */
  getChannelInvites: (channelId: BigString) => Promise<CamelizedDiscordInviteMetadata[]>
  /**
   * Gets the list of channels for a guild.
   *
   * @param guildId - The ID of the guild to get the channels of.
   * @returns A collection of {@link CamelizedDiscordChannel} objects assorted by channel ID.
   *
   * @remarks
   * Excludes threads.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-channels}
   */
  getChannels: (guildId: BigString) => Promise<CamelizedDiscordChannel[]>
  /**
   * Gets a list of webhooks for a channel.
   *
   * @param channelId - The ID of the channel which to get the webhooks of.
   * @returns A collection of {@link CamelizedDiscordWebhook} objects assorted by webhook ID.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#get-channel-webhooks}
   */
  getChannelWebhooks: (channelId: BigString) => Promise<CamelizedDiscordWebhook[]>
  /**
   * Gets or creates a DM channel with a user.
   *
   * @param userId - The ID of the user to create the DM channel with.
   * @returns An instance of {@link CamelizedDiscordChannel}.
   *
   * @see {@link https://discord.com/developers/docs/resources/user#create-dm}
   */
  getDmChannel: (userId: BigString) => Promise<CamelizedDiscordChannel>
  /**
   * Create a new group DM channel with multiple users.
   *
   * @param options - The options for create a new group dm
   * @returns An instance of {@link CamelizedDiscordChannel}.
   *
   * @remarks
   * The access tokens require to have the `gdm.join` scope
   *
   * This endpoint is limited to 10 active group DMs.
   *
   * Fires a _Channel create_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/user#create-group-dm}
   */
  getGroupDmChannel: (options: GetGroupDmOptions) => Promise<CamelizedDiscordChannel>
  /**
   * Gets an emoji by its ID.
   *
   * @param guildId - The ID of the guild from which to get the emoji.
   * @param emojiId - The ID of the emoji to get.
   * @returns An instance of {@link CamelizedDiscordEmoji}.
   *
   * @remarks
   * Includes the `user` field if the bot has the `MANAGE_GUILD_EXPRESSIONS` permission,
   * or if the bot created the emoji and has the the `CREATE_GUILD_EXPRESSIONS` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/emoji#get-guild-emoji}
   */
  getEmoji: (guildId: BigString, emojiId: BigString) => Promise<CamelizedDiscordEmoji>
  /**
   * Gets the list of emojis for a guild.
   *
   * @param guildId - The ID of the guild which to get the emojis of.
   * @returns A collection of {@link CamelizedDiscordEmoji} objects assorted by emoji ID.
   *
   * @remarks
   * Includes `user` fields if the bot has the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/emoji#list-guild-emojis}
   */
  getEmojis: (guildId: BigString) => Promise<CamelizedDiscordEmoji[]>
  /**
   * Gets a follow-up message to an interaction by the ID of the message.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   * @param messageId - The ID of the message to get.
   * @returns An instance of {@link CamelizedDiscordMessage}.
   *
   * @remarks
   * Unlike `getMessage()`, this endpoint allows the bot user to act without:
   * - Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
   * - Requiring the `MESSAGE_CONTENT` intent.
   *
   * Does not support ephemeral follow-up messages due to these being stateless.
   *
   * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message}
   */
  getFollowupMessage: (token: string, messageId: BigString) => Promise<CamelizedDiscordMessage>
  /** Get the bots Gateway metadata that can help during the operation of large or sharded bots. */
  getGatewayBot: () => Promise<CamelizedDiscordGetGatewayBot>
  /**
   * Gets a global application command by its ID.
   *
   * @param commandId - The ID of the command to get.
   * @returns An instance of {@link CamelizedDiscordApplicationCommand}.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-global-application-command}
   */
  getGlobalApplicationCommand: (commandId: BigString) => Promise<CamelizedDiscordApplicationCommand>
  /**
   * Gets the list of your bot's global application commands.
   *
   * @returns A collection of {@link CamelizedDiscordApplicationCommand} objects assorted by command ID.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands}
   */
  getGlobalApplicationCommands: () => Promise<CamelizedDiscordApplicationCommand[]>
  /**
   * Gets a guild by its ID.
   *
   * @param guildId - The ID of the guild to get.
   * @param options - The parameters for the fetching of the guild.
   * @returns An instance of {@link CamelizedDiscordGuild}.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#get-guild}
   */
  getGuild: (guildId: BigString, options?: { counts?: boolean }) => Promise<CamelizedDiscordGuild>
  /**
   * Get the user guilds.
   *
   * @param bearerToken - The access token of the user, if unspecified the bot token is used instead
   * @param options - The parameters for the fetching of the guild.
   * @returns An instance of {@link CamelizedDiscordGuild}.
   *
   * @remarks
   * If used with an access token, the token needs to have the `guilds` scope
   *
   * @see {@link https://discord.com/developers/docs/resources/user#get-current-user-guilds}
   */
  getGuilds: (bearerToken?: string, options?: GetUserGuilds) => Promise<CamelizedDiscordPartialGuild[]>
  /**
   * Gets a guild application command by its ID.
   *
   * @param guildId - The ID of the guild the command is registered in.
   * @param commandId - The ID of the command to get.
   * @returns An instance of {@link CamelizedDiscordApplicationCommand}.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command}
   */
  getGuildApplicationCommand: (commandId: BigString, guildId: BigString) => Promise<CamelizedDiscordApplicationCommand>
  /**
   * Gets the list of application commands registered by your bot in a guild.
   *
   * @param guildId - The ID of the guild the commands are registered in.
   * @returns A collection of {@link CamelizedDiscordApplicationCommand} objects assorted by command ID.
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-global-application-commandss}
   */
  getGuildApplicationCommands: (guildId: BigString) => Promise<CamelizedDiscordApplicationCommand[]>
  /**
   * Gets the preview of a guild by a guild's ID.
   *
   * @param guildId - The ID of the guild to get the preview of.
   * @returns An instance of {@link CamelizedDiscordGuildPreview}.
   *
   * @remarks
   * If the bot user is not in the guild, the guild must be discoverable.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-preview}
   */
  getGuildPreview: (guildId: BigString) => Promise<CamelizedDiscordGuildPreview>
  /**
   * Returns a sticker object for the given guild and sticker IDs.
   *
   * @param guildId The ID of the guild to get
   * @param stickerId The ID of the sticker to get
   * @return A {@link CamelizedDiscordSticker}
   *
   * @remarks Includes the user field if the bot has the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/sticker#get-guild-sticker}
   */
  getGuildSticker: (guildId: BigString, stickerId: BigString) => Promise<CamelizedDiscordSticker>
  /**
   * Returns an array of sticker objects for the given guild.
   *
   * @param guildId The ID of the guild to get
   * @returns A collection of {@link CamelizedDiscordSticker} objects assorted by sticker ID.
   *
   * @remarks Includes user fields if the bot has the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/sticker#list-guild-stickers}
   */
  getGuildStickers: (guildId: BigString) => Promise<CamelizedDiscordSticker[]>
  /**
   * Gets a template by its code.
   *
   * @param templateCode - The code of the template to get.
   * @returns An instance of {@link CamelizedDiscordTemplate}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-template#get-guild-template}
   */
  getGuildTemplate: (templateCode: string) => Promise<CamelizedDiscordTemplate>
  /**
   * Gets the list of templates for a guild.
   *
   * @param guildId - The ID of the guild to get the list of templates for.
   * @returns A collection of {@link CamelizedDiscordTemplate} objects assorted by template code.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-template#get-guild-templates}
   */
  getGuildTemplates: (guildId: BigString) => Promise<CamelizedDiscordTemplate[]>
  /**
   * Gets the list of webhooks for a guild.
   *
   * @param guildId - The ID of the guild to get the list of webhooks for.
   * @returns A collection of {@link CamelizedDiscordWebhook} objects assorted by webhook ID.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#get-guild-webhooks}
   */
  getGuildWebhooks: (guildId: BigString) => Promise<CamelizedDiscordWebhook[]>
  /**
   * Gets the list of integrations attached to a guild.
   *
   * @param guildId - The ID of the guild to get the list of integrations from.
   * @returns A collection of {@link CamelizedDiscordIntegration} objects assorted by integration ID.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-integrations}
   */
  getIntegrations: (guildId: BigString) => Promise<CamelizedDiscordIntegration[]>
  /**
   * Gets an invite to a channel by its invite code.
   *
   * @param inviteCode - The invite code of the invite to get.
   * @param options - The parameters for the fetching of the invite.
   * @returns An instance of {@link CamelizedDiscordInviteMetadata}.
   *
   * @see {@link https://discord.com/developers/docs/resources/invite#get-invite}
   */
  getInvite: (inviteCode: string, options?: GetInvite) => Promise<CamelizedDiscordInviteMetadata>
  /**
   * Gets the list of invites for a guild.
   *
   * @param guildId - The ID of the guild to get the invites from.
   * @returns A collection of {@link CamelizedDiscordInviteMetadata} objects assorted by invite code.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/invite#get-invites}
   */
  getInvites: (guildId: BigString) => Promise<CamelizedDiscordInviteMetadata[]>
  /**
   * Gets a message from a channel by the ID of the message.
   *
   * @param channelId - The ID of the channel from which to get the message.
   * @param messageId - The ID of the message to get.
   * @returns An instance of {@link CamelizedDiscordMessage}.
   *
   * @remarks
   * Requires that the bot user be able to see the contents of the channel in which the message was posted.
   *
   * If getting a message from a guild channel:
   * - Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#get-channel-message}
   */
  getMessage: (channelId: BigString, messageId: BigString) => Promise<CamelizedDiscordMessage>
  /**
   * Gets multiple messages from a channel.
   *
   * @param channelId - The ID of the channel from which to get the messages.
   * @param options - The parameters for the fetching of the messages.
   * @returns A collection of {@link CamelizedDiscordMessage} objects assorted by message ID.
   *
   * @remarks
   * Requires that the bot user be able to see the contents of the channel in which the messages were posted.
   *
   * If getting a messages from a guild channel:
   * - Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#get-channel-messages}
   */
  getMessages: (channelId: BigString, options?: GetMessagesOptions) => Promise<CamelizedDiscordMessage[]>
  /**
   * Returns the list of sticker packs available.
   *
   * @returns A collection of {@link CamelizedDiscordStickerPack} objects assorted by sticker ID.
   *
   * @see {@link https://discord.com/developers/docs/resources/sticker#list-sticker-packs}
   */
  getStickerPacks: () => Promise<CamelizedDiscordStickerPack[]>
  /**
   * Gets the initial message response to an interaction.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   * @returns An instance of {@link CamelizedDiscordMessage}.
   *
   * @remarks
   * Unlike `getMessage()`, this endpoint allows the bot user to act without:
   * - Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
   * - Requiring the `MESSAGE_CONTENT` intent.
   *
   * Does not support ephemeral follow-up messages due to these being stateless.
   *
   * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response}
   */
  getOriginalInteractionResponse: (token: string) => Promise<CamelizedDiscordMessage>
  /**
   * Gets the pinned messages for a channel.
   *
   * @param channelId - The ID of the channel to get the pinned messages for.
   * @returns A collection of {@link CamelizedDiscordMessage} objects assorted by message ID.
   *
   * @remarks
   * Requires that the bot user be able to see the contents of the channel in which the messages were posted.
   *
   * If getting a message from a guild channel:
   * - Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#get-pinned-messages}
   */
  getPinnedMessages: (channelId: BigString) => Promise<CamelizedDiscordMessage[]>
  /**
   * Gets the list of private archived threads for a channel.
   *
   * @param channelId - The ID of the channel to get the archived threads for.
   * @param options - The parameters for the fetching of threads.
   * @returns An instance of {@link CamelizedDiscordArchivedThreads}.
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   * Requires the `MANAGE_THREADS` permission.
   *
   * Returns threads of type {@link ChannelTypes}.GuildPrivateThread.
   *
   * Threads are ordered by the `archive_timestamp` property included in the metadata of the object in descending order.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#list-private-archived-threads}
   */
  getPrivateArchivedThreads: (channelId: BigString, options?: ListArchivedThreads) => Promise<CamelizedDiscordArchivedThreads>
  /**
   * Gets the list of private archived threads the bot is a member of for a channel.
   *
   * @param channelId - The ID of the channel to get the archived threads for.
   * @param options - The parameters for the fetching of threads.
   * @returns An instance of {@link CamelizedDiscordArchivedThreads}.
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * Returns threads of type {@link ChannelTypes}.GuildPrivateThread.
   *
   * Threads are ordered by the `id` property in descending order.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads}
   */
  getPrivateJoinedArchivedThreads: (channelId: BigString, options?: ListArchivedThreads) => Promise<CamelizedDiscordArchivedThreads>
  /**
   * Gets the number of members that would be kicked from a guild during pruning.
   *
   * @param guildId - The ID of the guild to get the prune count of.
   * @param options - The parameters for the fetching of the prune count.
   * @returns A number indicating the number of members that would be kicked.
   *
   * @remarks
   * Requires the `KICK_MEMBERS` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-prune-count}
   */
  getPruneCount: (guildId: BigString, options?: GetGuildPruneCountQuery) => Promise<CamelizedDiscordPrunedCount>
  /**
   * Gets the list of public archived threads for a channel.
   *
   * @param channelId - The ID of the channel to get the archived threads for.
   * @param options - The parameters for the fetching of threads.
   * @returns An instance of {@link CamelizedDiscordArchivedThreads}.
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * If called on a channel of type {@link ChannelTypes}.GuildText, returns threads of type {@link ChannelTypes}.GuildPublicThread.
   * If called on a channel of type {@link ChannelTypes}.GuildNews, returns threads of type {@link ChannelTypes}.GuildNewsThread.
   *
   * Threads are ordered by the `archive_timestamp` property included in the metadata of the object in descending order.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#list-public-archived-threads}
   */
  getPublicArchivedThreads: (channelId: BigString, options?: ListArchivedThreads) => Promise<CamelizedDiscordArchivedThreads>
  /**
   * Gets the list of roles for a guild.
   *
   * @param guildId - The ID of the guild to get the list of roles for.
   * @returns A collection of {@link CamelizedDiscordRole} objects assorted by role ID.
   *
   * @remarks
   * ⚠️ This endpoint should be used sparingly due to {@link CamelizedDiscordRole} objects already being included in guild payloads.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-roles}
   */
  getRoles: (guildId: BigString) => Promise<CamelizedDiscordRole[]>
  /**
   * Gets a scheduled event by its ID.
   *
   * @param guildId - The ID of the guild to get the scheduled event from.
   * @param eventId - The ID of the scheduled event to get.
   * @param options - The parameters for the fetching of the scheduled event.
   * @returns An instance of {@link CamelizedDiscordScheduledEvent}.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event}
   */
  getScheduledEvent: (guildId: BigString, eventId: BigString, options?: { withUserCount?: boolean }) => Promise<CamelizedDiscordScheduledEvent>
  /**
   * Gets the list of scheduled events for a guild.
   *
   * @param guildId - The ID of the guild to get the scheduled events from.
   * @param options - The parameters for the fetching of the scheduled events.
   * @returns A collection of {@link CamelizedDiscordScheduledEvent} objects assorted by event ID.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#list-scheduled-events-for-guild}
   */
  getScheduledEvents: (guildId: BigString, options?: GetScheduledEvents) => Promise<CamelizedDiscordScheduledEvent[]>
  /**
   * Gets the list of subscribers to a scheduled event from a guild.
   *
   * @param guildId - The ID of the guild to get the subscribers to the scheduled event from.
   * @param eventId - The ID of the scheduled event to get the subscribers of.
   * @param options - The parameters for the fetching of the subscribers.
   * @returns A collection of {@link CamelizedDiscordUser} objects assorted by user ID.
   *
   * @remarks
   * Requires the `MANAGE_EVENTS` permission.
   *
   * Users are ordered by their IDs in _ascending_ order.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users}
   */
  getScheduledEventUsers: (
    guildId: BigString,
    eventId: BigString,
    options?: GetScheduledEventUsers,
  ) => Promise<Array<{ user: CamelizedDiscordUser; member?: CamelizedDiscordMember }>>
  /** Get the bots Gateway metadata that can help during the operation of large or sharded bots. */
  getSessionInfo: () => Promise<CamelizedDiscordGetGatewayBot>
  /**
   * Gets the stage instance associated with a stage channel, if one exists.
   *
   * @param channelId - The ID of the stage channel the stage instance is associated with.
   * @returns An instance of {@link CamelizedDiscordStageInstance}.
   *
   * @see {@link https://discord.com/developers/docs/resources/stage-instance#get-stage-instance}
   */
  getStageInstance: (channelId: BigString) => Promise<CamelizedDiscordStageInstance>
  /**
   * Returns a sticker object for the given sticker ID.
   *
   * @param stickerId The ID of the sticker to get
   * @returns A {@link CamelizedDiscordSticker}
   *
   * @see {@link https://discord.com/developers/docs/resources/sticker#get-sticker}
   */
  getSticker: (stickerId: BigString) => Promise<CamelizedDiscordSticker>
  /**
   * Gets a thread member by their user ID.
   *
   * @param channelId - The ID of the thread to get the thread member of.
   * @param userId - The user ID of the thread member to get.
   * @returns An instance of {@link CamelizedDiscordThreadMember}.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#get-thread-member}
   */
  getThreadMember: (channelId: BigString, userId: BigString) => Promise<CamelizedDiscordThreadMember>
  /**
   * Gets the list of thread members for a thread.
   *
   * @param channelId - The ID of the thread to get the thread members of.
   * @returns A collection of {@link CamelizedDiscordThreadMember} assorted by user ID.
   *
   * @remarks
   * Requires the application to have the `GUILD_MEMBERS` privileged intent enabled.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#list-thread-members}
   */
  getThreadMembers: (channelId: BigString) => Promise<CamelizedDiscordThreadMember[]>
  /**
   * Gets the list of users that reacted with an emoji to a message.
   *
   * @param channelId - The ID of the channel the message to get the users for is in.
   * @param messageId - The ID of the message to get the users for.
   * @param reaction - The reaction for which to get the users.
   * @param options - The parameters for the fetching of the users.
   * @returns A collection of {@link CamelizedDiscordUser} objects assorted by user ID.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#get-reactions}
   */
  getReactions: (channelId: BigString, messageId: BigString, reaction: string, options?: GetReactions) => Promise<CamelizedDiscordUser[]>
  /**
   * Get a user's data from the api
   *
   * @param id The user's id
   * @returns {CamelizedDiscordUser}
   */
  getUser: (id: BigString) => Promise<CamelizedDiscordUser>
  /**
   * Get the current user data.
   *
   * @param bearerToken - The access token of the user
   * @returns {CamelizedDiscordUser}
   *
   * @remarks
   * This requires the `identify` scope.
   *
   * To get the mail this also requires the `email` scope
   */
  getCurrentUser: (bearerToken: string) => Promise<CamelizedDiscordUser>
  /**
   * Get the current user connections.
   *
   * @param bearerToken - The access token of the user
   * @returns {CamelizedDiscordConnection[]}
   *
   * @remarks
   * This requires the `connections` scope.
   */
  getUserConnections: (bearerToken: string) => Promise<CamelizedDiscordConnection[]>
  /**
   * Get the current user application role connection for the application.
   *
   * @param bearerToken - The access token of the user
   * @param applicationId - The id of the application to get the role connection
   * @returns {CamelizedDiscordApplicationRoleConnection}
   *
   * @remarks
   * The access token requires the `role_connections.write` scope.
   *
   * @see {@link https://discord.com/developers/docs/resources/user#get-user-application-role-connection}
   */
  getUserApplicationRoleConnection: (bearerToken: string, applicationId: BigString) => Promise<CamelizedDiscordApplicationRoleConnection>
  /**
   * Gets information about the vanity url of a guild.
   *
   * @param guildId - The ID of the guild to get the vanity url information for.
   * @returns An instance of {@link CamelizedDiscordVanityUrl}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * The `code` property will be `null` if the guild does not have a set vanity url.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-vanity-url}
   */
  getVanityUrl: (guildId: BigString) => Promise<CamelizedDiscordVanityUrl>
  /**
   * Gets the list of voice regions for a guild.
   *
   * @param guildId - The ID of the guild to get the voice regions for.
   * @returns A collection of {@link CamelizedDiscordVoiceRegion} objects assorted by voice region ID.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-voice-regions}
   */
  getVoiceRegions: (guildId: BigString) => Promise<CamelizedDiscordVoiceRegion[]>
  /**
   * Gets a webhook by its ID.
   *
   * @param webhookId - The ID of the webhook to get.
   * @returns An instance of {@link CamelizedDiscordWebhook}.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#get-webhook}
   */
  getWebhook: (webhookId: BigString) => Promise<CamelizedDiscordWebhook>
  /**
   * Gets a webhook message by its ID.
   *
   * @param webhookId - The ID of the webhook to get a message of.
   * @param token - The webhook token, used to get webhook messages.
   * @param messageId - the ID of the webhook message to get.
   * @param options - The parameters for the fetching of the message.
   * @returns An instance of {@link CamelizedDiscordMessage}.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#get-webhook-message}
   */
  getWebhookMessage: (
    webhookId: BigString,
    token: string,
    messageId: BigString,
    options?: GetWebhookMessageOptions,
  ) => Promise<CamelizedDiscordMessage>
  /**
   * Gets a webhook using the webhook token, thereby bypassing the need for authentication + permissions.
   *
   * @param webhookId - The ID of the webhook to get.
   * @param token - The webhook token, used to get the webhook.
   * @returns An instance of {@link CamelizedDiscordWebhook}.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#get-webhook-with-token}
   */
  getWebhookWithToken: (webhookId: BigString, token: string) => Promise<CamelizedDiscordWebhook>
  /**
   * Gets the welcome screen for a guild.
   *
   * @param guildId - The ID of the guild to get the welcome screen for.
   * @returns An instance of {@link CamelizedDiscordWelcomeScreen}.
   *
   * @remarks
   * If the welcome screen is not enabled:
   * - Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-welcome-screen}
   */
  getWelcomeScreen: (guildId: BigString) => Promise<CamelizedDiscordWelcomeScreen>
  /**
   * Gets the guild widget by guild ID.
   *
   * @param guildId - The ID of the guild to get the widget of.
   * @returns An instance of {@link CamelizedDiscordGuildWidget}.
   *
   * @remarks
   * Fires an `INVITE_CREATED` Gateway event when an invite channel is defined and a new `Invite` is generated.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-widget}
   */
  getWidget: (guildId: BigString) => Promise<CamelizedDiscordGuildWidget>
  /**
   * Gets the settings of a guild's widget.
   *
   * @param guildId - The ID of the guild to get the widget of.
   * @returns An instance of {@link CamelizedDiscordGuildWidgetSettings}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-widget-settings}
   */
  getWidgetSettings: (guildId: BigString) => Promise<CamelizedDiscordGuildWidgetSettings>
  /**
   * Adds the bot user to a thread.
   *
   * @param channelId - The ID of the thread to add the bot user to.
   *
   * @remarks
   * Requires the thread not be archived.
   *
   * Fires a _Thread Members Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#join-thread}
   */
  joinThread: (channelId: BigString) => Promise<void>
  /**
   * Leaves a guild.
   *
   * @param guildId - The ID of the guild to leave.
   *
   * @remarks
   * Fires a _Guild Delete_ event.
   *
   * @see {@link https://discord.com/developers/docs/resources/user#leave-guild}
   */
  leaveGuild: (guildId: BigString) => Promise<void>
  /**
   * Removes the bot user from a thread.
   *
   * @param channelId - The ID of the thread to remove the bot user from.
   *
   * @remarks
   * Requires the thread not be archived.
   *
   * Fires a _Thread Members Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#leave-thread}
   */
  leaveThread: (channelId: BigString) => Promise<void>
  /**
   * Cross-posts a message posted in an announcement channel to subscribed channels.
   *
   * @param channelId - The ID of the announcement channel.
   * @param messageId - The ID of the message to cross-post.
   * @returns An instance of the cross-posted {@link CamelizedDiscordMessage}.
   *
   * @remarks
   * Requires the `SEND_MESSAGES` permission.
   *
   * If not cross-posting own message:
   * - Requires the `MANAGE_MESSAGES` permission.
   *
   * Fires a _Message Create_ event in the guilds the subscribed channels are in.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#crosspost-message}
   */
  publishMessage: (channelId: BigString, messageId: BigString) => Promise<CamelizedDiscordMessage>
  /**
   * Removes a role from a member.
   *
   * @param guildId - The ID of the guild the member to remove the role from is in.
   * @param userId - The user ID of the member to remove the role from.
   * @param roleId - The ID of the role to remove from the member.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `MANAGE_ROLES` permission.
   *
   * Fires a _Guild Member Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#remove-guild-member-role}
   */
  removeRole: (guildId: BigString, userId: BigString, roleId: BigString, reason?: string) => Promise<void>
  /**
   * Removes a member from a thread.
   *
   * @param channelId - The ID of the thread to remove the thread member of.
   * @param userId - The user ID of the thread member to remove.
   *
   * @remarks
   * If the thread is of type {@link ChannelTypes}.GuildPrivateThread, requires to be the creator of the thread.
   * Otherwise, requires the `MANAGE_THREADS` permission.
   *
   * Requires the thread not be archived.
   *
   * Fires a _Thread Members Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#remove-thread-member}
   */
  removeThreadMember: (channelId: BigString, userId: BigString) => Promise<void>
  /**
   * Removes a member from a Group DM.
   *
   * @param channelId - The ID of the channel to remove the recipient user of.
   * @param userId - The user ID of the user to remove.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#group-dm-remove-recipient}
   */
  removeDmRecipient: (channelId: BigString, userId: BigString) => Promise<void>
  /**
   * Sends a message to a channel.
   *
   * @param channelId - The ID of the channel to send the message in.
   * @param options - The parameters for the creation of the message.
   * @returns An instance of the created {@link CamelizedDiscordMessage}.
   *
   * @remarks
   * Requires that the bot user be able to see the contents of the channel the message is to be sent in.
   *
   * If sending a message to a guild channel:
   * - Requires the `SEND_MESSAGES` permission.
   *
   * If sending a TTS message:
   * - Requires the `SEND_TTS_MESSAGES` permission.
   *
   * If sending a message as a reply to another message:
   * - Requires the `READ_MESSAGE_HISTORY` permission.
   * - The message being replied to cannot be a system message.
   *
   * ⚠️ The maximum size of a request (accounting for any attachments and message content) for bot users is _8 MiB_.
   *
   * Fires a _Message Create_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#create-message}
   */
  sendMessage: (channelId: BigString, options: CreateMessageOptions) => Promise<CamelizedDiscordMessage>
  /**
   * Sends a follow-up message to an interaction.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   * @param options - The parameters for the creation of the message.
   * @returns An instance of the created {@link CamelizedDiscordMessage}.
   *
   * @remarks
   * ⚠️ Interaction tokens are only valid for _15 minutes_.
   *
   * By default, mentions are suppressed. To enable mentions, pass a mention object with the callback data.
   *
   * Unlike `sendMessage()`, this endpoint allows the bot user to act without:
   * - Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
   * - Requiring the `MESSAGE_CONTENT` intent.
   *
   * Fires a _Message Create_ event.
   *
   * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message}
   */
  sendFollowupMessage: (token: string, options: InteractionCallbackData) => Promise<CamelizedDiscordMessage>
  /**
   * Sends a response to an interaction.
   *
   * @param interactionId - The ID of the interaction to respond to.
   * @param token - The interaction token to use, provided in the original interaction.
   * @param options - The parameters for the creation of the message.
   * @returns An instance of the created {@link CamelizedDiscordMessage}.
   *
   * @remarks
   * ⚠️ Interaction tokens are only valid for _15 minutes_.
   *
   * By default, mentions are suppressed. To enable mentions, pass a mention object with the callback data.
   *
   * Unlike `sendMessage()`, this endpoint allows the bot user to act without:
   * - Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
   * - Requiring the `MESSAGE_CONTENT` intent.
   *
   * Fires a _Message Create_ event.
   *
   * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response}
   */
  sendInteractionResponse: (interactionId: BigString, token: string, options: InteractionResponse) => Promise<void>
  /**
   * Creates a thread, using an existing message as its point of origin.
   *
   * @param channelId - The ID of the channel in which to create the thread.
   * @param messageId - The ID of the message to use as the thread's point of origin.
   * @param options - The parameters to use for the creation of the thread.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the created {@link CamelizedDiscordChannel}.
   *
   * @remarks
   * If called on a channel of type {@link ChannelTypes}.GuildText, creates a {@link ChannelTypes}.GuildPublicThread.
   * If called on a channel of type {@link ChannelTypes}.GuildNews, creates a {@link ChannelTypes}.GuildNewsThread.
   * Does not work on channels of type {@link ChannelTypes}.GuildForum.
   *
   * The ID of the created thread will be the same as the ID of the source message.
   *
   * Fires a _Thread Create_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#start-thread-from-message}
   */
  startThreadWithMessage: (
    channelId: BigString,
    messageId: BigString,
    options: StartThreadWithMessage,
    reason?: string,
  ) => Promise<CamelizedDiscordChannel>
  /**
   * Creates a thread without using a message as the thread's point of origin.
   *
   * @param channelId - The ID of the channel in which to create the thread.
   * @param options - The parameters to use for the creation of the thread.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the created {@link CamelizedDiscordChannel | Thread}.
   *
   * @remarks
   * Creating a private thread requires the server to be boosted.
   *
   * Fires a _Thread Create_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#start-thread-without-message}
   */
  startThreadWithoutMessage: (channelId: BigString, options: StartThreadWithoutMessage, reason?: string) => Promise<CamelizedDiscordChannel>
  /**
   * Synchronises a template with the current state of a guild.
   *
   * @param guildId - The ID of the guild to synchronise a template of.
   * @returns An instance of the edited {@link CamelizedDiscordTemplate}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires a _Guild Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild-template#get-guild-templates}
   */
  syncGuildTemplate: (guildId: BigString) => Promise<CamelizedDiscordTemplate>
  /**
   * Triggers a typing indicator for the specified channel, which expires after 10 seconds.
   *
   * @param channelId - The ID of the channel in which to trigger the typing indicator.
   *
   * @remarks
   * Generally bots should **not** use this route.
   * However, if a bot is responding to a command and expects the computation to take a few seconds,
   * this endpoint may be called to let the user know that the bot is processing their message.
   *
   * Fires a _Typing Start_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#trigger-typing-indicator}
   */
  triggerTypingIndicator: (channelId: BigString) => Promise<void>
  /**
   * Re-registers the list of global application commands, overwriting the previous commands completely.
   *
   * @param commands - The list of commands to use to overwrite the previous list.
   * @param options - Additional options for the endpoint.
   * @returns A collection of {@link CamelizedDiscordApplicationCommand} objects assorted by command ID.
   *
   * @remarks
   * ❗ Commands that are not present in the `commands` array will be __deleted__.
   *
   * ⚠️ Commands that do not already exist will count towards the daily limit of _200_ new commands.
   *
   * When using the bearer token the token needs the `applications.commands.update` scope and must be a `Client grant` token.
   *  You will be able to update only your own application commands
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands}
   */
  upsertGlobalApplicationCommands: (
    commands: CreateApplicationCommand[],
    options?: UpsertGlobalApplicationCommandOptions,
  ) => Promise<CamelizedDiscordApplicationCommand[]>
  /**
   * Re-registers the list of application commands registered in a guild, overwriting the previous commands completely.
   *
   * @param guildId - The ID of the guild whose list of commands to overwrite.
   * @param commands - The list of commands to use to overwrite the previous list.
   * @param options - Additional options for the endpoint.
   * @returns A collection of {@link CamelizedDiscordApplicationCommand} objects assorted by command ID.
   *
   * @remarks
   * ❗ Commands that are not present in the `commands` array will be __deleted__.
   *
   * ⚠️ Commands that do not already exist will count towards the daily limit of _200_ new commands.
   *
   * When using the bearer token the token needs the `applications.commands.update` scope and must be a `Client grant` token.
   *  You will be able to update only your own application commands
   *
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands}
   */
  upsertGuildApplicationCommands: (
    guildId: BigString,
    commands: CreateApplicationCommand[],
    options?: UpsertGuildApplicationCommandOptions,
  ) => Promise<CamelizedDiscordApplicationCommand[]>
  /**
   * Bans a user from a guild.
   *
   * @param guildId - The ID of the guild to ban the user from.
   * @param userId - The ID of the user to ban from the guild.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @param options - The parameters for the creation of the ban.
   *
   * @remarks
   * Requires the `BAN_MEMBERS` permission.
   *
   * Fires a _Guild Ban Add_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#create-guild-ban}
   */
  banMember: (guildId: BigString, userId: BigString, options?: CreateGuildBan, reason?: string) => Promise<void>
  /**
   * Edits the nickname of the bot user.
   *
   * @param guildId - The ID of the guild to edit the nickname of the bot user in.
   * @param options - The parameters for the edit of the nickname.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the edited {@link CamelizedDiscordMember}
   *
   * @remarks
   * Fires a _Guild Member Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#modify-current-member}
   */
  editBotMember: (guildId: BigString, options: EditBotMemberOptions, reason?: string) => Promise<CamelizedDiscordMember>
  /**
   * Edits a member's properties.
   *
   * @param guildId - The ID of the guild to edit the member of.
   * @param userId - The user ID of the member to edit.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @param options - The parameters for the edit of the user.
   *
   * @remarks
   * This endpoint requires various permissions depending on what is edited about the member.
   * To find out the required permission to enact a change, read the documentation of this endpoint's {@link ModifyGuildMember | parameters}.
   *
   * Fires a _Guild Member Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild-member}
   */
  editMember: (guildId: BigString, userId: BigString, options: ModifyGuildMember, reason?: string) => Promise<CamelizedDiscordMember>
  /**
   * Gets the member object by user ID.
   *
  
   * @param guildId - The ID of the guild to get the member object for.
   * @param userId - The ID of the user to get the member object for.
   * @returns An instance of {@link CamelizedDiscordMemberWithUser}.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-member}
   */
  getMember: (guildId: BigString, userId: BigString) => Promise<CamelizedDiscordMemberWithUser>
  /**
   * Gets the current member object.
   *
   * @param bearerToken - The access token of the user
   * @param guildId - The ID of the guild to get the member object for.
   * @returns An instance of {@link CamelizedDiscordMemberWithUser}.
   *
   * @remarks
   * The access tokens needs the `guilds.members.read` scope
   *
   * @see {@link https://discord.com/developers/docs/resources/user#get-current-user-guild-member}
   */
  getCurrentMember: (guildId: BigString, bearerToken: string) => Promise<CamelizedDiscordMemberWithUser>
  /**
   * Gets the list of members for a guild.
   *
   * @param guildId - The ID of the guild to get the list of members for.
   * @param options - The parameters for the fetching of the members.
   * @returns A collection of {@link CamelizedDiscordMemberWithUser} objects assorted by user ID.
   *
   * @remarks
   * Requires the `GUILD_MEMBERS` intent.
   *
   * ⚠️ It is not recommended to use this endpoint with very large bots. Instead, opt to use `fetchMembers()`:
   * REST communication only permits 50 requests to be made per second, while gateways allow for up to 120 requests
   * per minute per shard. For more information, read {@link https://discord.com/developers/docs/topics/rate-limits#rate-limits}.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#list-guild-members}
   * @see {@link https://discord.com/developers/docs/topics/gateway#request-guild-members}
   * @see {@link https://discord.com/developers/docs/topics/rate-limits#rate-limits}
   */
  getMembers: (guildId: BigString, options: ListGuildMembers) => Promise<CamelizedDiscordMemberWithUser[]>

  /**
   * Kicks a member from a guild.
   *
  
   * @param guildId - The ID of the guild to kick the member from.
   * @param userId - The user ID of the member to kick from the guild.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `KICK_MEMBERS` permission.
   *
   * Fires a _Guild Member Remove_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#remove-guild-member}
   */
  kickMember: (guildId: BigString, userId: BigString, reason?: string) => Promise<void>
  /**
   * Pins a message in a channel.
   *
   * @param channelId - The ID of the channel where the message is to be pinned.
   * @param messageId - The ID of the message to pin.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires that the bot user be able to see the contents of the channel in which the messages were posted.
   *
   * Requires the `MANAGE_MESSAGES` permission.
   *
   * ⚠️ There can only be at max 50 messages pinned in a channel.
   *
   * Fires a _Channel Pins Update_ event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#pin-message}
   */
  pinMessage: (channelId: BigString, messageId: BigString, reason?: string) => Promise<void>
  /**
   * Initiates the process of pruning inactive members.
   *
  
   * @param guildId - The ID of the guild to prune the members of.
   * @param options - The parameters for the pruning of members.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns A number indicating how many members were pruned.
   *
   * @remarks
   * Requires the `KICK_MEMBERS` permission.
   *
   * ❗ Requests to this endpoint will time out for large guilds. To prevent this from happening, set the {@link BeginGuildPrune.computePruneCount} property of the {@link options} object parameter to `false`. This will begin the process of pruning, and immediately return `undefined`, rather than wait for the process to complete before returning the actual count of members that have been kicked.
   *
   * ⚠️ By default, this process will not remove members with a role. To include the members who have a _particular subset of roles_, specify the role(s) in the {@link BeginGuildPrune.includeRoles | includeRoles} property of the {@link options} object parameter.
   *
   * Fires a _Guild Member Remove_ gateway event for every member kicked.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#begin-guild-prune}
   */
  pruneMembers: (guildId: BigString, options: BeginGuildPrune, reason?: string) => Promise<{ pruned: number | null }>
  /**
   * Gets the list of members whose usernames or nicknames start with a provided string.
   *
  
   * @param guildId - The ID of the guild to search in.
   * @param query - The string to match usernames or nicknames against.
   * @param options - The parameters for searching through the members.
   * @returns A collection of {@link CamelizedDiscordMember} objects assorted by user ID.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#search-guild-members}
   */
  searchMembers: (guildId: BigString, query: string, options?: Omit<SearchMembers, 'query'>) => Promise<CamelizedDiscordMemberWithUser[]>
  /**
   * Unbans a user from a guild.
   *
  
   * @param guildId - The ID of the guild to unban the user in.
   * @param userId - The ID of the user to unban.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `BAN_MEMBERS` permission.
   *
   * Fires a _Guild Ban Remove_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/guild#remove-guild-ban}
   */
  unbanMember: (guildId: BigString, userId: BigString, reason?: string) => Promise<void>
  /**
   * Unpins a pinned message in a channel.
   *
   * @param channelId - The ID of the channel where the message is pinned.
   * @param messageId - The ID of the message to unpin.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires that the bot user be able to see the contents of the channel in which the messages were posted.
   *
   * Requires the `MANAGE_MESSAGES` permission.
   *
   * Fires a _Channel Pins Update_ event.
   *
   * @see {@link https://discord.com/developers/docs/resources/channel#unpin-message}
   */
  unpinMessage: (channelId: BigString, messageId: BigString, reason?: string) => Promise<void>
  /**
   * Get the guild onboarding
   *
   * @param guildId - The guild to get the onboarding from
   */
  getGuildOnboarding: (guildId: BigString) => Promise<CamelizedDiscordGuildOnboarding>
  /**
   * Modifies the onboarding configuration of the guild.
   *
   * @param guildId - The guild to get the onboarding from
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` and `MANAGE_ROLES` permissions.
   *
   * Onboarding enforces constraints when enabled. These constraints are:
   *  - at least 7 default channels
   *  - at least 5 of the 7 channels must allow sending messages to the @everyone role
   *
   * The `mode` field modifies what is considered when enforcing these constraints.
   */
  editGuildOnboarding: (guildId: BigString, options: EditGuildOnboarding, reason?: string) => Promise<CamelizedDiscordGuildOnboarding>
  /**
   * Returns all entitlements for a given app, active and expired.
   *
   * @param applicationId - The id of the application to get the entitlements
   * @param {GetEntitlements} [options] - The optional query params for the endpoint
   */
  listEntitlements: (applicationId: BigString, options?: GetEntitlements) => Promise<CamelizedDiscordEntitlement[]>
  /**
   * Creates a test entitlement to a given SKU for a given guild or user. Discord will act as though that user or guild has entitlement to your premium offering.
   *
   * @param applicationId - The id of the application to create the entitlement
   * @param body - The options for new entitlement
   *
   * @remarks
   * This endpoint returns a partial entitlement object.
   * It will not contain subscription_id, starts_at, or ends_at, as it's valid in perpetuity.
   */
  createTestEntitlement: (applicationId: BigString, body: CreateEntitlement) => Promise<Partial<CamelizedDiscordEntitlement>>
  /**
   * Deletes a currently-active test entitlement. Discord will act as though that user or guild no longer has entitlement to your premium offering.
   *
   * @param applicationId - The id of the application from where delete the entitlement
   * @param entitlementId - The id of the entitlement to delete
   */
  deleteTestEntitlement: (applicationId: BigString, entitlementId: BigString) => Promise<void>
  /**
   * Returns all SKUs for a given application
   *
   * @param applicationId - The id of the application to get the SKUs
   */
  listSkus: (applicationId: BigString) => Promise<CamelizedDiscordSku[]>
}

export type RequestMethods = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT'
export type ApiVersions = 9 | 10

export interface CreateWebhook {
  /** Name of the webhook (1-80 characters) */
  name: string
  /** Image url for the default webhook avatar */
  avatar?: string | null
}

export interface CreateRequestBodyOptions {
  headers?: Record<string, string>
  body?: any
  unauthorized?: boolean
  reason?: string
  files?: FileContent[]
}

export type MakeRequestOptions = Omit<CreateRequestBodyOptions, 'method'> & Pick<SendRequestOptions, 'runThroughQueue'>

export interface RequestBody {
  headers: Record<string, string>
  body?: string | FormData
  method: RequestMethods
}

export interface SendRequestOptions {
  /** The route to send the request to. */
  route: string
  /** The method to use for sending the request. */
  method: RequestMethods
  /** The amount of times this request has been retried. */
  retryCount: number
  /** Handler to retry a request should it be rate limited. */
  retryRequest?: (options: SendRequestOptions) => Promise<void>
  /** Resolve handler when a request succeeds. */
  resolve: (value: RestRequestResponse) => void
  /** Reject handler when a request fails. */
  reject: (value: RestRequestRejection) => void
  /** If this request has a bucket id which it falls under for rate limit */
  bucketId?: string
  /** Additional request options, used for things like overriding authorization header. */
  requestBodyOptions?: CreateRequestBodyOptions
  /**
   * Whether the request should be run through the queue.
   * Useful for routes which do not have any rate limits.
   */
  runThroughQueue?: boolean
}

export interface RestRateLimitedPath {
  url: string
  resetTimestamp: number
  bucketId?: string
}

export interface WebhookMessageEditor {
  /**
   * Edits a webhook message.
   *
   * @param webhookId - The ID of the webhook to edit the message of.
   * @param token - The webhook token, used to edit the message.
   * @param messageId - The ID of the message to edit.
   * @param options - The parameters for the edit of the message.
   * @returns An instance of the edited {@link CamelizedDiscordMessage}.
   *
   * @remarks
   * Fires a _Message Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#edit-webhook-message}
   */
  (
    webhookId: BigString,
    token: string,
    messageId: BigString,
    options: InteractionCallbackData & { threadId?: BigString },
  ): Promise<CamelizedDiscordMessage>
  /**
   * Edits the original webhook message.
   *
   * @param webhookId - The ID of the webhook to edit the original message of.
   * @param token - The webhook token, used to edit the message.
   * @param options - The parameters for the edit of the message.
   * @returns An instance of the edited {@link CamelizedDiscordMessage}.
   *
   * @remarks
   * Fires a _Message Update_ gateway event.
   *
   * @see {@link https://discord.com/developers/docs/resources/webhook#edit-webhook-message}
   */
  original: (webhookId: BigString, token: string, options: InteractionCallbackData & { threadId?: BigString }) => Promise<CamelizedDiscordMessage>
}

export interface RestRequestResponse {
  ok: boolean
  status: number
  body?: string
}

export interface RestRequestRejection {
  ok: boolean
  status: number
  body?: string
  error?: string
}
