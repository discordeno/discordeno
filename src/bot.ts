import {
  calculateChannelOverwrites,
  calculateBasePermissions,
  getCached,
  hasChannelPermissions,
  hasGuildPermissions,
  validatePermissions,
  getMissingChannelPermissions,
  getMissingGuildPermissions,
  requireGuildPermissions,
  requireChannelPermissions,
  highestRole,
  higherRolePosition,
} from "./util/permissions.ts";
import { getGatewayBot } from "./helpers/misc/get_gateway_bot.ts";
import { checkRateLimits } from "./rest/check_rate_limits.ts";
import { cleanupQueues } from "./rest/cleanup_queues.ts";
import { createRequestBody } from "./rest/create_request_body.ts";
import { processRateLimitedPaths } from "./rest/process_rate_limited_paths.ts";
import { processRequest } from "./rest/process_request.ts";
import { processRequestHeaders } from "./rest/process_request_headers.ts";
import type { RestPayload, RestRateLimitedPath, RestRequest } from "./rest/rest.ts";
import { runMethod } from "./rest/run_method.ts";
import { simplifyUrl } from "./rest/simplify_url.ts";
import { DiscordGatewayIntents } from "./types/gateway/gateway_intents.ts";
import { GetGatewayBot } from "./types/gateway/get_gateway_bot.ts";
import { dispatchRequirements } from "./util/dispatch_requirements.ts";
import { processQueue } from "./rest/process_queue.ts";
import { bigintToSnowflake, snowflakeToBigint } from "./util/bigint.ts";
import { Collection } from "./util/collection.ts";
import type { DiscordenoMember, DiscordenoUser } from "./transformers/member.ts";
import { transformMember, transformUser } from "./transformers/member.ts";
import { SnakeCasedPropertiesDeep } from "./types/util.ts";
import { Channel } from "./types/channels/channel.ts";
import { DiscordenoChannel, transformChannel } from "./transformers/channel.ts";
import { DiscordenoVoiceState, transformVoiceState } from "./transformers/voice_state.ts";
import { transformRole } from "./transformers/role.ts";
import { transformMessage } from "./transformers/message.ts";
import { DiscordenoGuild, transformGuild } from "./transformers/guild.ts";
import type { DiscordenoShard } from "./ws/ws.ts";
import { startGateway } from "./ws/start_gateway.ts";
import { spawnShards } from "./ws/spawn_shards.ts";
import { createShard } from "./ws/create_shard.ts";
import { identify } from "./ws/identify.ts";
import { heartbeat } from "./ws/heartbeat.ts";
import { resharder } from "./ws/resharder.ts";
import { tellClusterToIdentify } from "./ws/tell_cluster_to_identify.ts";
import { log } from "./ws/events.ts";
import { handleOnMessage } from "./ws/handle_on_message.ts";
import { closeWS } from "./ws/close_ws.ts";
import { sendShardMessage } from "./ws/send_shard_message.ts";
import { resume } from "./ws/resume.ts";
import { calculateShardId } from "./util/calculate_shard_id.ts";
import {
  baseEndpoints,
  CHANNEL_MENTION_REGEX,
  CONTEXT_MENU_COMMANDS_NAME_REGEX,
  DISCORDENO_VERSION,
  DISCORD_SNOWFLAKE_REGEX,
  endpoints,
  SLASH_COMMANDS_NAME_REGEX,
  USER_AGENT,
} from "./util/constants.ts";
import { GatewayDispatchEventNames, GatewayEventNames, GatewayPayload } from "./types/gateway/gateway_payload.ts";
import { delay, validateSlashOptionChoices, validateSlashOptions } from "./util/utils.ts";
import { iconBigintToHash, iconHashToBigInt } from "./util/hash.ts";
import { validateLength } from "./util/validate_length.ts";
import { processGlobalQueue } from "./rest/process_global_queue.ts";
import { ChannelPinsUpdate } from "./types/channels/channel_pins_update.ts";
import { ApplicationCommandTypes, Emoji } from "./types/mod.ts";
import { ApplicationCommandOption } from "./types/mod.ts";
import { handleGuildLoaded } from "./handlers/guilds/GUILD_LOADED_DD.ts";
import {
  handleReady,
  handleChannelCreate,
  handleChannelDelete,
  handleChannelPinsUpdate,
  handleChannelUpdate,
  handleThreadCreate,
  handleThreadUpdate,
  handleThreadDelete,
  handleThreadListSync,
  handleThreadMemberUpdate,
  handleThreadMembersUpdate,
  handleStageInstanceCreate,
  handleStageInstanceUpdate,
  handleStageInstanceDelete,
  handleGuildBanAdd,
  handleGuildBanRemove,
  handleGuildCreate,
  handleGuildDelete,
  handleGuildEmojisUpdate,
  handleGuildIntegrationsUpdate,
  handleGuildMemberAdd,
  handleGuildMemberRemove,
  handleGuildMemberUpdate,
  handleGuildMembersChunk,
  handleGuildRoleCreate,
  handleGuildRoleDelete,
  handleGuildRoleUpdate,
  handleGuildUpdate,
  handleInteractionCreate,
  handleInviteCreate,
  handleMessageCreate,
  handleMessageDeleteBulk,
  handleMessageDelete,
  handleMessageReactionAdd,
  handleMessageReactionRemoveAll,
  handleMessageReactionRemoveEmoji,
  handleMessageReactionRemove,
  handleMessageUpdate,
  handlePresenceUpdate,
  handleTypingStart,
  handleUserUpdate,
  handleVoiceServerUpdate,
  handleVoiceStateUpdate,
  handleWebhooksUpdate,
  handleIntegrationCreate,
  handleIntegrationUpdate,
  handleIntegrationDelete,
} from "./handlers/mod.ts";

