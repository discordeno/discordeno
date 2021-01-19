import {
  Channel,
  Guild,
  Member,
  Message,
  Role,
} from "../api/structures/mod.ts";
import {
  DiscordPayload,
  Emoji,
  PresenceUpdatePayload,
  TypingStartPayload,
  VoiceStateUpdatePayload,
} from "./discord.ts";
import { UserPayload } from "./guild.ts";
import { InteractionCommandPayload } from "./interactions.ts";
import {
  Application,
  Attachment,
  BaseMessageReactionPayload,
  Embed,
  MessageReactionRemoveEmojiPayload,
  MessageReactionUncachedPayload,
  PartialMessage,
  ReactionPayload,
} from "./message.ts";

export interface BotConfig {
  token: string;
  compress?: boolean;
  intents: (Intents | keyof typeof Intents)[];
  eventHandlers?: EventHandlers;
}

export interface GuildUpdateChange {
  key: string;
  oldValue?: unknown;
  value?: unknown;
}

export interface OldMessage {
  attachments: Attachment[];
  content: string;
  embeds: Embed[];
  editedTimestamp?: number;
  tts: boolean;
  pinned: boolean;
}

export interface DebugArg {
  /** Red is for errors or urgent issues. Yellow is for warnings/alerts. Green is for actions being taken. Blue is for  */
  type?:
    | "gatewayIdentify"
    | "error"
    | "globallyRateLimited"
    | "requestCreate"
    | "requestSuccess"
    | "requestFetch"
    | "requestFetched"
    | "requestMembersProcessing"
    | "gatewayHeartbeat"
    | "gatewayHeartbeatStopped"
    | "shardCreate"
    | "gatewayInvalidSession"
    | "gatewayReconnect"
    | "gatewayResume"
    | "gatewayResumed"
    | "wsClose"
    | "wsError"
    | "wsReconnect"
    | "missingShard";
  data: unknown;
}

export interface EventHandlers {
  applicationCommandCreate?: (data: Application) => unknown;
  /** Sent when properties about the user change. */
  botUpdate?: (user: UserPayload) => unknown;
  /** Sent when a new guild channel is created, relevant to the current user. */
  channelCreate?: (channel: Channel) => unknown;
  /** Sent when a channel is updated. This is not sent when the field `last_message_id` is altered. To keep track of the `last_message_id` changes, you must listen for `MESSAGE_CREATE` events. */
  channelUpdate?: (channel: Channel, cachedChannel: Channel) => unknown;
  /** Sent when a channel relevant to the current user is deleted. */
  channelDelete?: (channel: Channel) => unknown;
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
    emojis: Emoji[],
    cachedEmojis: Emoji[],
  ) => unknown;
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
  interactionCreate?: (data: InteractionCommandPayload) => unknown;
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
  /** Sent when a guild channel's webhook is created, updated, or deleted. */
  webhooksUpdate?: (channelID: string, guildID: string) => unknown;
}

/** https://discord.com/developers/docs/topics/gateway#list-of-intents */
export enum Intents {
  /** Enables the following events:
   * - GUILD_CREATE
   * - GUILD_DELETE
   * - GUILD_ROLE_CREATE
   * - GUILD_ROLE_UPDATE
   * - GUILD_ROLE_DELETE
   * - CHANNEL_CREATE
   * - CHANNEL_UPDATE
   * - CHANNEL_DELETE
   * - CHANNEL_PINS_UPDATE
   */
  GUILDS = 1 << 0,
  /** Enables the following events:
   * - GUILD_MEMBER_ADD
   * - GUILD_MEMBER_UPDATE
   * - GUILD_MEMBER_REMOVE
   */
  GUILD_MEMBERS = 1 << 1,
  /** Enables the following events:
   * - GUILD_BAN_ADD
   * - GUILD_BAN_REMOVE
   */
  GUILD_BANS = 1 << 2,
  /** Enables the following events:
   * - GUILD_EMOJIS_UPDATE
   */
  GUILD_EMOJIS = 1 << 3,
  /** Enables the following events:
   * - GUILD_INTEGRATIONS_UPDATE
   */
  GUILD_INTEGRATIONS = 1 << 4,
  /** Enables the following events:
   * - WEBHOOKS_UPDATE
   */
  GUILD_WEBHOOKS = 1 << 5,
  /** Enables the following events:
   * - INVITE_CREATE
   * - INVITE_DELETE
   */
  GUILD_INVITES = 1 << 6,
  /** Enables the following events:
   * - VOICE_STATE_UPDATE
   */
  GUILD_VOICE_STATES = 1 << 7,
  /** Enables the following events:
   * - PRESENCE_UPDATE
   */
  GUILD_PRESENCES = 1 << 8,
  /** Enables the following events:
   * - MESSAGE_CREATE
   * - MESSAGE_UPDATE
   * - MESSAGE_DELETE
   */
  GUILD_MESSAGES = 1 << 9,
  /** Enables the following events:
   * - MESSAGE_REACTION_ADD
   * - MESSAGE_REACTION_REMOVE
   * - MESSAGE_REACTION_REMOVE_ALL
   * - MESSAGE_REACTION_REMOVE_EMOJI
   */
  GUILD_MESSAGE_REACTIONS = 1 << 10,
  /** Enables the following events:
   * - TYPING_START
   */
  GUILD_MESSAGE_TYPING = 1 << 11,
  /** Enables the following events:
   * - CHANNEL_CREATE
   * - MESSAGE_CREATE
   * - MESSAGE_UPDATE
   * - MESSAGE_DELETE
   * - CHANNEL_PINS_UPDATE
   */
  DIRECT_MESSAGES = 1 << 12,
  /** Enables the following events:
   * - MESSAGE_REACTION_ADD
   * - MESSAGE_REACTION_REMOVE
   * - MESSAGE_REACTION_REMOVE_ALL
   * - MESSAGE_REACTION_REMOVE_EMOJI
   */
  DIRECT_MESSAGE_REACTIONS = 1 << 13,
  /** Enables the following events:
   * - TYPING_START
   */
  DIRECT_MESSAGE_TYPING = 1 << 14,
}

export type ValueOf<T> = T[keyof T];
