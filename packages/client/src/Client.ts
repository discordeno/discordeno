/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  AllowedMentionsTypes,
  ChannelTypes,
  type DiscordAllowedMentions,
  type DiscordAuditLogEntry,
  type DiscordChannel,
  type DiscordGetGatewayBot,
  type DiscordGuild,
  type DiscordIntegration,
  type DiscordInvite,
  type DiscordMember,
  type DiscordMemberWithUser,
  type DiscordMessage,
  type DiscordRole,
  type DiscordTemplate,
  type DiscordThreadMember,
  type DiscordUser,
  type GatewayIntents,
  type GetMessagesOptions,
  type OverwriteTypes,
} from '@discordeno/types'
import { delay, getBotIdFromToken, iconBigintToHash, iconHashToBigInt, snakelize } from '@discordeno/utils'
import EventEmitter from 'node:events'
import Base from './Base.js'
import Collection from './Collection.js'
import type { IntentStrings } from './Constants.js'
import { Intents } from './Constants.js'
import {
  CHANNEL,
  CHANNEL_BULK_DELETE,
  CHANNEL_CROSSPOST,
  CHANNEL_FOLLOW,
  CHANNEL_INVITES,
  CHANNEL_MESSAGE,
  CHANNEL_MESSAGES,
  CHANNEL_MESSAGE_REACTION,
  CHANNEL_MESSAGE_REACTIONS,
  CHANNEL_MESSAGE_REACTION_USER,
  CHANNEL_PERMISSION,
  CHANNEL_PIN,
  CHANNEL_PINS,
  CHANNEL_TYPING,
  CHANNEL_WEBHOOKS,
  COMMAND,
  COMMANDS,
  COMMAND_PERMISSIONS,
  CUSTOM_EMOJI_GUILD,
  DISCOVERY_CATEGORIES,
  DISCOVERY_VALIDATION,
  GATEWAY,
  GATEWAY_BOT,
  GUILD,
  GUILDS,
  GUILD_AUDIT_LOGS,
  GUILD_BAN,
  GUILD_BANS,
  GUILD_CHANNELS,
  GUILD_COMMAND,
  GUILD_COMMANDS,
  GUILD_COMMAND_PERMISSIONS,
  GUILD_DISCOVERY,
  GUILD_DISCOVERY_CATEGORY,
  GUILD_EMOJI,
  GUILD_EMOJIS,
  GUILD_INTEGRATION,
  GUILD_INTEGRATIONS,
  GUILD_INTEGRATION_SYNC,
  GUILD_INVITES,
  GUILD_MEMBER,
  GUILD_MEMBERS,
  GUILD_MEMBERS_SEARCH,
  GUILD_MEMBER_ROLE,
  GUILD_PREVIEW,
  GUILD_PRUNE,
  GUILD_ROLE,
  GUILD_ROLES,
  GUILD_STICKER,
  GUILD_STICKERS,
  GUILD_TEMPLATE,
  GUILD_TEMPLATES,
  GUILD_TEMPLATE_GUILD,
  GUILD_VANITY_URL,
  GUILD_VOICE_REGIONS,
  GUILD_VOICE_STATE,
  GUILD_WEBHOOKS,
  GUILD_WELCOME_SCREEN,
  GUILD_WIDGET,
  GUILD_WIDGET_SETTINGS,
  INTERACTION_RESPOND,
  INVITE,
  OAUTH2_APPLICATION,
  STAGE_INSTANCE,
  STAGE_INSTANCES,
  STICKER,
  STICKER_PACKS,
  THREADS_ARCHIVED,
  THREADS_ARCHIVED_JOINED,
  THREADS_GUILD_ACTIVE,
  THREAD_MEMBER,
  THREAD_MEMBERS,
  THREAD_WITHOUT_MESSAGE,
  THREAD_WITH_MESSAGE,
  USER,
  USER_CHANNELS,
  USER_GUILD,
  USER_GUILDS,
  VOICE_REGIONS,
  WEBHOOK,
  WEBHOOK_MESSAGE,
  WEBHOOK_TOKEN,
  WEBHOOK_TOKEN_SLACK,
} from './Endpoints.js'
import ShardManager from './gateway/ShardManager.js'
import RequestHandler from './RequestHandler.js'
import type CategoryChannel from './Structures/channels/Category.js'
import type Channel from './Structures/channels/Channel.js'
import type GuildChannel from './Structures/channels/Guild.js'
import type NewsChannel from './Structures/channels/News.js'
import PrivateChannel from './Structures/channels/Private.js'
import type StageChannel from './Structures/channels/Stage.js'
import type TextChannel from './Structures/channels/Text.js'
import type TextVoiceChannel from './Structures/channels/TextVoice.js'
import ThreadMember from './Structures/channels/threads/Member.js'
import type NewsThreadChannel from './Structures/channels/threads/NewsThread.js'
import type PrivateThreadChannel from './Structures/channels/threads/PrivateThread.js'
import type PublicThreadChannel from './Structures/channels/threads/PublicThread.js'
import type ThreadChannel from './Structures/channels/threads/Thread.js'
import type VoiceChannel from './Structures/channels/Voice.js'
import GuildAuditLogEntry from './Structures/guilds/AuditLogEntry.js'
import Guild from './Structures/guilds/Guild.js'
import GuildIntegration from './Structures/guilds/Integration.js'
import Member from './Structures/guilds/Member.js'
import GuildPreview from './Structures/guilds/Preview.js'
import Role from './Structures/guilds/Role.js'
import StageInstance from './Structures/guilds/StageInstance.js'
import GuildTemplate from './Structures/guilds/Template.js'
import type UnavailableGuild from './Structures/guilds/Unavailable.js'
import type { VoiceState } from './Structures/guilds/VoiceState.js'
import type AutocompleteInteraction from './Structures/interactions/Autocomplete.js'
import type CommandInteraction from './Structures/interactions/Command.js'
import type ComponentInteraction from './Structures/interactions/Component.js'
import type Interaction from './Structures/interactions/Interaction.js'
import type PingInteraction from './Structures/interactions/Ping.js'
import type UnknownInteraction from './Structures/interactions/Unknown.js'
import Invite from './Structures/Invite.js'
import Message from './Structures/Message.js'
import Permission from './Structures/Permission.js'
import type PermissionOverwrite from './Structures/PermissionOverwrite.js'
import ExtendedUser from './Structures/users/Extended.js'
import User from './Structures/users/User.js'
import type {
  ActivityPartial,
  AllowedMentions,
  AnyChannel,
  AnyGuildChannel,
  ApplicationCommand,
  ApplicationCommandPermissions,
  ApplicationCommandStructure,
  BotActivityType,
  ChannelFollow,
  ChannelPosition,
  ClientEvents,
  CreateChannelInviteOptions,
  CreateChannelOptions,
  CreateGuildOptions,
  CreateStickerOptions,
  CreateThreadOptions,
  CreateThreadWithoutMessageOptions,
  DiscoveryCategory,
  DiscoveryMetadata,
  DiscoveryOptions,
  DiscoverySubcategoryResponse,
  EditChannelOptions,
  EditChannelPositionOptions,
  EditStickerOptions,
  Emoji,
  EmojiOptions,
  FileContent,
  GetArchivedThreadsOptions,
  GetGuildAuditLogOptions,
  GetGuildBansOptions,
  GetMessageReactionOptions,
  GetPruneOptions,
  GetRESTGuildMembersOptions,
  GetRESTGuildsOptions,
  GuildApplicationCommandPermissions,
  GuildAuditLog,
  GuildBan,
  GuildOptions,
  GuildTemplateOptions,
  GuildVanity,
  IntegrationOptions,
  InteractionResponse,
  ListedChannelThreads,
  ListedGuildThreads,
  MemberOptions,
  MessageContent,
  MessageContentEdit,
  MessageWebhookContent,
  OAuthApplicationInfo,
  PruneMemberOptions,
  PurgeChannelOptions,
  RoleOptions,
  SelfStatus,
  StageInstanceOptions,
  Sticker,
  StickerPack,
  VoiceRegion,
  VoiceStateOptions,
  Webhook,
  WebhookOptions,
  WebhookPayload,
  WelcomeScreen,
  WelcomeScreenOptions,
  Widget,
  WidgetData,
} from './typings.js'
import { generateChannelFrom } from './utils/generate.js'

// TODO: api version
const API_VERSION = 10

export class Client extends EventEmitter {
  /** The cleaned up version of the provided configurations for the client. */
  options: ParsedClientOptions
  /** The token used for this client. */
  token: string
  /** The timestamp in milliseconds when this client was created. */
  startTime = Date.now()

  CDN_URL = 'https://cdn.discordapp.com'
  CLIENT_URL = 'https://discord.com'

  guilds = new Collection<BigString, Guild>()
  unavailableGuilds = new Collection<BigString, UnavailableGuild>()
  users = new Collection<BigString, User>()
  _channelGuildMap = new Collection<BigString, BigString>()
  _threadGuildMap = new Collection<BigString, BigString>()
  _privateChannelMap = new Collection<BigString, BigString>()
  privateChannels = new Collection<BigString, PrivateChannel>()

  guildShardMap: Record<string, number>

  /** Rest manager. Not recommended. */
  requestHandler: RequestHandler
  /** Gateway manager. Not recommended */
  shards: ShardManager
  /** The gateway url to connect to. */
  gatewayURL: string = ''
  /** Whether or not the client is fully ready. */
  ready = false

  /** The reconnection delay from the last time it tried. */
  lastReconnectDelay: number = 0
  /** The amount of times it has already tried to reconnect. */
  reconnectAttempts: number = 0
  /** The client user */
  user!: ExtendedUser

  constructor(token: string, options: ClientOptions) {
    super()

    this.token = token

    this.options = {
      apiVersion: options.apiVersion ?? 10,
      // This is set below,
      allowedMentions: {},
      defaultImageFormat: options.defaultImageFormat ?? 'png',
      defaultImageSize: options.defaultImageSize ?? 128,
      proxyURL: options.proxyURL,
      proxyRestAuthorization: options.proxyRestAuthorization,
      applicationId: options.applicationId ?? this.id,
      messageLimit: options.messageLimit,
      seedVoiceConnections: options.seedVoiceConnections ?? true,
      shardConcurrency: options.shardConcurrency ?? 'auto',
      maxShards: options.maxShards ?? 'auto',
      compress: false,
      // compress: options.compress ?? false,
      firstShardID: options.firstShardID ?? 0,
      lastShardID: options.lastShardID,
      maxResumeAttempts: options.maxResumeAttempts ?? Infinity,
      // Set up below
      intents: 0,
      autoreconnect: options.autoreconnect ?? true,
      guildCreateTimeout: options.guildCreateTimeout ?? 2000,
      reconnectDelay: options.reconnectDelay ?? ((lastDelay, attempts) => Math.pow(attempts + 1, 0.7) * 20000),
    }

    if (options.intents !== undefined) {
      // Resolve intents option to the proper integer
      if (Array.isArray(options.intents)) {
        let bitmask = 0
        for (const intent of options.intents) {
          if (typeof intent === 'number') {
            bitmask |= intent
          } else if (Intents[intent]) {
            bitmask |= Intents[intent]
          } else {
            this.emit('warn', `Unknown intent: ${intent}`)
          }
        }
        this.options.intents = bitmask
      }
    }

    this.options.allowedMentions = this._formatAllowedMentions(options.allowedMentions)

    this.guildShardMap = {}
    this.requestHandler = new RequestHandler(this, {})

    this.shards = new ShardManager(this, {
      concurrency: this.options.shardConcurrency,
    })

    // NO PROXY REST START ALARMS
    if (!this.proxyURL) this.requestHandler.warnUser()

    this.shards = new ShardManager(this, {
      concurrency: typeof this.options.shardConcurrency === 'number' ? this.options.shardConcurrency : undefined,
    })

    // Class related annoyance bug hack
    this.connect = this.connect.bind(this)
  }

