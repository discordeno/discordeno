import {
  Properties,
  Emoji,
  DiscordPayload,
  Presence_Update_Payload,
  Typing_Start_Payload,
  Voice_State_Update_Payload
} from "./discord.ts"
import { Channel, Guild } from "./return-type.ts"
import { User } from "../structures/user.ts"
import { Member } from "./member.ts"
import { Role } from "../structures/role.ts"
import { Message } from "../structures/message.ts"
import {
  Partial_Message,
  Message_Reaction_Payload,
  Reaction_Payload,
  Base_Message_Reaction_Payload,
  Message_Reaction_Remove_Emoji_Payload
} from "./message.ts"

export interface Fulfilled_Client_Options {
  token: string
  properties: Properties
  compress: boolean
  intents: number
}

export interface Client_Options {
  token: string
  properties?: Properties
  compress?: boolean
  bot_id: string
  intents: Intents[]
  event_handlers?: Event_Handlers
}

export interface Event_Handlers {
  bot_update?: (user: User, cached_user?: User) => unknown
  channel_create?: (channel: Channel) => unknown
  channel_update?: (channel: Channel, cached_channel: Channel) => unknown
  channel_delete?: (channel: Channel) => unknown
  guild_ban_add?: (guild: Guild, user: User) => unknown
  guild_ban_remove?: (guild: Guild, user: User) => unknown
  guild_create?: (guild: Guild) => unknown
  guild_update?: (guild: Guild, cached_guild: Guild) => unknown
  guild_delete?: (guild: Guild) => unknown
  guild_emojis_update?: (guild: Guild, emojis: Emoji[], cached_emojis: Emoji[]) => unknown
  guild_member_add?: (guild: Guild, member: Member) => unknown
  guild_member_remove?: (guild: Guild, member: Member | User) => unknown
  guild_member_update?: (guild: Guild, member: Member, cached_member?: Member) => unknown
  heartbeat?: () => unknown
  message_create?: (message: Message) => unknown
  message_delete?: (message: Message | Partial_Message) => unknown
  nickname_update?: (guild: Guild, member: Member, nickname: string, old_nickname?: string) => unknown
  presence_update?: (data: Presence_Update_Payload) => unknown
  raw?: (data: DiscordPayload) => unknown
  ready?: () => unknown
  reaction_add?: (message: Message | Message_Reaction_Payload, emoji: Reaction_Payload, user_id: string) => unknown
  reaction_remove?: (message: Message | Message_Reaction_Payload, emoji: Reaction_Payload, user_id: string) => unknown
  reaction_remove_all?: (data: Base_Message_Reaction_Payload) => unknown
  reaction_remove_emoji?: (data: Message_Reaction_Remove_Emoji_Payload) => unknown
  role_create?: (guild: Guild, role: Role) => unknown
  role_delete?: (guild: Guild, role: Role) => unknown
  role_update?: (guild: Guild, role: Role, cached_role: Role) => unknown
  role_gained?: (guild: Guild, member: Member, role_id: string) => unknown
  role_lost?: (guild: Guild, member: Member, role_id: string) => unknown
  typing_start?: (data: Typing_Start_Payload) => unknown
  voice_channel_join?: (member: Member, channel_id: string) => unknown
  voice_channel_leave?: (member: Member, channel_id: string) => unknown
  voice_channel_switch?: (member: Member, channel_id: string, old_channel_id: string) => unknown
  voice_state_update?: (member: Member, voice_state: Voice_State_Update_Payload) => unknown
  webhooks_update?: (channel_id: string, guild_id: string) => unknown
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
  DIRECT_MESSAGE_TYPING = 1 << 14
}
