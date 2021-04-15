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
import { Channel, DiscordChannel } from "../types/channels/channel.ts";
import { ModifyChannel } from "../types/channels/modify_channel.ts";
import { DiscordOverwrite, Overwrite } from "../types/channels/overwrite.ts";
import { CreateMessage } from "../types/messages/create_message.ts";
import { PermissionStrings } from "../types/permissions/permission_strings.ts";
import { VoiceState } from "../types/voice/voice_state.ts";
import { Collection } from "../util/collection.ts";
import { createNewProp, snakeKeysToCamelCase } from "../util/utils.ts";
import { DiscordenoGuild } from "./guild.ts";
import { DiscordenoMember } from "./member.ts";
import { DiscordenoMessage } from "./message.ts";

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
      (voiceState) => voiceState.channelId === this.id,
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
    return editChannelOverwrite(this.guildId!, this.id!, id, options);
  },
  deleteOverwrite(id) {
    return deleteChannelOverwrite(this.guildId!, this.id!, id);
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
  data: DiscordChannel,
  guildId?: string,
) {
  const {
    guildId: rawGuildId = "",
    lastPinTimestamp,
    ...rest
  } = snakeKeysToCamelCase<Channel>(data);

  const props: Record<string, PropertyDescriptor> = {};
  Object.keys(rest).forEach((key) => {
    eventHandlers.debug?.(
      "loop",
      `Running forEach loop in createDiscordenoChannel function.`,
    );
    // @ts-ignore index signature
    props[key] = createNewProp(rest[key]);
  });

  const channel: DiscordenoChannel = Object.create(baseChannel, {
    ...props,
    guildId: createNewProp(guildId || rawGuildId),
    lastPinTimestamp: createNewProp(
      lastPinTimestamp ? Date.parse(lastPinTimestamp) : undefined,
    ),
  });

  return channel;
}

export interface DiscordenoChannel
  extends Omit<Channel, "permissionOverwrites"> {
  permissionOverwrites: DiscordOverwrite[];
  guildId: string;
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
  messages: Collection<string, DiscordenoMessage>;
  /** The mention of the channel */
  mention: string;
  /**
   * Gets the voice states for this channel
   *
   * ⚠️ ADVANCED: If you use the custom cache, these will not work for you. Getters can not be async and custom cache requires async.
   */
  voiceStates?: Collection<string, VoiceState>;
  /**
   * Gets the connected members for this channel undefined if member is not cached
   *
   * ⚠️ ADVANCED: If you use the custom cache, these will not work for you. Getters can not be async and custom cache requires async.
   */
  connectedMembers?: Collection<string, DiscordenoMember | undefined>;

  // METHODS

  /** Send a message to the channel. Requires SEND_MESSAGES permission. */
  send(content: string | CreateMessage): ReturnType<typeof sendMessage>;
  /** Disconnect a member from a voice channel. Requires MOVE_MEMBERS permission. */
  disconnect(memberID: string): ReturnType<typeof disconnectMember>;
  /** Delete the channel */
  delete(): ReturnType<typeof deleteChannel>;
  /** Edit a channel Overwrite */
  editOverwrite(
    overwriteID: string,
    options: Omit<Overwrite, "id">,
  ): ReturnType<typeof editChannelOverwrite>;
  /** Delete a channel Overwrite */
  deleteOverwrite(
    overwriteID: string,
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
