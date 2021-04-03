import { cache } from "../cache.ts";
import { channelOverwriteHasPermission } from "../helpers/channels/channel_overwrite_has_permission.ts";
import { deleteChannel } from "../helpers/channels/delete_channel.ts";
import { deleteChannelOverwrite } from "../helpers/channels/delete_channel_overwrite.ts";
import { editChannel } from "../helpers/channels/edit_channel.ts";
import { editChannelOverwrite } from "../helpers/channels/edit_channel_overwrite.ts";
import { sendMessage } from "../helpers/messages/send_message.ts";
import { disconnectMember } from "../helpers/mod.ts";
import { Channel, DiscordChannel } from "../types/channels/channel.ts";
import {
  CreateMessage,
  DiscordOverwrite,
  ModifyChannel,
  Overwrite,
  PermissionStrings,
  VoiceState,
} from "../types/mod.ts";
import { Collection } from "../util/collection.ts";
import { createNewProp, snakeKeysToCamelCase } from "../util/utils.ts";

const baseChannel: Partial<ChannelStruct> = {
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
    return this.guild?.voiceStates.filter((voiceState) =>
      voiceState.channelId === this.id
    );
  },
  get connectedMembers() {
    const voiceStates = this.voiceStates;
    if (!voiceStates) return undefined;

    return new Collection(
      voiceStates.map((vs, key) => [key, cache.members.get(key)]),
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
};

/** Create a structure object  */
// deno-lint-ignore require-await
export async function createChannelStruct(
  data: DiscordChannel,
  guildId?: string,
) {
  const {
    guildId: rawGuildId = "",
    lastPinTimestamp,
    ...rest
  } = snakeKeysToCamelCase(data) as Channel;

  const props: Record<string, PropertyDescriptor> = {};
  Object.keys(rest).forEach((key) => {
    // @ts-ignore index signature
    props[key] = createNewProp(rest[key]);
  });

  const channel: ChannelStruct = Object.create(baseChannel, {
    ...props,
    guildId: createNewProp(guildId || rawGuildId),
    lastPinTimestamp: createNewProp(
      lastPinTimestamp ? Date.parse(lastPinTimestamp) : undefined,
    ),
  });

  return channel;
}

export interface ChannelStruct extends Channel {
  // GETTERS

  /**
   * Gets the guild object for this channel.
   *
   * ⚠️ ADVANCED: If you use the custom cache, these will not work for you. Getters can not be async and custom cache requires async.
   */
  guild?: GuildStruct;
  /**
   * Gets the messages from cache that were sent in this channel
   *
   * ⚠️ ADVANCED: If you use the custom cache, these will not work for you. Getters can not be async and custom cache requires async.
   */
  messages: Collection<string, MessageStruct>;
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
  connectedMembers?: Collection<string, MemberStruct | undefined>;

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
  edit(
    options: ModifyChannel,
    reason?: string,
  ): ReturnType<typeof editChannel>;
}