export async function createBot(options: CreateBotOptions) {
  return {
    id: options.botId,
    applicationId: options.applicationId || options.botId,
    token: `Bot ${options.token}`,
    events: options.events,
    intents: options.intents.reduce((bits, next) => (bits |= DiscordGatewayIntents[next]), 0),
    botGatewayData: options.botGatewayData || (await getGatewayBot()),
    isReady: false,
    activeGuildIds: new Set<bigint>(),
    constants: createBotConstants(),
    handlers: createBotGatewayHandlers({}),
    cache: {
      forEach: function (
        type: "DELETE_MESSAGES_FROM_GUILD" | "DELETE_CHANNELS_FROM_GUILD" | "DELETE_GUILD_FROM_MEMBER",
        options: Record<string, any>
      ) {},
      guilds: {
        get: async function (id: bigint): Promise<DiscordenoGuild | undefined> {
          return {} as any as DiscordenoGuild;
        },
        has: async function (id: bigint): Promise<boolean> {
          return false;
        },
        set: async function (id: bigint, guild: DiscordenoGuild): Promise<void> {
          return;
        },
        delete: async function (id: bigint): Promise<void> {
          return;
        },
      },
      channels: {
        get: async function (id: bigint): Promise<DiscordenoChannel | undefined> {
          return {} as any as DiscordenoChannel;
        },
        has: async function (id: bigint): Promise<boolean> {
          return false;
        },
        set: async function (id: bigint, guild: DiscordenoChannel): Promise<void> {
          return;
        },
        delete: async function (id: bigint): Promise<void> {
          return;
        },
      },
      members: {
        get: async function (id: bigint): Promise<DiscordenoMember | undefined> {
          return {} as any as DiscordenoMember;
        },
        has: async function (id: bigint): Promise<boolean> {
          return false;
        },
        set: async function (id: bigint, member: DiscordenoMember): Promise<void> {
          return;
        },
        delete: async function (id: bigint): Promise<void> {
          return;
        },
      },
      users: {
        get: async function (id: bigint): Promise<DiscordenoUser | undefined> {
          return {} as any as DiscordenoUser;
        },
        has: async function (id: bigint): Promise<boolean> {
          return false;
        },
        set: async function (id: bigint, member: DiscordenoUser): Promise<void> {
          return;
        },
      },
      dispatchedGuildIds: {
        has: async function (id: bigint): Promise<boolean> {
          return false;
        },
        set: async function (id: bigint): Promise<void> {
          return;
        },
        delete: async function (id: bigint): Promise<void> {
          return;
        },
      },
      dispatchedChannelIds: {
        has: async function (id: bigint): Promise<boolean> {
          return false;
        },
        set: async function (id: bigint): Promise<void> {
          return;
        },
        delete: async function (id: bigint): Promise<void> {
          return;
        },
      },
    },
  };
}

const bot = await createBot({
  token: "",
  botId: 0n,
  events: createEventHandlers({}),
  intents: [],
});

