import { getGatewayBot } from "./helpers/misc/get_gateway_bot.ts";
import {
  DiscordGatewayIntents,
  DiscordGetGatewayBot,
  DiscordIdentify,
} from "./types/gateway.ts";
import { CamelCaseProps } from "./types/util.ts";
import { baseEndpoints, GATEWAY_VERSION } from "./util/constants.ts";
import { spawnShards } from "./ws/shard_manager.ts";

export let authorization = "";
export let restAuthorization = "";
export let botID = "";
export let applicationID = "";

export let eventHandlers: EventHandlers = {};

export let botGatewayData: DiscordGetGatewayBot;
export let proxyWSURL = `wss://gateway.discord.gg`;
export let lastShardID = 0;

export const identifyPayload: DiscordIdentify = {
  token: "",
  compress: true,
  properties: {
    $os: "linux",
    $browser: "Discordeno",
    $device: "Discordeno",
  },
  intents: 0,
  shard: [0, 0],
};

export async function startBot(config: BotConfig) {
  if (config.eventHandlers) eventHandlers = config.eventHandlers;
  authorization = `Bot ${config.token}`;

  // Initial API connection to get info about bots connection
  botGatewayData = await getGatewayBot();

  // Explicitly append gateway version and encoding
  botGatewayData.url += `?v=${GATEWAY_VERSION}&encoding=json`;

  proxyWSURL = botGatewayData.url;
  identifyPayload.token = config.token;
  identifyPayload.intents = config.intents.reduce(
    (
      bits,
      next,
    ) => (bits |= typeof next === "string"
      ? DiscordGatewayIntents[next]
      : next),
    0,
  );
  lastShardID = botGatewayData.shards;
  identifyPayload.shard = [0, lastShardID];

  await spawnShards(botGatewayData, identifyPayload, 0, lastShardID);
}

/** Allows you to dynamically update the event handlers by passing in new eventHandlers */
export function updateEventHandlers(newEventHandlers: EventHandlers) {
  eventHandlers = {
    ...eventHandlers,
    ...newEventHandlers,
  };
}

/** INTERNAL LIB function used to set the bot ID once the READY event is sent by Discord. */
export function setBotID(id: string) {
  if (botID !== id) botID = id;
}

/** INTERNAL LIB function used to set the application ID once the READY event is sent by Discord. */
export function setApplicationID(id: string) {
  if (applicationID !== id) applicationID = id;
}

// BIG BRAIN BOT STUFF ONLY BELOW THIS

/**
 * This function should be used only by bot developers whose bots are in over 25,000 servers.
 * Please be aware if you are a beginner developer using this, things will not work as per the guides. This is for advanced developers only!
 *
 * Advanced Devs: This function will allow you to have an insane amount of customization potential as when you get to large bots you need to be able to optimize every tiny detail to make you bot work the way you need.
*/
export async function startBigBrainBot(data: BigBrainBotConfig) {
  authorization = `Bot ${data.token}`;
  identifyPayload.token = `Bot ${data.token}`;

  if (data.restAuthorization) restAuthorization = data.restAuthorization;
  if (data.restURL) baseEndpoints.BASE_URL = data.restURL;
  if (data.cdnURL) baseEndpoints.CDN_URL = data.cdnURL;
  if (data.wsURL) proxyWSURL = data.wsURL;
  if (data.eventHandlers) eventHandlers = data.eventHandlers;
  if (data.compress) {
    identifyPayload.compress = data.compress;
  }

  identifyPayload.intents = data.intents.reduce(
    (
      bits,
      next,
    ) => (bits |= typeof next === "string"
      ? DiscordGatewayIntents[next]
      : next),
    0,
  );

  // Initial API connection to get info about bots connection
  botGatewayData = await getGatewayBot();

  if (!data.wsURL) proxyWSURL = botGatewayData.url;
  await spawnShards(
    botGatewayData,
    identifyPayload,
    data.firstShardID,
    data.lastShardID ||
      (botGatewayData.shards >= 25
        ? (data.firstShardID + 25)
        : botGatewayData.shards),
  );
}

