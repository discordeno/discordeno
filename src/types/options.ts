import {
  Properties,
  Emoji,
  DiscordPayload,
  PresenceUpdatePayload,
  TypingStartPayload,
  VoiceStateUpdatePayload,
} from "./discord.ts";
import { Role } from "../structures/role.ts";
import { Message } from "../structures/message.ts";
import {
  PartialMessage,
  ReactionPayload,
  BaseMessageReactionPayload,
  MessageReactionRemoveEmojiPayload,
  Embed,
  Attachment,
  MessageReactionUncachedPayload,
} from "./message.ts";
import { Channel } from "../structures/channel.ts";
import { Guild } from "../structures/guild.ts";
import { Member } from "../structures/member.ts";
import { UserPayload } from "./guild.ts";

export interface Fulfilled_Client_Options {
  token: string;
  properties: Properties;
  compress: boolean;
  intents: number;
}

export interface ClientOptions {
  token: string;
  properties?: Properties;
  compress?: boolean;
  intents: Intents[];
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
    | "identifying"
    | "requestManager"
    | "globallyRateLimited"
    | "requestManagerSuccess"
    | "requestManagerFailed"
    | "requestManagerFetching"
    | "requestManagerFetched"
    | "requestMembersProcessing"
    | "heartbeat"
    | "createShard"
    | "invalidSession"
    | "reconnect"
    | "resuming"
    | "resumed"
    | "websocketClose"
    | "websocketErrored"
    | "websocketReconnecting"
    | "missingShard";
  data: unknown;
}

export interface EventHandlers {
  botUpdate?: (user: UserPayload) => unknown;
  channelCreate?: (channel: Channel) => unknown;
  channelUpdate?: (channel: Channel, cachedChannel: Channel) => unknown;
  channelDelete?: (channel: Channel) => unknown;
  debug?: (args: DebugArg) => unknown;
  guildBanAdd?: (guild: Guild, user: Member | UserPayload) => unknown;
  guildBanRemove?: (guild: Guild, user: Member | UserPayload) => unknown;
  guildCreate?: (guild: Guild) => unknown;
  guildLoaded?: (guild: Guild) => unknown;
  guildUpdate?: (guild: Guild, changes: GuildUpdateChange[]) => unknown;
  guildDelete?: (guild: Guild) => unknown;
  guildEmojisUpdate?: (
    guild: Guild,
    emojis: Emoji[],
    cachedEmojis: Emoji[],
  ) => unknown;
  guildMemberAdd?: (guild: Guild, member: Member) => unknown;
  guildMemberRemove?: (guild: Guild, member: Member | UserPayload) => unknown;
  guildMemberUpdate?: (
    guild: Guild,
    member: Member,
    cachedMember?: Member,
  ) => unknown;
  heartbeat?: () => unknown;
  messageCreate?: (message: Message) => unknown;
  messageDelete?: (message: Message | PartialMessage) => unknown;
  messageUpdate?: (message: Message, cachedMessage: OldMessage) => unknown;
  nicknameUpdate?: (
    guild: Guild,
    member: Member,
    nickname: string,
    oldNickname?: string,
  ) => unknown;
  presenceUpdate?: (
    presence: PresenceUpdatePayload,
    oldPresence?: PresenceUpdatePayload,
  ) => unknown;
  raw?: (data: DiscordPayload) => unknown;
  rawGateway?: (data: unknown) => unknown;
  ready?: () => unknown;
  reactionAdd?: (
    message: Message | MessageReactionUncachedPayload,
    emoji: ReactionPayload,
    userID: string,
  ) => unknown;
  reactionRemove?: (
    message: Message | MessageReactionUncachedPayload,
    emoji: ReactionPayload,
    userID: string,
  ) => unknown;
  reactionRemoveAll?: (data: BaseMessageReactionPayload) => unknown;
  reactionRemoveEmoji?: (data: MessageReactionRemoveEmojiPayload) => unknown;
  roleCreate?: (guild: Guild, role: Role) => unknown;
  roleDelete?: (guild: Guild, role: Role) => unknown;
  roleUpdate?: (guild: Guild, role: Role, cachedRole: Role) => unknown;
  roleGained?: (guild: Guild, member: Member, roleID: string) => unknown;
  roleLost?: (guild: Guild, member: Member, roleID: string) => unknown;
  shardReady?: (shardID: number) => unknown;
  typingStart?: (data: TypingStartPayload) => unknown;
  voiceChannelJoin?: (member: Member, channelID: string) => unknown;
  voiceChannelLeave?: (member: Member, channelID: string) => unknown;
  voiceChannelSwitch?: (
    member: Member,
    channelID: string,
    oldChannelID: string,
  ) => unknown;
  voiceStateUpdate?: (
    member: Member,
    voiceState: VoiceStateUpdatePayload,
  ) => unknown;
  webhooksUpdate?: (channelID: string, guildID: string) => unknown;
}

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