export function createEventHandlers(events: Partial<EventHandlers>): EventHandlers {
  function ignore() {}

  return {
    channelCreate: events.channelCreate ?? ignore,
    debug: events.debug ?? ignore,
    dispatchRequirements: events.dispatchRequirements ?? ignore,
    voiceChannelLeave: events.voiceChannelLeave ?? ignore,
    channelDelete: events.channelDelete ?? ignore,
    channelPinsUpdate: events.channelPinsUpdate ?? ignore,
    channelUpdate: events.channelUpdate ?? ignore,
    guildEmojisUpdate: events.guildEmojisUpdate ?? ignore,
    guildBanAdd: events.guildBanAdd ?? ignore,
    guildBanRemove: events.guildBanRemove ?? ignore,
    guildLoaded: events.guildLoaded ?? ignore,
    guildCreate: events.guildCreate ?? ignore,
    guildDelete: events.guildDelete ?? ignore,
    guildUpdate: events.guildUpdate ?? ignore,
    integrationsUpdate: events.integrationsUpdate ?? ignore,
    raw: events.raw ?? ignore,
    stageInstanceCreate: events.stageInstanceCreate ?? ignore,
    stageInstanceDelete: events.stageInstanceDelete ?? ignore,
    stageInstanceUpdate: events.stageInstanceUpdate ?? ignore,
  };
}

export interface CreateRestManagerOptions {
  token: string;
  maxRetryCount?: number;
  version?: number;
  secretKey?: string;
  debug?: (text: string) => unknown;
  checkRateLimits?: typeof checkRateLimits;
  cleanupQueues?: typeof cleanupQueues;
  processQueue?: typeof processQueue;
  processRateLimitedPaths?: typeof processRateLimitedPaths;
  processRequestHeaders?: typeof processRequestHeaders;
  processRequest?: typeof processRequest;
  createRequestBody?: typeof createRequestBody;
  runMethod?: typeof runMethod;
  simplifyUrl?: typeof simplifyUrl;
  processGlobalQueue?: typeof processGlobalQueue;
}

export function createRestManager(options: CreateRestManagerOptions) {
  return {
    token: `${options.token.startsWith("Bot ") ? "" : "Bot "}${options.token}`,
    maxRetryCount: options.maxRetryCount || 10,
    version: options.version || "9",
    secretKey: options.secretKey || "discordeno_best_lib_ever",
    pathQueues: new Map<
      string,
      {
        isWaiting: boolean;
        requests: {
          request: RestRequest;
          payload: RestPayload;
        }[];
      }
    >(),
    processingQueue: false,
    processingRateLimitedPaths: false,
    globallyRateLimited: false,
    globalQueue: [] as {
      request: RestRequest;
      payload: RestPayload;
      basicURL: string;
      urlToUse: string;
    }[],
    globalQueueProcessing: false,
    ratelimitedPaths: new Map<string, RestRateLimitedPath>(),
    debug: options.debug || function (_text: string) {},
    checkRateLimits: options.checkRateLimits || checkRateLimits,
    cleanupQueues: options.cleanupQueues || cleanupQueues,
    processQueue: options.processQueue || processQueue,
    processRateLimitedPaths: options.processRateLimitedPaths || processRateLimitedPaths,
    processRequestHeaders: options.processRequestHeaders || processRequestHeaders,
    processRequest: options.processRequest || processRequest,
    createRequestBody: options.createRequestBody || createRequestBody,
    runMethod: options.runMethod || runMethod,
    simplifyUrl: options.simplifyUrl || simplifyUrl,
    processGlobalQueue: options.processGlobalQueue || processGlobalQueue,
  };
}

export async function startBot(bot: Bot) {
  const transformers = createTransformers(bot.transformers);

  // SETUP UTILS
  bot.utils = createUtils({});

  // START REST
  bot.rest = createRestManager({ token: bot.token });

  // START WS
  bot.gateway = createGatewayManager({});
}

export function createUtils(options: Partial<HelperUtils>) {
  return {
    snowflakeToBigint,
    bigintToSnowflake,
    calculateShardId,
    delay,
    iconHashToBigInt,
    iconBigintToHash,
    // Permissions
    getCached,
    calculateBasePermissions,
    calculateChannelOverwrites,
    getMissingChannelPermissions,
    getMissingGuildPermissions,
    hasGuildPermissions,
    hasChannelPermissions,
    requireGuildPermissions,
    requireChannelPermissions,
    validatePermissions,
    highestRole,
    higherRolePosition,
    validateLength,
    validateSlashOptions,
    validateSlashOptionChoices,
  };
}

