import {
  ActivityEmojiPayload,
  AttachmentPayload,
  EmbedPayload,
  EmojiPayload,
  GatewayPayload,
  Intents,
  Interaction,
  MessageApplicationPayload,
  MessageReactionRemoveAllEventPayload,
  MessageReactionRemoveEmojiPayload,
  PresenceUpdateEventPayload,
  TypingStartEventPayload,
  UserPayload,
  VoiceStatePayload,
} from "../../types/mod.ts";
import { Channel, Guild, Member, Message, Role } from "../structures/mod.ts";

export interface GuildUpdateChange {
  key: string;
  oldValue?: unknown;
  value?: unknown;
}

export interface FetchMembersOptions {
  /** Used to specify if you want the presences of the matched members. Default = false. */
  presences?: boolean;
  /** Only returns members whose username or nickname starts with this string. DO NOT INCLUDE discriminators. If a string is provided, the max amount of members that can be fetched is 100. Default = return all members. */
  query?: string;
  /** Used to specify which users to fetch specifically. */
  userIDs?: string[];
  /** Maximum number of members to return that match the query. Default = 0 which will return all members. */
  limit?: number;
}

export interface BotConfig {
  token: string;
  compress?: boolean;
  intents: Intents[];
  eventHandlers?: EventHandlers;
}

export interface EventHandlers {
  applicationCommandCreate?: (data: MessageApplicationPayload) => unknown;
  botUpdate?: (user: UserPayload) => unknown;
  channelCreate?: (channel: Channel) => unknown;
  channelUpdate?: (channel: Channel, cachedChannel: Channel) => unknown;
  channelDelete?: (channel: Channel) => unknown;
  debug?: (args: DebugArg) => unknown;
  dispatchRequirements?: (data: GatewayPayload, shardID: number) => unknown;
  guildBanAdd?: (guild: Guild, user: UserPayload, member?: Member) => unknown;
  guildBanRemove?: (
    guild: Guild,
    user: UserPayload,
    member?: Member,
  ) => unknown;
  guildCreate?: (guild: Guild) => unknown;
  guildLoaded?: (guild: Guild) => unknown;
  guildUpdate?: (guild: Guild, changes: GuildUpdateChange[]) => unknown;
  guildDelete?: (guild: Guild) => unknown;
  guildEmojisUpdate?: (
    guild: Guild,
    emojis: EmojiPayload[],
    cachedEmojis: EmojiPayload[],
  ) => unknown;
  guildMemberAdd?: (guild: Guild, member: Member) => unknown;
  guildMemberRemove?: (
    guild: Guild,
    user: UserPayload,
    member?: Member,
  ) => unknown;
  guildMemberUpdate?: (
    guild: Guild,
    member: Member,
    cachedMember?: Member,
  ) => unknown;
  heartbeat?: () => unknown;
  interactionCreate?: (data: Interaction) => unknown;
  messageCreate?: (message: Message) => unknown;
  messageDelete?: (partial: Partial<Message>, message?: Message) => unknown;
  messageUpdate?: (message: Message, cachedMessage: OldMessage) => unknown;
  nicknameUpdate?: (
    guild: Guild,
    member: Member,
    nickname: string,
    oldNickname?: string,
  ) => unknown;
  presenceUpdate?: (
    presence: PresenceUpdateEventPayload,
    oldPresence?: PresenceUpdateEventPayload,
  ) => unknown;
  raw?: (data: GatewayPayload) => unknown;
  rawGateway?: (data: unknown) => unknown;
  ready?: () => unknown;
  reactionAdd?: (
    payload: MessageReactionUncachedPayload,
    emoji: ActivityEmojiPayload,
    userID: string,
    message?: Message,
  ) => unknown;
  reactionRemove?: (
    payload: MessageReactionUncachedPayload,
    emoji: Partial<EmojiPayload>,
    userID: string,
    message?: Message,
  ) => unknown;
  reactionRemoveAll?: (data: MessageReactionRemoveAllEventPayload) => unknown;
  reactionRemoveEmoji?: (data: MessageReactionRemoveEmojiPayload) => unknown;
  roleCreate?: (guild: Guild, role: Role) => unknown;
  roleDelete?: (guild: Guild, role: Role) => unknown;
  roleUpdate?: (guild: Guild, role: Role, cachedRole: Role) => unknown;
  roleGained?: (guild: Guild, member: Member, roleID: string) => unknown;
  roleLost?: (guild: Guild, member: Member, roleID: string) => unknown;
  shardReady?: (shardID: number) => unknown;
  typingStart?: (data: TypingStartEventPayload) => unknown;
  voiceChannelJoin?: (member: Member, channelID: string) => unknown;
  voiceChannelLeave?: (member: Member, channelID: string) => unknown;
  voiceChannelSwitch?: (
    member: Member,
    channelID: string,
    oldChannelID: string,
  ) => unknown;
  voiceStateUpdate?: (
    member: Member,
    voiceState: VoiceStatePayload,
  ) => unknown;
  webhooksUpdate?: (channelID: string, guildID: string) => unknown;
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

export interface OldMessage {
  attachments: AttachmentPayload[];
  content: string;
  embeds: EmbedPayload[];
  editedTimestamp?: number;
  tts: boolean;
  pinned: boolean;
}

export interface MessageReactionUncachedPayload
  extends MessageReactionRemoveAllEventPayload {
  id: string;
  channelID: string;
  guildID?: string;
}
