import type { DiscordenoChannel } from "../../structures/channel.ts";
import type { DiscordenoGuild } from "../../structures/guild.ts";
import type { DiscordenoMember } from "../../structures/member.ts";
import type { DiscordenoMessage } from "../../structures/message.ts";
import type { DiscordenoRole } from "../../structures/role.ts";
import { DiscordenoThread } from "../../util/transformers/channel_to_thread.ts";
import type { Collection } from "../../util/collection.ts";
import type { PresenceUpdate } from "../activity/presence_update.ts";
import type { StageInstance } from "../channels/stage_instance.ts";
import type { ThreadMemberModified } from "../channels/threads/thread_member.ts";
import type { ThreadMembersUpdateModified } from "../channels/threads/thread_members_update.ts";
import type { Emoji } from "../emojis/emoji.ts";
import type { GatewayPayload } from "../gateway/gateway_payload.ts";
import type { DiscordGatewayPayload } from "../gateway/gateway_payload.ts";
import type { IntegrationCreateUpdate } from "../integrations/integration_create_update.ts";
import type { IntegrationDelete } from "../integrations/integration_delete.ts";
import type { ApplicationCommandCreateUpdateDelete } from "../interactions/commands/application_command_create_update_delete.ts";
import type { Interaction } from "../interactions/interaction.ts";
import type { InviteCreate } from "../invites/invite_create.ts";
import type { InviteDelete } from "../invites/invite_delete.ts";
import type { MessageReactionAdd } from "../messages/message_reaction_add.ts";
import type { MessageReactionRemove } from "../messages/message_reaction_remove.ts";
import type { MessageReactionRemoveAll } from "../messages/message_reaction_remove_all.ts";
import type { TypingStart } from "../misc/typing_start.ts";
import type { User } from "../users/user.ts";
import type { VoiceServerUpdate } from "../voice/voice_server_update.ts";
import type { VoiceState } from "../voice/voice_state.ts";
import type { DebugArg } from "./debug_arg.ts";
import type { GuildUpdateChange } from "./guild_update_change.ts";