export interface HelperUtils {
  snowflakeToBigint: typeof snowflakeToBigint;
  bigintToSnowflake: typeof bigintToSnowflake;
  calculateShardId: typeof calculateShardId;
  delay: typeof delay;
  iconHashToBigInt: typeof iconHashToBigInt;
  iconBigintToHash: typeof iconBigintToHash;
  getCached: typeof getCached;
  calculateBasePermissions: typeof calculateBasePermissions;
  calculateChannelOverwrites: typeof calculateChannelOverwrites;
  hasGuildPermissions: typeof hasGuildPermissions;
  hasChannelPermissions: typeof hasChannelPermissions;
  validatePermissions: typeof validatePermissions;
  getMissingChannelPermissions: typeof getMissingChannelPermissions;
  getMissingGuildPermissions: typeof getMissingGuildPermissions;
  requireGuildPermissions: typeof requireGuildPermissions;
  requireChannelPermissions: typeof requireChannelPermissions;
  highestRole: typeof highestRole;
  higherRolePosition: typeof higherRolePosition;
  validateLength: typeof validateLength;
  validateSlashOptions: typeof validateSlashOptions;
  validateSlashOptionChoices: typeof validateSlashOptionChoices;
}

export function createGatewayManager(options: Partial<GatewayManager>): GatewayManager {
  return {
    cache: {
      guildIds: new Set(),
      loadingGuildIds: new Set(),
    },
    secretKey: options.secretKey ?? "",
    url: options.url ?? "",
    reshard: options.reshard ?? true,
    reshardPercentage: options.reshardPercentage ?? 80,
    spawnShardDelay: options.spawnShardDelay ?? 2600,
    maxShards: options.maxShards ?? 0,
    useOptimalLargeBotSharding: options.useOptimalLargeBotSharding ?? true,
    shardsPerCluster: options.shardsPerCluster ?? 25,
    maxClusters: options.maxClusters ?? 4,
    firstShardId: options.firstShardId ?? 0,
    lastShardId: options.lastShardId ?? 1,
    token: options.token ?? "",
    compress: options.compress ?? false,
    $os: options.$os ?? "linux",
    $browser: options.$browser ?? "Discordeno",
    $device: options.$device ?? "Discordeno",
    intents: options.intents ?? 0,
    shard: options.shard ?? [0, 0],
    urlWSS: options.urlWSS ?? "wss://gateway.discord.gg/?v=9&encoding=json",
    shardsRecommended: options.shardsRecommended ?? 1,
    sessionStartLimitTotal: options.sessionStartLimitTotal ?? 1000,
    sessionStartLimitRemaining: options.sessionStartLimitRemaining ?? 1000,
    sessionStartLimitResetAfter: options.sessionStartLimitResetAfter ?? 0,
    maxConcurrency: options.maxConcurrency ?? 1,
    shards: options.shards ?? new Collection(),
    loadingShards: options.loadingShards ?? new Collection(),
    buckets: new Collection(),
    utf8decoder: new TextDecoder(),

    startGateway,
    spawnShards,
    createShard,
    identify,
    heartbeat,
    tellClusterToIdentify,
    log,
    resharder,
    handleOnMessage,
    processQueue,
    closeWS,
    sendShardMessage,
    resume,
    handleDiscordPayload:
      options.handleDiscordPayload ||
      async function (_, data: GatewayPayload, shardId: number) {
        // TRIGGER RAW EVENT
        bot.events.raw(bot as Bot, data, shardId);

        if (!data.t) return;

        // RUN DISPATCH CHECK
        await bot.events.dispatchRequirements(bot as Bot, data, shardId);
        bot.handlers[data.t as GatewayDispatchEventNames]?.(bot, data, shardId);
      },
  };
}

export function stopBot(bot: Bot) {
  // STOP REST
  // STOP WS
}

export interface CreateBotOptions {
  token: string;
  botId: bigint;
  applicationId?: bigint;
  events: EventHandlers;
  intents: (keyof typeof DiscordGatewayIntents)[];
  botGatewayData?: GetGatewayBot;
  rest?: Omit<CreateRestManagerOptions, "token">;
}

export type UnPromise<T extends Promise<unknown>> = T extends Promise<infer K> ? K : never;

