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
  requireBotChannelPermissions,
  requireBotGuildPermissions,
} from "./util/permissions.ts";
import {
  checkRateLimits,
  processQueue,
  cleanupQueues,
  createRequestBody,
  processRateLimitedPaths,
  processRequest,
  processRequestHeaders,
  runMethod,
  processGlobalQueue,
  simplifyUrl,
} from "./rest/mod.ts";
import type { RestPayload, RestRateLimitedPath, RestRequest } from "./rest/rest.ts";
import { DiscordGatewayIntents } from "./types/gateway/gateway_intents.ts";
import { GetGatewayBot } from "./types/gateway/get_gateway_bot.ts";
import { bigintToSnowflake, snowflakeToBigint } from "./util/bigint.ts";
import { Collection } from "./util/collection.ts";
import {
  DiscordenoMember,
  DiscordenoUser,
  transformMember,
  transformUser,
  DiscordenoGuild,
  transformGuild,
  DiscordenoChannel,
  transformChannel,
  transformMessage,
  transformRole,
  DiscordenoVoiceState,
  transformVoiceState,
  DiscordenoMessage,
} from "./transformers/mod.ts";
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
import { Errors } from "./types/discordeno/errors.ts";
import { DiscordGatewayPayload, GatewayDispatchEventNames, GatewayPayload } from "./types/gateway/gateway_payload.ts";
import {
  closeWS,
  handleOnMessage,
  resume,
  resharder,
  log,
  startGateway,
  spawnShards,
  createShard,
  identify,
  heartbeat,
  tellClusterToIdentify,
  sendShardMessage,
  DiscordenoShard,
} from "./ws/mod.ts";
import { validateLength } from "./util/validate_length.ts";
import { delay, validateComponents, validateSlashOptionChoices, validateSlashOptions } from "./util/utils.ts";
import { iconBigintToHash, iconHashToBigInt } from "./util/hash.ts";
import { calculateShardId } from "./util/calculate_shard_id.ts";
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
  handleGuildLoaded,
} from "./handlers/mod.ts";
import { DiscordenoInteraction, transformInteraction } from "./transformers/interaction.ts";
import { DiscordenoIntegration, transformIntegration } from "./transformers/integration.ts";
import { Emoji } from "./types/emojis/emoji.ts";
import { transformApplication } from "./transformers/application.ts";
import { transformTeam } from "./transformers/team.ts";
import { DiscordenoInvite, transformInvite } from "./transformers/invite.ts";
import {
  addDiscoverySubcategory,
  addReaction,
  addReactions,
  addRole,
  addToThread,
  archiveThread,
  avatarURL,
  ban,
  banMember,
  batchEditSlashCommandPermissions,
  categoryChildren,
  channelOverwriteHasPermission,
  connectToVoiceChannel,
  createChannel,
  createEmoji,
  createGuild,
  createGuildFromTemplate,
  createGuildTemplate,
  createInvite,
  createRole,
  createSlashCommand,
  createStageInstance,
  createWebhook,
  deleteChannel,
  deleteChannelOverwrite,
  deleteEmoji,
  deleteGuild,
  deleteGuildTemplate,
  deleteIntegration,
  deleteInvite,
  deleteMessage,
  deleteMessages,
  deleteRole,
  deleteSlashCommand,
  deleteSlashResponse,
  deleteStageInstance,
  deleteThread,
  deleteWebhook,
  deleteWebhookMessage,
  deleteWebhookWithToken,
  disconnectMember,
  editBotNickname,
  editBotProfile,
  editBotStatus,
  editChannel,
  editChannelOverwrite,
  editDiscovery,
  editEmoji,
  editGuild,
  editGuildTemplate,
  editMember,
  editMessage,
  editRole,
  editSlashCommandPermissions,
  editSlashResponse,
  editThread,
  editWebhook,
  editWebhookMessage,
  editWebhookWithToken,
  editWelcomeScreen,
  editWidget,
  emojiURL,
  fetchMembers,
  followChannel,
  getActiveThreads,
  getApplicationInfo,
  getArchivedThreads,
  getAuditLogs,
  getAvailableVoiceRegions,
  getBan,
  getBans,
  getChannel,
  getChannelInvites,
  getChannels,
  getChannelWebhooks,
  getDiscoveryCategories,
  getEmoji,
  getEmojis,
  getGatewayBot,
  getGuild,
  getGuildPreview,
  getGuildTemplates,
  getIntegrations,
  getInvite,
  getInvites,
  getMember,
  getMembers,
  getMessage,
  getMessages,
  getOriginalInteractionResponse,
  getPins,
  getPruneCount,
  getReactions,
  getRoles,
  getSlashCommand,
  getSlashCommandPermission,
  getSlashCommandPermissions,
  getSlashCommands,
  getStageInstance,
  getTemplate,
  getThreadMembers,
  getUser,
  getVanityURL,
  getVoiceRegions,
  getWebhook,
  getWebhookMessage,
  getWebhooks,
  getWebhookWithToken,
  getWelcomeScreen,
  getWidget,
  getWidgetImageURL,
  getWidgetSettings,
  guildBannerURL,
  guildIconURL,
  guildSplashURL,
  isButton,
  isChannelSynced,
  isSelectMenu,
  isSlashCommand,
  joinThread,
  kick,
  kickMember,
  leaveGuild,
  leaveThread,
  lockThread,
  moveMember,
  pin,
  pinMessage,
  pruneMembers,
  publishMessage,
  removeAllReactions,
  removeDiscoverySubcategory,
  removeReaction,
  removeReactionEmoji,
  removeRole,
  removeThreadMember,
  sendDirectMessage,
  sendInteractionResponse,
  sendMessage,
  sendWebhook,
  startPrivateThread,
  startThread,
  startTyping,
  suppressEmbeds,
  swapChannels,
  syncGuildTemplate,
  unarchiveThread,
  unban,
  unbanMember,
  unlockThread,
  unpin,
  unpinMessage,
  updateBotVoiceState,
  updateStageInstance,
  upsertSlashCommand,
  upsertSlashCommands,
  validDiscoveryTerm,
} from "./helpers/mod.ts";
import { DiscordenoEmoji, transformEmoji } from "./transformers/emoji.ts";
import { transformActivity } from "./transformers/activity.ts";
import { DiscordenoPresence, transformPresence } from "./transformers/presence.ts";