  /** The amount of time in milliseconds that this client has been online for. */
  get uptime(): number {
    return Date.now() - this.startTime
  }

  /** The api version to use. */
  get apiVersion(): ApiVersions {
    return this.options.apiVersion
  }

  /** Change the api version when making requests. */
  set apiVersion(version: ApiVersions) {
    this.options.apiVersion = version
  }

  /** The base url that will be used when making requests for discord api. */
  get BASE_URL(): string {
    return `/api/v${this.apiVersion}`
  }

  /** The url to the REST proxy to send requests to. */
  get proxyURL(): string {
    return this.options.proxyURL ?? ''
  }

  /** The password/authorization to confirm that these request made to your rest proxy are indeed from you and not a hacker. */
  get proxyRestAuthorization(): string {
    return this.options.proxyRestAuthorization ?? ''
  }

  /** The application id(NOT the bot id). The bot id and application id are the same for newer bots but older bots have different ids. */
  get applicationId(): BigString {
    return this.options.applicationId
  }

  /** Whether or not to seed voice connections. */
  get seedVoiceConnections(): boolean {
    return this.options.seedVoiceConnections
  }

  get id(): BigString {
    return getBotIdFromToken(this.token)
  }

  get channelGuildMap(): Record<string, BigString> {
    return this._channelGuildMap.toRecord()
  }

  get threadGuildMap(): Record<string, BigString> {
    return this._threadGuildMap.toRecord()
  }

  get privateChannelMap(): Record<string, BigString> {
    return this._privateChannelMap.toRecord()
  }