export type CreatedBot = UnPromise<ReturnType<typeof createBot>>;

export type Bot = CreatedBot & {
  utils: HelperUtils;
  rest: RestManager;
  gateway: GatewayManager;
  transformers: Transformers;
};

export interface Transformers {
  snowflake: typeof snowflakeToBigint;
  channel: typeof transformChannel;
  guild: typeof transformGuild;
  user: typeof transformUser;
  member: typeof transformMember;
  message: typeof transformMessage;
  role: typeof transformRole;
  voiceState: typeof transformVoiceState;
}

export function createTransformers(options: Partial<Transformers>) {
  return {
    snowflake: options.snowflake || snowflakeToBigint,
    channel: options.channel || transformChannel,
    guild: options.guild || transformGuild,
    user: options.user || transformUser,
    member: options.member || transformMember,
    message: options.message || transformMessage,
    role: options.role || transformRole,
    voiceState: options.voiceState || transformVoiceState,
  };
}

export type RestManager = ReturnType<typeof createRestManager>;

export interface GatewayManager {
  /** The secret key authorization header the bot will expect when sending payloads. */
  secretKey: string;
  /** The url that all discord payloads for the dispatch type should be sent to. */
  url: string;
  /** Whether or not to automatically reshard. */
  reshard: boolean;
  /** The percentage at which resharding should occur. */
  reshardPercentage: number;
  /** The delay in milliseconds to wait before spawning next shard. OPTIMAL IS ABOVE 2500. YOU DON"T WANT TO HIT THE RATE LIMIT!!! */
  spawnShardDelay: number;
  /** The maximum shard Id number. Useful for zero-downtime updates or resharding. */
  maxShards: number;
  /** Whether or not the resharder should automatically switch to LARGE BOT SHARDING when you are above 100K servers. */
  useOptimalLargeBotSharding: boolean;
  /** The amount of shards to load per cluster. */
  shardsPerCluster: number;
  /** The maximum amount of clusters to use for your bot. */
  maxClusters: number;
  /** The first shard Id to start spawning. */
  firstShardId: number;
  /** The last shard Id for this cluster. */
  lastShardId: number;
  token: string;
  compress: boolean;
  $os: string;
  $browser: string;
  $device: string;
  intents: number;
  shard: [number, number];

  /** The WSS URL that can be used for connecting to the gateway. */
  urlWSS: string;
  /** The recommended number of shards to use when connecting. */
  shardsRecommended: number;
  /** The total number of session starts the current user is allowed. */
  sessionStartLimitTotal: number;
  /** The remaining number of session starts the current user is allowed. */
  sessionStartLimitRemaining: number;
  /** Milliseconds left until limit is reset. */
  sessionStartLimitResetAfter: number;
  /** The number of identify requests allowed per 5 seconds.
   * So, if you had a max concurrency of 16, and 16 shards for example, you could start them all up at the same time.
   * Whereas if you had 32 shards, if you tried to start up shard 0 and 16 at the same time for example, it would not work. You can start shards 0-15 concurrently, then 16-31...
   */
  maxConcurrency: number;
  shards: Collection<number, DiscordenoShard>;
  loadingShards: Collection<
    number,
    {
      shardId: number;
      resolve: (value: unknown) => void;
      startedAt: number;
    }
  >;
  /** Stored as bucketId: { clusters: [clusterId, [ShardIds]], createNextShard: boolean } */
  buckets: Collection<
    number,
    {
      clusters: number[][];
      createNextShard: (() => unknown)[];
    }
  >;
  utf8decoder: TextDecoder;

  cache: {
    guildIds: Set<bigint>;
    loadingGuildIds: Set<bigint>;
  };

  // METHODS

  /** The handler function that starts the gateway. */
  startGateway: typeof startGateway;
  /** The handler for spawning ALL the shards. */
  spawnShards: typeof spawnShards;
  /** Create the websocket and adds the proper handlers to the websocket. */
  createShard: typeof createShard;
  /** Begins identification of the shard to discord. */
  identify: typeof identify;
  /** Begins heartbeating of the shard to keep it alive. */
  heartbeat: typeof heartbeat;
  /** Sends the discord payload to another server. */
  handleDiscordPayload: (gateway: GatewayManager, data: GatewayPayload, shardId: number) => any;
  /** Tell the cluster/worker to begin identifying this shard  */
  tellClusterToIdentify: typeof tellClusterToIdentify;
  /** Handle the different logs. Used for debugging. */
  log: typeof log;
  /** Handles resharding the bot when necessary. */
  resharder: typeof resharder;
  /** Handles the message events from websocket. */
  handleOnMessage: typeof handleOnMessage;
  /** Handles processing queue of requests send to this shard. */
  processQueue: typeof processQueue;
  /** Closes shard WebSocket connection properly. */
  closeWS: typeof closeWS;
  /** Properly adds a message to the shards queue. */
  sendShardMessage: typeof sendShardMessage;
  /** Properly resume an old shards session. */
  resume: typeof resume;
}

