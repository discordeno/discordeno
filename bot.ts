import { createRestManager, CreateRestManagerOptions } from "./rest/mod.ts";
import { bigintToSnowflake, snowflakeToBigint } from "./util/bigint.ts";
import { Collection } from "./util/collection.ts";
import {
  Channel,
  Guild,
  Member,
  Message,
  Role,
  ScheduledEvent,
  transformChannel,
  transformGuild,
  transformMember,
  transformMessage,
  transformRole,
  transformUser,
  transformVoiceState,
  User,
  VoiceState,
} from "./transformers/mod.ts";
import {
  baseEndpoints,
  CHANNEL_MENTION_REGEX,
  CONTEXT_MENU_COMMANDS_NAME_REGEX,
  DISCORD_SNOWFLAKE_REGEX,
  DISCORDENO_VERSION,
  endpoints,
  SLASH_COMMANDS_NAME_REGEX,
  USER_AGENT,
} from "./util/constants.ts";
import { createGatewayManager, GatewayManager } from "./gateway/mod.ts";
import { validateLength } from "./util/validateLength.ts";
import { delay, formatImageURL, hasProperty } from "./util/utils.ts";
import { iconBigintToHash, iconHashToBigInt } from "./util/hash.ts";
import { calculateShardId } from "./util/calculateShardId.ts";
import * as handlers from "./handlers/mod.ts";
import { Interaction, InteractionDataOption, transformInteraction } from "./transformers/interaction.ts";
import { Integration, transformIntegration } from "./transformers/integration.ts";
import { transformApplication } from "./transformers/application.ts";
import { transformTeam } from "./transformers/team.ts";
import { Invite, transformInvite } from "./transformers/invite.ts";
import * as helpers from "./helpers/mod.ts";
import { Emoji, transformEmoji } from "./transformers/emoji.ts";
import { transformActivity } from "./transformers/activity.ts";
import { PresenceUpdate, transformPresence } from "./transformers/presence.ts";
import { urlToBase64 } from "./util/urlToBase64.ts";
import { transformAttachment } from "./transformers/attachment.ts";
import { transformEmbed } from "./transformers/embed.ts";
import { transformComponent } from "./transformers/component.ts";
import { transformWebhook } from "./transformers/webhook.ts";
import { transformAuditlogEntry } from "./transformers/auditlogEntry.ts";
import { transformApplicationCommandPermission } from "./transformers/applicationCommandPermission.ts";
import { calculateBits, calculatePermissions } from "./util/permissions.ts";
import { transformScheduledEvent } from "./transformers/scheduledEvent.ts";
import { ThreadMember, transformThreadMember } from "./transformers/threadMember.ts";
import { transformApplicationCommandOption } from "./transformers/applicationCommandOption.ts";
import { transformApplicationCommand } from "./transformers/applicationCommand.ts";
import { transformWelcomeScreen } from "./transformers/welcomeScreen.ts";
import { transformVoiceRegion } from "./transformers/voiceRegion.ts";
import { transformWidget } from "./transformers/widget.ts";
import { transformStageInstance } from "./transformers/stageInstance.ts";
import { StickerPack, transformSticker, transformStickerPack } from "./transformers/sticker.ts";
import { GetGatewayBot, transformGatewayBot } from "./transformers/gatewayBot.ts";
import {
  DiscordEmoji,
  DiscordGatewayPayload,
  DiscordInteractionDataOption,
  DiscordReady,
  DiscordStickerPack,
} from "./types/discord.ts";
import { Errors, GatewayDispatchEventNames, GatewayIntents } from "./types/shared.ts";

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
  DiscordWelcomeScreen,
} from "./types/discord.ts";

import { Application } from "./transformers/application.ts";
import { Team } from "./transformers/team.ts";
import { Activity } from "./transformers/activity.ts";
import { Attachment } from "./transformers/attachment.ts";
import { Embed } from "./transformers/embed.ts";
import { Webhook } from "./transformers/webhook.ts";
import { Component } from "./transformers/component.ts";
import { ApplicationCommand } from "./transformers/applicationCommand.ts";
import { AuditLogEntry } from "./transformers/auditlogEntry.ts";
import { ApplicationCommandOption } from "./transformers/applicationCommandOption.ts";
import { ApplicationCommandPermission } from "./transformers/applicationCommandPermission.ts";
import { WelcomeScreen } from "./transformers/welcomeScreen.ts";
import { VoiceRegions } from "./transformers/voiceRegion.ts";
import { GuildWidget } from "./transformers/widget.ts";
import { StageInstance } from "./transformers/stageInstance.ts";
import { Sticker } from "./transformers/sticker.ts";