  on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): this
  on(event: string, listener: (...args: any[]) => void): this {
    return super.on(event, listener)
  }

  /** Tells all shards to connect. This will call `getBotGateway()`, which is ratelimited. */
  async connect(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    if (typeof this.token !== 'string') throw new Error(`Invalid token "${this.token}"`)

    try {
      const data = await this.getBotGateway()

      if (data.url.includes('?')) {
        data.url = data.url.substring(0, data.url.indexOf('?'))
      }
      if (!data.url.endsWith('/')) {
        data.url += '/'
      }
      this.gatewayURL = `${data.url}?v=${API_VERSION}&encoding=${'json'}`

      if (this.options.compress) {
        this.gatewayURL += '&compress=zlib-stream'
      }

      if (this.options.maxShards === 'auto') {
        this.options.maxShards = data.shards
      }

      if (this.options.lastShardID === undefined) {
        this.options.lastShardID = data.shards - 1
      }

      if (this.options.shardConcurrency === 'auto' && data.session_start_limit && typeof data.session_start_limit.max_concurrency === 'number') {
        this.shards.setConcurrency(data.session_start_limit.max_concurrency)
      }

      for (let i = this.options.firstShardID; i <= this.options.lastShardID; ++i) {
        this.shards.spawn(i)
      }
    } catch (err) {
      if (!this.options.autoreconnect) {
        throw err
      }

      const reconnectDelay = await this.options.reconnectDelay(this.lastReconnectDelay, this.reconnectAttempts)

      await delay(reconnectDelay)
      this.lastReconnectDelay = reconnectDelay
      this.reconnectAttempts = this.reconnectAttempts + 1

      return await this.connect()
    }
  }

  /** Make a GET request to the discord api. */
  async get(url: string): Promise<any> {
    return snakelize(await this.requestHandler.discordeno.get(url))
  }

  /** Make a POST request to the discord api. */
  async post(
    url: string,
    payload?: {
      body?: Record<string, unknown>
      reason?: string
      file?: FileContent | FileContent[]
    },
  ): Promise<any> {
    return snakelize(
      await this.requestHandler.discordeno.post(url, {
        reason: payload?.reason,
        file: payload?.file,
        ...payload?.body,
      }),
    )
  }

  /** Make a PATCH request to the discord api. */
  async patch(
    url: string,
    payload?: {
      body?: Record<string, unknown> | null | string | any[]
      reason?: string
      file?: FileContent | FileContent[]
    },
  ): Promise<any> {
    return snakelize(
      await this.requestHandler.discordeno.patch(
        url,
        payload?.file ?? payload?.reason
          ? {
              reason: payload.reason,
              file: payload.file,
              // @ts-expect-error js hacks plz stop
              ...payload.body,
            }
          : payload?.body,
      ),
    )
  }

  /** Make a PUT request to the discord api. */
  async put(
    url: string,
    payload?: {
      body?: Record<string, string | number> | any[]
      reason?: string
    },
  ): Promise<any> {
    return snakelize(
      await this.requestHandler.discordeno.put(
        url,
        Array.isArray(payload?.body)
          ? payload!.body
          : {
              reason: payload?.reason,
              ...payload?.body,
            },
      ),
    )
  }

  /** Make a DELETE request to the discord api. */
  async delete(url: string, payload?: { reason?: string }) {
    return await this.requestHandler.discordeno.delete(url, payload)
  }

  /** Add a guild discovery subcategory */
  async addGuildDiscoverySubcategory(guildID: BigString, categoryID: BigString, reason?: string): Promise<DiscoverySubcategoryResponse> {
    return await this.post(GUILD_DISCOVERY_CATEGORY(guildID, categoryID), {
      reason,
    })
  }

  /** Add a role to a guild member */
  async addGuildMemberRole(guildID: BigString, memberID: BigString, roleID: BigString, reason?: string): Promise<void> {
    return await this.put(GUILD_MEMBER_ROLE(guildID, memberID, roleID), {
      reason,
    })
  }

  /** Add a reaction to a message */
  async addMessageReaction(channelID: BigString, messageID: BigString, reaction: string): Promise<void> {
    if (reaction === decodeURI(reaction)) {
      reaction = encodeURIComponent(reaction)
    }

    return await this.put(CHANNEL_MESSAGE_REACTION_USER(channelID, messageID, reaction, '@me'))
  }

  /** Ban a user from a guild */
  async banGuildMember(guildID: BigString, userID: BigString, deleteMessageDays = 0, reason?: string): Promise<void> {
    if (deleteMessageDays < 0 || deleteMessageDays > 7) {
      return await Promise.reject(new Error(`Invalid deleteMessageDays value (${deleteMessageDays}), should be a number between 0-7 inclusive`))
    }

    return await this.put(GUILD_BAN(guildID, userID), {
      reason,
      body: { delete_message_days: deleteMessageDays },
    })
  }

  /** Bulk create/edit global application commands */
  async bulkEditCommands(commands: ApplicationCommandStructure[]): Promise<ApplicationCommand[]> {
    for (const command of commands) {
      if (command.name !== undefined) {
        if (command.type === 1 || command.type === undefined) {
          command.name = command.name.toLowerCase()
          if (!command.name.match(/^[\w-]{1,32}$/)) {
            throw new Error('Slash Command names must match the regular expression "^[\\w-]{1,32}$"')
          }
        }
      }
    }

    return await this.put(COMMANDS(this.applicationId), { body: commands })
  }

  /** Bulk create/edit guild application commands */
  async bulkEditGuildCommands(guildID: BigString, commands: ApplicationCommand[]): Promise<ApplicationCommand[]> {
    for (const command of commands) {
      if (command.name !== undefined) {
        if (command.type === 1 || command.type === undefined) {
          command.name = command.name.toLowerCase()
          if (!command.name.match(/^[\w-]{1,32}$/)) {
            throw new Error('Slash Command names must match the regular expression "^[\\w-]{1,32}$"')
          }
        }
      }
    }

    return await this.put(GUILD_COMMANDS(this.applicationId, guildID), {
      body: commands,
    })
  }

  /** Create a channel in a guild */
  async createChannel(guildID: BigString, name: string): Promise<TextChannel>
  async createChannel(guildID: BigString, name: string, type: ChannelTypes.GuildText, options?: CreateChannelOptions): Promise<TextChannel>
  async createChannel(guildID: BigString, name: string, type: ChannelTypes.GuildVoice, options?: CreateChannelOptions): Promise<TextVoiceChannel>
  async createChannel(guildID: BigString, name: string, type: ChannelTypes.GuildCategory, options?: CreateChannelOptions): Promise<CategoryChannel>
  async createChannel(guildID: BigString, name: string, type: ChannelTypes.GuildAnnouncement, options?: CreateChannelOptions): Promise<NewsChannel>
  async createChannel(guildID: BigString, name: string, type: ChannelTypes.GuildStageVoice, options?: CreateChannelOptions): Promise<StageChannel>
  async createChannel(guildID: BigString, name: string, type?: number, options?: CreateChannelOptions): Promise<unknown> {
    return await this.post(GUILD_CHANNELS(guildID), {
      reason: options?.reason,
      body: {
        name,
        type: type ?? ChannelTypes.GuildText,
        bitrate: options?.bitrate,
        nsfw: options?.nsfw,
        parent_id: options?.parentID,
        permission_overwrites: options?.permissionOverwrites,
        position: options?.position,
        rate_limit_per_user: options?.rateLimitPerUser,
        topic: options?.topic,
        user_limit: options?.userLimit,
      },
    }).then((channel) => generateChannelFrom(channel, this))
  }

  /** Create an invite for a channel */
  async createChannelInvite(channelID: BigString, options: CreateChannelInviteOptions = {}, reason?: string): Promise<Invite> {
    return await this.post(CHANNEL_INVITES(channelID), {
      body: {
        max_age: options.maxAge,
        max_uses: options.maxUses,
        target_application_id: options.targetApplicationID,
        target_type: options.targetType,
        target_user_id: options.targetUserID,
        temporary: options.temporary,
        unique: options.unique,
      },
      reason,
    }).then((invite) => new Invite(invite, this))
  }

  /** Create a channel webhook */
  async createChannelWebhook(channelID: BigString, options: { name: string; avatar?: string | null }, reason?: string): Promise<Webhook> {
    return await this.post(CHANNEL_WEBHOOKS(channelID), {
      reason,
      body: options,
    })
  }

  /** Create a global application command */
  async createCommand(command: ApplicationCommandStructure): Promise<ApplicationCommand> {
    if (command.name !== undefined) {
      if (command.type === 1 || command.type === undefined) {
        command.name = command.name.toLowerCase()
        if (!command.name.match(/^[\w-]{1,32}$/)) {
          throw new Error('Slash Command names must match the regular expression "^[\\w-]{1,32}$"')
        }
      }
    }

    // @ts-expect-error some eris magic at play here
    command.default_permission = command.defaultPermission
    return await this.post(COMMANDS(this.applicationId), { body: command })
  }

  /** Create a guild */
  async createGuild(name: string, options?: CreateGuildOptions): Promise<Guild> {
    if (this.guilds.size > 9) {
      throw new Error("This method can't be used when in 10 or more guilds.")
    }

    return await this.post(GUILDS, {
      body: {
        name,
        icon: options?.icon,
        verification_level: options?.verificationLevel,
        default_message_notifications: options?.defaultNotifications,
        explicit_content_filter: options?.explicitContentFilter,
        system_channel_id: options?.systemChannelID,
        afk_channel_id: options?.afkChannelID,
        afk_timeout: options?.afkTimeout,
        roles: options?.roles,
        channels: options?.channels,
      },
    }).then((guild) => new Guild(guild, this))
  }

  /** Create a guild application command */
  async createGuildCommand(guildID: BigString, command: ApplicationCommandStructure): Promise<ApplicationCommand> {
    if (command.name !== undefined) {
      if (command.type === 1 || command.type === undefined) {
        command.name = command.name.toLowerCase()
        if (!command.name.match(/^[\w-]{1,32}$/)) {
          throw new Error('Slash Command names must match the regular expression "^[\\w-]{1,32}$"')
        }
      }
    }
    // @ts-expect-error some eris magic at play here
    command.default_permission = command.defaultPermission

    return await this.post(GUILD_COMMANDS(this.applicationId, guildID), {
      body: command,
    })
  }

  /** Create a guild emoji object */
  async createGuildEmoji(guildID: BigString, options: EmojiOptions, reason?: string): Promise<Emoji> {
    return await this.post(GUILD_EMOJIS(guildID), {
      body: {
        name: options.name,
        roles: options.roles,
        image: options.image,
      },
      reason,
    })
  }

  /** Create a guild based on a template. This can only be used with bots in less than 10 guilds */
  async createGuildFromTemplate(code: string, name: string, icon?: string): Promise<Guild> {
    return await this.post(GUILD_TEMPLATE(code), { body: { name, icon } }).then((guild) => new Guild(guild, this))
  }

  /** Create a guild sticker */
  async createGuildSticker(guildID: BigString, options: CreateStickerOptions, reason?: string): Promise<Sticker> {
    return await this.post(GUILD_STICKERS(guildID), {
      body: {
        // @ts-expect-error some eris magic at play here
        description: options.description ?? '',
        name: options.name,
        tags: options.tags,
      },
      reason,
      file: options.file,
    })
  }

  /** Create a template for a guild */
  async createGuildTemplate(guildID: BigString, name: string, description?: string): Promise<GuildTemplate> {
    return await this.post(GUILD_TEMPLATES(guildID), {
      body: {
        name,
        description,
      },
    }).then((template) => new GuildTemplate(template, this))
  }

  /**
   * Respond to the interaction with a message
   * Note: Use webhooks if you have already responded with an interaction response.
   */
  async createInteractionResponse(
    interactionID: BigString,
    interactionToken: string,
    options: InteractionResponse,
    file?: FileContent | FileContent[],
  ): Promise<void> {
    return await this.post(INTERACTION_RESPOND(interactionID, interactionToken), {
      body: {
        ...options,
        data: {
          ...options.data,

          allowed_mentions: options.data?.allowedMentions ? this._formatAllowedMentions(options.data.allowedMentions) : undefined,
          allowedMentions: undefined,
        },
      },
      file,
    })
  }

  /**
   * Create a message in a channel
   * Note: If you want to DM someone, the user ID is **not** the DM channel ID. use Client.getDMChannel() to get the DM channel for a user
   */
  async createMessage(channelID: BigString, content: MessageContent, file?: FileContent | FileContent[]) {
    if (content !== undefined) {
      if (typeof content !== 'object' || content === null) {
        content = {
          content: '' + content,
        }
      } else if (content.content !== undefined && typeof content.content !== 'string') {
        content.content = '' + content.content
      } else if (content.embed) {
        if (!content.embeds) {
          content.embeds = []
        }
        content.embeds.push(content.embed)
      }
    }

    return await this.post(CHANNEL_MESSAGES(channelID), {
      body: {
        ...content,
        allowed_mentions: this._formatAllowedMentions(content.allowedMentions),
        sticker_ids: content.stickerIDs,
        ...(content.messageReference?.messageID
          ? {
              message_reference: {
                message_id: content.messageReference.messageID.toString(),
                channel_id: content.messageReference.channelID?.toString(),
                guild_id: content.messageReference.guildID?.toString(),
                fail_if_not_exists: content.messageReference.failIfNotExists === true,
              },
            }
          : {}),
      },
      file,
    }).then((message) => new Message(message, this))
  }

  /** Create a guild role */
  async createRole(guildID: BigString, options: Role | RoleOptions, reason?: string) {
    if (options.permissions !== undefined) {
      options.permissions = options.permissions instanceof Permission ? String(options.permissions.allow) : String(options.permissions)
    }

    return await this.post(GUILD_ROLES(guildID), {
      body: {
        name: options.name,
        permissions: options.permissions,
        color: options.color,
        hoist: options.hoist,
        icon: options.icon,
        mentionable: options.mentionable,
        unicode_emoji: options.unicodeEmoji,
      },
      reason,
    }).then((r) => {
      const guild = this.guilds.get(guildID)
      // @ts-expect-error some eris magic at play here
      const role = new Role(r, guild)

      guild?.roles.set(role.id, role)

      return role
    })
  }

  /** Create a stage instance */
  async createStageInstance(channelID: BigString, options: StageInstanceOptions): Promise<StageInstance> {
    return await this.post(STAGE_INSTANCES, {
      body: {
        channel_id: channelID,
        privacy_level: options.privacyLevel,
        topic: options.topic,
      },
    }).then((instance) => new StageInstance(instance, this))
  }

  /** Create a thread with an existing message */
  async createThreadWithMessage(
    channelID: BigString,
    messageID: BigString,
    options: CreateThreadOptions,
  ): Promise<NewsThreadChannel | PublicThreadChannel> {
    return await this.post(THREAD_WITH_MESSAGE(channelID, messageID), {
      body: {
        name: options.name,
        auto_archive_duration: options.autoArchiveDuration,
      },
    }).then((channel) => generateChannelFrom(channel, this) as unknown as NewsThreadChannel | PublicThreadChannel)
  }

  /** Create a thread without an existing message */
  async createThreadWithoutMessage(channelID: BigString, options: CreateThreadWithoutMessageOptions): Promise<PrivateThreadChannel> {
    return (await this.post(THREAD_WITHOUT_MESSAGE(channelID), {
      body: {
        auto_archive_duration: options.autoArchiveDuration,
        invitable: options.invitable,
        name: options.name,
        type: options.type,
      },
    }).then((channel) => generateChannelFrom(channel, this))) as PrivateThreadChannel
  }

  /** Crosspost (publish) a message to subscribed channels */
  async crosspostMessage(channelID: BigString, messageID: BigString): Promise<Message> {
    return await this.post(CHANNEL_CROSSPOST(channelID, messageID)).then((message) => new Message(message, this))
  }

  /** Delete a guild channel, or leave a private or group channel */
  async deleteChannel(channelID: BigString, reason?: string): Promise<void> {
    return await this.delete(CHANNEL(channelID), {
      reason,
    })
  }

  /** Delete a channel permission overwrite */
  async deleteChannelPermission(channelID: BigString, overwriteID: BigString, reason?: string) {
    return await this.delete(CHANNEL_PERMISSION(channelID, overwriteID), {
      reason,
    })
  }

  /** Delete a global application command */
  async deleteCommand(commandID: BigString): Promise<void> {
    return await this.delete(COMMAND(this.applicationId, commandID))
  }

  /** Delete a guild (bot user must be owner) */
  async deleteGuild(guildID: BigString): Promise<void> {
    return await this.delete(GUILD(guildID))
  }

  /** Delete a guild application command */
  async deleteGuildCommand(guildID: BigString, commandID: BigString): Promise<void> {
    return await this.delete(GUILD_COMMAND(this.applicationId, guildID, commandID))
  }

  /** Delete a guild discovery subcategory */
  async deleteGuildDiscoverySubcategory(guildID: BigString, categoryID: BigString, reason?: string) {
    return await this.delete(GUILD_DISCOVERY_CATEGORY(guildID, categoryID), {
      reason,
    })
  }

  /** Delete a guild emoji object */
  async deleteGuildEmoji(guildID: BigString, emojiID: BigString, reason?: string): Promise<void> {
    return await this.delete(GUILD_EMOJI(guildID, emojiID), {
      reason,
    })
  }

  /** Delete a guild integration */
  async deleteGuildIntegration(guildID: BigString, integrationID: BigString): Promise<void> {
    return await this.delete(GUILD_INTEGRATION(guildID, integrationID))
  }

  /** Delete a guild sticker */
  async deleteGuildSticker(guildID: BigString, stickerID: BigString, reason?: string): Promise<void> {
    return await this.delete(GUILD_STICKER(guildID, stickerID), {
      reason,
    })
  }

  /** Delete a guild template */
  async deleteGuildTemplate(guildID: BigString, code: string): Promise<void> {
    return await this.delete(GUILD_TEMPLATE_GUILD(guildID, code))
  }

  /** Delete an invite */
  async deleteInvite(inviteID: string, reason?: string): Promise<void> {
    return await this.delete(INVITE(inviteID), {
      reason,
    })
  }

  /** Delete a message */
  async deleteMessage(channelID: BigString, messageID: BigString, reason?: string): Promise<void> {
    return await this.delete(CHANNEL_MESSAGE(channelID, messageID), {
      reason,
    })
  }

  /** Bulk delete messages (bot accounts only) */
  async deleteMessages(channelID: BigString, messageIDs: BigString[], reason?: string): Promise<void> {
    if (messageIDs.length === 0) {
      return await Promise.resolve()
    }
    if (messageIDs.length === 1) {
      return await this.deleteMessage(channelID, messageIDs[0], reason)
    }

    const oldestAllowedSnowflake = (Date.now() - 1421280000000) * 4194304
    const invalidMessage = messageIDs.find((messageID) => this.snowflakeToTimestamp(messageID) < oldestAllowedSnowflake)
    if (invalidMessage) {
      return await Promise.reject(new Error(`Message ${invalidMessage} is more than 2 weeks old.`))
    }

    const chunks = this.chunkArray(messageIDs, 100)
    for (const chunk of chunks) {
      await this.post(CHANNEL_BULK_DELETE(channelID), {
        body: { messages: chunk },
        reason,
      })
    }
  }

  /** Delete a guild role */
  async deleteRole(guildID: BigString, roleID: BigString, reason?: string): Promise<void> {
    return await this.delete(GUILD_ROLE(guildID, roleID), {
      reason,
    })
  }

  /** Delete a stage instance */
  async deleteStageInstance(channelID: BigString): Promise<void> {
    return await this.delete(STAGE_INSTANCE(channelID))
  }

  /** Delete a webhook */
  async deleteWebhook(webhookID: BigString, token?: string, reason?: string): Promise<void> {
    return await this.delete(token ? WEBHOOK_TOKEN(webhookID, token) : WEBHOOK(webhookID), {
      reason,
    })
  }

  /** Delete a webhook message */
  async deleteWebhookMessage(webhookID: BigString, token: string, messageID: BigString): Promise<void> {
    return await this.delete(WEBHOOK_MESSAGE(webhookID, token, messageID))
  }

  /** Edit a channel's properties */
  async editChannel(channelID: BigString, options: EditChannelOptions, reason?: string): Promise<AnyGuildChannel> {
    return await this.patch(CHANNEL(channelID), {
      reason,
      body: {
        archived: options.archived,
        auto_archive_duration: options.autoArchiveDuration,
        bitrate: options.bitrate,
        default_auto_archive_duration: options.defaultAutoArchiveDuration,
        icon: options.icon,
        invitable: options.invitable,
        locked: options.locked,
        name: options.name,
        nsfw: options.nsfw,
        owner_id: options.ownerID,
        parent_id: options.parentID,
        position: options.position,
        rate_limit_per_user: options.rateLimitPerUser,
        rtc_region: options.rtcRegion,
        topic: options.topic,
        user_limit: options.userLimit,
        video_quality_mode: options.videoQualityMode,
        permission_overwrites: options.permissionOverwrites,
      },
    }).then((channel) => generateChannelFrom(channel, this) as unknown as AnyGuildChannel)
  }

  /** Create a channel permission overwrite */
  async editChannelPermission(
    channelID: BigString,
    overwriteID: BigString,
    allow: bigint | number,
    deny: bigint | number,
    type: OverwriteTypes,
    reason?: string,
  ): Promise<void> {
    return await this.put(CHANNEL_PERMISSION(channelID, overwriteID), {
      body: {
        allow: allow.toString(),
        deny: deny.toString(),
        type,
      },
      reason,
    })
  }

  /**
   * Edit a guild channel's position. Note that channel position numbers are grouped by type (category, text, voice), then sorted in ascending order (lowest number is on top).
   */
  async editChannelPosition(channelID: BigString, position: number, options: EditChannelPositionOptions = {}): Promise<void> {
    const guild = this.guilds.find((g) => g.channels.has(channelID))
    const channels = guild?.channels
    if (!channels) {
      return await Promise.reject(new Error(`Channel ${channelID} not found`))
    }

    const channel = channels.get(channelID)
    if (!channel) {
      return await Promise.reject(new Error(`Channel ${channelID} not found`))
    }
    if (channel.position === position) {
      return await Promise.resolve()
    }
    const min = Math.min(position, channel.position)
    const max = Math.max(position, channel.position)

    const positions = channels
      .filter((chan) => {
        return chan.type === channel.type && min <= chan.position && chan.position <= max && chan.id !== channelID
      })
      .sort((a, b) => a.position - b.position)

    if (position > channel.position) {
      positions.push(channel)
    } else {
      positions.unshift(channel)
    }

    return await this.patch(GUILD_CHANNELS(guild.id), {
      body: channels.array().map((channel, index) => ({
        id: channel.id,
        position: index + min,
        lock_permissions: options.lockPermissions,
        parent_id: options.parentID,
      })),
    })
  }

  /**
   * Edit multiple guild channels' positions. Note that channel position numbers are grouped by type (category, text, voice), then sorted in ascending order (lowest number is on top).
   */
  async editChannelPositions(guildID: BigString, channelPositions: ChannelPosition[]): Promise<void> {
    return await this.patch(GUILD_CHANNELS(guildID), {
      body: channelPositions.map((channelPosition) => {
        return {
          id: channelPosition.id,
          position: channelPosition.position,
          lock_permissions: channelPosition.lockPermissions,
          parent_id: channelPosition.parentID,
        }
      }),
    })
  }

  /** Edit a global application command */
  async editCommand(commandID: BigString, command: ApplicationCommandStructure) {
    if (command.name !== undefined) {
      if (command.type === 1 || command.type === undefined) {
        command.name = command.name.toLowerCase()
        if (!command.name.match(/^[\w-]{1,32}$/)) {
          throw new Error('Slash Command names must match the regular expression "^[\\w-]{1,32}$"')
        }
      }
    }
    // @ts-expect-error some eris magic at play here
    command.default_permission = command.defaultPermission
    return await this.patch(COMMAND(this.applicationId, commandID), {
      body: command,
    })
  }

  /** Edits command permissions for a specific command in a guild. */
  async editCommandPermissions(
    guildID: BigString,
    commandID: BigString,
    permissions: ApplicationCommandPermissions[],
  ): Promise<GuildApplicationCommandPermissions> {
    return await this.put(COMMAND_PERMISSIONS(this.applicationId, guildID, commandID), {
      body: permissions,
    })
  }

  /** Edit a guild */
  async editGuild(guildID: BigString, options: GuildOptions, reason?: string): Promise<Guild> {
    return await this.patch(GUILD(guildID), {
      body: {
        name: options.name,
        icon: options.icon,
        verification_level: options.verificationLevel,
        default_message_notifications: options.defaultNotifications,
        explicit_content_filter: options.explicitContentFilter,
        system_channel_id: options.systemChannelID,
        system_channel_flags: options.systemChannelFlags,
        rules_channel_id: options.rulesChannelID,
        public_updates_channel_id: options.publicUpdatesChannelID,
        preferred_locale: options.preferredLocale,
        afk_channel_id: options.afkChannelID,
        afk_timeout: options.afkTimeout,
        owner_id: options.ownerID,
        splash: options.splash,
        banner: options.banner,
        description: options.description,
        discovery_splash: options.discoverySplash,
        features: options.features,
      },
      reason,
    }).then((guild) => new Guild(guild, this))
  }

  /** Edit a guild application command */
  async editGuildCommand(guildID: BigString, commandID: BigString, command: ApplicationCommandStructure): Promise<ApplicationCommand> {
    if (command.name !== undefined) {
      if (command.type === 1 || command.type === undefined) {
        command.name = command.name.toLowerCase()
        if (!command.name.match(/^[\w-]{1,32}$/)) {
          throw new Error('Slash Command names must match the regular expression "^[\\w-]{1,32}$"')
        }
      }
    }
    // @ts-expect-error some eris magic at play here
    command.default_permission = command.defaultPermission

    return await this.patch(GUILD_COMMAND(this.applicationId, guildID, commandID), {
      body: command,
    })
  }

  /** Edit a guild's discovery data */
  async editGuildDiscovery(guildID: BigString, options: DiscoveryOptions = {}): Promise<DiscoveryMetadata> {
    return await this.patch(GUILD_DISCOVERY(guildID), {
      body: {
        primary_category_id: options.primaryCategoryID,
        keywords: options.keywords,
        emoji_discoverability_enabled: options.emojiDiscoverabilityEnabled,
      },
      reason: options.reason,
    })
  }

  /** Edit a guild emoji object */
  async editGuildEmoji(guildID: BigString, emojiID: BigString, options: { name?: string; roles?: string[] }, reason?: string): Promise<Emoji> {
    return await this.patch(GUILD_EMOJI(guildID, emojiID), {
      body: options,
      reason,
    })
  }

  /** Edit a guild integration */
  async editGuildIntegration(guildID: BigString, integrationID: BigString, options: IntegrationOptions): Promise<void> {
    return await this.patch(GUILD_INTEGRATION(guildID, integrationID), {
      body: {
        expire_behavior: options.expireBehavior,
        expire_grace_period: options.expireGracePeriod,
        enable_emoticons: options.enableEmoticons,
      },
    })
  }

  /** Edit a guild member */
  async editGuildMember(guildID: BigString, memberID: BigString, options: MemberOptions, reason?: string): Promise<Member> {
    return await this.patch(GUILD_MEMBER(guildID, memberID), {
      body: {
        roles: options.roles?.filter((roleID, index) => options.roles!.indexOf(roleID) === index),
        nick: options.nick,
        mute: options.mute,
        deaf: options.deaf,
        channel_id: options.channelID,
        communication_disabled_until: options.communicationDisabledUntil,
      },
      reason,
    })
      // @ts-expect-error some eris magic at play here
      .then((member) => new Member(member, this.guilds.get(guildID), this))
  }

  /** Edit a guild sticker */
  async editGuildSticker(guildID: BigString, stickerID: BigString, options?: EditStickerOptions, reason?: string): Promise<Sticker> {
    return await this.patch(GUILD_STICKER(guildID, stickerID), {
      body: { ...options },
      reason,
    })
  }

  /** Edit a guild template */
  async editGuildTemplate(guildID: BigString, code: string, options: GuildTemplateOptions): Promise<GuildTemplate> {
    return await this.patch(GUILD_TEMPLATE_GUILD(guildID, code), {
      body: { ...options },
    }).then((template) => new GuildTemplate(template, this))
  }

  /** Modify a guild's vanity code */
  async editGuildVanity(guildID: BigString, code: string | null) {
    return await this.patch(GUILD_VANITY_URL(guildID), {
      body: code,
    })
  }

  /** Update a user's voice state - See [caveats](https://discord.com/developers/docs/resources/guild#modify-user-voice-state-caveats) */
  async editGuildVoiceState(guildID: BigString, options: VoiceStateOptions, userID: BigString = '@me'): Promise<void> {
    return await this.patch(GUILD_VOICE_STATE(guildID, userID), {
      body: {
        channel_id: options.channelID,
        request_to_speak_timestamp: options.requestToSpeakTimestamp,
        suppress: options.suppress,
      },
    })
  }

  /** Edit a guild welcome screen */
  async editGuildWelcomeScreen(guildID: BigString, options: WelcomeScreenOptions): Promise<WelcomeScreen> {
    return await this.patch(GUILD_WELCOME_SCREEN(guildID), {
      body: {
        description: options.description,
        enabled: options.enabled,
        welcome_channels: options.welcomeChannels.map((c) => {
          return {
            channel_id: c.channelID,
            description: c.description,
            emoji_id: c.emojiID,
            emoji_name: c.emojiName,
          }
        }),
      },
    })
  }

  /** Modify a guild's widget */
  async editGuildWidget(guildID: BigString, options: Widget): Promise<Widget> {
    return await this.patch(GUILD_WIDGET(guildID), { body: { ...options } })
  }

  /** Edit a message */
  async editMessage(channelID: BigString, messageID: BigString, content: MessageContentEdit): Promise<Message> {
    if (content !== undefined) {
      if (typeof content !== 'object' || content === null) {
        content = {
          content: '' + content,
        }
      } else if (content.content !== undefined && typeof content.content !== 'string') {
        content.content = '' + content.content
      } else if (content.embed) {
        if (!content.embeds) {
          content.embeds = []
        }
        content.embeds.push(content.embed)
      }
    }

    return await this.patch(CHANNEL_MESSAGE(channelID, messageID), {
      body: {
        ...content,
        allowed_mentions: this._formatAllowedMentions(content.allowedMentions),
      },
      file: content.file,
    }).then((message) => new Message(message, this))
  }

  /** Edit a guild role */
  async editRole(guildID: BigString, roleID: BigString, options: RoleOptions, reason?: string): Promise<Role> {
    // @ts-expect-error some eris magic at play here
    options.unicode_emoji = options.unicodeEmoji

    if (options.permissions !== undefined) {
      options.permissions = options.permissions instanceof Permission ? String(options.permissions.allow) : String(options.permissions)
    }
    return await this.patch(GUILD_ROLE(guildID, roleID), {
      body: { ...options },
      reason,
    })
      // @ts-expect-error some eris magic at play here
      .then((role) => new Role(role, this.guilds.get(guildID)))
  }

  /** Edit a guild role's position. Note that role position numbers are highest on top and lowest at the bottom. */
  async editRolePosition(guildID: BigString, roleID: BigString, position: number): Promise<void> {
    if (guildID === roleID) {
      return await Promise.reject(new Error('Cannot move default role'))
    }
    // @ts-expect-error some eris magic at play here
    const roles = this.guilds.get(guildID).roles
    const role = roles.get(roleID)
    if (!role) {
      return await Promise.reject(new Error(`Role ${roleID} not found`))
    }
    if (role.position === position) {
      return await Promise.resolve()
    }
    const min = Math.min(position, role.position)
    const max = Math.max(position, role.position)
    const positions = roles
      .array()
      .filter((role) => min <= role.position && role.position <= max && role.id !== roleID)
      .sort((a, b) => a.position - b.position)
    if (position > role.position) {
      positions.push(role)
    } else {
      positions.unshift(role)
    }
    return await this.patch(GUILD_ROLES(guildID), {
      body: positions.map((role, index) => ({
        id: role.id,
        position: index + min,
      })),
    })
  }

  /** Edit properties of the bot user */
  async editSelf(options: { avatar?: string; username?: string }): Promise<ExtendedUser> {
    return await this.patch(USER('@me'), { body: { ...options } }).then((data) => new ExtendedUser(data, this))
  }

  /** Update a stage instance */
  async editStageInstance(channelID: BigString, options: StageInstanceOptions): Promise<StageInstance> {
    return await this.patch(STAGE_INSTANCE(channelID), {
      body: { ...options },
    }).then((instance) => new StageInstance(instance, this))
  }

  /**
   * Updates the bot's status on all guilds the shard is in
   */
  async editStatus(status: SelfStatus, activities: Array<ActivityPartial<BotActivityType>> | ActivityPartial<BotActivityType> = []) {
    return await Promise.all(this.shards.map(async (shard) => await shard.editStatus(status, activities)))
  }

  /** Edit a webhook */
  async editWebhook(webhookID: BigString, options: WebhookOptions, token: string, reason?: string) {
    return await this.patch(token ? WEBHOOK_TOKEN(webhookID, token) : WEBHOOK(webhookID), {
      body: {
        name: options.name,
        avatar: options.avatar,
        channel_id: options.channelID,
      },
      reason,
    })
  }

  /** Edit a webhook message */
  async editWebhookMessage(webhookID: BigString, token: string, messageID: BigString, options: MessageWebhookContent): Promise<Message> {
    const { file, allowedMentions, ...body } = options

    return await this.patch(WEBHOOK_MESSAGE(webhookID, token, messageID), {
      body: {
        ...body,
        allowed_mentions: this._formatAllowedMentions(allowedMentions),
      },
      file,
    }).then((response) => new Message(response, this))
  }

  /** Execute a slack-style webhook */
  async executeSlackWebhook(
    webhookID: BigString,
    token: string,
    options: Record<string, unknown> & { auth?: boolean; threadID?: string },
  ): Promise<void>
  async executeSlackWebhook(
    webhookID: BigString,
    token: string,
    options: Record<string, unknown> & {
      auth?: boolean
      threadID?: string
      wait: true
    },
  ): Promise<Message>
  async executeSlackWebhook(
    webhookID: BigString,
    token: string,
    options: Record<string, unknown> & {
      auth?: boolean
      threadID?: string
      wait?: true
    },
  ): Promise<unknown> {
    const { wait, threadID, ...rest } = options
    let qs = ''
    if (wait) {
      qs += '&wait=true'
    }
    if (threadID) {
      qs += '&thread_id=' + threadID
    }
    return await this.post(WEBHOOK_TOKEN_SLACK(webhookID, token) + (qs ? '?' + qs : ''), { body: { ...rest } })
  }

  /** Execute a webhook */
  async executeWebhook(webhookID: BigString, token: string, options: WebhookPayload): Promise<void>
  async executeWebhook(webhookID: BigString, token: string, options: WebhookPayload & { wait: true }): Promise<Message>
  async executeWebhook(webhookID: BigString, token: string, options: WebhookPayload & { wait?: boolean }): Promise<unknown> {
    let qs = ''
    if (options.wait) {
      qs += '&wait=true'
    }
    if (options.threadID) {
      qs += '&thread_id=' + options.threadID
    }
    if (options.embed) {
      if (!options.embeds) {
        options.embeds = []
      }
      options.embeds.push(options.embed)
    }

    return await this.post(WEBHOOK_TOKEN(webhookID, token) + (qs ? '?' + qs : ''), {
      body: {
        content: options.content,
        embeds: options.embeds,
        username: options.username,
        avatar_url: options.avatarURL,
        tts: options.tts,
        flags: options.flags,
        allowed_mentions: this._formatAllowedMentions(options.allowedMentions),
        components: options.components,
      },
      file: options.file,
    }).then((response) => (options.wait ? new Message(response, this) : undefined))
  }

  /** Follow a NewsChannel in another channel. This creates a webhook in the target channel */
  async followChannel(channelID: BigString, webhookChannelID: BigString): Promise<ChannelFollow> {
    return await this.post(CHANNEL_FOLLOW(channelID), {
      body: { webhook_channel_id: webhookChannelID },
    })
  }

  /** Get all active threads in a guild */
  async getActiveGuildThreads(guildID: BigString): Promise<ListedGuildThreads> {
    return await this.get(THREADS_GUILD_ACTIVE(guildID)).then((response) => {
      return {
        members: response.members.map((member: DiscordThreadMember) => new ThreadMember(member, this)),
        threads: response.threads.map((thread: DiscordChannel) => generateChannelFrom(thread, this)),
      }
    })
  }

  /** Get all archived threads in a channel */
  async getArchivedThreads(
    channelID: BigString,
    type: 'private',
    options?: GetArchivedThreadsOptions,
  ): Promise<ListedChannelThreads<PrivateThreadChannel>>
  async getArchivedThreads(
    channelID: BigString,
    type: 'public',
    options?: GetArchivedThreadsOptions,
  ): Promise<ListedChannelThreads<PublicThreadChannel>>
  async getArchivedThreads(channelID: BigString, type: 'private' | 'public', options: GetArchivedThreadsOptions = {}): Promise<unknown> {
    let qs = ''
    if (options.limit) {
      qs += `&limit=${options.limit}`
    }
    if (options.before) {
      qs += `&before=${options.before.toISOString()}`
    }

    return await this.get(THREADS_ARCHIVED(channelID, type) + (qs ? '?' + qs : '')).then((response) => {
      return {
        hasMore: response.has_more,
        members: response.members.map((member: DiscordThreadMember) => new ThreadMember(member, this)),
        threads: response.threads.map((thread: DiscordChannel) => generateChannelFrom(thread, this)),
      }
    })
  }

  /** Get general and bot-specific info on connecting to the Discord gateway (e.g. connection ratelimit) */
  async getBotGateway(): Promise<DiscordGetGatewayBot> {
    return await this.get(GATEWAY_BOT)
  }

  /** Get a Channel object from a channel ID */
  getChannel(channelID: BigString): AnyChannel | undefined {
    const id = channelID.toString()

    const guildID = this._channelGuildMap.get(channelID) ?? this._threadGuildMap.get(channelID)

    if (guildID) {
      const guild = this.guilds.get(guildID)
      if (guild) return guild.channels.get(channelID) as unknown as AnyChannel
    }

    return this.privateChannels.get(id)!
  }

  /** Get all invites in a channel */
  async getChannelInvites(channelID: BigString): Promise<Invite[]> {
    return await this.get(CHANNEL_INVITES(channelID)).then((invites) => invites.map((invite: DiscordInvite) => new Invite(invite, this)))
  }

  /** Get all the webhooks in a channel */
  async getChannelWebhooks(channelID: BigString): Promise<Webhook[]> {
    return await this.get(CHANNEL_WEBHOOKS(channelID))
  }

  /** Get a global application command */
  async getCommand(commandID: BigString): Promise<ApplicationCommand> {
    return await this.get(COMMAND(this.applicationId, commandID))
  }

  /** Get the a guild's application command permissions */
  async getCommandPermissions(guildID: BigString, commandID: BigString): Promise<GuildApplicationCommandPermissions> {
    return await this.get(COMMAND_PERMISSIONS(this.applicationId, guildID, commandID))
  }

  /** Get the global application commands */
  async getCommands(): Promise<ApplicationCommand[]> {
    return await this.get(COMMANDS(this.applicationId))
  }

  /** Get a list of discovery categories */
  async getDiscoveryCategories(): Promise<DiscoveryCategory[]> {
    return await this.get(DISCOVERY_CATEGORIES)
  }

  /** Get a DM channel with a user, or create one if it does not exist */
  async getDMChannel(userID: BigString): Promise<PrivateChannel> {
    if (this._privateChannelMap.has(userID)) {
      return await Promise.resolve(this.privateChannels.get(this._privateChannelMap.get(userID)!)!)
    }
    return await this.post(USER_CHANNELS('@me'), {
      body: {
        recipients: [userID],
        type: 1,
      },
    }).then((privateChannel) => new PrivateChannel(privateChannel, this))
  }

  /** Get a guild from the guild's emoji ID */
  async getEmojiGuild(emojiID: BigString): Promise<Guild> {
    return await this.get(CUSTOM_EMOJI_GUILD(emojiID)).then((result) => new Guild(result, this))
  }

  /** Get info on connecting to the Discord gateway */
  async getGateway(): Promise<{ url: string }> {
    return await this.get(GATEWAY)
  }

  /** Get the audit log for a guild */
  async getGuildAuditLog(guildID: BigString, options: GetGuildAuditLogOptions = {}): Promise<GuildAuditLog> {
    let qs = ''
    if (options.actionType) {
      qs += `&action_type=${options.actionType}`
    }
    if (options.userID) {
      qs += `&user_id=${options.userID}`
    }
    if (options.before) {
      qs += `&before=${options.before}`
    }
    if (options.limit) {
      qs += `&limit=${options.limit}`
    }

    return await this.get(GUILD_AUDIT_LOGS(guildID) + (qs ? '?' + qs : '')).then((data) => {
      const guild = this.guilds.get(guildID)
      const users = data.users.map((u: DiscordUser) => {
        const user = new User(u, this)
        this.users.set(user.id, user)
        return user
      })

      const threads = data.threads.map((thread: DiscordChannel) => {
        const channel = generateChannelFrom(thread, this) as unknown as ThreadChannel
        guild?.threads.set(channel.id, channel)
        return channel
      })

      return {
        entries: guild ? data.audit_log_entries.map((entry: DiscordAuditLogEntry) => new GuildAuditLogEntry(entry, guild)) : [],
        integrations: guild ? data.integrations.map((integration: DiscordIntegration) => new GuildIntegration(integration, guild)) : [],
        threads,
        users,
        webhooks: data.webhooks,
      }
    })
  }

  /** Get a ban from the ban list of guild */
  async getGuildBan(guildID: BigString, userID: BigString): Promise<GuildBan> {
    return await this.get(GUILD_BAN(guildID, userID)).then((ban) => {
      ban.user = new User(ban.user, this)
      return ban
    })
  }

  /** Get the ban list of a guild */
  async getGuildBans(guildID: BigString, options: GetGuildBansOptions = {}): Promise<GuildBan[]> {
    let qs = ''
    if (options.after) {
      qs += `&after=${options.after}`
    }
    if (options.before) {
      qs += `&before=${options.before}`
    }
    if (options.limit) {
      qs += `&limit=${options.limit && Math.min(options.limit, 1000)}`
    }

    const bans = await this.get(GUILD_BANS(guildID) + (qs ? '?' + qs : ''))

    for (const ban of bans) {
      const user = new User(ban.user, this)
      this.users.set(user.id, user)
      ban.user = user
    }

    if (options.limit && options.limit > 1000 && bans.length >= 1000) {
      const page = await this.getGuildBans(guildID, {
        after: options.before ? undefined : bans[bans.length - 1].user.id,
        before: options.before ? bans[0].user.id : undefined,
        limit: options.limit - bans.length,
      })

      if (options.before) {
        bans.unshift(...page)
      } else {
        bans.push(...page)
      }
    }

    return bans
  }

  /** Get a guild application command */
  async getGuildCommand(guildID: BigString, commandID: BigString): Promise<ApplicationCommand> {
    return await this.get(GUILD_COMMAND(this.applicationId, guildID, commandID))
  }

  /** Get the all of a guild's application command permissions */
  async getGuildCommandPermissions(guildID: BigString): Promise<GuildApplicationCommandPermissions[]> {
    return await this.get(GUILD_COMMAND_PERMISSIONS(this.applicationId, guildID))
  }

  /** Get a guild's application commands */
  async getGuildCommands(guildID: BigString): Promise<ApplicationCommand> {
    return await this.get(GUILD_COMMANDS(this.applicationId, guildID))
  }

  /** Get a guild's discovery object */
  async getGuildDiscovery(guildID: BigString): Promise<DiscoveryMetadata> {
    return await this.get(GUILD_DISCOVERY(guildID))
  }

  /** Get a list of integrations for a guild */
  async getGuildIntegrations(guildID: BigString): Promise<GuildIntegration[]> {
    const guild = this.guilds.get(guildID)
    return await this.get(GUILD_INTEGRATIONS(guildID)).then((integrations) => {
      return guild ? integrations.map((integration: DiscordIntegration) => new GuildIntegration(integration, guild)) : []
    })
  }

  /** Get all invites in a guild */
  async getGuildInvites(guildID: BigString): Promise<Invite[]> {
    return await this.get(GUILD_INVITES(guildID)).then((invites) => invites.map((invite: DiscordInvite) => new Invite(invite, this)))
  }

  /** Get a guild preview for a guild. Only available for community guilds. */
  async getGuildPreview(guildID: BigString): Promise<GuildPreview> {
    return await this.get(GUILD_PREVIEW(guildID)).then((data) => new GuildPreview(data, this))
  }

  /** Get a guild template */
  async getGuildTemplate(code: string): Promise<GuildTemplate> {
    return await this.get(GUILD_TEMPLATE(code)).then((template) => new GuildTemplate(template, this))
  }

  /** Get a guild's templates */
  async getGuildTemplates(guildID: BigString): Promise<GuildTemplate[]> {
    return await this.get(GUILD_TEMPLATES(guildID)).then((templates) => templates.map((t: DiscordTemplate) => new GuildTemplate(t, this)))
  }

  /** Returns the vanity url of the guild */
  async getGuildVanity(guildID: BigString): Promise<GuildVanity> {
    return await this.get(GUILD_VANITY_URL(guildID))
  }

  /** Get all the webhooks in a guild */
  async getGuildWebhooks(guildID: BigString): Promise<Webhook[]> {
    return await this.get(GUILD_WEBHOOKS(guildID))
  }

  /** Get the welcome screen of a Community guild, shown to new members */
  async getGuildWelcomeScreen(guildID: BigString): Promise<WelcomeScreen> {
    return await this.get(GUILD_WELCOME_SCREEN(guildID))
  }

  /** Get a guild's widget object */
  async getGuildWidget(guildID: BigString): Promise<WidgetData> {
    return await this.get(GUILD_WIDGET(guildID))
  }

  /** Get a guild's widget settings object. Requires MANAGE_GUILD permission */
  async getGuildWidgetSettings(guildID: BigString): Promise<Widget> {
    return await this.get(GUILD_WIDGET_SETTINGS(guildID))
  }

  /** Get info on an invite */
  async getInvite(inviteID: string, withCounts?: boolean): Promise<Invite> {
    let qs = ''
    if (withCounts) {
      qs += '&with_counts=true'
    }

    return await this.get(INVITE(inviteID) + (qs ? '?' + qs : '')).then((invite) => new Invite(invite, this))
  }

  /** Get joined private archived threads in a channel */
  async getJoinedPrivateArchivedThreads(
    channelID: BigString,
    options: GetArchivedThreadsOptions = {},
  ): Promise<ListedChannelThreads<PrivateThreadChannel>> {
    let qs = ''
    if (options.before) {
      qs += `&before=${options.before.toISOString()}`
    }

    if (options.limit) {
      qs += `&limit=${options.limit}`
    }

    return await this.get(THREADS_ARCHIVED_JOINED(channelID) + (qs ? '?' + qs : '')).then((response) => {
      return {
        hasMore: response.has_more,
        members: response.members.map((member: DiscordThreadMember) => new ThreadMember(member, this)),
        threads: response.threads.map((thread: DiscordChannel) => generateChannelFrom(thread, this)),
      }
    })
  }

  /** Get a previous message in a channel */
  async getMessage(channelID: BigString, messageID: BigString): Promise<Message> {
    return await this.get(CHANNEL_MESSAGE(channelID, messageID)).then((message) => new Message(message, this))
  }

  /** Get a list of users who reacted with a specific reaction */
  async getMessageReaction(channelID: BigString, messageID: BigString, reaction: string, options: GetMessageReactionOptions = {}): Promise<User[]> {
    if (reaction === decodeURI(reaction)) {
      reaction = encodeURIComponent(reaction)
    }
    if (!options || typeof options !== 'object') {
      options = {
        limit: options,
      }
    }

    let qs = ''
    if (options.limit) {
      qs += `&limit=${options.limit}`
    }
    if (options.after) {
      qs += `&after=${options.after}`
    }

    return await this.get(CHANNEL_MESSAGE_REACTION(channelID, messageID, reaction) + (qs ? '?' + qs : '')).then((users) =>
      users.map((user: DiscordUser) => new User(user, this)),
    )
  }

  /** Get previous messages in a channel */
  async getMessages(channelID: BigString, options: GetMessagesOptions = {}): Promise<Message[]> {
    if (!options || typeof options !== 'object') {
      options = {
        limit: options,
      }
    }
    if (options.limit === undefined) {
      // Legacy behavior
      options.limit = 50
    }

    let limit = options.limit
    if (limit && limit > 100) {
      let logs: Message[] = []
      const get: (_before?: BigString, _after?: BigString) => Promise<Message[]> = async (_before?: BigString, _after?: BigString) => {
        let qs = ''
        qs += `&limit=${100}`
        if (_before) qs += `&before=${_before}`
        if (_after) qs += `&after=${_after}`

        const messages = await this.get(CHANNEL_MESSAGES(channelID) + (qs ? '?' + qs : ''))
        if (limit <= messages.length) {
          return _after
            ? messages
                .slice(messages.length - limit, messages.length)
                .map((message: DiscordMessage) => new Message(message, this))
                .concat(logs)
            : logs.concat(messages.slice(0, limit).map((message: DiscordMessage) => new Message(message, this)))
        }

        limit -= messages.length
        logs = _after
          ? messages.map((message: DiscordMessage) => new Message(message, this)).concat(logs)
          : logs.concat(messages.map((message: DiscordMessage) => new Message(message, this)))
        if (messages.length < 100) {
          return logs
        }

        this.emit('debug', `Getting ${limit} more messages during getMessages for ${channelID}: ${_before} ${_after}`, -1)

        return await get((_before ?? !_after) && messages[messages.length - 1].id, _after && messages[0].id)
      }

      // @ts-expect-error todo use typeguards here
      return await get(options.before, options.after)
    }

    const messages = await this.get(CHANNEL_MESSAGES(channelID))
    return messages.map((message: DiscordMessage) => {
      try {
        return new Message(message, this)
      } catch (err: any) {
        this.emit('error', `Error creating message from channel messages\n${err.stack}\n${JSON.stringify(messages)}`)
        return null
      }
    })
  }

  /** Get the list of sticker packs available to Nitro subscribers */
  async getNitroStickerPacks(): Promise<{ sticker_packs: StickerPack[] }> {
    return await this.get(STICKER_PACKS)
  }

  /** Get data on an OAuth2 application */
  async getOAuthApplication(appID: BigString): Promise<OAuthApplicationInfo> {
    return await this.get(OAUTH2_APPLICATION(appID || '@me'))
  }

  /** Get all the pins in a channel */
  async getPins(channelID: BigString): Promise<Message[]> {
    return await this.get(CHANNEL_PINS(channelID)).then((messages) => messages.map((message: DiscordMessage) => new Message(message, this)))
  }

  /** Get the prune count for a guild */
  async getPruneCount(guildID: BigString, options: GetPruneOptions = {}): Promise<number> {
    let qs = ''
    if (options.days) {
      qs += `&days=${options.days}`
    }
    // TODO: how to put array in query string
    if (options.includeRoles) {
      qs += `&include_roles=${options.includeRoles}`
    }

    return await this.get(GUILD_PRUNE(guildID) + (qs ? '?' + qs : '')).then((data) => data.pruned)
  }

  /** Get a channel's data via the REST API. */
  async getRESTChannel(channelID: BigString): Promise<AnyChannel> {
    return await this.get(CHANNEL(channelID)).then((channel: DiscordChannel) => generateChannelFrom(channel, this))
  }

  /** Get a guild's data via the REST API. */
  async getRESTGuild(guildID: BigString, withCounts = false): Promise<Guild> {
    let qs = ''
    if (withCounts) {
      qs += `&with_conts=${withCounts}`
    }

    return await this.get(GUILD(guildID) + (qs ? '?' + qs : '')).then((guild) => new Guild(guild, this))
  }

  /** Get a guild's channels via the REST API. */
  async getRESTGuildChannels(guildID: BigString): Promise<AnyGuildChannel[]> {
    return await this.get(GUILD_CHANNELS(guildID)).then((channels) => channels.map((channel: DiscordChannel) => generateChannelFrom(channel, this)))
  }

  /** Get a guild emoji via the REST API. */
  async getRESTGuildEmoji(guildID: BigString, emojiID: BigString): Promise<Emoji> {
    return await this.get(GUILD_EMOJI(guildID, emojiID))
  }

  /** Get a guild's emojis via the REST API. */
  async getRESTGuildEmojis(guildID: BigString): Promise<Emoji[]> {
    return await this.get(GUILD_EMOJIS(guildID))
  }

  /** Get a guild's members via the REST API. */
  async getRESTGuildMember(guildID: BigString, memberID: BigString): Promise<Member> {
    return await this.get(GUILD_MEMBER(guildID, memberID)).then(
      (member: DiscordMemberWithUser) => new Member(member, this.guilds.get(guildID)!, this),
    )
  }

  /** Get a guild's members via the REST API. */
  async getRESTGuildMembers(guildID: BigString, options: GetRESTGuildMembersOptions = {}): Promise<Member[]> {
    if (!options || typeof options !== 'object') {
      options = {
        limit: options,
      }
    }
    let qs = ''

    if (options.limit) {
      qs += `&limit=${options.limit}`
    }
    if (options.after) {
      qs += `&after=${options.after}`
    }

    return await this.get(GUILD_MEMBERS(guildID) + (qs ? '?' + qs : '')).then((members) =>
      members.map((member: DiscordMemberWithUser) => new Member(member, this.guilds.get(guildID)!, this)),
    )
  }

  /** Get a guild's roles via the REST API. */
  async getRESTGuildRoles(guildID: BigString): Promise<Role[]> {
    return await this.get(GUILD_ROLES(guildID)).then((roles) => roles.map((role: DiscordRole) => new Role(role, this.guilds.get(guildID)!)))
  }

  /** Get a list of the user's guilds via the REST API. */
  async getRESTGuilds(options: GetRESTGuildsOptions = {}) {
    if (!options || typeof options !== 'object') {
      options = {
        limit: options,
      }
    }
    let qs = ''
    if (options.after) {
      qs += `&after=${options.after}`
    }
    if (options.before) {
      qs += `&before=${options.before}`
    }
    if (options.limit) {
      qs += `&limit=${options.limit}`
    }

    return await this.get(USER_GUILDS('@me') + (qs ? '?' + qs : '')).then((guilds) => guilds.map((guild: DiscordGuild) => new Guild(guild, this)))
  }

  /** Get a guild sticker via the REST API. */
  async getRESTGuildSticker(guildID: BigString, stickerID: BigString): Promise<Sticker> {
    return await this.get(GUILD_STICKER(guildID, stickerID))
  }

  /** Get a guild's stickers via the REST API. */
  async getRESTGuildStickers(guildID: BigString): Promise<Sticker[]> {
    return await this.get(GUILD_STICKERS(guildID))
  }

  /** Get a sticker via the REST API. */
  async getRESTSticker(stickerID: BigString): Promise<Sticker> {
    return await this.get(STICKER(stickerID))
  }

  /** Get a user's data via the REST API. */
  async getRESTUser(userID: BigString): Promise<User> {
    return await this.get(USER(userID)).then((user) => new User(user, this))
  }

  /** Get properties of the bot user */
  async getSelf(): Promise<ExtendedUser> {
    return await this.get(USER('@me')).then((data) => new ExtendedUser(data, this))
  }

  /** Get the stage instance associated with a stage channel */
  async getStageInstance(channelID: BigString): Promise<StageInstance> {
    return await this.get(STAGE_INSTANCE(channelID)).then((instance) => new StageInstance(instance, this))
  }

  /** Get a list of members that are part of a thread channel */
  async getThreadMembers(channelID: BigString): Promise<ThreadMember[]> {
    return await this.get(THREAD_MEMBERS(channelID)).then((members) => members.map((member: DiscordThreadMember) => new ThreadMember(member, this)))
  }

  /** Get a list of general/guild-specific voice regions */
  async getVoiceRegions(guildID: BigString): Promise<VoiceRegion[]> {
    return guildID ? await this.get(GUILD_VOICE_REGIONS(guildID)) : await this.get(VOICE_REGIONS)
  }

  /** Get a webhook */
  async getWebhook(webhookID: BigString, token: string): Promise<Webhook> {
    return await this.get(token ? WEBHOOK_TOKEN(webhookID, token) : WEBHOOK(webhookID))
  }

  /** Get a webhook message */
  async getWebhookMessage(webhookID: BigString, token: string, messageID: BigString): Promise<Message> {
    return await this.get(WEBHOOK_MESSAGE(webhookID, token, messageID)).then((message) => new Message(message, this))
  }

  /** Join a thread */
  async joinThread(channelID: BigString, userID: BigString = '@me'): Promise<void> {
    return await this.put(THREAD_MEMBER(channelID, userID))
  }

  /** Kick a user from a guild */
  async kickGuildMember(guildID: BigString, userID: BigString, reason?: string): Promise<void> {
    return await this.delete(GUILD_MEMBER(guildID, userID), {
      reason,
    })
  }

  /** Leave a guild */
  async leaveGuild(guildID: BigString): Promise<void> {
    return await this.delete(USER_GUILD('@me', guildID))
  }

  /** Leave a thread */
  async leaveThread(channelID: BigString, userID: BigString = '@me'): Promise<void> {
    return await this.delete(THREAD_MEMBER(channelID, userID))
  }

  /** Pin a message */
  async pinMessage(channelID: BigString, messageID: BigString): Promise<void> {
    return await this.put(CHANNEL_PIN(channelID, messageID))
  }

  /** Begin pruning a guild */
  async pruneMembers(guildID: BigString, options: PruneMemberOptions = {}): Promise<number> {
    return await this.post(GUILD_PRUNE(guildID), {
      body: {
        days: options.days,
        compute_prune_count: options.computePruneCount,
        include_roles: options.includeRoles,
      },
      reason: options.reason,
    }).then((data) => data.pruned)
  }

  /** Purge previous messages in a channel with an optional filter (bot accounts only) */
  async purgeChannel(channelID: BigString, options: PurgeChannelOptions): Promise<number> {
    let limit = options.limit
    if (limit !== -1 && limit <= 0) {
      return 0
    }
    const toDelete: BigString[] = []
    let deleted = 0
    let done = false
    const checkToDelete: () => Promise<number> = async () => {
      const messageIDs = (done && toDelete) || (toDelete.length >= 100 && toDelete.splice(0, 100))
      if (messageIDs) {
        deleted += messageIDs.length
        await this.deleteMessages(channelID, messageIDs, options.reason)
        if (done) {
          return deleted
        }
        await delay(1000)
        return await checkToDelete()
      } else if (done) {
        return deleted
      } else {
        await delay(250)
        return await checkToDelete()
      }
    }
    const del = async (_before?: BigString, _after?: BigString) => {
      const messages = await this.getMessages(channelID, {
        limit: 100,
        before: _before?.toString(),
        after: _after?.toString(),
      })
      if (limit !== -1 && limit <= 0) {
        done = true
        return
      }
      for (const message of messages) {
        if (limit !== -1 && limit <= 0) {
          break
        }
        if (message.timestamp < Date.now() - 1209600000) {
          // 14d * 24h * 60m * 60s * 1000ms
          done = true
          return
        }
        if (!options.filter || options.filter(message)) {
          toDelete.push(message.id)
        }
        if (limit !== -1) {
          limit--
        }
      }
      if ((limit !== -1 && limit <= 0) || messages.length < 100) {
        done = true
        return
      }
      await del(_before ?? !_after ? messages[messages.length - 1].id : undefined, _after ? messages[0].id : undefined)
    }
    await del(options.before, options.after)
    return await checkToDelete()
  }

  /** Remove a role from a guild member */
  async removeGuildMemberRole(guildID: BigString, memberID: BigString, roleID: BigString, reason?: string): Promise<void> {
    return await this.delete(GUILD_MEMBER_ROLE(guildID, memberID, roleID), {
      reason,
    })
  }

  /** Remove a reaction from a message */
  async removeMessageReaction(channelID: BigString, messageID: BigString, reaction: string, userID?: BigString): Promise<void> {
    if (reaction === decodeURI(reaction)) {
      reaction = encodeURIComponent(reaction)
    }
    return await this.delete(CHANNEL_MESSAGE_REACTION_USER(channelID, messageID, reaction, userID ?? '@me'))
  }

  /** Remove all reactions from a message for a single emoji. */
  async removeMessageReactionEmoji(channelID: BigString, messageID: BigString, reaction: string): Promise<void> {
    if (reaction === decodeURI(reaction)) {
      reaction = encodeURIComponent(reaction)
    }
    return await this.delete(CHANNEL_MESSAGE_REACTION(channelID, messageID, reaction))
  }

  /** Remove all reactions from a message */
  async removeMessageReactions(channelID: BigString, messageID: BigString): Promise<void> {
    return await this.delete(CHANNEL_MESSAGE_REACTIONS(channelID, messageID))
  }

  /** Search for guild members by partial nickname/username */
  async searchGuildMembers(guildID: BigString, query: string, limit?: number): Promise<Member[]> {
    let qs = `?query=${query}`
    if (limit) {
      qs += `?limit=${limit}`
    }

    return await this.get(GUILD_MEMBERS_SEARCH(guildID) + qs).then((members) => {
      const guild = this.guilds.get(guildID)

      return guild ? members.map((member: DiscordMemberWithUser) => new Member(member, guild, this)) : []
    })
  }

  /** Send typing status in a channel */
  async sendChannelTyping(channelID: BigString): Promise<void> {
    return await this.post(CHANNEL_TYPING(channelID))
  }

  /** Force a guild integration to sync */
  async syncGuildIntegration(guildID: BigString, integrationID: BigString): Promise<void> {
    return await this.post(GUILD_INTEGRATION_SYNC(guildID, integrationID))
  }

  /** Force a guild template to sync */
  async syncGuildTemplate(guildID: BigString, code: string): Promise<GuildTemplate> {
    return await this.put(GUILD_TEMPLATE_GUILD(guildID, code)).then((template) => new GuildTemplate(template, this))
  }

  /** Unban a user from a guild */
  async unbanGuildMember(guildID: BigString, userID: BigString, reason?: string): Promise<void> {
    return await this.delete(GUILD_BAN(guildID, userID), {
      reason,
    })
  }

  /** Unpin a message */
  async unpinMessage(channelID: BigString, messageID: BigString): Promise<void> {
    return await this.delete(CHANNEL_PIN(channelID, messageID))
  }

  /** Validate discovery search term */
  async validateDiscoverySearchTerm(term: string): Promise<{ valid: boolean }> {
    return await this.get(DISCOVERY_VALIDATION + `?term=${encodeURI(term)}`)
  }

  /** Converts the easy to type allowed mentions to the format discord requires. */
  _formatAllowedMentions(allowed?: AllowedMentions): DiscordAllowedMentions {
    if (!allowed) {
      return this.options.allowedMentions
    }
    const result: DiscordAllowedMentions = {}
    result.parse = []

    if (allowed.everyone) {
      result.parse.push(AllowedMentionsTypes.EveryoneMentions)
    }
    if (allowed.roles === true) {
      result.parse.push(AllowedMentionsTypes.RoleMentions)
    } else if (Array.isArray(allowed.roles)) {
      if (allowed.roles.length > 100) {
        throw new Error('Allowed role mentions cannot exceed 100.')
      }
      result.roles = allowed.roles
    }
    if (allowed.users === true) {
      result.parse.push(AllowedMentionsTypes.UserMentions)
    } else if (Array.isArray(allowed.users)) {
      if (allowed.users.length > 100) {
        throw new Error('Allowed user mentions cannot exceed 100.')
      }
      result.users = allowed.users
    }
    if (allowed.repliedUser !== undefined) {
      result.replied_user = allowed.repliedUser
    }
    return result
  }

  _formatImage(url: string, format?: ImageFormat, size?: ImageSize): string {
    if (!format) {
      format = url.includes('/a_') ? 'gif' : this.options.defaultImageFormat
    }

    if (!size) {
      size = this.options.defaultImageSize
    }
    return `${this.CDN_URL}${url}.${format}?size=${size}`
  }

  /** Converts a snowflake(discord id) into a timestamp. */
  snowflakeToTimestamp(snowflake: BigString): number {
    return Number(BigInt(snowflake) / 4194304n + 1420070400000n)
  }

  /** Get the bot id from the bot token. WARNING: Discord staff has mentioned this may not be stable forever. Use at your own risk. However, note for over 5 years this has never broken. */
  getBotIdFromToken(token: string): string {
    return getBotIdFromToken(token).toString()
  }

  /** Convert a icon hash into a bigint. */
  iconHashToBigInt(hash: string): bigint {
    return iconHashToBigInt(hash)
  }

  /** Convert a icon bigint back into a hash. */
  iconBigintToHash(icon: bigint): string {
    return iconBigintToHash(icon)
  }

  /** Splits a large array into chunks of smaller arrays */
  chunkArray<T>(array: T[], size = 100): T[][] {
    const box: T[][] = []
    while (array.length > box.length) {
      box.push(array.splice(0, 100))
    }

    return box
  }

  toString() {
    return `[Client ${this.id}]`
  }

  toJSON(props: string[] = []): Record<string, any> {
    // TODO: Update this after Client is done
    return Base.prototype.toJSON.call(this, [
      'application',
      'bot',
      'channelGuildMap',
      'gatewayURL',
      'groupChannels',
      'guilds',
      'guildShardMap',
      'lastConnect',
      'lastReconnectDelay',
      'notes',
      'options',
      'presence',
      'privateChannelMap',
      'privateChannels',
      'ready',
      'reconnectAttempts',
      'relationships',
      'requestHandler',
      'shards',
      'startTime',
      'unavailableGuilds',
      'userGuildSettings',
      'users',
      'userSettings',
      'voiceConnections',
      ...props,
    ])
  }

  // Typescript is not so good as we developers so we need this little utility function to help it out
  // Taken from https://fettblog.eu/typescript-hasownproperty/
  /** TS save way to check if a property exists in an object */
  hasProperty<T extends {}, Y extends PropertyKey = string, Z = unknown>(obj: T, prop: Y): obj is T & Record<Y, Z> {
    return obj.hasOwnProperty(prop)
  }

  /** A typeguard that tells whether a member has the user property or not. */
  isDiscordMemberWithUser(member: DiscordMember | DiscordMemberWithUser): member is DiscordMemberWithUser {
    return this.hasProperty(member, 'user')
  }

  /** Removes properties from a Structure you don't want. For example, if your bot does not need Channel.topic you can remove it. */
  removeProperties<
    T extends
      | typeof Member
      | typeof NewsThreadChannel
      | typeof PrivateThreadChannel
      | typeof PublicThreadChannel
      | typeof ThreadChannel
      | typeof CategoryChannel
      | typeof Channel
      | typeof GuildChannel
      | typeof NewsChannel
      | typeof PrivateChannel
      | typeof StageChannel
      | typeof TextChannel
      | typeof TextVoiceChannel
      | typeof VoiceChannel
      | typeof GuildAuditLogEntry
      | typeof Guild
      | typeof GuildIntegration
      | typeof Member
      | typeof GuildPreview
      | typeof Role
      | typeof StageInstance
      | typeof GuildTemplate
      | typeof UnavailableGuild
      | typeof VoiceState
      | typeof AutocompleteInteraction
      | typeof CommandInteraction
      | typeof ComponentInteraction
      | typeof Interaction
      | typeof PingInteraction
      | typeof UnknownInteraction
      | typeof ExtendedUser
      | typeof User
      | typeof Invite
      | typeof Message
      | typeof Permission
      | typeof PermissionOverwrite,
  >(obj: T, props: string[]): this {
    for (const prop of props) {
      Object.defineProperty(obj.prototype, prop, {
        // In case the user tries to use this property after having removed it.
        get() {
          throw new Error(`${obj.constructor.name}.${prop} was removed with Client.removeProperties().`)
        },
        // {} makes noop so it will NOT set any values even internally
        set() {},
      })
    }

    return this
  }
}

