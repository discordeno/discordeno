import { eventHandlers } from "../bot.ts";
import { cache } from "../cache.ts";
import { channelOverwriteHasPermission } from "../helpers/channels/channel_overwrite_has_permission.ts";
import { cloneChannel } from "../helpers/channels/clone_channel.ts";
import { deleteChannel } from "../helpers/channels/delete_channel.ts";
import { deleteChannelOverwrite } from "../helpers/channels/delete_channel_overwrite.ts";
import { editChannel } from "../helpers/channels/edit_channel.ts";
import { editChannelOverwrite } from "../helpers/channels/edit_channel_overwrite.ts";
import { sendMessage } from "../helpers/messages/send_message.ts";
import { disconnectMember } from "../helpers/mod.ts";
import { Channel } from "../types/channels/channel.ts";
import { ModifyChannel } from "../types/channels/modify_channel.ts";
import { DiscordOverwrite, Overwrite } from "../types/channels/overwrite.ts";
import { CreateMessage } from "../types/messages/create_message.ts";
import { PermissionStrings } from "../types/permissions/permission_strings.ts";
import { snowflakeToBigint } from "../util/bigint.ts";
import { Collection } from "../util/collection.ts";
import { createNewProp } from "../util/utils.ts";
import { DiscordenoGuild } from "./guild.ts";
import { DiscordenoMember } from "./member.ts";
import { DiscordenoMessage } from "./message.ts";
import { DiscordenoVoiceState } from "./voice_state.ts";

const CHANNEL_SNOWFLAKES = [
  "id",
  "guildId",
  "lastMessageId",
  "ownerId",
  "applicationId",
  "parentId",
];

const baseChannel: Partial<DiscordenoChannel> = {
  get guild() {
    return cache.guilds.get(this.guildId!);
  },
  get messages() {
    return cache.messages.filter((m) => m.channelId === this.id!);
  },
  get mention() {
    return `<#${this.id!}>`;
  },
  get voiceStates() {
    return this.guild?.voiceStates.filter(
      (voiceState) => voiceState.channelId === this.id!,
    );
  },
  get connectedMembers() {
    const voiceStates = this.voiceStates;
    if (!voiceStates) return undefined;

    return new Collection(
      voiceStates.map((vs) => [vs.userId, cache.members.get(vs.userId)]),
    );
  },
  send(content) {
    return sendMessage(this.id!, content);
  },
  disconnect(memberId) {
    return disconnectMember(this.guildId!, memberId);
  },
  delete() {
    return deleteChannel(this.guildId!, this.id!);
  },
  editOverwrite(id, options) {
    return editChannelOverwrite(
      this.guildId!,
      this.id!,
      id,
      options,
    );
  },
  deleteOverwrite(id) {
    return deleteChannelOverwrite(
      this.guildId!,
      this.id!,
      id,
    );
  },
  hasPermission(overwrites, permissions) {
    return channelOverwriteHasPermission(
      this.guildId!,
      this.id!,
      overwrites,
      permissions,
    );
  },
  edit(options, reason) {
    return editChannel(this.id!, options, reason);
  },
  clone(reason) {
    return cloneChannel(this.id!, reason);
  },
};

/** Create a structure object  */
// deno-lint-ignore require-await
export async function createDiscordenoChannel(
  data: Channel,
  guildId?: bigint,
) {
  const {
    lastPinTimestamp,
    ...rest
  } = data;

  const props: Record<string, PropertyDescriptor> = {};
  Object.entries(rest).forEach(([key, value]) => {
    eventHandlers.debug?.(
      "loop",
      `Running forEach loop in createDiscordenoChannel function.`,
    );

    if (key === "guildId") value = guildId || data.guildId || "";

    props[key] = createNewProp(
      CHANNEL_SNOWFLAKES.includes(key)
        ? value ? snowflakeToBigint(value) : undefined
        : value,
    );
  });

  const channel: DiscordenoChannel = Object.create(baseChannel, {
    ...props,
    lastPinTimestamp: createNewProp(
      lastPinTimestamp ? Date.parse(lastPinTimestamp) : undefined,
    ),
  });

  return channel;
}

export interface DiscordenoChannel extends
  Omit<
    Channel,
    | "id"
    | "guildId"
    | "lastMessageId"
    | "ownerId"
    | "applicationId"
    | "parentId"
    | "permissionOverwrites"
  > {
  permissionOverwrites: DiscordOverwrite[];
  /** The id of the channel */
  id: bigint;
  /** The id of the guild */
  guildId: bigint;
  /** The id of the last message sent in this channel (may not point to an existing or valid message) */
  lastMessageId?: bigint;
  /** id of the DM creator */
  ownerId?: bigint;
  /** Application id of the group DM creator if it is bot-created */
  applicationId?: bigint;
  /** Id of the parent category for a channel (each parent category can contain up to 50 channels) */
  parentId?: bigint;
  // GETTERS

  /**
   * Gets the guild object for this channel.
   *
   * ⚠️ ADVANCED: If you use the custom cache, these will not work for you. Getters can not be async and custom cache requires async.
   */
  guild?: DiscordenoGuild;
  /**
   * Gets the messages from cache that were sent in this channel
   *
   * ⚠️ ADVANCED: If you use the custom cache, these will not work for you. Getters can not be async and custom cache requires async.
   */
  messages: Collection<bigint, DiscordenoMessage>;
  /** The mention of the channel */
  mention: string;
  /**
   * Gets the voice states for this channel
   *
   * ⚠️ ADVANCED: If you use the custom cache, these will not work for you. Getters can not be async and custom cache requires async.
   */
  voiceStates?: Collection<bigint, DiscordenoVoiceState>;
  /**
   * Gets the connected members for this channel undefined if member is not cached
   *
   * ⚠️ ADVANCED: If you use the custom cache, these will not work for you. Getters can not be async and custom cache requires async.
   */
  connectedMembers?: Collection<bigint, DiscordenoMember | undefined>;

  // METHODS

  /** Send a message to the channel. Requires SEND_MESSAGES permission. */
  send(content: string | CreateMessage): ReturnType<typeof sendMessage>;
  /** Disconnect a member from a voice channel. Requires MOVE_MEMBERS permission. */
  disconnect(memberId: bigint): ReturnType<typeof disconnectMember>;
  /** Delete the channel */
  delete(): ReturnType<typeof deleteChannel>;
  /** Edit a channel Overwrite */
  editOverwrite(
    overwriteId: bigint,
    options: Omit<Overwrite, "id">,
  ): ReturnType<typeof editChannelOverwrite>;
  /** Delete a channel Overwrite */
  deleteOverwrite(
    overwriteId: bigint,
  ): ReturnType<typeof deleteChannelOverwrite>;
  /** Checks if a channel overwrite for a user id or a role id has permission in this channel */
  hasPermission(
    overwrites: DiscordOverwrite[],
    permissions: PermissionStrings[],
  ): ReturnType<typeof channelOverwriteHasPermission>;
  /** Edit the channel */
  edit(options: ModifyChannel, reason?: string): ReturnType<typeof editChannel>;
  /** Create a new channel with the same properties */
  clone(reason?: string): ReturnType<typeof cloneChannel>;
}