export function createBot(options: CreateBotOptions): Bot {
  const bot = {
    id: options.botId,
    applicationId: options.applicationId || options.botId,
    token: options.token,
    events: createEventHandlers(options.events),
    intents: options.intents.reduce(
      (bits, next) => (bits |= GatewayIntents[next]),
      0,
    ),
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
      fetchAllMembersProcessingRequests: new Map(),
    },
    rest: createRestManager({
      token: options.token,
      debug: options.events.debug,
      secretKey: options.secretKey ?? undefined,
    }),
  } as Bot;

  bot.helpers = createHelpers(bot, options.helpers ?? {});
  bot.gateway = createGatewayManager({
    token: bot.token,
    intents: bot.intents,
    debug: bot.events.debug,
    handleDiscordPayload: bot.handleDiscordPayload ??
      async function (_, data: DiscordGatewayPayload, shardId: number) {
        // TRIGGER RAW EVENT
        bot.events.raw(bot as Bot, data, shardId);

        if (!data.t) return;

        // RUN DISPATCH CHECK
        await bot.events.dispatchRequirements(bot as Bot, data, shardId);
        bot.handlers[data.t as GatewayDispatchEventNames]?.(
          bot as Bot,
          data,
          shardId,
        );
      },
  });

  return bot as Bot;
}