export interface EventHandlers {
  debug: (text: string) => unknown;
  channelCreate: (bot: Bot, channel: DiscordenoChannel) => any;
  dispatchRequirements: (bot: Bot, data: GatewayPayload, shardId: number) => any;
  voiceChannelLeave: (bot: Bot, voiceState: DiscordenoVoiceState, channel: DiscordenoChannel) => any;
  channelDelete: (bot: Bot, channel: DiscordenoChannel) => any;
  channelPinsUpdate: (bot: Bot, data: { guildId?: bigint; channelId: bigint; lastPinTimestamp?: number }) => any;
  channelUpdate: (bot: Bot, channel: DiscordenoChannel, oldChannel: DiscordenoChannel) => any;
  stageInstanceCreate: (
    bot: Bot,
    data: {
      id: bigint;
      guildId: bigint;
      channelId: bigint;
      topic: string;
      privacyLevel: number;
      discoverableDisabled: boolean;
    }
  ) => any;
  stageInstanceDelete: (
    bot: Bot,
    data: {
      id: bigint;
      guildId: bigint;
      channelId: bigint;
      topic: string;
      privacyLevel: number;
      discoverableDisabled: boolean;
    }
  ) => any;
  stageInstanceUpdate: (
    bot: Bot,
    data: {
      id: bigint;
      guildId: bigint;
      channelId: bigint;
      topic: string;
      privacyLevel: number;
      discoverableDisabled: boolean;
    }
  ) => any;
  // TODO: THREADS
  guildEmojisUpdate: (
    bot: Bot,
    guild: DiscordenoGuild,
    emojis: Collection<bigint, Emoji>,
    cachedEmojis: Collection<bigint, Emoji>
  ) => any;
  guildBanAdd: (bot: Bot, user: DiscordenoUser, guildId: bigint) => any;
  guildBanRemove: (bot: Bot, user: DiscordenoUser, guildId: bigint) => any;
  guildLoaded: (bot: Bot, guild: DiscordenoGuild) => any;
  guildCreate: (bot: Bot, guild: DiscordenoGuild) => any;
  guildDelete: (bot: Bot, id: bigint, guild?: DiscordenoGuild) => any;
  guildUpdate: (bot: Bot, guild: DiscordenoGuild, cachedGuild?: DiscordenoGuild) => any;
  integrationsUpdate: (bot: Bot, data: { guildId: bigint }) => any;
  raw: (bot: Bot, data: GatewayPayload, shardId: number) => any;
}

export function createBotConstants() {
  return {
    DISCORDENO_VERSION,
    USER_AGENT,
    BASE_URL: baseEndpoints.BASE_URL,
    CDN_URL: baseEndpoints.CDN_URL,
    endpoints,
    regexes: {
      SLASH_COMMANDS_NAME_REGEX,
      CONTEXT_MENU_COMMANDS_NAME_REGEX,
      CHANNEL_MENTION_REGEX,
      DISCORD_SNOWFLAKE_REGEX,
    },
  };
}

