import { cache } from "../cache.ts";
import { channelOverwriteHasPermission } from "../helpers/channels/channel_overwrite_has_permission.ts";
import { deleteChannel } from "../helpers/channels/delete_channel.ts";
import { deleteChannelOverwrite } from "../helpers/channels/delete_channel_overwrite.ts";
import { editChannel } from "../helpers/channels/edit_channel.ts";
import { editChannelOverwrite } from "../helpers/channels/edit_channel_overwrite.ts";
import { sendMessage } from "../helpers/messages/send_message.ts";
import { disconnectMember } from "../helpers/mod.ts";
import { Collection } from "../util/collection.ts";
import { createNewProp } from "../util/utils.ts";
import { CleanVoiceState, Guild } from "./guild.ts";
import { Member } from "./member.ts";
import { Message } from "./message.ts";

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
export async function createChannelStruct(
  data: ChannelCreatePayload,
  guildId?: string,
) {
  const {
    guild_id: rawGuildId = "",
    last_message_id: lastMessageId,
    user_limit: userLimit,
    rate_limit_per_user: rateLimitPerUser,
    parent_id: parentId = undefined,
    last_pin_timestamp: lastPinTimestamp,
    permission_overwrites: permissionOverwrites = [],
    nsfw = false,
    ...rest
  } = data;

  const restProps: Record<string, ReturnType<typeof createNewProp>> = {};
  for (const key of Object.keys(rest)) {
    // @ts-ignore index signature
    restProps[key] = createNewProp(rest[key]);
  }

  const channel = Object.create(baseChannel, {
    ...restProps,
    guildId: createNewProp(guildId || rawGuildId),
    lastMessageId: createNewProp(lastMessageId),
    userLimit: createNewProp(userLimit),
    rateLimitPerUser: createNewProp(rateLimitPerUser),
    parentId: createNewProp(parentId),
    lastPinTimestamp: createNewProp(
      lastPinTimestamp ? Date.parse(lastPinTimestamp) : undefined,
    ),
    permissionOverwrites: createNewProp(permissionOverwrites),
    nsfw: createNewProp(nsfw),
  });

  return channel as Channel;
}
