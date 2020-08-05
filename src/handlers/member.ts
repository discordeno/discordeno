import { Member } from "../structures/member.ts";
import { ImageSize, ImageFormats } from "../types/cdn.ts";
import { formatImageURL } from "../utils/cdn.ts";
import { endpoints } from "../constants/discord.ts";
import {
  highestRole,
  higherRolePosition,
  botHasPermission,
} from "../utils/permissions.ts";
import { botID } from "../module/client.ts";
import { Guild } from "../structures/guild.ts";
import { Permissions } from "../types/permission.ts";
import { Errors } from "../types/errors.ts";
import { RequestManager } from "../module/requestManager.ts";
import { MessageContent, DMChannelCreatePayload } from "../types/channel.ts";
import { cache } from "../utils/cache.ts";
import { createChannel } from "../structures/channel.ts";
import { EditMemberOptions } from "../types/member.ts";
import { sendMessage } from "./channel.ts";

/** The users custom avatar or the default avatar */
export function avatarURL(
  member: Member,
  size: ImageSize = 128,
  format?: ImageFormats,
) {
  return member.user.avatar
    ? formatImageURL(
      endpoints.USER_AVATAR(member.user.id, member.user.avatar),
      size,
      format,
    )
    : endpoints.USER_DEFAULT_AVATAR(Number(member.user.discriminator) % 5);
}

/** Add a role to the member */
export function addRole(
  guild: Guild,
  memberID: string,
  roleID: string,
  reason?: string,
) {
  const botsHighestRole = highestRole(guild.id, botID);
  if (
    botsHighestRole &&
    !higherRolePosition(guild.id, botsHighestRole.id, roleID)
  ) {
    throw new Error(Errors.BOTS_HIGHEST_ROLE_TOO_LOW);
  }

  if (!botHasPermission(guild.id, [Permissions.MANAGE_ROLES])) {
    throw new Error(Errors.MISSING_MANAGE_ROLES);
  }

  return RequestManager.put(
    endpoints.GUILD_MEMBER_ROLE(guild.id, memberID, roleID),
    { reason },
  );
}

/** Remove a role from the member */
export function removeRole(
  guildID: string,
  memberID: string,
  roleID: string,
  reason?: string,
) {
  const botsHighestRole = highestRole(guildID, botID);
  if (
    botsHighestRole &&
    !higherRolePosition(guildID, botsHighestRole.id, roleID)
  ) {
    throw new Error(Errors.BOTS_HIGHEST_ROLE_TOO_LOW);
  }

  if (!botHasPermission(guildID, [Permissions.MANAGE_ROLES])) {
    throw new Error(Errors.MISSING_MANAGE_ROLES);
  }
  return RequestManager.delete(
    endpoints.GUILD_MEMBER_ROLE(guildID, memberID, roleID),
    { reason },
  );
}

/** Send a message to a users DM. Note: this takes 2 API calls. 1 is to fetch the users dm channel. 2 is to send a message to that channel. */
export async function sendDirectMessage(
  memberID: string,
  content: string | MessageContent,
) {
  let dmChannel = cache.channels.get(memberID);
  if (!dmChannel) {
    // If not available in cache create a new one.
    const dmChannelData = await RequestManager.post(
      endpoints.USER_CREATE_DM,
      { recipient_id: memberID },
    ) as DMChannelCreatePayload;
    // Channel create event will have added this channel to the cache
    cache.channels.delete(dmChannelData.id);
    const channel = createChannel(dmChannelData);
    // Recreate the channel and add it undert he users id
    cache.channels.set(memberID, channel);
    dmChannel = channel;
  }

  // If it does exist try sending a message to this user
  return sendMessage(dmChannel, content);
}

/** Kick a member from the server */
export function kick(guild: Guild, memberID: string, reason?: string) {
  const botsHighestRole = highestRole(guild.id, botID);
  const membersHighestRole = highestRole(guild.id, memberID);
  if (
    botsHighestRole && membersHighestRole &&
    botsHighestRole.position <= membersHighestRole.position
  ) {
    throw new Error(Errors.BOTS_HIGHEST_ROLE_TOO_LOW);
  }

  if (!botHasPermission(guild.id, [Permissions.KICK_MEMBERS])) {
    throw new Error(Errors.MISSING_KICK_MEMBERS);
  }
  return RequestManager.delete(
    endpoints.GUILD_MEMBER(guild.id, memberID),
    { reason },
  );
}

/** Edit the member */
export function editMember(
  guild: Guild,
  memberID: string,
  options: EditMemberOptions,
) {
  if (options.nick) {
    if (options.nick.length > 32) {
      throw new Error(Errors.NICKNAMES_MAX_LENGTH);
    }
    if (!botHasPermission(guild.id, [Permissions.MANAGE_NICKNAMES])) {
      throw new Error(Errors.MISSING_MANAGE_NICKNAMES);
    }
  }

  if (
    options.roles &&
    !botHasPermission(guild.id, [Permissions.MANAGE_ROLES])
  ) {
    throw new Error(Errors.MISSING_MANAGE_ROLES);
  }

  if (options.mute) {
    // TODO: This should check if the member is in a voice channel
    if (
      !botHasPermission(guild.id, [Permissions.MUTE_MEMBERS])
    ) {
      throw new Error(Errors.MISSING_MUTE_MEMBERS);
    }
  }

  if (
    options.deaf &&
    !botHasPermission(guild.id, [Permissions.DEAFEN_MEMBERS])
  ) {
    throw new Error(Errors.MISSING_DEAFEN_MEMBERS);
  }

  // TODO: if channel id is provided check if the bot has CONNECT and MOVE in channel and current channel

  return RequestManager.patch(
    endpoints.GUILD_MEMBER(guild.id, memberID),
    options,
  );
}
