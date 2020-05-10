import {
  Properties,
  Emoji,
  DiscordPayload,
  PresenceUpdatePayload,
  TypingStartPayload,
  VoiceStateUpdatePayload,
} from "./discord.ts";
import { User } from "../structures/user.ts";
import { Member } from "./member.ts";
import { Role } from "../structures/role.ts";
import { Message } from "../structures/message.ts";
import {
  Partial_Message,
  MessageReactionPayload,
  Reaction_Payload,
  BaseMessageReactionPayload,
  MessageReactionRemoveEmojiPayload,
} from "./message.ts";
import { Channel } from "../structures/channel.ts";
import { Guild } from "../structures/guild.ts";

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
  botID: string;
  intents: Intents[];
  eventHandlers?: EventHandlers;
}

export interface EventHandlers {
  botUpdate?: (user: User, cachedUser?: User) => unknown;
  channelCreate?: (channel: Channel) => unknown;
  channel_update?: (channel: Channel, cachedChannel: Channel) => unknown;
  channelDelete?: (channel: Channel) => unknown;
  guildBanAdd?: (guild: Guild, user: User) => unknown;
  guildBanRemove?: (guild: Guild, user: User) => unknown;
  guildCreate?: (guild: Guild) => unknown;
  guildUpdate?: (guild: Guild, cachedGuild: Guild) => unknown;
  guildDelete?: (guild: Guild) => unknown;
  guildEmojisUpdate?: (
    guild: Guild,
    emojis: Emoji[],
    cachedEmojis: Emoji[],
  ) => unknown;
  guildMemberAdd?: (guild: Guild, member: Member) => unknown;
  guildMemberRemove?: (guild: Guild, member: Member | User) => unknown;
  guild_member_update?: (
    guild: Guild,
    member: Member,
    cachedMember?: Member,
  ) => unknown;
  heartbeat?: () => unknown;
  messageCreate?: (message: Message) => unknown;
  message_delete?: (message: Message | Partial_Message) => unknown;
  nicknameUpdate?: (
    guild: Guild,
    member: Member,
    nickname: string,
    old_nickname?: string,
  ) => unknown;
  presenceUpdate?: (data: PresenceUpdatePayload) => unknown;
  raw?: (data: DiscordPayload) => unknown;
  ready?: () => unknown;
  reactionAdd?: (
    message: Message | MessageReactionPayload,
    emoji: Reaction_Payload,
    user_id: string,
  ) => unknown;
  reactionRemove?: (
    message: Message | MessageReactionPayload,
    emoji: Reaction_Payload,
    user_id: string,
  ) => unknown;
  reactionRemoveAll?: (data: BaseMessageReactionPayload) => unknown;
  reactionRemoveEmoji?: (data: MessageReactionRemoveEmojiPayload) => unknown;
  roleCreate?: (guild: Guild, role: Role) => unknown;
  roleDelete?: (guild: Guild, role: Role) => unknown;
  roleUpdate?: (guild: Guild, role: Role, cached_role: Role) => unknown;
  role_gained?: (guild: Guild, member: Member, role_id: string) => unknown;
  role_lost?: (guild: Guild, member: Member, role_id: string) => unknown;
  typingStart?: (data: TypingStartPayload) => unknown;
  voiceChannelJoin?: (member: Member, channel_id: string) => unknown;
  voiceChannelLeave?: (member: Member, channel_id: string) => unknown;
  voiceChannelSwitch?: (
    member: Member,
    channel_id: string,
    old_channel_id: string,
  ) => unknown;
  voiceStateUpdate?: (
    member: Member,
    voice_state: VoiceStateUpdatePayload,
  ) => unknown;
  webhooksUpdate?: (channel_id: string, guild_id: string) => unknown;
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