export function createEventHandlers(
  events: Partial<EventHandlers>,
): EventHandlers {
  function ignore() {}

  return {
    debug: events.debug ?? ignore,
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

export async function startBot(bot: Bot) {
  if (!bot.botGatewayData) {
    bot.botGatewayData = await bot.helpers.getGatewayBot();
  }

  // SETUP GATEWAY LOGIN INFO
  bot.gateway.urlWSS = bot.botGatewayData.url;
  bot.gateway.shardsRecommended = bot.botGatewayData.shards;
  bot.gateway.sessionStartLimitTotal = bot.botGatewayData.sessionStartLimit.total;
  bot.gateway.sessionStartLimitRemaining = bot.botGatewayData.sessionStartLimit.remaining;
  bot.gateway.sessionStartLimitResetAfter = bot.botGatewayData.sessionStartLimit.resetAfter;
  bot.gateway.maxConcurrency = bot.botGatewayData.sessionStartLimit.maxConcurrency;
  bot.gateway.lastShardId = bot.botGatewayData.shards;
  bot.gateway.maxShards = bot.botGatewayData.shards;

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
    validateLength,
    hasProperty,
    urlToBase64,
    formatImageURL,
    calculateBits,
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
  validateLength: typeof validateLength;
  hasProperty: typeof hasProperty;
  urlToBase64: typeof urlToBase64;
  formatImageURL: typeof formatImageURL;
  calculateBits: typeof calculateBits;
  calculatePermissions: typeof calculatePermissions;
}

export async function stopBot(bot: Bot) {
  await bot.gateway.stopGateway(bot.gateway);

  return bot;
}

export interface CreateBotOptions {
  token: string;
  botId: bigint;
  applicationId?: bigint;
  secretKey?: string;
  events: Partial<EventHandlers>;
  intents: (keyof typeof GatewayIntents)[];
  botGatewayData?: GetGatewayBot;
  rest?: Omit<CreateRestManagerOptions, "token">;
  handleDiscordPayload?: GatewayManager["handleDiscordPayload"];
  utils?: Partial<ReturnType<typeof createUtils>>;
  transformers?: Partial<ReturnType<typeof createTransformers>>;
  helpers?: Partial<Helpers>;
}

export type UnPromise<T extends Promise<unknown>> = T extends Promise<infer K> ? K
  : never;

export interface Bot {
  id: bigint;
  applicationId: bigint;
  token: string;
  intents: GatewayIntents;
  urlWSS: string;
  botGatewayData?: GetGatewayBot;
  utils: ReturnType<typeof createUtils>;
  transformers: Transformers;
  helpers: ReturnType<typeof createHelpers>;
  rest: ReturnType<typeof createRestManager>;
  gateway: ReturnType<typeof createGatewayManager>;
  events: EventHandlers;
  handlers: ReturnType<typeof createBotGatewayHandlers>;
  activeGuildIds: Set<bigint>;
  constants: ReturnType<typeof createBotConstants>;
  cache: {
    unrepliedInteractions: Set<bigint>;
    fetchAllMembersProcessingRequests: Map<string, Function>;
  };
  enabledPlugins: Set<string>;
  handleDiscordPayload?: GatewayManager["handleDiscordPayload"];
}

export const defaultHelpers = { ...helpers };
export type DefaultHelpers = typeof defaultHelpers;
// deno-lint-ignore no-empty-interface
export interface Helpers extends DefaultHelpers {} // Use interface for declaration merging

export function createHelpers(
  bot: Bot,
  customHelpers?: Partial<Helpers>,
): FinalHelpers {
  const converted = {} as FinalHelpers;
  for (
    const [name, fun] of Object.entries({
      ...createBaseHelpers(customHelpers || {}),
    })
  ) {
    // @ts-ignore - TODO: make the types better
    converted[name as keyof FinalHelpers] = (
      // @ts-ignore - TODO: make the types better
      ...args: RemoveFirstFromTuple<Parameters<typeof fun>>
    ) =>
      // @ts-ignore - TODO: make the types better
      fun(bot, ...args);
  }

  return converted;
}

export function createBaseHelpers(options: Partial<Helpers>) {
  return {
    ...defaultHelpers,
    ...options,
  };
}

export interface Transformers {
  snowflake: (snowflake: string) => bigint;
  gatewayBot: (payload: DiscordGetGatewayBot) => GetGatewayBot;
  channel: (bot: Bot, payload: { channel: DiscordChannel } & { guildId?: bigint }) => Channel;
  guild: (bot: Bot, payload: { guild: DiscordGuild } & { shardId: number }) => Guild;
  user: (bot: Bot, payload: DiscordUser) => User;
  member: (bot: Bot, payload: DiscordMember, guildId: bigint, userId: bigint) => Member;
  message: (bot: Bot, payload: DiscordMessage) => Message;
  role: (bot: Bot, payload: { role: DiscordRole } & { guildId: bigint }) => Role;
  voiceState: (bot: Bot, payload: { voiceState: DiscordVoiceState } & { guildId: bigint }) => VoiceState;
  interaction: (bot: Bot, payload: DiscordInteraction) => Interaction;
  interactionDataOptions: (bot: Bot, payload: DiscordInteractionDataOption) => InteractionDataOption;
  integration: (bot: Bot, payload: DiscordIntegrationCreateUpdate) => Integration;
  invite: (bot: Bot, invite: DiscordInviteCreate) => Invite;
  application: (bot: Bot, payload: DiscordApplication) => Application;
  team: (bot: Bot, payload: DiscordTeam) => Team;
  emoji: (bot: Bot, payload: DiscordEmoji) => Emoji;
  activity: (bot: Bot, payload: DiscordActivity) => Activity;
  presence: (bot: Bot, payload: DiscordPresenceUpdate) => PresenceUpdate;
  attachment: (bot: Bot, payload: DiscordAttachment) => Attachment;
  embed: (bot: Bot, payload: DiscordEmbed) => Embed;
  component: (bot: Bot, payload: DiscordComponent) => Component;
  webhook: (bot: Bot, payload: DiscordWebhook) => Webhook;
  auditlogEntry: (bot: Bot, payload: DiscordAuditLogEntry) => AuditLogEntry;
  applicationCommand: (bot: Bot, payload: DiscordApplicationCommand) => ApplicationCommand;
  applicationCommandOption: (bot: Bot, payload: DiscordApplicationCommandOption) => ApplicationCommandOption;
  applicationCommandPermission: (
    bot: Bot,
    payload: DiscordGuildApplicationCommandPermissions,
  ) => ApplicationCommandPermission;
  scheduledEvent: (bot: Bot, payload: DiscordScheduledEvent) => ScheduledEvent;
  threadMember: (bot: Bot, payload: DiscordThreadMember) => ThreadMember;
  welcomeScreen: (bot: Bot, payload: DiscordWelcomeScreen) => WelcomeScreen;
  voiceRegion: (bot: Bot, payload: DiscordVoiceRegion) => VoiceRegions;
  widget: (bot: Bot, payload: DiscordGuildWidget) => GuildWidget;
  stageInstance: (bot: Bot, payload: DiscordStageInstance) => StageInstance;
  sticker: (bot: Bot, payload: DiscordSticker) => Sticker;
  stickerPack: (bot: Bot, payload: DiscordStickerPack) => StickerPack;
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
    voiceState: options.voiceState || transformVoiceState,
    snowflake: options.snowflake || snowflakeToBigint,
    webhook: options.webhook || transformWebhook,
    auditlogEntry: options.auditlogEntry || transformAuditlogEntry,
    applicationCommand: options.applicationCommand ||
      transformApplicationCommand,
    applicationCommandOption: options.applicationCommandOption ||
      transformApplicationCommandOption,
    applicationCommandPermission: options.applicationCommandPermission ||
      transformApplicationCommandPermission,
    scheduledEvent: options.scheduledEvent || transformScheduledEvent,
    threadMember: options.threadMember || transformThreadMember,
    welcomeScreen: options.welcomeScreen || transformWelcomeScreen,
    voiceRegion: options.voiceRegion || transformVoiceRegion,
    widget: options.widget || transformWidget,
    stageInstance: options.stageInstance || transformStageInstance,
    sticker: options.sticker || transformSticker,
    stickerPack: options.stickerPack || transformStickerPack,
    gatewayBot: options.gatewayBot || transformGatewayBot,
  };
}

export type RestManager = ReturnType<typeof createRestManager>;

export interface EventHandlers {
  debug: (text: string, ...args: any[]) => unknown;
  threadCreate: (bot: Bot, thread: Channel) => unknown;
  threadDelete: (bot: Bot, thread: Channel) => unknown;
  threadMemberUpdate: (bot: Bot, payload: {
    id: bigint;
    guildId: bigint;
    joinedAt: number;
    flags: number;
  }) => unknown;
  threadMembersUpdate: (
    bot: Bot,
    payload: {
      id: bigint;
      guildId: bigint;
      addedMembers?: ThreadMember[];
      removedMemberIds?: bigint[];
    },
  ) => unknown;
  threadUpdate: (bot: Bot, thread: Channel) => unknown;
  scheduledEventCreate: (bot: Bot, event: ScheduledEvent) => unknown;
  scheduledEventUpdate: (bot: Bot, event: ScheduledEvent) => unknown;
  scheduledEventDelete: (bot: Bot, event: ScheduledEvent) => unknown;
  /** Sent when a user has subscribed to a guild scheduled event. EXPERIMENTAL! */
  scheduledEventUserAdd: (
    bot: Bot,
    payload: {
      guildScheduledEventId: bigint;
      guildId: bigint;
      userId: bigint;
    },
  ) => unknown;
  /** Sent when a user has unsubscribed to a guild scheduled event. EXPERIMENTAL! */
  scheduledEventUserRemove: (
    bot: Bot,
    payload: {
      guildScheduledEventId: bigint;
      guildId: bigint;
      userId: bigint;
    },
  ) => unknown;
  ready: (
    bot: Bot,
    payload: {
      shardId: number;
      v: number;
      user: User;
      guilds: bigint[];
      sessionId: string;
      shard?: number[];
      applicationId: bigint;
    },
    rawPayload: DiscordReady,
  ) => any;
  interactionCreate: (bot: Bot, interaction: Interaction) => any;
  integrationCreate: (bot: Bot, integration: Integration) => any;
  integrationDelete: (
    bot: Bot,
    payload: { id: bigint; guildId: bigint; applicationId?: bigint },
  ) => any;
  integrationUpdate: (bot: Bot, payload: { guildId: bigint }) => any;
  inviteCreate: (bot: Bot, invite: Invite) => any;
  inviteDelete: (
    bot: Bot,
    payload: {
      channelId: bigint;
      guildId?: bigint;
      code: string;
    },
  ) => any;
  guildMemberAdd: (
    bot: Bot,
    member: Member,
    user: User,
  ) => any;
  guildMemberRemove: (bot: Bot, user: User, guildId: bigint) => any;
  guildMemberUpdate: (
    bot: Bot,
    member: Member,
    user: User,
  ) => any;
  messageCreate: (bot: Bot, message: Message) => any;
  messageDelete: (
    bot: Bot,
    payload: { id: bigint; channelId: bigint; guildId?: bigint },
    message?: Message,
  ) => any;
  messageDeleteBulk: (bot: Bot, payload: { ids: bigint[]; channelId: bigint; guildId?: bigint }) => any;
  messageUpdate: (
    bot: Bot,
    message: Message,
    oldMessage?: Message,
  ) => any;
  reactionAdd: (
    bot: Bot,
    payload: {
      userId: bigint;
      channelId: bigint;
      messageId: bigint;
      guildId?: bigint;
      member?: Member;
      user?: User;
      emoji: Emoji;
    },
  ) => any;
  reactionRemove: (
    bot: Bot,
    payload: {
      userId: bigint;
      channelId: bigint;
      messageId: bigint;
      guildId?: bigint;
      emoji: Emoji;
    },
  ) => any;
  reactionRemoveEmoji: (
    bot: Bot,
    payload: {
      channelId: bigint;
      messageId: bigint;
      guildId?: bigint;
      emoji: Emoji;
    },
  ) => any;
  reactionRemoveAll: (
    bot: Bot,
    payload: {
      channelId: bigint;
      messageId: bigint;
      guildId?: bigint;
    },
  ) => any;
  presenceUpdate: (
    bot: Bot,
    presence: PresenceUpdate,
    oldPresence?: PresenceUpdate,
  ) => any;
  voiceServerUpdate: (
    bot: Bot,
    payload: { token: string; endpoint?: string; guildId: bigint },
  ) => any;
  voiceStateUpdate: (
    bot: Bot,
    voiceState: VoiceState,
  ) => any;
  channelCreate: (bot: Bot, channel: Channel) => any;
  dispatchRequirements: (
    bot: Bot,
    data: DiscordGatewayPayload,
    shardId: number,
  ) => any;
  channelDelete: (bot: Bot, channel: Channel) => any;
  channelPinsUpdate: (
    bot: Bot,
    data: { guildId?: bigint; channelId: bigint; lastPinTimestamp?: number },
  ) => any;
  channelUpdate: (bot: Bot, channel: Channel) => any;
  stageInstanceCreate: (
    bot: Bot,
    data: {
      id: bigint;
      guildId: bigint;
      channelId: bigint;
      topic: string;
    },
  ) => any;
  stageInstanceDelete: (
    bot: Bot,
    data: {
      id: bigint;
      guildId: bigint;
      channelId: bigint;
      topic: string;
    },
  ) => any;
  stageInstanceUpdate: (
    bot: Bot,
    data: {
      id: bigint;
      guildId: bigint;
      channelId: bigint;
      topic: string;
    },
  ) => any;
  guildEmojisUpdate: (
    bot: Bot,
    payload: {
      guildId: bigint;
      emojis: Collection<bigint, DiscordEmoji>;
    },
  ) => any;
  guildBanAdd: (bot: Bot, user: User, guildId: bigint) => any;
  guildBanRemove: (bot: Bot, user: User, guildId: bigint) => any;
  guildLoaded: (bot: Bot, guild: Guild) => any;
  guildCreate: (bot: Bot, guild: Guild) => any;
  guildDelete: (bot: Bot, id: bigint, shardId: number) => any;
  guildUpdate: (bot: Bot, guild: Guild) => any;
  raw: (bot: Bot, data: DiscordGatewayPayload, shardId: number) => any;
  roleCreate: (bot: Bot, role: Role) => any;
  roleDelete: (bot: Bot, payload: { guildId: bigint; roleId: bigint }) => any;
  roleUpdate: (bot: Bot, role: Role) => any;
  webhooksUpdate: (
    bot: Bot,
    payload: { channelId: bigint; guildId: bigint },
  ) => any;
  botUpdate: (bot: Bot, user: User) => any;
  typingStart: (
    bot: Bot,
    payload: {
      guildId: bigint | undefined;
      channelId: bigint;
      userId: bigint;
      timestamp: number;
      member: Member | undefined;
    },
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
  GUILD_SCHEDULED_EVENT_CREATE: typeof handlers.handleGuildScheduledEventCreate;
  GUILD_SCHEDULED_EVENT_DELETE: typeof handlers.handleGuildScheduledEventDelete;
  GUILD_SCHEDULED_EVENT_UPDATE: typeof handlers.handleGuildScheduledEventUpdate;
  GUILD_SCHEDULED_EVENT_USER_ADD: typeof handlers.handleGuildScheduledEventUserAdd;
  GUILD_SCHEDULED_EVENT_USER_REMOVE: typeof handlers.handleGuildScheduledEventUserRemove;
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
  options: Partial<BotGatewayHandlerOptions>,
): Record<
  GatewayDispatchEventNames | "GUILD_LOADED_DD",
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
    GUILD_LOADED_DD: options.GUILD_LOADED_DD ?? handlers.handleGuildLoaded,
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
      handlers.handleIntegrationDelete,
  };
}

export type RemoveFirstFromTuple<T extends any[]> = T["length"] extends 0 ? []
  : ((...b: T) => void) extends (a: any, ...b: infer I) => void ? I
  : [];
export type FinalHelpers = {
  [K in keyof Helpers]: (
    ...args: RemoveFirstFromTuple<Parameters<Helpers[K]>>
  ) => ReturnType<Helpers[K]>;
};
