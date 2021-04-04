import { cache } from "../cache.ts";
import { channelOverwriteHasPermission } from "../helpers/channels/channel_overwrite_has_permission.ts";
import { deleteChannel } from "../helpers/channels/delete_channel.ts";
import { deleteChannelOverwrite } from "../helpers/channels/delete_channel_overwrite.ts";
import { editChannel } from "../helpers/channels/edit_channel.ts";
import { editChannelOverwrite } from "../helpers/channels/edit_channel_overwrite.ts";
import { sendMessage } from "../helpers/messages/send_message.ts";
import { disconnectMember } from "../helpers/mod.ts";
import { Channel, DiscordChannel } from "../types/channels/channel.ts";
import { Collection } from "../util/collection.ts";
import { createNewProp, snakeKeysToCamelCase } from "../util/utils.ts";

const baseChannel: Partial<Channel> = {
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

// deno-lint-ignore require-await
/** Create a structure object  */
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

export type ChannelStruct = Channel & typeof baseChannel;
