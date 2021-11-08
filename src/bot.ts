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
  botHasChannelPermissions,
  calculateBits,
  isHigherPosition,
  requireOverwritePermissions,
  calculatePermissions,
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
import { DiscordGatewayIntents, Intents } from "./types/gateway/gateway_intents.ts";
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
  DiscordenoRole,
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
  spawnShards,
  createShard,
  identify,
  heartbeat,
  tellClusterToIdentify,
  sendShardMessage,
  DiscordenoShard,
  processGatewayQueue,
} from "./ws/mod.ts";
import { validateLength } from "./util/validate_length.ts";
import {
  delay,
  formatImageURL,
  hasProperty,
  validateComponents,
  validateSlashCommands,
  validateSlashOptionChoices,
  validateSlashOptions,
} from "./util/utils.ts";
import { iconBigintToHash, iconHashToBigInt } from "./util/hash.ts";
import { calculateShardId } from "./util/calculate_shard_id.ts";
import * as handlers from "./handlers/mod.ts";
import { DiscordenoInteraction, transformInteraction } from "./transformers/interaction.ts";
import { DiscordenoIntegration, transformIntegration } from "./transformers/integration.ts";
import { Emoji } from "./types/emojis/emoji.ts";
import { transformApplication } from "./transformers/application.ts";
import { transformTeam } from "./transformers/team.ts";
import { DiscordenoInvite, transformInvite } from "./transformers/invite.ts";
import * as helpers from "./helpers/mod.ts";
import { DiscordenoEmoji, transformEmoji } from "./transformers/emoji.ts";
import { transformActivity } from "./transformers/activity.ts";
import { DiscordenoPresence, transformPresence } from "./transformers/presence.ts";
import { DiscordReady } from "./types/gateway/ready.ts";
import { urlToBase64 } from "./util/url_to_base64.ts";
import { transformAttachment } from "./transformers/attachment.ts";
import { transformEmbed } from "./transformers/embed.ts";
import { transformComponent } from "./transformers/component.ts";
import { AsyncCache, AsyncCacheHandler, Cache, CacheHandler, createCache, TableNames } from "./cache.ts";
import { transformThread } from "./transformers/thread.ts";
import { transformWebhook } from "./transformers/webhook.ts";
import { transformAuditlogEntry } from "./transformers/auditlogEntry.ts";
import { transformApplicationCommandPermission } from "./transformers/applicationCommandPermission.ts";

type CacheOptions =
  | {
      isAsync: true;
      // deno-lint-ignore no-explicit-any
      customTableCreator: (tableName: TableNames) => AsyncCacheHandler<any>;
    }
  | {
      isAsync: false;
      // deno-lint-ignore no-explicit-any
      customTableCreator?: (tableName: TableNames) => CacheHandler<any>;
    };

export function createBot<C extends CacheOptions = CacheOptions>(
  options: CreateBotOptions<C>
): Bot<C extends { isAsync: true } ? AsyncCache : Cache> {
  return {
    id: options.botId,
    applicationId: options.applicationId || options.botId,
    token: `Bot ${options.token}`,
    events: createEventHandlers(options.events),
    intents: options.intents.reduce((bits, next) => (bits |= DiscordGatewayIntents[next]), 0),
    botGatewayData: options.botGatewayData,
    isReady: false,
    activeGuildIds: new Set<bigint>(),
    constants: createBotConstants(),
    handlers: createBotGatewayHandlers({}),
    // @ts-ignore b quiet
    cache: createCache(options?.cache?.isAsync ?? false, options?.cache?.customTableCreator),
  } as unknown as Bot<C extends { isAsync: true } ? AsyncCache : Cache>;
}

export function createEventHandlers(events: Partial<EventHandlers>): EventHandlers {
  function ignore() {}

  return {
    debug: events.debug ?? ignore,
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
    roleCreate: events.roleCreate ?? ignore,
    roleDelete: events.roleDelete ?? ignore,
    roleUpdate: events.roleUpdate ?? ignore,
    webhooksUpdate: events.webhooksUpdate ?? ignore,
    botUpdate: events.botUpdate ?? ignore,
    typingStart: events.typingStart ?? ignore,
  };
}

export interface CreateRestManagerOptions {
  token: string;
  customUrl?: string;
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
  const version = options.version || "9";

  if (options.customUrl) {
    baseEndpoints.BASE_URL = `${options.customUrl}/v${version}`;
  }