export interface BotGatewayHandlerOptions {
  READY: typeof handleReady;
  CHANNEL_CREATE: typeof handleChannelCreate;
  CHANNEL_DELETE: typeof handleChannelDelete;
  CHANNEL_PINS_UPDATE: typeof handleChannelPinsUpdate;
  CHANNEL_UPDATE: typeof handleChannelUpdate;
  THREAD_CREATE: typeof handleThreadCreate;
  THREAD_UPDATE: typeof handleThreadUpdate;
  THREAD_DELETE: typeof handleThreadDelete;
  THREAD_LIST_SYNC: typeof handleThreadListSync;
  THREAD_MEMBER_UPDATE: typeof handleThreadMemberUpdate;
  THREAD_MEMBERS_UPDATE: typeof handleThreadMembersUpdate;
  STAGE_INSTANCE_CREATE: typeof handleStageInstanceCreate;
  STAGE_INSTANCE_UPDATE: typeof handleStageInstanceUpdate;
  STAGE_INSTANCE_DELETE: typeof handleStageInstanceDelete;
  GUILD_BAN_ADD: typeof handleGuildBanAdd;
  GUILD_BAN_REMOVE: typeof handleGuildBanRemove;
  GUILD_CREATE: typeof handleGuildCreate;
  GUILD_LOADED_DD: typeof handleGuildLoaded;
  GUILD_DELETE: typeof handleGuildDelete;
  GUILD_EMOJIS_UPDATE: typeof handleGuildEmojisUpdate;
  GUILD_INTEGRATIONS_UPDATE: typeof handleGuildIntegrationsUpdate;
  GUILD_MEMBER_ADD: typeof handleGuildMemberAdd;
  GUILD_MEMBER_REMOVE: typeof handleGuildMemberRemove;
  GUILD_MEMBER_UPDATE: typeof handleGuildMemberUpdate;
  GUILD_MEMBERS_CHUNK: typeof handleGuildMembersChunk;
  GUILD_ROLE_CREATE: typeof handleGuildRoleCreate;
  GUILD_ROLE_DELETE: typeof handleGuildRoleDelete;
  GUILD_ROLE_UPDATE: typeof handleGuildRoleUpdate;
  GUILD_UPDATE: typeof handleGuildUpdate;
  INTERACTION_CREATE: typeof handleInteractionCreate;
  INVITE_CREATE: typeof handleInviteCreate;
  INVITE_DELETE: typeof handleInviteCreate;
  MESSAGE_CREATE: typeof handleMessageCreate;
  MESSAGE_DELETE_BULK: typeof handleMessageDeleteBulk;
  MESSAGE_DELETE: typeof handleMessageDelete;
  MESSAGE_REACTION_ADD: typeof handleMessageReactionAdd;
  MESSAGE_REACTION_REMOVE_ALL: typeof handleMessageReactionRemoveAll;
  MESSAGE_REACTION_REMOVE_EMOJI: typeof handleMessageReactionRemoveEmoji;
  MESSAGE_REACTION_REMOVE: typeof handleMessageReactionRemove;
  MESSAGE_UPDATE: typeof handleMessageUpdate;
  PRESENCE_UPDATE: typeof handlePresenceUpdate;
  TYPING_START: typeof handleTypingStart;
  USER_UPDATE: typeof handleUserUpdate;
  VOICE_SERVER_UPDATE: typeof handleVoiceServerUpdate;
  VOICE_STATE_UPDATE: typeof handleVoiceStateUpdate;
  WEBHOOKS_UPDATE: typeof handleWebhooksUpdate;
  INTEGRATION_CREATE: typeof handleIntegrationCreate;
  INTEGRATION_UPDATE: typeof handleIntegrationUpdate;
  INTEGRATION_DELETE: typeof handleIntegrationDelete;
}