export function createBot(options: CreateBotOptions) {
  return {
    id: options.botId,
    applicationId: options.applicationId || options.botId,
    token: `Bot ${options.token}`,
    events: options.events,
    intents: options.intents.reduce((bits, next) => (bits |= DiscordGatewayIntents[next]), 0),
    botGatewayData: options.botGatewayData,
    isReady: false,
    activeGuildIds: new Set<bigint>(),
    constants: createBotConstants(),
    handlers: createBotGatewayHandlers({}),
    cache: {
      execute: async function (
        type:
          | "DELETE_MESSAGES_FROM_CHANNEL"
          | "DELETE_ROLE_FROM_MEMBER"
          | "BULK_DELETE_MESSAGES"
          | "GUILD_MEMBER_CHUNK"
          | "GUILD_MEMBER_COUNT_DECREMENT"
          | "GUILD_MEMBER_COUNT_INCREMENT"
          | "DELETE_MESSAGES_FROM_GUILD"
          | "DELETE_CHANNELS_FROM_GUILD"
          | "DELETE_GUILD_FROM_MEMBER",
        options: Record<string, any>
      ) {},
      fetchAllMembersProcessingRequests: new Collection<string, Function>(),
      messages: {
        get: async function (id: bigint): Promise<DiscordenoMessage | undefined> {
          return {} as any as DiscordenoMessage;
        },
        has: async function (id: bigint): Promise<boolean> {
          return false;
        },
        set: async function (id: bigint, guild: DiscordenoMessage): Promise<void> {
          return;
        },
        delete: async function (id: bigint): Promise<void> {
          return;
        },
      },
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
      presence: {
        get: async function (id: bigint): Promise<DiscordenoPresence | undefined> {
          return {} as any as DiscordenoPresence;
        },
        has: async function (id: bigint): Promise<boolean> {
          return false;
        },
        set: async function (id: bigint, guild: DiscordenoPresence): Promise<void> {
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

export function createEventHandlers(events: Partial<EventHandlers>): EventHandlers {
  function ignore() {}

  return {
    debug: events.debug ?? ignore,
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
    messageUpdate: events.messageUpdate ?? ignore,
    reactionAdd: events.reactionAdd ?? ignore,
    reactionRemove: events.reactionRemove ?? ignore,
    reactionRemoveAll: events.reactionRemoveAll ?? ignore,
    reactionRemoveEmoji: events.reactionRemoveEmoji ?? ignore,
    presenceUpdate: events.presenceUpdate ?? ignore,
    voiceServerUpdate: events.voiceServerUpdate ?? ignore,
    voiceStateUpdate: events.voiceStateUpdate ?? ignore,
    channelCreate: events.channelCreate ?? ignore,
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
  // SETUP
  bot.utils = createUtils({});
  bot.transformers = createTransformers(bot.transformers || {});
  bot.helpers = createHelpers(bot.helpers || {});

  // START REST
  bot.rest = createRestManager({ token: bot.token });

  // START WS
  bot.gateway = createGatewayManager({
    handleDiscordPayload:
      // bot.handleDiscordPayload ||
      async function (_, data: DiscordGatewayPayload, shardId: number) {
        // TRIGGER RAW EVENT
        bot.events.raw(bot as Bot, data, shardId);

        if (!data.t) return;

        // RUN DISPATCH CHECK
        await bot.events.dispatchRequirements(bot as Bot, data, shardId);
        bot.handlers[data.t as GatewayDispatchEventNames]?.(bot as Bot, data, shardId);
      },
  });

  if (!bot.botGatewayData) bot.botGatewayData = await bot.helpers.getGatewayBot(bot);
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
    requireBotChannelPermissions,
    requireBotGuildPermissions,
    validateComponents,
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
  requireBotChannelPermissions: typeof requireBotChannelPermissions;
  requireBotGuildPermissions: typeof requireBotGuildPermissions;
  validateComponents: typeof validateComponents;
}

export function createGatewayManager(
  options: Partial<GatewayManager> & Pick<GatewayManager, "handleDiscordPayload">
): GatewayManager {
  return {
    cache: {
      guildIds: new Set(),
      loadingGuildIds: new Set(),
      editedMessages: new Collection(),
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
    handleDiscordPayload: options.handleDiscordPayload,
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

export type CreatedBot = ReturnType<typeof createBot>;

export type Bot = CreatedBot & {
  utils: HelperUtils;
  rest: RestManager;
  gateway: GatewayManager;
  transformers: Transformers;
  helpers: Helpers;
};

export interface Helpers {
  addDiscoverySubcategory: typeof addDiscoverySubcategory;
  addReaction: typeof addReaction;
  addReactions: typeof addReactions;
  addRole: typeof addRole;
  avatarURL: typeof avatarURL;
  ban: typeof ban;
  banMember: typeof banMember;
  batchEditSlashCommandPermissions: typeof batchEditSlashCommandPermissions;
  categoryChildren: typeof categoryChildren;
  channelOverwriteHasPermission: typeof channelOverwriteHasPermission;
  connectToVoiceChannel: typeof connectToVoiceChannel;
  createChannel: typeof createChannel;
  createEmoji: typeof createEmoji;
  createGuild: typeof createGuild;
  createGuildFromTemplate: typeof createGuildFromTemplate;
  createGuildTemplate: typeof createGuildTemplate;
  createInvite: typeof createInvite;
  createRole: typeof createRole;
  createSlashCommand: typeof createSlashCommand;
  createStageInstance: typeof createStageInstance;
  createWebhook: typeof createWebhook;
  deleteChannel: typeof deleteChannel;
  deleteChannelOverwrite: typeof deleteChannelOverwrite;
  deleteEmoji: typeof deleteEmoji;
  deleteGuild: typeof deleteGuild;
  deleteGuildTemplate: typeof deleteGuildTemplate;
  deleteIntegration: typeof deleteIntegration;
  deleteInvite: typeof deleteInvite;
  deleteMessage: typeof deleteMessage;
  deleteMessages: typeof deleteMessages;
  deleteRole: typeof deleteRole;
  deleteSlashCommand: typeof deleteSlashCommand;
  deleteSlashResponse: typeof deleteSlashResponse;
  deleteStageInstance: typeof deleteStageInstance;
  deleteWebhook: typeof deleteWebhook;
  deleteWebhookMessage: typeof deleteWebhookMessage;
  deleteWebhookWithToken: typeof deleteWebhookWithToken;
  disconnectMember: typeof disconnectMember;
  editBotNickname: typeof editBotNickname;
  editBotProfile: typeof editBotProfile;
  editBotStatus: typeof editBotStatus;
  editChannel: typeof editChannel;
  editChannelOverwrite: typeof editChannelOverwrite;
  editDiscovery: typeof editDiscovery;
  editEmoji: typeof editEmoji;
  editGuild: typeof editGuild;
  editGuildTemplate: typeof editGuildTemplate;
  editMember: typeof editMember;
  editMessage: typeof editMessage;
  editRole: typeof editRole;
  editSlashResponse: typeof editSlashResponse;
  editSlashCommandPermissions: typeof editSlashCommandPermissions;
  editWebhook: typeof editWebhook;
  editWebhookMessage: typeof editWebhookMessage;
  editWebhookWithToken: typeof editWebhookWithToken;
  editWelcomeScreen: typeof editWelcomeScreen;
  editWidget: typeof editWidget;
  emojiURL: typeof emojiURL;
  fetchMembers: typeof fetchMembers;
  followChannel: typeof followChannel;
  getAuditLogs: typeof getAuditLogs;
  getAvailableVoiceRegions: typeof getAvailableVoiceRegions;
  getBan: typeof getBan;
  getBans: typeof getBans;
  getChannel: typeof getChannel;
  getChannelInvites: typeof getChannelInvites;
  getChannels: typeof getChannels;
  getChannelWebhooks: typeof getChannelWebhooks;
  getDiscoveryCategories: typeof getDiscoveryCategories;
  getEmoji: typeof getEmoji;
  getEmojis: typeof getEmojis;
  getGatewayBot: typeof getGatewayBot;
  getGuild: typeof getGuild;
  getGuildPreview: typeof getGuildPreview;
  getGuildTemplates: typeof getGuildTemplates;
  getIntegrations: typeof getIntegrations;
  getInvite: typeof getInvite;
  getInvites: typeof getInvites;
  getMember: typeof getMember;
  getMembers: typeof getMembers;
  getMessage: typeof getMessage;
  getMessages: typeof getMessages;
  getOriginalInteractionResponse: typeof getOriginalInteractionResponse;
  getPins: typeof getPins;
  getPruneCount: typeof getPruneCount;
  getReactions: typeof getReactions;
  getRoles: typeof getRoles;
  getSlashCommand: typeof getSlashCommand;
  getSlashCommandPermission: typeof getSlashCommandPermission;
  getSlashCommandPermissions: typeof getSlashCommandPermissions;
  getSlashCommands: typeof getSlashCommands;
  getStageInstance: typeof getStageInstance;
  getTemplate: typeof getTemplate;
  getUser: typeof getUser;
  getApplicationInfo: typeof getApplicationInfo;
  getVanityURL: typeof getVanityURL;
  getVoiceRegions: typeof getVoiceRegions;
  getWebhook: typeof getWebhook;
  getWebhookMessage: typeof getWebhookMessage;
  getWebhooks: typeof getWebhooks;
  getWebhookWithToken: typeof getWebhookWithToken;
  getWelcomeScreen: typeof getWelcomeScreen;
  getWidget: typeof getWidget;
  getWidgetImageURL: typeof getWidgetImageURL;
  getWidgetSettings: typeof getWidgetSettings;
  guildBannerURL: typeof guildBannerURL;
  guildIconURL: typeof guildIconURL;
  guildSplashURL: typeof guildSplashURL;
  isButton: typeof isButton;
  isSelectMenu: typeof isSelectMenu;
  isSlashCommand: typeof isSlashCommand;
  isChannelSynced: typeof isChannelSynced;
  kick: typeof kick;
  kickMember: typeof kickMember;
  leaveGuild: typeof leaveGuild;
  moveMember: typeof moveMember;
  pin: typeof pin;
  pinMessage: typeof pinMessage;
  pruneMembers: typeof pruneMembers;
  publishMessage: typeof publishMessage;
  removeAllReactions: typeof removeAllReactions;
  removeDiscoverySubcategory: typeof removeDiscoverySubcategory;
  removeReaction: typeof removeReaction;
  removeReactionEmoji: typeof removeReactionEmoji;
  removeRole: typeof removeRole;
  sendDirectMessage: typeof sendDirectMessage;
  sendInteractionResponse: typeof sendInteractionResponse;
  sendMessage: typeof sendMessage;
  sendWebhook: typeof sendWebhook;
  startTyping: typeof startTyping;
  swapChannels: typeof swapChannels;
  syncGuildTemplate: typeof syncGuildTemplate;
  unban: typeof unban;
  unbanMember: typeof unbanMember;
  unpin: typeof unpin;
  unpinMessage: typeof unpinMessage;
  updateBotVoiceState: typeof updateBotVoiceState;
  updateStageInstance: typeof updateStageInstance;
  upsertSlashCommand: typeof upsertSlashCommand;
  upsertSlashCommands: typeof upsertSlashCommands;
  validDiscoveryTerm: typeof validDiscoveryTerm;
  addToThread: typeof addToThread;
  archiveThread: typeof archiveThread;
  deleteThread: typeof deleteThread;
  editThread: typeof editThread;
  getActiveThreads: typeof getActiveThreads;
  getArchivedThreads: typeof getArchivedThreads;
  getThreadMembers: typeof getThreadMembers;
  joinThread: typeof joinThread;
  leaveThread: typeof leaveThread;
  lockThread: typeof lockThread;
  removeThreadMember: typeof removeThreadMember;
  startPrivateThread: typeof startPrivateThread;
  startThread: typeof startThread;
  unarchiveThread: typeof unarchiveThread;
  unlockThread: typeof unlockThread;
  suppressEmbeds: typeof suppressEmbeds;
}

export function createHelpers(options: Partial<Helpers>) {
  return {
    addDiscoverySubcategory: options.addDiscoverySubcategory || addDiscoverySubcategory,
    addReaction: options.addReaction || addReaction,
    addReactions: options.addReactions || addReactions,
    addRole: options.addRole || addRole,
    avatarURL: options.avatarURL || avatarURL,
    ban: options.ban || ban,
    banMember: options.banMember || banMember,
    batchEditSlashCommandPermissions: options.batchEditSlashCommandPermissions || batchEditSlashCommandPermissions,
    categoryChildren: options.categoryChildren || categoryChildren,
    channelOverwriteHasPermission: options.channelOverwriteHasPermission || channelOverwriteHasPermission,
    connectToVoiceChannel: options.connectToVoiceChannel || connectToVoiceChannel,
    createChannel: options.createChannel || createChannel,
    createEmoji: options.createEmoji || createEmoji,
    createGuild: options.createGuild || createGuild,
    createGuildFromTemplate: options.createGuildFromTemplate || createGuildFromTemplate,
    createGuildTemplate: options.createGuildTemplate || createGuildTemplate,
    createInvite: options.createInvite || createInvite,
    createRole: options.createRole || createRole,
    createSlashCommand: options.createSlashCommand || createSlashCommand,
    createStageInstance: options.createStageInstance || createStageInstance,
    createWebhook: options.createWebhook || createWebhook,
    deleteChannel: options.deleteChannel || deleteChannel,
    deleteChannelOverwrite: options.deleteChannelOverwrite || deleteChannelOverwrite,
    deleteEmoji: options.deleteEmoji || deleteEmoji,
    deleteGuild: options.deleteGuild || deleteGuild,
    deleteGuildTemplate: options.deleteGuildTemplate || deleteGuildTemplate,
    deleteIntegration: options.deleteIntegration || deleteIntegration,
    deleteInvite: options.deleteInvite || deleteInvite,
    deleteMessage: options.deleteMessage || deleteMessage,
    deleteMessages: options.deleteMessages || deleteMessages,
    deleteRole: options.deleteRole || deleteRole,
    deleteSlashCommand: options.deleteSlashCommand || deleteSlashCommand,
    deleteSlashResponse: options.deleteSlashResponse || deleteSlashResponse,
    deleteStageInstance: options.deleteStageInstance || deleteStageInstance,
    deleteWebhook: options.deleteWebhook || deleteWebhook,
    deleteWebhookMessage: options.deleteWebhookMessage || deleteWebhookMessage,
    deleteWebhookWithToken: options.deleteWebhookWithToken || deleteWebhookWithToken,
    disconnectMember: options.disconnectMember || disconnectMember,
    editBotNickname: options.editBotNickname || editBotNickname,
    editBotProfile: options.editBotProfile || editBotProfile,
    editBotStatus: options.editBotStatus || editBotStatus,
    editChannel: options.editChannel || editChannel,
    editChannelOverwrite: options.editChannelOverwrite || editChannelOverwrite,
    editDiscovery: options.editDiscovery || editDiscovery,
    editEmoji: options.editEmoji || editEmoji,
    editGuild: options.editGuild || editGuild,
    editGuildTemplate: options.editGuildTemplate || editGuildTemplate,
    editMember: options.editMember || editMember,
    editMessage: options.editMessage || editMessage,
    editRole: options.editRole || editRole,
    editSlashResponse: options.editSlashResponse || editSlashResponse,
    editSlashCommandPermissions: options.editSlashCommandPermissions || editSlashCommandPermissions,
    editWebhook: options.editWebhook || editWebhook,
    editWebhookMessage: options.editWebhookMessage || editWebhookMessage,
    editWebhookWithToken: options.editWebhookWithToken || editWebhookWithToken,
    editWelcomeScreen: options.editWelcomeScreen || editWelcomeScreen,
    editWidget: options.editWidget || editWidget,
    emojiURL: options.emojiURL || emojiURL,
    fetchMembers: options.fetchMembers || fetchMembers,
    followChannel: options.followChannel || followChannel,
    getAuditLogs: options.getAuditLogs || getAuditLogs,
    getAvailableVoiceRegions: options.getAvailableVoiceRegions || getAvailableVoiceRegions,
    getBan: options.getBan || getBan,
    getBans: options.getBans || getBans,
    getChannel: options.getChannel || getChannel,
    getChannelInvites: options.getChannelInvites || getChannelInvites,
    getChannels: options.getChannels || getChannels,
    getChannelWebhooks: options.getChannelWebhooks || getChannelWebhooks,
    getDiscoveryCategories: options.getDiscoveryCategories || getDiscoveryCategories,
    getEmoji: options.getEmoji || getEmoji,
    getEmojis: options.getEmojis || getEmojis,
    getGatewayBot: options.getGatewayBot || getGatewayBot,
    getGuild: options.getGuild || getGuild,
    getGuildPreview: options.getGuildPreview || getGuildPreview,
    getGuildTemplates: options.getGuildTemplates || getGuildTemplates,
    getIntegrations: options.getIntegrations || getIntegrations,
    getInvite: options.getInvite || getInvite,
    getInvites: options.getInvites || getInvites,
    getMember: options.getMember || getMember,
    getMembers: options.getMembers || getMembers,
    getMessage: options.getMessage || getMessage,
    getMessages: options.getMessages || getMessages,
    getOriginalInteractionResponse: options.getOriginalInteractionResponse || getOriginalInteractionResponse,
    getPins: options.getPins || getPins,
    getPruneCount: options.getPruneCount || getPruneCount,
    getReactions: options.getReactions || getReactions,
    getRoles: options.getRoles || getRoles,
    getSlashCommand: options.getSlashCommand || getSlashCommand,
    getSlashCommandPermission: options.getSlashCommandPermission || getSlashCommandPermission,
    getSlashCommandPermissions: options.getSlashCommandPermissions || getSlashCommandPermissions,
    getSlashCommands: options.getSlashCommands || getSlashCommands,
    getStageInstance: options.getStageInstance || getStageInstance,
    getTemplate: options.getTemplate || getTemplate,
    getUser: options.getUser || getUser,
    getApplicationInfo: options.getApplicationInfo || getApplicationInfo,
    getVanityURL: options.getVanityURL || getVanityURL,
    getVoiceRegions: options.getVoiceRegions || getVoiceRegions,
    getWebhook: options.getWebhook || getWebhook,
    getWebhookMessage: options.getWebhookMessage || getWebhookMessage,
    getWebhooks: options.getWebhooks || getWebhooks,
    getWebhookWithToken: options.getWebhookWithToken || getWebhookWithToken,
    getWelcomeScreen: options.getWelcomeScreen || getWelcomeScreen,
    getWidget: options.getWidget || getWidget,
    getWidgetImageURL: options.getWidgetImageURL || getWidgetImageURL,
    getWidgetSettings: options.getWidgetSettings || getWidgetSettings,
    guildBannerURL: options.guildBannerURL || guildBannerURL,
    guildIconURL: options.guildIconURL || guildIconURL,
    guildSplashURL: options.guildSplashURL || guildSplashURL,
    isButton: options.isButton || isButton,
    isSelectMenu: options.isSelectMenu || isSelectMenu,
    isSlashCommand: options.isSlashCommand || isSlashCommand,
    isChannelSynced: options.isChannelSynced || isChannelSynced,
    kick: options.kick || kick,
    kickMember: options.kickMember || kickMember,
    leaveGuild: options.leaveGuild || leaveGuild,
    moveMember: options.moveMember || moveMember,
    pin: options.pin || pin,
    pinMessage: options.pinMessage || pinMessage,
    pruneMembers: options.pruneMembers || pruneMembers,
    publishMessage: options.publishMessage || publishMessage,
    removeAllReactions: options.removeAllReactions || removeAllReactions,
    removeDiscoverySubcategory: options.removeDiscoverySubcategory || removeDiscoverySubcategory,
    removeReaction: options.removeReaction || removeReaction,
    removeReactionEmoji: options.removeReactionEmoji || removeReactionEmoji,
    removeRole: options.removeRole || removeRole,
    sendDirectMessage: options.sendDirectMessage || sendDirectMessage,
    sendInteractionResponse: options.sendInteractionResponse || sendInteractionResponse,
    sendMessage: options.sendMessage || sendMessage,
    sendWebhook: options.sendWebhook || sendWebhook,
    startTyping: options.startTyping || startTyping,
    swapChannels: options.swapChannels || swapChannels,
    syncGuildTemplate: options.syncGuildTemplate || syncGuildTemplate,
    unban: options.unban || unban,
    unbanMember: options.unbanMember || unbanMember,
    unpin: options.unpin || unpin,
    unpinMessage: options.unpinMessage || unpinMessage,
    updateBotVoiceState: options.updateBotVoiceState || updateBotVoiceState,
    updateStageInstance: options.updateStageInstance || updateStageInstance,
    upsertSlashCommand: options.upsertSlashCommand || upsertSlashCommand,
    upsertSlashCommands: options.upsertSlashCommands || upsertSlashCommands,
    validDiscoveryTerm: options.validDiscoveryTerm || validDiscoveryTerm,
    addToThread: options.addToThread || addToThread,
    archiveThread: options.archiveThread || archiveThread,
    deleteThread: options.deleteThread || deleteThread,
    editThread: options.editThread || editThread,
    getActiveThreads: options.getActiveThreads || getActiveThreads,
    getArchivedThreads: options.getArchivedThreads || getArchivedThreads,
    getThreadMembers: options.getThreadMembers || getThreadMembers,
    joinThread: options.joinThread || joinThread,
    leaveThread: options.leaveThread || leaveThread,
    lockThread: options.lockThread || lockThread,
    removeThreadMember: options.removeThreadMember || removeThreadMember,
    startPrivateThread: options.startPrivateThread || startPrivateThread,
    startThread: options.startThread || startThread,
    unarchiveThread: options.unarchiveThread || unarchiveThread,
    unlockThread: options.unlockThread || unlockThread,
    suppressEmbeds: options.suppressEmbeds || suppressEmbeds,
  };
}

export interface Transformers {
  snowflake: typeof snowflakeToBigint;
  channel: typeof transformChannel;
  guild: typeof transformGuild;
  user: typeof transformUser;
  member: typeof transformMember;
  message: typeof transformMessage;
  role: typeof transformRole;
  voiceState: typeof transformVoiceState;
  interaction: typeof transformInteraction;
  integration: typeof transformIntegration;
  invite: typeof transformInvite;
  application: typeof transformApplication;
  team: typeof transformTeam;
  emoji: typeof transformEmoji;
  activity: typeof transformActivity;
  presence: typeof transformPresence;
}

export function createTransformers(options: Partial<Transformers>) {
  return {
    activity: options.activity || transformActivity,
    application: options.application || transformApplication,
    channel: options.channel || transformChannel,
    emoji: options.emoji || transformEmoji,
    guild: options.guild || transformGuild,
    integration: options.integration || transformIntegration,
    interaction: options.interaction || transformInteraction,
    invite: options.invite || transformInvite,
    member: options.member || transformMember,
    message: options.message || transformMessage,
    presence: options.presence || transformPresence,
    role: options.role || transformRole,
    user: options.user || transformUser,
    team: options.team || transformTeam,
    voiceState: options.voiceState || transformVoiceState,
    snowflake: options.snowflake || snowflakeToBigint,
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
    editedMessages: Collection<bigint, string>;
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
  interactionCreate: (bot: Bot, interaction: DiscordenoInteraction) => any;
  integrationCreate: (bot: Bot, integration: DiscordenoIntegration) => any;
  integrationDelete: (bot: Bot, payload: { id: bigint; guildId: bigint; applicationId?: bigint }) => any;
  integrationUpdate: (bot: Bot, payload: { guildId: bigint }) => any;
  inviteCreate: (bot: Bot, invite: DiscordenoInvite) => any;
  inviteDelete: (
    bot: Bot,
    payload: {
      channelId: bigint;
      guildId?: bigint;
      code: string;
    }
  ) => any;
  guildMemberAdd: (bot: Bot, member: DiscordenoMember, user: DiscordenoUser) => any;
  guildMemberRemove: (bot: Bot, user: DiscordenoUser, guildId: bigint) => any;
  guildMemberUpdate: (bot: Bot, member: DiscordenoMember, user: DiscordenoUser) => any;
  messageCreate: (bot: Bot, message: DiscordenoMessage) => any;
  messageDelete: (
    bot: Bot,
    payload: { id: bigint; channelId: bigint; guildId?: bigint },
    message?: DiscordenoMessage
  ) => any;
  messageUpdate: (bot: Bot, message: DiscordenoMessage, oldMessage?: DiscordenoMessage) => any;
  reactionAdd: (
    bot: Bot,
    payload: {
      userId: bigint;
      channelId: bigint;
      messageId: bigint;
      guildId?: bigint;
      member?: DiscordenoMember;
      emoji: DiscordenoEmoji;
    }
  ) => any;
  reactionRemove: (
    bot: Bot,
    payload: {
      userId: bigint;
      channelId: bigint;
      messageId: bigint;
      guildId?: bigint;
      emoji: DiscordenoEmoji;
    }
  ) => any;
  reactionRemoveEmoji: (
    bot: Bot,
    payload: {
      channelId: bigint;
      messageId: bigint;
      guildId?: bigint;
      emoji: DiscordenoEmoji;
    }
  ) => any;
  reactionRemoveAll: (
    bot: Bot,
    payload: {
      channelId: bigint;
      messageId: bigint;
      guildId?: bigint;
    }
  ) => any;
  presenceUpdate: (bot: Bot, presence: DiscordenoPresence, oldPresence?: DiscordenoPresence) => any;
  voiceServerUpdate: (bot: Bot, payload: { token: string; endpoint?: string; guildId: bigint }) => any;
  voiceStateUpdate: (
    bot: Bot,
    voiceState: DiscordenoVoiceState,
    payload: { guild?: DiscordenoGuild; member?: DiscordenoMember; user?: DiscordenoUser }
  ) => any;
  channelCreate: (bot: Bot, channel: DiscordenoChannel) => any;
  dispatchRequirements: (bot: Bot, data: GatewayPayload, shardId: number) => any;
  voiceChannelLeave: (
    bot: Bot,
    voiceState: DiscordenoVoiceState,
    guild: DiscordenoGuild,
    channel?: DiscordenoChannel
  ) => any;
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
    Errors,
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

export function createBotGatewayHandlers(
  options: Partial<BotGatewayHandlerOptions>
): Record<GatewayDispatchEventNames | "GUILD_LOADED_DD", (bot: Bot, data: GatewayPayload, shardId: number) => any> {
  return {
    // misc
    READY: options.READY ?? handleReady,
    // channels
    CHANNEL_CREATE: options.CHANNEL_CREATE ?? handleChannelCreate,
    CHANNEL_DELETE: options.CHANNEL_DELETE ?? handleChannelDelete,
    CHANNEL_PINS_UPDATE: options.CHANNEL_PINS_UPDATE ?? handleChannelPinsUpdate,
    CHANNEL_UPDATE: options.CHANNEL_UPDATE ?? handleChannelUpdate,
    // THREAD_CREATE: options.THREAD_CREATE ?? handleThreadCreate,
    // THREAD_UPDATE: options.THREAD_UPDATE ?? handleThreadUpdate,
    // THREAD_DELETE: options.THREAD_DELETE ?? handleThreadDelete,
    // THREAD_LIST_SYNC: options.THREAD_LIST_SYNC ?? handleThreadListSync,
    // THREAD_MEMBER_UPDATE: options.THREAD_MEMBER_UPDATE ?? handleThreadMemberUpdate,
    // THREAD_MEMBERS_UPDATE: options.THREAD_MEMBERS_UPDATE ?? handleThreadMembersUpdate,
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