  return {
    version,
    token: `${options.token.startsWith("Bot ") ? "" : "Bot "}${options.token}`,
    maxRetryCount: options.maxRetryCount || 10,
    secretKey: options.secretKey || "discordeno_best_lib_ever",
    customUrl: options.customUrl || "",
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
  bot.helpers = createHelpers(bot);

  // START REST
  bot.rest = createRestManager({ token: bot.token, debug: bot.events.debug });
  if (!bot.botGatewayData) bot.botGatewayData = await bot.helpers.getGatewayBot();

  // START WS
  bot.gateway = createGatewayManager({
    token: bot.token,
    intents: bot.intents,
    urlWSS: bot.botGatewayData.url,
    shardsRecommended: bot.botGatewayData.shards,
    sessionStartLimitTotal: bot.botGatewayData.sessionStartLimit.total,
    sessionStartLimitRemaining: bot.botGatewayData.sessionStartLimit.remaining,
    sessionStartLimitResetAfter: bot.botGatewayData.sessionStartLimit.resetAfter,
    maxConcurrency: bot.botGatewayData.sessionStartLimit.maxConcurrency,
    lastShardId: bot.botGatewayData.shards,
    maxShards: bot.botGatewayData.shards,
    debug: bot.events.debug,
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

  bot.gateway.spawnShards(bot.gateway);
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
    hasProperty,
    urlToBase64,
    botHasChannelPermissions,
    calculateBits,
    isHigherPosition,
    formatImageURL,
    validateSlashCommands,
    requireOverwritePermissions,
    calculatePermissions,
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
  botHasChannelPermissions: typeof botHasChannelPermissions;
  validateComponents: typeof validateComponents;
  hasProperty: typeof hasProperty;
  urlToBase64: typeof urlToBase64;
  calculateBits: typeof calculateBits;
  isHigherPosition: typeof isHigherPosition;
  formatImageURL: typeof formatImageURL;
  validateSlashCommands: typeof validateSlashCommands;
  requireOverwritePermissions: typeof requireOverwritePermissions;
  calculatePermissions: typeof calculatePermissions;
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
    maxShards: options.maxShards ?? options.shardsRecommended ?? 0,
    useOptimalLargeBotSharding: options.useOptimalLargeBotSharding ?? true,
    shardsPerCluster: options.shardsPerCluster ?? 25,
    maxClusters: options.maxClusters ?? 4,
    firstShardId: options.firstShardId ?? 0,
    lastShardId: options.lastShardId ?? options.maxShards ?? options.shardsRecommended ?? 1,
    token: options.token ?? "",
    compress: options.compress ?? false,
    $os: options.$os ?? "linux",
    $browser: options.$browser ?? "Discordeno",
    $device: options.$device ?? "Discordeno",
    intents:
      (Array.isArray(options.intents)
        ? options.intents.reduce((bits, next) => (bits |= DiscordGatewayIntents[next]), 0)
        : options.intents) ?? 0,
    shard: options.shard ?? [0, options.shardsRecommended ?? 1],
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

    spawnShards,
    createShard,
    identify,
    heartbeat,
    tellClusterToIdentify,
    debug: options.debug || function () {},
    resharder,
    handleOnMessage,
    processGatewayQueue,
    closeWS,
    sendShardMessage,
    resume,
    handleDiscordPayload: options.handleDiscordPayload,
  };
}

export async function stopBot(bot: Bot) {
  // STOP WS
  bot.gateway.shards.forEach((shard) => {
    clearInterval(shard.heartbeat.intervalId);
    bot.gateway.closeWS(shard.ws, 3061, "Discordeno Testing Finished! Do Not RESUME!");
  });

  await delay(5000);

  return bot;
}

export interface CreateBotOptions<C extends CacheOptions = CacheOptions> {
  token: string;
  botId: bigint;
  applicationId?: bigint;
  events: Partial<EventHandlers>;
  intents: (keyof typeof DiscordGatewayIntents)[];
  botGatewayData?: GetGatewayBot;
  rest?: Omit<CreateRestManagerOptions, "token">;
  cache: C;
}

export type UnPromise<T extends Promise<unknown>> = T extends Promise<infer K> ? K : never;

// export type CreatedBot = ReturnType<typeof createBot>;

// export type Bot = CreatedBot & {
//   utils: HelperUtils;
//   rest: RestManager;
//   gateway: GatewayManager;
//   transformers: Transformers;
//   helpers: Helpers;
// };

export interface Bot<C extends Cache | AsyncCache = AsyncCache | Cache> {
  id: bigint;
  applicationId: bigint;

  token: string;
  intents: DiscordGatewayIntents;
  urlWSS: string;
  botGatewayData?: GetGatewayBot;
  utils: ReturnType<typeof createUtils>;
  transformers: ReturnType<typeof createTransformers>;
  helpers: ReturnType<typeof createHelpers>;
  rest: ReturnType<typeof createRestManager>;
  gateway: ReturnType<typeof createGatewayManager>;
  events: EventHandlers;
  handlers: ReturnType<typeof createBotGatewayHandlers>;
  isReady: boolean;
  activeGuildIds: Set<bigint>;
  constants: ReturnType<typeof createBotConstants>;
  cache: C;
}

export interface Helpers {
  addDiscoverySubcategory: typeof helpers.addDiscoverySubcategory;
  addReaction: typeof helpers.addReaction;
  addReactions: typeof helpers.addReactions;
  addRole: typeof helpers.addRole;
  avatarURL: typeof helpers.avatarURL;
  ban: typeof helpers.ban;
  banMember: typeof helpers.banMember;
  batchEditSlashCommandPermissions: typeof helpers.batchEditSlashCommandPermissions;
  categoryChildren: typeof helpers.categoryChildren;
  channelOverwriteHasPermission: typeof helpers.channelOverwriteHasPermission;
  cloneChannel: typeof helpers.cloneChannel;
  connectToVoiceChannel: typeof helpers.connectToVoiceChannel;
  createChannel: typeof helpers.createChannel;
  createEmoji: typeof helpers.createEmoji;
  createGuild: typeof helpers.createGuild;
  createGuildFromTemplate: typeof helpers.createGuildFromTemplate;
  createGuildTemplate: typeof helpers.createGuildTemplate;
  createInvite: typeof helpers.createInvite;
  createRole: typeof helpers.createRole;
  createSlashCommand: typeof helpers.createSlashCommand;
  createStageInstance: typeof helpers.createStageInstance;
  createWebhook: typeof helpers.createWebhook;
  deleteChannel: typeof helpers.deleteChannel;
  deleteChannelOverwrite: typeof helpers.deleteChannelOverwrite;
  deleteEmoji: typeof helpers.deleteEmoji;
  deleteGuild: typeof helpers.deleteGuild;
  deleteGuildTemplate: typeof helpers.deleteGuildTemplate;
  deleteIntegration: typeof helpers.deleteIntegration;
  deleteInvite: typeof helpers.deleteInvite;
  deleteMessage: typeof helpers.deleteMessage;
  deleteMessages: typeof helpers.deleteMessages;
  deleteRole: typeof helpers.deleteRole;
  deleteSlashCommand: typeof helpers.deleteSlashCommand;
  deleteSlashResponse: typeof helpers.deleteSlashResponse;
  deleteStageInstance: typeof helpers.deleteStageInstance;
  deleteWebhook: typeof helpers.deleteWebhook;
  deleteWebhookMessage: typeof helpers.deleteWebhookMessage;
  deleteWebhookWithToken: typeof helpers.deleteWebhookWithToken;
  disconnectMember: typeof helpers.disconnectMember;
  editBotNickname: typeof helpers.editBotNickname;
  editBotProfile: typeof helpers.editBotProfile;
  editBotStatus: typeof helpers.editBotStatus;
  editChannel: typeof helpers.editChannel;
  editChannelOverwrite: typeof helpers.editChannelOverwrite;
  editDiscovery: typeof helpers.editDiscovery;
  editEmoji: typeof helpers.editEmoji;
  editGuild: typeof helpers.editGuild;
  editGuildTemplate: typeof helpers.editGuildTemplate;
  editMember: typeof helpers.editMember;
  editMessage: typeof helpers.editMessage;
  editRole: typeof helpers.editRole;
  editSlashResponse: typeof helpers.editSlashResponse;
  editSlashCommandPermissions: typeof helpers.editSlashCommandPermissions;
  editWebhook: typeof helpers.editWebhook;
  editWebhookMessage: typeof helpers.editWebhookMessage;
  editWebhookWithToken: typeof helpers.editWebhookWithToken;
  editWelcomeScreen: typeof helpers.editWelcomeScreen;
  editWidget: typeof helpers.editWidget;
  emojiURL: typeof helpers.emojiURL;
  fetchMembers: typeof helpers.fetchMembers;
  followChannel: typeof helpers.followChannel;
  getAuditLogs: typeof helpers.getAuditLogs;
  getAvailableVoiceRegions: typeof helpers.getAvailableVoiceRegions;
  getBan: typeof helpers.getBan;
  getBans: typeof helpers.getBans;
  getChannel: typeof helpers.getChannel;
  getChannelInvites: typeof helpers.getChannelInvites;
  getChannels: typeof helpers.getChannels;
  getChannelWebhooks: typeof helpers.getChannelWebhooks;
  getDiscoveryCategories: typeof helpers.getDiscoveryCategories;
  getEmoji: typeof helpers.getEmoji;
  getEmojis: typeof helpers.getEmojis;
  getGatewayBot: typeof helpers.getGatewayBot;
  getGuild: typeof helpers.getGuild;
  getGuildPreview: typeof helpers.getGuildPreview;
  getGuildTemplates: typeof helpers.getGuildTemplates;
  getIntegrations: typeof helpers.getIntegrations;
  getInvite: typeof helpers.getInvite;
  getInvites: typeof helpers.getInvites;
  getMember: typeof helpers.getMember;
  getMembers: typeof helpers.getMembers;
  getMessage: typeof helpers.getMessage;
  getMessages: typeof helpers.getMessages;
  getOriginalInteractionResponse: typeof helpers.getOriginalInteractionResponse;
  getPins: typeof helpers.getPins;
  getPruneCount: typeof helpers.getPruneCount;
  getReactions: typeof helpers.getReactions;
  getRoles: typeof helpers.getRoles;
  getSlashCommand: typeof helpers.getSlashCommand;
  getSlashCommandPermission: typeof helpers.getSlashCommandPermission;
  getSlashCommandPermissions: typeof helpers.getSlashCommandPermissions;
  getSlashCommands: typeof helpers.getSlashCommands;
  getStageInstance: typeof helpers.getStageInstance;
  getTemplate: typeof helpers.getTemplate;
  getUser: typeof helpers.getUser;
  getApplicationInfo: typeof helpers.getApplicationInfo;
  getVanityURL: typeof helpers.getVanityURL;
  getVoiceRegions: typeof helpers.getVoiceRegions;
  getWebhook: typeof helpers.getWebhook;
  getWebhookMessage: typeof helpers.getWebhookMessage;
  getWebhooks: typeof helpers.getWebhooks;
  getWebhookWithToken: typeof helpers.getWebhookWithToken;
  getWelcomeScreen: typeof helpers.getWelcomeScreen;
  getWidget: typeof helpers.getWidget;
  getWidgetImageURL: typeof helpers.getWidgetImageURL;
  getWidgetSettings: typeof helpers.getWidgetSettings;
  guildBannerURL: typeof helpers.guildBannerURL;
  guildIconURL: typeof helpers.guildIconURL;
  guildSplashURL: typeof helpers.guildSplashURL;
  isButton: typeof helpers.isButton;
  isSelectMenu: typeof helpers.isSelectMenu;
  isSlashCommand: typeof helpers.isSlashCommand;
  isChannelSynced: typeof helpers.isChannelSynced;
  kick: typeof helpers.kick;
  kickMember: typeof helpers.kickMember;
  leaveGuild: typeof helpers.leaveGuild;
  moveMember: typeof helpers.moveMember;
  pin: typeof helpers.pin;
  pinMessage: typeof helpers.pinMessage;
  pruneMembers: typeof helpers.pruneMembers;
  publishMessage: typeof helpers.publishMessage;
  removeAllReactions: typeof helpers.removeAllReactions;
  removeDiscoverySubcategory: typeof helpers.removeDiscoverySubcategory;
  removeReaction: typeof helpers.removeReaction;
  removeReactionEmoji: typeof helpers.removeReactionEmoji;
  removeRole: typeof helpers.removeRole;
  sendDirectMessage: typeof helpers.sendDirectMessage;
  sendInteractionResponse: typeof helpers.sendInteractionResponse;
  sendMessage: typeof helpers.sendMessage;
  sendWebhook: typeof helpers.sendWebhook;
  startTyping: typeof helpers.startTyping;
  swapChannels: typeof helpers.swapChannels;
  syncGuildTemplate: typeof helpers.syncGuildTemplate;
  unban: typeof helpers.unban;
  unbanMember: typeof helpers.unbanMember;
  unpin: typeof helpers.unpin;
  unpinMessage: typeof helpers.unpinMessage;
  updateBotVoiceState: typeof helpers.updateBotVoiceState;
  updateStageInstance: typeof helpers.updateStageInstance;
  upsertSlashCommand: typeof helpers.upsertSlashCommand;
  upsertSlashCommands: typeof helpers.upsertSlashCommands;
  validDiscoveryTerm: typeof helpers.validDiscoveryTerm;
  addToThread: typeof helpers.addToThread;
  archiveThread: typeof helpers.archiveThread;
  deleteThread: typeof helpers.deleteThread;
  editThread: typeof helpers.editThread;
  getActiveThreads: typeof helpers.getActiveThreads;
  getArchivedThreads: typeof helpers.getArchivedThreads;
  getThreadMembers: typeof helpers.getThreadMembers;
  joinThread: typeof helpers.joinThread;
  leaveThread: typeof helpers.leaveThread;
  lockThread: typeof helpers.lockThread;
  removeThreadMember: typeof helpers.removeThreadMember;
  startPrivateThread: typeof helpers.startPrivateThread;
  startThread: typeof helpers.startThread;
  unarchiveThread: typeof helpers.unarchiveThread;
  unlockThread: typeof helpers.unlockThread;
  suppressEmbeds: typeof helpers.suppressEmbeds;
}

export function createHelpers(bot: Bot, customHelpers?: Partial<Helpers>): FinalHelpers {
  const converted = {} as FinalHelpers;
  for (const [name, fun] of Object.entries({ ...createBaseHelpers(customHelpers || {}) })) {
    // @ts-ignore - TODO: make the types better
    converted[name as keyof FinalHelpers] = (...args: RemoveFirstFromTuple<Parameters<typeof fun>>) =>
      // @ts-ignore - TODO: make the types better
      fun(bot, ...args);
  }

  return converted;
}

export function createBaseHelpers(options: Partial<Helpers>) {
  return {
    addDiscoverySubcategory: options.addDiscoverySubcategory || helpers.addDiscoverySubcategory,
    addReaction: options.addReaction || helpers.addReaction,
    addReactions: options.addReactions || helpers.addReactions,
    addRole: options.addRole || helpers.addRole,
    avatarURL: options.avatarURL || helpers.avatarURL,
    ban: options.ban || helpers.ban,
    banMember: options.banMember || helpers.banMember,
    batchEditSlashCommandPermissions:
      options.batchEditSlashCommandPermissions || helpers.batchEditSlashCommandPermissions,
    categoryChildren: options.categoryChildren || helpers.categoryChildren,
    channelOverwriteHasPermission: options.channelOverwriteHasPermission || helpers.channelOverwriteHasPermission,
    cloneChannel: options.cloneChannel || helpers.cloneChannel,
    connectToVoiceChannel: options.connectToVoiceChannel || helpers.connectToVoiceChannel,
    createChannel: options.createChannel || helpers.createChannel,
    createEmoji: options.createEmoji || helpers.createEmoji,
    createGuild: options.createGuild || helpers.createGuild,
    createGuildFromTemplate: options.createGuildFromTemplate || helpers.createGuildFromTemplate,
    createGuildTemplate: options.createGuildTemplate || helpers.createGuildTemplate,
    createInvite: options.createInvite || helpers.createInvite,
    createRole: options.createRole || helpers.createRole,
    createSlashCommand: options.createSlashCommand || helpers.createSlashCommand,
    createStageInstance: options.createStageInstance || helpers.createStageInstance,
    createWebhook: options.createWebhook || helpers.createWebhook,
    deleteChannel: options.deleteChannel || helpers.deleteChannel,
    deleteChannelOverwrite: options.deleteChannelOverwrite || helpers.deleteChannelOverwrite,
    deleteEmoji: options.deleteEmoji || helpers.deleteEmoji,
    deleteGuild: options.deleteGuild || helpers.deleteGuild,
    deleteGuildTemplate: options.deleteGuildTemplate || helpers.deleteGuildTemplate,
    deleteIntegration: options.deleteIntegration || helpers.deleteIntegration,
    deleteInvite: options.deleteInvite || helpers.deleteInvite,
    deleteMessage: options.deleteMessage || helpers.deleteMessage,
    deleteMessages: options.deleteMessages || helpers.deleteMessages,
    deleteRole: options.deleteRole || helpers.deleteRole,
    deleteSlashCommand: options.deleteSlashCommand || helpers.deleteSlashCommand,
    deleteSlashResponse: options.deleteSlashResponse || helpers.deleteSlashResponse,
    deleteStageInstance: options.deleteStageInstance || helpers.deleteStageInstance,
    deleteWebhook: options.deleteWebhook || helpers.deleteWebhook,
    deleteWebhookMessage: options.deleteWebhookMessage || helpers.deleteWebhookMessage,
    deleteWebhookWithToken: options.deleteWebhookWithToken || helpers.deleteWebhookWithToken,
    disconnectMember: options.disconnectMember || helpers.disconnectMember,
    editBotNickname: options.editBotNickname || helpers.editBotNickname,
    editBotProfile: options.editBotProfile || helpers.editBotProfile,
    editBotStatus: options.editBotStatus || helpers.editBotStatus,
    editChannel: options.editChannel || helpers.editChannel,
    editChannelOverwrite: options.editChannelOverwrite || helpers.editChannelOverwrite,
    editDiscovery: options.editDiscovery || helpers.editDiscovery,
    editEmoji: options.editEmoji || helpers.editEmoji,
    editGuild: options.editGuild || helpers.editGuild,
    editGuildTemplate: options.editGuildTemplate || helpers.editGuildTemplate,
    editMember: options.editMember || helpers.editMember,
    editMessage: options.editMessage || helpers.editMessage,
    editRole: options.editRole || helpers.editRole,
    editSlashResponse: options.editSlashResponse || helpers.editSlashResponse,
    editSlashCommandPermissions: options.editSlashCommandPermissions || helpers.editSlashCommandPermissions,
    editWebhook: options.editWebhook || helpers.editWebhook,
    editWebhookMessage: options.editWebhookMessage || helpers.editWebhookMessage,
    editWebhookWithToken: options.editWebhookWithToken || helpers.editWebhookWithToken,
    editWelcomeScreen: options.editWelcomeScreen || helpers.editWelcomeScreen,
    editWidget: options.editWidget || helpers.editWidget,
    emojiURL: options.emojiURL || helpers.emojiURL,
    fetchMembers: options.fetchMembers || helpers.fetchMembers,
    followChannel: options.followChannel || helpers.followChannel,
    getAuditLogs: options.getAuditLogs || helpers.getAuditLogs,
    getAvailableVoiceRegions: options.getAvailableVoiceRegions || helpers.getAvailableVoiceRegions,
    getBan: options.getBan || helpers.getBan,
    getBans: options.getBans || helpers.getBans,
    getChannel: options.getChannel || helpers.getChannel,
    getChannelInvites: options.getChannelInvites || helpers.getChannelInvites,
    getChannels: options.getChannels || helpers.getChannels,
    getChannelWebhooks: options.getChannelWebhooks || helpers.getChannelWebhooks,
    getDiscoveryCategories: options.getDiscoveryCategories || helpers.getDiscoveryCategories,
    getEmoji: options.getEmoji || helpers.getEmoji,
    getEmojis: options.getEmojis || helpers.getEmojis,
    getGatewayBot: options.getGatewayBot || helpers.getGatewayBot,
    getGuild: options.getGuild || helpers.getGuild,
    getGuildPreview: options.getGuildPreview || helpers.getGuildPreview,
    getGuildTemplates: options.getGuildTemplates || helpers.getGuildTemplates,
    getIntegrations: options.getIntegrations || helpers.getIntegrations,
    getInvite: options.getInvite || helpers.getInvite,
    getInvites: options.getInvites || helpers.getInvites,
    getMember: options.getMember || helpers.getMember,
    getMembers: options.getMembers || helpers.getMembers,
    getMessage: options.getMessage || helpers.getMessage,
    getMessages: options.getMessages || helpers.getMessages,
    getOriginalInteractionResponse: options.getOriginalInteractionResponse || helpers.getOriginalInteractionResponse,
    getPins: options.getPins || helpers.getPins,
    getPruneCount: options.getPruneCount || helpers.getPruneCount,
    getReactions: options.getReactions || helpers.getReactions,
    getRoles: options.getRoles || helpers.getRoles,
    getSlashCommand: options.getSlashCommand || helpers.getSlashCommand,
    getSlashCommandPermission: options.getSlashCommandPermission || helpers.getSlashCommandPermission,
    getSlashCommandPermissions: options.getSlashCommandPermissions || helpers.getSlashCommandPermissions,
    getSlashCommands: options.getSlashCommands || helpers.getSlashCommands,
    getStageInstance: options.getStageInstance || helpers.getStageInstance,
    getTemplate: options.getTemplate || helpers.getTemplate,
    getUser: options.getUser || helpers.getUser,
    getApplicationInfo: options.getApplicationInfo || helpers.getApplicationInfo,
    getVanityURL: options.getVanityURL || helpers.getVanityURL,
    getVoiceRegions: options.getVoiceRegions || helpers.getVoiceRegions,
    getWebhook: options.getWebhook || helpers.getWebhook,
    getWebhookMessage: options.getWebhookMessage || helpers.getWebhookMessage,
    getWebhooks: options.getWebhooks || helpers.getWebhooks,
    getWebhookWithToken: options.getWebhookWithToken || helpers.getWebhookWithToken,
    getWelcomeScreen: options.getWelcomeScreen || helpers.getWelcomeScreen,
    getWidget: options.getWidget || helpers.getWidget,
    getWidgetImageURL: options.getWidgetImageURL || helpers.getWidgetImageURL,
    getWidgetSettings: options.getWidgetSettings || helpers.getWidgetSettings,
    guildBannerURL: options.guildBannerURL || helpers.guildBannerURL,
    guildIconURL: options.guildIconURL || helpers.guildIconURL,
    guildSplashURL: options.guildSplashURL || helpers.guildSplashURL,
    isButton: options.isButton || helpers.isButton,
    isSelectMenu: options.isSelectMenu || helpers.isSelectMenu,
    isSlashCommand: options.isSlashCommand || helpers.isSlashCommand,
    isChannelSynced: options.isChannelSynced || helpers.isChannelSynced,
    kick: options.kick || helpers.kick,
    kickMember: options.kickMember || helpers.kickMember,
    leaveGuild: options.leaveGuild || helpers.leaveGuild,
    moveMember: options.moveMember || helpers.moveMember,
    pin: options.pin || helpers.pin,
    pinMessage: options.pinMessage || helpers.pinMessage,
    pruneMembers: options.pruneMembers || helpers.pruneMembers,
    publishMessage: options.publishMessage || helpers.publishMessage,
    removeAllReactions: options.removeAllReactions || helpers.removeAllReactions,
    removeDiscoverySubcategory: options.removeDiscoverySubcategory || helpers.removeDiscoverySubcategory,
    removeReaction: options.removeReaction || helpers.removeReaction,
    removeReactionEmoji: options.removeReactionEmoji || helpers.removeReactionEmoji,
    removeRole: options.removeRole || helpers.removeRole,
    sendDirectMessage: options.sendDirectMessage || helpers.sendDirectMessage,
    sendInteractionResponse: options.sendInteractionResponse || helpers.sendInteractionResponse,
    sendMessage: options.sendMessage || helpers.sendMessage,
    sendWebhook: options.sendWebhook || helpers.sendWebhook,
    startTyping: options.startTyping || helpers.startTyping,
    swapChannels: options.swapChannels || helpers.swapChannels,
    syncGuildTemplate: options.syncGuildTemplate || helpers.syncGuildTemplate,
    unban: options.unban || helpers.unban,
    unbanMember: options.unbanMember || helpers.unbanMember,
    unpin: options.unpin || helpers.unpin,
    unpinMessage: options.unpinMessage || helpers.unpinMessage,
    updateBotVoiceState: options.updateBotVoiceState || helpers.updateBotVoiceState,
    updateStageInstance: options.updateStageInstance || helpers.updateStageInstance,
    upsertSlashCommand: options.upsertSlashCommand || helpers.upsertSlashCommand,
    upsertSlashCommands: options.upsertSlashCommands || helpers.upsertSlashCommands,
    validDiscoveryTerm: options.validDiscoveryTerm || helpers.validDiscoveryTerm,
    addToThread: options.addToThread || helpers.addToThread,
    archiveThread: options.archiveThread || helpers.archiveThread,
    deleteThread: options.deleteThread || helpers.deleteThread,
    editThread: options.editThread || helpers.editThread,
    getActiveThreads: options.getActiveThreads || helpers.getActiveThreads,
    getArchivedThreads: options.getArchivedThreads || helpers.getArchivedThreads,
    getThreadMembers: options.getThreadMembers || helpers.getThreadMembers,
    joinThread: options.joinThread || helpers.joinThread,
    leaveThread: options.leaveThread || helpers.leaveThread,
    lockThread: options.lockThread || helpers.lockThread,
    removeThreadMember: options.removeThreadMember || helpers.removeThreadMember,
    startPrivateThread: options.startPrivateThread || helpers.startPrivateThread,
    startThread: options.startThread || helpers.startThread,
    unarchiveThread: options.unarchiveThread || helpers.unarchiveThread,
    unlockThread: options.unlockThread || helpers.unlockThread,
    suppressEmbeds: options.suppressEmbeds || helpers.suppressEmbeds,
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
  attachment: typeof transformAttachment;
  embed: typeof transformEmbed;
  component: typeof transformComponent;
  thread: typeof transformThread;
  webhook: typeof transformWebhook;
  auditlogEntry: typeof transformAuditlogEntry;
  applicationCommandPermission: typeof transformApplicationCommandPermission
}

export function createTransformers(options: Partial<Transformers>) {
  return {
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
    invite: options.invite || transformInvite,
    member: options.member || transformMember,
    message: options.message || transformMessage,
    presence: options.presence || transformPresence,
    role: options.role || transformRole,
    user: options.user || transformUser,
    team: options.team || transformTeam,
    thread: options.thread || transformThread,
    voiceState: options.voiceState || transformVoiceState,
    snowflake: options.snowflake || snowflakeToBigint,
    webhook: options.webhook || transformWebhook,
    auditlogEntry: options.auditlogEntry || transformAuditlogEntry,
    applicationCommandPermission: transformApplicationCommandPermission
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
  /** The amount of shards to load per worker. */
  shardsPerCluster: number;
  /** The maximum amount of workers to use for your bot. */
  maxClusters: number;
  /** The first shard Id to start spawning. */
  firstShardId: number;
  /** The last shard Id for this worker. */
  lastShardId: number;
  token: string;
  compress: boolean;
  $os: string;
  $browser: string;
  $device: string;
  intents: number | (keyof typeof DiscordGatewayIntents)[];
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
  /** Stored as bucketId: { workers: [workerId, [ShardIds]], createNextShard: boolean } */
  buckets: Collection<
    number,
    {
      workers: number[][];
      createNextShard: (() => Promise<unknown>)[];
    }
  >;
  utf8decoder: TextDecoder;

  cache: {
    guildIds: Set<bigint>;
    loadingGuildIds: Set<bigint>;
    editedMessages: Collection<bigint, string>;
  };

  // METHODS

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
  /** Tell the worker to begin identifying this shard  */
  tellClusterToIdentify: typeof tellClusterToIdentify;
  /** Handle the different logs. Used for debugging. */
  debug: (text: string, ...args: any[]) => unknown;
  /** Handles resharding the bot when necessary. */
  resharder: typeof resharder;
  /** Handles the message events from websocket. */
  handleOnMessage: typeof handleOnMessage;
  /** Handles processing queue of requests send to this shard. */
  processGatewayQueue: typeof processGatewayQueue;
  /** Closes shard WebSocket connection properly. */
  closeWS: typeof closeWS;
  /** Properly adds a message to the shards queue. */
  sendShardMessage: typeof sendShardMessage;
  /** Properly resume an old shards session. */
  resume: typeof resume;
}

export interface EventHandlers {
  debug: (text: string, ...args: any[]) => unknown;
  ready: (
    bot: Bot,
    payload: {
      shardId: number;
      v: number;
      user: DiscordenoUser;
      guilds: bigint[];
      sessionId: string;
      shard?: number[];
      applicationId: bigint;
    },
    rawPayload: DiscordReady
  ) => any;
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
  roleCreate: (bot: Bot, guild: DiscordenoGuild, role: DiscordenoRole) => any;
  roleDelete: (bot: Bot, guild: DiscordenoGuild, role: DiscordenoRole) => any;
  roleUpdate: (bot: Bot, guild: DiscordenoGuild, role: DiscordenoRole, oldRole?: DiscordenoRole) => any;
  webhooksUpdate: (bot: Bot, payload: { channelId: bigint; guildId: bigint }) => any;
  botUpdate: (bot: Bot, user: DiscordenoUser) => any;
  typingStart: (
    bot: Bot,
    payload: {
      guildId: bigint | undefined;
      channelId: bigint;
      userId: bigint;
      timestamp: number;
      member: DiscordenoMember | undefined;
    }
  ) => any;
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
  READY: typeof handlers.handleReady;
  CHANNEL_CREATE: typeof handlers.handleChannelCreate;
  CHANNEL_DELETE: typeof handlers.handleChannelDelete;
  CHANNEL_PINS_UPDATE: typeof handlers.handleChannelPinsUpdate;
  CHANNEL_UPDATE: typeof handlers.handleChannelUpdate;
  THREAD_CREATE: typeof handlers.handleThreadCreate;
  THREAD_UPDATE: typeof handlers.handleThreadUpdate;
  THREAD_DELETE: typeof handlers.handleThreadDelete;
  THREAD_LIST_SYNC: typeof handlers.handleThreadListSync;
  THREAD_MEMBER_UPDATE: typeof handlers.handleThreadMemberUpdate;
  THREAD_MEMBERS_UPDATE: typeof handlers.handleThreadMembersUpdate;
  STAGE_INSTANCE_CREATE: typeof handlers.handleStageInstanceCreate;
  STAGE_INSTANCE_UPDATE: typeof handlers.handleStageInstanceUpdate;
  STAGE_INSTANCE_DELETE: typeof handlers.handleStageInstanceDelete;
  GUILD_BAN_ADD: typeof handlers.handleGuildBanAdd;
  GUILD_BAN_REMOVE: typeof handlers.handleGuildBanRemove;
  GUILD_CREATE: typeof handlers.handleGuildCreate;
  GUILD_LOADED_DD: typeof handlers.handleGuildLoaded;
  GUILD_DELETE: typeof handlers.handleGuildDelete;
  GUILD_EMOJIS_UPDATE: typeof handlers.handleGuildEmojisUpdate;
  GUILD_INTEGRATIONS_UPDATE: typeof handlers.handleGuildIntegrationsUpdate;
  GUILD_MEMBER_ADD: typeof handlers.handleGuildMemberAdd;
  GUILD_MEMBER_REMOVE: typeof handlers.handleGuildMemberRemove;
  GUILD_MEMBER_UPDATE: typeof handlers.handleGuildMemberUpdate;
  GUILD_MEMBERS_CHUNK: typeof handlers.handleGuildMembersChunk;
  GUILD_ROLE_CREATE: typeof handlers.handleGuildRoleCreate;
  GUILD_ROLE_DELETE: typeof handlers.handleGuildRoleDelete;
  GUILD_ROLE_UPDATE: typeof handlers.handleGuildRoleUpdate;
  GUILD_UPDATE: typeof handlers.handleGuildUpdate;
  INTERACTION_CREATE: typeof handlers.handleInteractionCreate;
  INVITE_CREATE: typeof handlers.handleInviteCreate;
  INVITE_DELETE: typeof handlers.handleInviteCreate;
  MESSAGE_CREATE: typeof handlers.handleMessageCreate;
  MESSAGE_DELETE_BULK: typeof handlers.handleMessageDeleteBulk;
  MESSAGE_DELETE: typeof handlers.handleMessageDelete;
  MESSAGE_REACTION_ADD: typeof handlers.handleMessageReactionAdd;
  MESSAGE_REACTION_REMOVE_ALL: typeof handlers.handleMessageReactionRemoveAll;
  MESSAGE_REACTION_REMOVE_EMOJI: typeof handlers.handleMessageReactionRemoveEmoji;
  MESSAGE_REACTION_REMOVE: typeof handlers.handleMessageReactionRemove;
  MESSAGE_UPDATE: typeof handlers.handleMessageUpdate;
  PRESENCE_UPDATE: typeof handlers.handlePresenceUpdate;
  TYPING_START: typeof handlers.handleTypingStart;
  USER_UPDATE: typeof handlers.handleUserUpdate;
  VOICE_SERVER_UPDATE: typeof handlers.handleVoiceServerUpdate;
  VOICE_STATE_UPDATE: typeof handlers.handleVoiceStateUpdate;
  WEBHOOKS_UPDATE: typeof handlers.handleWebhooksUpdate;
  INTEGRATION_CREATE: typeof handlers.handleIntegrationCreate;
  INTEGRATION_UPDATE: typeof handlers.handleIntegrationUpdate;
  INTEGRATION_DELETE: typeof handlers.handleIntegrationDelete;
}

export function createBotGatewayHandlers(
  options: Partial<BotGatewayHandlerOptions>
): Record<GatewayDispatchEventNames | "GUILD_LOADED_DD", (bot: Bot, data: GatewayPayload, shardId: number) => any> {
  return {
    // misc
    READY: options.READY ?? handlers.handleReady,
    // channels
    CHANNEL_CREATE: options.CHANNEL_CREATE ?? handlers.handleChannelCreate,
    CHANNEL_DELETE: options.CHANNEL_DELETE ?? handlers.handleChannelDelete,
    CHANNEL_PINS_UPDATE: options.CHANNEL_PINS_UPDATE ?? handlers.handleChannelPinsUpdate,
    CHANNEL_UPDATE: options.CHANNEL_UPDATE ?? handlers.handleChannelUpdate,
    // THREAD_CREATE: options.THREAD_CREATE ?? handlers.handleThreadCreate,
    // THREAD_UPDATE: options.THREAD_UPDATE ?? handlers.handleThreadUpdate,
    // THREAD_DELETE: options.THREAD_DELETE ?? handlers.handleThreadDelete,
    // THREAD_LIST_SYNC: options.THREAD_LIST_SYNC ?? handlers.handleThreadListSync,
    // THREAD_MEMBER_UPDATE: options.THREAD_MEMBER_UPDATE ?? handlers.handleThreadMemberUpdate,
    // THREAD_MEMBERS_UPDATE: options.THREAD_MEMBERS_UPDATE ?? handlers.handleThreadMembersUpdate,
    STAGE_INSTANCE_CREATE: options.STAGE_INSTANCE_CREATE ?? handlers.handleStageInstanceCreate,
    STAGE_INSTANCE_UPDATE: options.STAGE_INSTANCE_UPDATE ?? handlers.handleStageInstanceUpdate,
    STAGE_INSTANCE_DELETE: options.STAGE_INSTANCE_DELETE ?? handlers.handleStageInstanceDelete,

    // guilds
    GUILD_BAN_ADD: options.GUILD_BAN_ADD ?? handlers.handleGuildBanAdd,
    GUILD_BAN_REMOVE: options.GUILD_BAN_REMOVE ?? handlers.handleGuildBanRemove,
    GUILD_CREATE: options.GUILD_CREATE ?? handlers.handleGuildCreate,
    GUILD_LOADED_DD: options.GUILD_LOADED_DD ?? handlers.handleGuildLoaded,
    GUILD_DELETE: options.GUILD_DELETE ?? handlers.handleGuildDelete,
    GUILD_EMOJIS_UPDATE: options.GUILD_EMOJIS_UPDATE ?? handlers.handleGuildEmojisUpdate,
    GUILD_INTEGRATIONS_UPDATE: options.GUILD_INTEGRATIONS_UPDATE ?? handlers.handleGuildIntegrationsUpdate,
    GUILD_MEMBER_ADD: options.GUILD_MEMBER_ADD ?? handlers.handleGuildMemberAdd,
    GUILD_MEMBER_REMOVE: options.GUILD_MEMBER_REMOVE ?? handlers.handleGuildMemberRemove,
    GUILD_MEMBER_UPDATE: options.GUILD_MEMBER_UPDATE ?? handlers.handleGuildMemberUpdate,
    GUILD_MEMBERS_CHUNK: options.GUILD_MEMBERS_CHUNK ?? handlers.handleGuildMembersChunk,
    GUILD_ROLE_CREATE: options.GUILD_ROLE_CREATE ?? handlers.handleGuildRoleCreate,
    GUILD_ROLE_DELETE: options.GUILD_ROLE_DELETE ?? handlers.handleGuildRoleDelete,
    GUILD_ROLE_UPDATE: options.GUILD_ROLE_UPDATE ?? handlers.handleGuildRoleUpdate,
    GUILD_UPDATE: options.GUILD_UPDATE ?? handlers.handleGuildUpdate,
    // interactions
    INTERACTION_CREATE: options.INTERACTION_CREATE ?? handlers.handleInteractionCreate,
    // invites
    INVITE_CREATE: options.INVITE_CREATE ?? handlers.handleInviteCreate,
    INVITE_DELETE: options.INVITE_DELETE ?? handlers.handleInviteCreate,
    // messages
    MESSAGE_CREATE: options.MESSAGE_CREATE ?? handlers.handleMessageCreate,
    MESSAGE_DELETE_BULK: options.MESSAGE_DELETE_BULK ?? handlers.handleMessageDeleteBulk,
    MESSAGE_DELETE: options.MESSAGE_DELETE ?? handlers.handleMessageDelete,
    MESSAGE_REACTION_ADD: options.MESSAGE_REACTION_ADD ?? handlers.handleMessageReactionAdd,
    MESSAGE_REACTION_REMOVE_ALL: options.MESSAGE_REACTION_REMOVE_ALL ?? handlers.handleMessageReactionRemoveAll,
    MESSAGE_REACTION_REMOVE_EMOJI: options.MESSAGE_REACTION_REMOVE_EMOJI ?? handlers.handleMessageReactionRemoveEmoji,
    MESSAGE_REACTION_REMOVE: options.MESSAGE_REACTION_REMOVE ?? handlers.handleMessageReactionRemove,
    MESSAGE_UPDATE: options.MESSAGE_UPDATE ?? handlers.handleMessageUpdate,
    // presence
    PRESENCE_UPDATE: options.PRESENCE_UPDATE ?? handlers.handlePresenceUpdate,
    TYPING_START: options.TYPING_START ?? handlers.handleTypingStart,
    USER_UPDATE: options.USER_UPDATE ?? handlers.handleUserUpdate,
    // voice
    VOICE_SERVER_UPDATE: options.VOICE_SERVER_UPDATE ?? handlers.handleVoiceServerUpdate,
    VOICE_STATE_UPDATE: options.VOICE_STATE_UPDATE ?? handlers.handleVoiceStateUpdate,
    // webhooks
    WEBHOOKS_UPDATE: options.WEBHOOKS_UPDATE ?? handlers.handleWebhooksUpdate,
    // integrations
    INTEGRATION_CREATE: options.INTEGRATION_CREATE ?? handlers.handleIntegrationCreate,
    INTEGRATION_UPDATE: options.INTEGRATION_UPDATE ?? handlers.handleIntegrationUpdate,
    INTEGRATION_DELETE: options.INTEGRATION_DELETE ?? handlers.handleIntegrationDelete,
  };
}

export type RemoveFirstFromTuple<T extends any[]> = T["length"] extends 0
  ? []
  : ((...b: T) => void) extends (a: any, ...b: infer I) => void
  ? I
  : [];
export type FinalHelpers = {
  [K in keyof Helpers]: (...args: RemoveFirstFromTuple<Parameters<Helpers[K]>>) => ReturnType<Helpers[K]>;
};