export interface EventHandlers {
  rateLimit?: (data: RateLimitData) => unknown;
  /** Sent when a new Slash Command is created, relevant to the current user. */
  applicationCommandCreate?: (
    data: CamelCaseProps<ApplicationCommandEvent>,
  ) => unknown;
  /** Sent when a Slash Command relevant to the current user is updated. */
  applicationCommandUpdate?: (
    data: CamelCaseProps<ApplicationCommandEvent>,
  ) => unknown;
  /** Sent when a Slash Command relevant to the current user is deleted. */
  applicationCommandDelete?: (
    data: CamelCaseProps<ApplicationCommandEvent>,
  ) => unknown;
  /** Sent when properties about the user change. */
  botUpdate?: (user: UserPayload) => unknown;
  /** Sent when a new guild channel is created, relevant to the current user. */
  channelCreate?: (channel: Channel) => unknown;
  /** Sent when a channel is updated. This is not sent when the field `last_message_id` is altered. To keep track of the `last_message_id` changes, you must listen for `MESSAGE_CREATE` events. */
  channelUpdate?: (channel: Channel, cachedChannel: Channel) => unknown;
  /** Sent when a channel relevant to the current user is deleted. */
  channelDelete?: (channel: Channel) => unknown;
  /** Sent when a message is pinned or unpinned in a text channel. This is not sent when a pinned message is deleted. */
  channelPinsUpdate?: (
    channel: Channel,
    guild?: Guild,
    lastPinTimestamp?: string | null,
  ) => unknown;
  debug?: (args: DebugArg) => unknown;
  dispatchRequirements?: (data: DiscordPayload, shardID: number) => unknown;
  /** Sent when a user is banned from a guild. */
  guildBanAdd?: (guild: Guild, user: UserPayload, member?: Member) => unknown;
  /** Sent when a user is unbanned from a guild. */
  guildBanRemove?: (
    guild: Guild,
    user: UserPayload,
    member?: Member,
  ) => unknown;
  /**
   * This event can be sent in three different scenarios:
   * 1. When a user is initially connecting, to lazily load and backfill information for all unavailable guilds sent in the `READY` event. Guilds that are unavailable due to an outage will send a `GUILD_DELETE` event.
   * 2. When a Guild becomes available again to the client.
   * 3. When the current user joins a new Guild.
   */
  guildCreate?: (guild: Guild) => unknown;
  guildLoaded?: (guild: Guild) => unknown;
  /** Sent when a guild is updated. */
  guildUpdate?: (guild: Guild, changes: GuildUpdateChange[]) => unknown;
  /** Sent when a guild becomes or was already unavailable due to an outage, or when the user leaves or is removed from a guild. If the `unavailable` field is not set, the user was removed from the guild. */
  guildDelete?: (guild: Guild) => unknown;
  /** Sent when a guild's emojis have been updated. */
  guildEmojisUpdate?: (
    guild: Guild,
    emojis: Collection<string, Emoji>,
    cachedEmojis: Collection<string, Emoji>,
  ) => unknown;
  /** Sent when a guild integration is updated. */
  guildIntegrationsUpdate?: (guild: Guild) => unknown;
  /** Sent when a new user joins a guild. */
  guildMemberAdd?: (guild: Guild, member: Member) => unknown;
  /** Sent when a user is removed from a guild (leave/kick/ban). */
  guildMemberRemove?: (
    guild: Guild,
    user: UserPayload,
    member?: Member,
  ) => unknown;
  /** Sent when a guild member is updated. This will also fire when the user object of a guild member changes. */
  guildMemberUpdate?: (
    guild: Guild,
    member: Member,
    cachedMember?: Member,
  ) => unknown;
  heartbeat?: () => unknown;
  /** Sent when a user in a guild uses a Slash Command. */
  interactionCreate?: (
    data: Omit<InteractionCommandPayload, "member"> & { member: Member },
  ) => unknown;
  /** Sent when a message is created. */
  messageCreate?: (message: Message) => unknown;
  /** Sent when a message is deleted. */
  messageDelete?: (partial: PartialMessage, message?: Message) => unknown;
  /** Sent when a message is updated. */
  messageUpdate?: (message: Message, cachedMessage: OldMessage) => unknown;
  nicknameUpdate?: (
    guild: Guild,
    member: Member,
    nickname: string,
    oldNickname?: string,
  ) => unknown;
  /** A user's presence is their current state on a guild. This event is sent when a user's presence or info, such as name or avatar, is updated. */
  presenceUpdate?: (
    presence: PresenceUpdatePayload,
    oldPresence?: PresenceUpdatePayload,
  ) => unknown;
  raw?: (data: DiscordPayload) => unknown;
  rawGateway?: (data: unknown) => unknown;
  ready?: () => unknown;
  /** Sent when a user adds a reaction to a message. */
  reactionAdd?: (
    payload: MessageReactionUncachedPayload,
    emoji: ReactionPayload,
    userID: string,
    message?: Message,
  ) => unknown;
  /** Sent when a user removes a reaction from a message. */
  reactionRemove?: (
    payload: MessageReactionUncachedPayload,
    emoji: ReactionPayload,
    userID: string,
    message?: Message,
  ) => unknown;
  /** Sent when a user explicitly removes all reactions from a message. */
  reactionRemoveAll?: (data: BaseMessageReactionPayload) => unknown;
  /** Sent when a bot removes all instances of a given emoji from the reactions of a message. */
  reactionRemoveEmoji?: (data: MessageReactionRemoveEmojiPayload) => unknown;
  /** Sent when a guild role is created. */
  roleCreate?: (guild: Guild, role: Role) => unknown;
  /** Sent when a guild role is deleted. */
  roleDelete?: (guild: Guild, role: Role) => unknown;
  /** Sent when a guild role is updated. */
  roleUpdate?: (guild: Guild, role: Role, cachedRole: Role) => unknown;
  roleGained?: (guild: Guild, member: Member, roleID: string) => unknown;
  roleLost?: (guild: Guild, member: Member, roleID: string) => unknown;
  shardReady?: (shardID: number) => unknown;
  shardFailedToLoad?: (
    shardID: number,
    guildIDs: Set<string>,
  ) => unknown;
  /** Sent when a user starts typing in a channel. */
  typingStart?: (data: TypingStartPayload) => unknown;
  voiceChannelJoin?: (member: Member, channelID: string) => unknown;
  voiceChannelLeave?: (member: Member, channelID: string) => unknown;
  voiceChannelSwitch?: (
    member: Member,
    channelID: string,
    oldChannelID: string,
  ) => unknown;
  /** Sent when someone joins/leaves/moves voice channels. */
  voiceStateUpdate?: (
    member: Member,
    voiceState: VoiceStateUpdatePayload,
  ) => unknown;
  /** Sent when a guild's voice server is updated. This is sent when initially connecting to voice, and when the current voice instance fails over to a new server. */
  voiceServerUpdate?: (
    token: string,
    guild: Guild,
    endpoint: string,
  ) => unknown;
  /** Sent when a guild channel's webhook is created, updated, or deleted. */
  webhooksUpdate?: (channelID: string, guildID: string) => unknown;
  /** Sent when a member has passed the guild's Membership Screening requirements */
  membershipScreeningPassed?: (guild: Guild, member: Member) => unknown;
  /** Sent when an integration is created on a server such as twitch, youtube etc.. */
  integrationCreate?: (
    data: CamelCaseProps<IntegrationCreateUpdateEvent>,
  ) => unknown;
  /** Sent when an integration is updated. */
  integrationUpdate?: (
    data: CamelCaseProps<IntegrationCreateUpdateEvent>,
  ) => unknown;
  /** Sent when an integration is deleted. */
  integrationDelete?: (
    data: CamelCaseProps<IntegrationDeleteEvent>,
  ) => undefined;
  /** Sent when a new invite to a channel is created. */
  inviteCreate?: (data: CamelCaseProps<InviteCreateEvent>) => unknown;
  /** Sent when an invite is deleted. */
  inviteDelete?: (data: CamelCaseProps<InviteDeleteEvent>) => unknown;
}

export interface BotConfig {
  token: string;
  compress?: boolean;
  intents: (DiscordGatewayIntents | keyof typeof DiscordGatewayIntents)[];
  eventHandlers?: EventHandlers;
}

export interface BigBrainBotConfig extends BotConfig {
  /** The first shard to start at for this worker. Use this to control which shards to run in each worker. */
  firstShardID: number;
  /** The last shard to start for this worker. By default it will be 25 + the firstShardID. */
  lastShardID?: number;
  /** This can be used to forward the ws handling to a proxy. */
  wsURL?: string;
  /** This can be used to forward the REST handling to a proxy. */
  restURL?: string;
  /** This can be used to forward the CDN handling to a proxy. */
  cdnURL?: string;
  /** This is the authorization header that your rest proxy will validate */
  restAuthorization?: string;
}