export function createBotGatewayHandlers(options: Partial<BotGatewayHandlerOptions>) {
  return {
    // misc
    READY: options.READY ?? handleReady,
    // channels
    CHANNEL_CREATE: options.CHANNEL_CREATE ?? handleChannelCreate,
    CHANNEL_DELETE: options.CHANNEL_DELETE ?? handleChannelDelete,
    CHANNEL_PINS_UPDATE: options.CHANNEL_PINS_UPDATE ?? handleChannelPinsUpdate,
    CHANNEL_UPDATE: options.CHANNEL_UPDATE ?? handleChannelUpdate,
    THREAD_CREATE: options.THREAD_CREATE ?? handleThreadCreate,
    THREAD_UPDATE: options.THREAD_UPDATE ?? handleThreadUpdate,
    THREAD_DELETE: options.THREAD_DELETE ?? handleThreadDelete,
    THREAD_LIST_SYNC: options.THREAD_LIST_SYNC ?? handleThreadListSync,
    THREAD_MEMBER_UPDATE: options.THREAD_MEMBER_UPDATE ?? handleThreadMemberUpdate,
    THREAD_MEMBERS_UPDATE: options.THREAD_MEMBERS_UPDATE ?? handleThreadMembersUpdate,
    STAGE_INSTANCE_CREATE: options.STAGE_INSTANCE_CREATE ?? handleStageInstanceCreate,
    STAGE_INSTANCE_UPDATE: options.STAGE_INSTANCE_UPDATE ?? handleStageInstanceUpdate,
    STAGE_INSTANCE_DELETE: options.STAGE_INSTANCE_DELETE ?? handleStageInstanceDelete,

    // guilds
    GUILD_BAN_ADD: options.GUILD_BAN_ADD ?? handleGuildBanAdd,
    GUILD_BAN_REMOVE: options.GUILD_BAN_REMOVE ?? handleGuildBanRemove,
    GUILD_CREATE: options.GUILD_CREATE ?? handleGuildCreate,
    GUILD_LOADED_DD: options.GUILD_LOADED_DD ?? handleGuildLoaded,
    GUILD_DELETE: options.GUILD_DELETE ?? handleGuildDelete,
    GUILD_EMOJIS_UPDATE: options.GUILD_EMOJIS_UPDATE ?? handleGuildEmojisUpdate,
    GUILD_INTEGRATIONS_UPDATE: options.GUILD_INTEGRATIONS_UPDATE ?? handleGuildIntegrationsUpdate,
    GUILD_MEMBER_ADD: options.GUILD_MEMBER_ADD ?? handleGuildMemberAdd,
    GUILD_MEMBER_REMOVE: options.GUILD_MEMBER_REMOVE ?? handleGuildMemberRemove,
    GUILD_MEMBER_UPDATE: options.GUILD_MEMBER_UPDATE ?? handleGuildMemberUpdate,
    GUILD_MEMBERS_CHUNK: options.GUILD_MEMBERS_CHUNK ?? handleGuildMembersChunk,
    GUILD_ROLE_CREATE: options.GUILD_ROLE_CREATE ?? handleGuildRoleCreate,
    GUILD_ROLE_DELETE: options.GUILD_ROLE_DELETE ?? handleGuildRoleDelete,
    GUILD_ROLE_UPDATE: options.GUILD_ROLE_UPDATE ?? handleGuildRoleUpdate,
    GUILD_UPDATE: options.GUILD_UPDATE ?? handleGuildUpdate,
    // interactions
    INTERACTION_CREATE: options.INTERACTION_CREATE ?? handleInteractionCreate,
    // invites
    INVITE_CREATE: options.INVITE_CREATE ?? handleInviteCreate,
    INVITE_DELETE: options.INVITE_DELETE ?? handleInviteCreate,
    // messages
    MESSAGE_CREATE: options.MESSAGE_CREATE ?? handleMessageCreate,
    MESSAGE_DELETE_BULK: options.MESSAGE_DELETE_BULK ?? handleMessageDeleteBulk,
    MESSAGE_DELETE: options.MESSAGE_DELETE ?? handleMessageDelete,
    MESSAGE_REACTION_ADD: options.MESSAGE_REACTION_ADD ?? handleMessageReactionAdd,
    MESSAGE_REACTION_REMOVE_ALL: options.MESSAGE_REACTION_REMOVE_ALL ?? handleMessageReactionRemoveAll,
    MESSAGE_REACTION_REMOVE_EMOJI: options.MESSAGE_REACTION_REMOVE_EMOJI ?? handleMessageReactionRemoveEmoji,
    MESSAGE_REACTION_REMOVE: options.MESSAGE_REACTION_REMOVE ?? handleMessageReactionRemove,
    MESSAGE_UPDATE: options.MESSAGE_UPDATE ?? handleMessageUpdate,
    // presence
    PRESENCE_UPDATE: options.PRESENCE_UPDATE ?? handlePresenceUpdate,
    TYPING_START: options.TYPING_START ?? handleTypingStart,
    USER_UPDATE: options.USER_UPDATE ?? handleUserUpdate,
    // voice
    VOICE_SERVER_UPDATE: options.VOICE_SERVER_UPDATE ?? handleVoiceServerUpdate,
    VOICE_STATE_UPDATE: options.VOICE_STATE_UPDATE ?? handleVoiceStateUpdate,
    // webhooks
    WEBHOOKS_UPDATE: options.WEBHOOKS_UPDATE ?? handleWebhooksUpdate,
    // integrations
    INTEGRATION_CREATE: options.INTEGRATION_CREATE ?? handleIntegrationCreate,
    INTEGRATION_UPDATE: options.INTEGRATION_UPDATE ?? handleIntegrationUpdate,
    INTEGRATION_DELETE: options.INTEGRATION_DELETE ?? handleIntegrationDelete,
  };
}