export type EventHandlersDefinitions = {
  /** Sent when a new Slash Command is created, relevant to the current user. */
  applicationCommandCreate: [data: ApplicationCommandCreateUpdateDelete];
  /** Sent when a Slash Command relevant to the current user is updated. */
  applicationCommandUpdate: [data: ApplicationCommandCreateUpdateDelete];
  /** Sent when a Slash Command relevant to the current user is deleted. */
  applicationCommandDelete: [data: ApplicationCommandCreateUpdateDelete];
  /** Sent when properties about the user change. */
  botUpdate: [user: User];
  /** Sent when a new guild channel is created, relevant to the current user. */
  channelCreate: [channel: DiscordenoChannel];
  /** Sent when a channel is updated. This is not sent when the field `last_message_id` is altered. To keep track of the `last_message_id` changes, you must listen for `MESSAGE_CREATE` events. */
  channelUpdate: [channel: DiscordenoChannel, oldChannel: DiscordenoChannel];
  /** Sent when a channel relevant to the current user is deleted. */
  channelDelete: [channel: DiscordenoChannel];
  /** Sent when a message pin is updated */
  channelPinsUpdate: [channel: DiscordenoChannel, guild?: DiscordenoGuild, lastPinTimestamp?: string | null];
  debug: [args: string | DebugArg, data?: string];
  /** Sent before every event. Discordeno awaits the execution of this event before main event gets sent. */
  dispatchRequirements: [data: DiscordGatewayPayload, shardId: number];
  /** Sent when a user is banned from a guild. */
  guildBanAdd: [guild: DiscordenoGuild, user: User, member?: DiscordenoMember];
  /** Sent when a user is unbanned from a guild. */
  guildBanRemove: [guild: DiscordenoGuild, user: User, member?: DiscordenoMember];
  /**
   * This event can be sent in three different scenarios:
   * 1. When a user is initially connecting, to lazily load and backfill information for all unavailable guilds sent in the `READY` event. Guilds that are unavailable due to an outage will send a `GUILD_DELETE` event.
   * 2. When a Guild becomes available again to the client.
   * 3. When the current user joins a new Guild.
   *
   * This event does not get sent on startup
   */
  guildCreate: [guild: DiscordenoGuild];
  /** This event does get sent on start when shards are loading the guilds */
  guildLoaded: [guild: DiscordenoGuild];
  /** When a guild goes available this event will be ran. */
  guildAvailable: [guild: DiscordenoGuild];
  /** When a guild goes unavailable this event will be ran. */
  guildUnavailable: [guild: DiscordenoGuild];
  /** Sent when a guilds integration gets updated */
  guildIntegrationsUpdate: [guild: DiscordenoGuild];
  /** Sent when a guild is updated. */
  guildUpdate: [guild: DiscordenoGuild, changes: GuildUpdateChange[]];
  /** Sent when a guild becomes or was already unavailable due to an outage, or when the user leaves or is removed from a guild. If the `unavailable` field is not set, the user was removed from the guild. */
  guildDelete: [guild: DiscordenoGuild];
  /** Sent when a guild's emojis have been updated. */
  guildEmojisUpdate: [guild: DiscordenoGuild, emojis: Collection<bigint, Emoji>, oldEmojis: Collection<bigint, Emoji>];
  /** Sent when a new user joins a guild. */
  guildMemberAdd: [guild: DiscordenoGuild, member: DiscordenoMember];
  /** Sent when a user is removed from a guild (leave/kick/ban). */
  guildMemberRemove: [guild: DiscordenoGuild, user: User, member?: DiscordenoMember];
  /** Sent when a guild member is updated. This will also fire when the user object of a guild member changes. */
  guildMemberUpdate: [guild: DiscordenoGuild, member: DiscordenoMember, oldMember?: DiscordenoMember];
  /** Sent when a user uses a Slash Command (type 2) or clicks a button (type 3). */
  interactionCreate: [data: Interaction, member?: DiscordenoMember];
  /** Sent when a user uses a Slash Command in a guild (type 2) or clicks a button (type 3). */
  interactionGuildCreate: [data: Interaction, member: DiscordenoMember];
  /** Sent when a user uses a Slash Command in a dm (type 2) or clicks a button (type 3). */
  interactionDMCreate: [data: Omit<Interaction, "member">];
  /** Sent when a lurker joins/leaves/moves stage channels. */
  lurkerVoiceStateUpdate: [member: DiscordenoMember, voiceState: VoiceState];
  /** Sent when a message is created. */
  messageCreate: [message: DiscordenoMessage];
  /** Sent when a message is deleted. */
  messageDelete: [partial: { id: string; channel: DiscordenoChannel }, message?: DiscordenoMessage];
  /** Sent when a message is updated. */
  messageUpdate: [message: DiscordenoMessage, oldMessage: DiscordenoMessage];
  /** Sent when a user updates its nickname */
  nicknameUpdate: [guild: DiscordenoGuild, member: DiscordenoMember, nickname: string, oldNickname?: string];
  /** A user's presence is their current state on a guild. This event is sent when a user's presence or info, such as name or avatar, is updated. */
  presenceUpdate: [presence: PresenceUpdate, oldPresence?: PresenceUpdate];
  /** Sent before every event execution. Discordeno will not await its execution. */
  raw: [data: GatewayPayload];
  /** Sent when all shards went ready. */
  ready: [];
  /** Sent when a user adds a reaction to a message. */
  reactionAdd: [data: MessageReactionAdd, message?: DiscordenoMessage];
  /** Sent when a user removes a reaction from a message. */
  reactionRemove: [data: MessageReactionRemove, message?: DiscordenoMessage];
  /** Sent when a user explicitly removes all reactions from a message. */
  reactionRemoveAll: [payload: MessageReactionRemoveAll, message?: DiscordenoMessage];
  /** Sent when a bot removes all instances of a given emoji from the reactions of a message. */
  reactionRemoveEmoji: [emoji: Partial<Emoji>, messageId: bigint, channelId: bigint, guildId?: bigint];
  /** Sent when a guild role is created. */
  roleCreate: [guild: DiscordenoGuild, role: DiscordenoRole];
  /** Sent when a guild role is deleted. */
  roleDelete: [guild: DiscordenoGuild, role: DiscordenoRole];
  /** Sent when a guild role is updated. */
  roleUpdate: [guild: DiscordenoGuild, role: DiscordenoRole, old: DiscordenoRole];
  roleGained: [guild: DiscordenoGuild, member: DiscordenoMember, roleId: bigint];
  roleLost: [guild: DiscordenoGuild, member: DiscordenoMember, roleId: bigint];
  shardReady: [shardId: number];
  /** Sent when a shard failed to load. */
  shardFailedToLoad: [shardId: number, unavailableGuildIds: Set<bigint>];
  /** Sent when a Stage instance is created (i.e. the Stage is now "live"). */
  stageInstanceCreate: [instance: StageInstance];
  /** Sent when a Stage instance has been deleted (i.e. the Stage has been closed). */
  stageInstanceDelete: [instance: StageInstance];
  /** Sent when a Stage instance has been updated. */
  stageInstanceUpdate: [instance: StageInstance];
  /** Sent when a thread is created */
  threadCreate: [thread: DiscordenoThread];
  /** Sent when a thread is updated */
  threadUpdate: [thread: DiscordenoThread, oldThread: DiscordenoThread];
  /** Sent when the bot gains access to threads */
  threadListSync: [threads: Collection<bigint, DiscordenoThread>, members: ThreadMemberModified[], guildId: bigint];
  /** Sent when the current users thread member is updated */
  threadMemberUpdate: [threadMember: ThreadMemberModified, thread: DiscordenoThread];
  /** Sent when anyone is added to or removed from a thread */
  threadMembersUpdate: [update: ThreadMembersUpdateModified];
  /** Sent when a thread is deleted */
  threadDelete: [thread: DiscordenoThread];
  /** Sent when a user starts typing in a channel. */
  typingStart: [data: TypingStart];
  /** Sent when a user joins a voice channel */
  voiceChannelJoin: [member: DiscordenoMember, channelId: bigint];
  /** Sent when a user leaves a voice channel. Does not get sent when user switches the voice channel */
  voiceChannelLeave: [member: DiscordenoMember, channelId: bigint];
  /** Sent when a user switches the voice channel */
  voiceChannelSwitch: [member: DiscordenoMember, channelId: bigint, oldChannelId: bigint];
  /** Sent when a voice server is updated with information for making the bot connect to a voice channel. */
  voiceServerUpdate: [payload: VoiceServerUpdate, guild: DiscordenoGuild];
  /** Sent when someone joins/leaves/moves voice channels. */
  voiceStateUpdate: [member: DiscordenoMember, voiceState: VoiceState];
  /** Sent when a guild channel's webhook is created, updated, or deleted. */
  webhooksUpdate: [channelId: bigint, guildId: bigint];
  /** Sent when a member has passed the guild's Membership Screening requirements */
  membershipScreeningPassed: [guild: DiscordenoGuild, member: DiscordenoMember];
  /** Sent when an integration is created on a server such as twitch, youtube etc.. */
  integrationCreate: [data: IntegrationCreateUpdate];
  /** Sent when an integration is updated. */
  integrationUpdate: [data: IntegrationCreateUpdate];
  /** Sent when an integration is deleted. */
  integrationDelete: [data: IntegrationDelete];
  /** Sent when a new invite to a channel is created. */
  inviteCreate: [data: InviteCreate];
  /** Sent when an invite is deleted. */
  inviteDelete: [data: InviteDelete];
};

export type EventHandlers = {
  [E in keyof EventHandlersDefinitions]?: (...args: EventHandlersDefinitions[E]) => unknown;
};