export default Client

export interface ClientOptions {
  /** The default allowed mentions you would like to use. */
  allowedMentions?: AllowedMentions
  /** The default image format you would like to use. */
  defaultImageFormat?: ImageFormat
  /** The default image size you would like to use. */
  defaultImageSize?: ImageSize
  /** The message limit you would like to set. */
  messageLimit?: number
  /** The api version you would like to use. */
  apiVersion?: ApiVersions
  /** The url to the REST proxy to send requests to. This url should nly include the initial domain:port portion until api/v.... */
  proxyURL?: string
  /** The password/authorization to confirm that these request made to your rest proxy are indeed from you and not a hacker. */
  proxyRestAuthorization?: string
  /** The application id(NOT the bot id). The bot id and application id are the same for newer bots but older bots have different ids. */
  applicationId?: BigString
  /** Whether or not to seed voice connections. */
  seedVoiceConnections?: boolean
  /** The concurrency to use when starting the bot. */
  shardConcurrency?: 'auto' | number
  /** How many shards to use max. */
  maxShards?: 'auto' | number
  /** Whether or not to enable websocket compression. NOT REcOMMENDED. */
  compress?: boolean
  /** The first shard id to use. */
  firstShardID?: number
  /** The last shard id to use. */
  lastShardID?: number
  /** How many times to attempt resuming. */
  maxResumeAttempts?: number
  /** The intents to use when connection to gateway. */
  intents?: GatewayIntents | number | Array<IntentStrings | number>
  /** Whether or not to automatically reconnect to gateway. */
  autoreconnect?: boolean
  /**
   * How long in milliseconds to wait for a GUILD_CREATE before "ready" is fired. Increase this value if you notice missing guilds
   * @default 2000
   */
  guildCreateTimeout?: number
  /** Handler to determine how many milliseconds to wait before reconnecting. */
  reconnectDelay?: (lastDelay: number, attempts: number) => Promise<number> | number
}

export interface ParsedClientOptions {
  /** The discord api version to use. */
  apiVersion: ApiVersions
  /** Allowed mentions */
  allowedMentions: DiscordAllowedMentions
  /** The image format to use by default. */
  defaultImageFormat: ImageFormat
  /** The image size to use by default. */
  defaultImageSize: ImageSize
  /** The url to the REST proxy to send requests to. This url should nly include the initial domain:port portion until api/v.... */
  proxyURL?: string
  /** The password/authorization to confirm that these request made to your rest proxy are indeed from you and not a hacker. */
  proxyRestAuthorization?: string
  /** The application id(NOT the bot id). The bot id and application id are the same for newer bots but older bots have different ids. */
  applicationId: BigString
  /** The message limit you would like to set. */
  messageLimit?: number
  /** Whether or not to seed voice connections */
  seedVoiceConnections: boolean
  /** The max concurrency for the bot */
  shardConcurrency: 'auto' | number
  /** How many shards to use as max */
  maxShards: 'auto' | number
  /** Whether or not to enable websocket compression. NOT REcOMMENDED. */
  compress: boolean
  /** The first shard id to use. */
  firstShardID: number
  /** The last shard id to use. */
  lastShardID?: number
  /** How many times to attempt resuming. */
  maxResumeAttempts: number
  /** The intents to use when connection to gateway. */
  intents: GatewayIntents
  /** Whether or not to automatically reconnect to gateway. */
  autoreconnect: boolean
  /** How long in milliseconds to wait for a GUILD_CREATE before "ready" is fired. Increase this value if you notice missing guilds */
  guildCreateTimeout: number
  /** Handler to determine how many milliseconds to wait before reconnecting. */
  reconnectDelay: (lastDelay: number, attempts: number) => Promise<number> | number
}

// TODO: Switch bigstring to dd version in next dd release.
/** A union type of string or bigint to help make it easier for users to switch between one another. */
export type BigString = bigint | string
/** The API versions that are supported. */
export type ApiVersions = 10
/** The sizes for images that are supported. */
export type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096
/** The formats for images that are supported. */
export type ImageFormat = 'jpg' | 'jpeg' | 'png' | 'webp' | 'gif'
/** The methods that are acceptable for REST. */
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface RequestData {
  /** The method which should be used to send this request. */
  method: RequestMethod
  /** The url to send this request to. */
  url: string
  /** The headers you can send which will override internal headers or add others ones. */
  headers?: Record<string, string>
  /** The reason to add to the audit logs for this request. */
  reason?: string
  /** The payload this request should send. */
  body?: Record<string, unknown> | string | null | any[]
  /** The file contents that should be sent in this request. */
  file?: FileContent | FileContent[]
}
