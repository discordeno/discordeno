import { cacheHandlers } from "../controllers/cache.ts";
import { botID } from "../module/client.ts";
import { RequestManager } from "../module/requestManager.ts";
import { Member } from "../structures/member.ts";
import { structures } from "../structures/mod.ts";
import { ImageFormats, ImageSize } from "../types/cdn.ts";
import { DMChannelCreatePayload, MessageContent } from "../types/channel.ts";
import { Errors } from "../types/errors.ts";
import { EditMemberOptions } from "../types/member.ts";
import { Permissions } from "../types/permission.ts";
import { formatImageURL } from "../utils/cdn.ts";
import { endpoints } from "../utils/constants.ts";
import {
  botHasPermission,
  higherRolePosition,
  highestRole,
} from "../utils/permissions.ts";
import { urlToBase64 } from "../utils/utils.ts";
import { sendMessage } from "./channel.ts";

/** The users custom avatar or the default avatar if you don't have a member object. */
export function rawAvatarURL(
  userID: string,
  discriminator: string,
  avatar?: string | null,
  size: ImageSize = 128,
  format?: ImageFormats,
) {
  return avatar
    ? formatImageURL(endpoints.USER_AVATAR(userID, avatar), size, format)
    : endpoints.USER_DEFAULT_AVATAR(Number(discriminator) % 5);
}

/** The users custom avatar or the default avatar */
export function avatarURL(
  member: Member,
  size: ImageSize = 128,
  format?: ImageFormats,
) {
  return rawAvatarURL(
    member.user.id,
    member.user.discriminator,
    member.user.avatar,
    size,
    format,
  );
}

/** Add a role to the member */
export async function addRole(
  guildID: string,
  memberID: string,
  roleID: string,
  reason?: string,
) {
  const botsHighestRole = await highestRole(guildID, botID);
  if (botsHighestRole) {
    const hasHigherRolePosition = await higherRolePosition(
      guildID,
      botsHighestRole.id,
      roleID,
    );
    if (!hasHigherRolePosition) {
      throw new Error(Errors.BOTS_HIGHEST_ROLE_TOO_LOW);
    }
  }

  const hasPerm = await botHasPermission(guildID, [Permissions.MANAGE_ROLES]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_MANAGE_ROLES);
  }

  return RequestManager.put(
    endpoints.GUILD_MEMBER_ROLE(guildID, memberID, roleID),
    { reason },
  );
}

/** Remove a role from the member */
export async function removeRole(
  guildID: string,
  memberID: string,
  roleID: string,
  reason?: string,
) {
  const botsHighestRole = await highestRole(guildID, botID);

  if (botsHighestRole) {
    const hasHigherRolePosition = await higherRolePosition(
      guildID,
      botsHighestRole.id,
      roleID,
    );
    if (!hasHigherRolePosition) {
      throw new Error(Errors.BOTS_HIGHEST_ROLE_TOO_LOW);
    }
  }

  const hasPerm = await botHasPermission(guildID, [Permissions.MANAGE_ROLES]);
  if (!hasPerm) {
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
  let dmChannel = await cacheHandlers.get("channels", memberID);
  if (!dmChannel) {
    // If not available in cache create a new one.
    const dmChannelData = await RequestManager.post(
      endpoints.USER_CREATE_DM,
      { recipient_id: memberID },
    ) as DMChannelCreatePayload;
    // Channel create event will have added this channel to the cache
    cacheHandlers.delete("channels", dmChannelData.id);
    const channel = await structures.createChannel(dmChannelData);
    // Recreate the channel and add it undert he users id
    cacheHandlers.set("channels", memberID, channel);
    dmChannel = channel;
  }

  // If it does exist try sending a message to this user
  return sendMessage(dmChannel.id, content);
}

/** Kick a member from the server */
export async function kick(guildID: string, memberID: string, reason?: string) {
  const botsHighestRole = await highestRole(guildID, botID);
  const membersHighestRole = await highestRole(guildID, memberID);
  if (
    botsHighestRole && membersHighestRole &&
    botsHighestRole.position <= membersHighestRole.position
  ) {
    throw new Error(Errors.BOTS_HIGHEST_ROLE_TOO_LOW);
  }

  const hasPerm = await botHasPermission(guildID, [Permissions.KICK_MEMBERS]);
  if (!hasPerm) {
    throw new Error(Errors.MISSING_KICK_MEMBERS);
  }

  return RequestManager.delete(
    endpoints.GUILD_MEMBER(guildID, memberID),
    { reason },
  );
}

/** Edit the member */
export async function editMember(
  guildID: string,
  memberID: string,
  options: EditMemberOptions,
) {
  if (options.nick) {
    if (options.nick.length > 32) {
      throw new Error(Errors.NICKNAMES_MAX_LENGTH);
    }

    const hasManageNickPerm = await botHasPermission(
      guildID,
      [Permissions.MANAGE_NICKNAMES],
    );
    if (!hasManageNickPerm) {
      throw new Error(Errors.MISSING_MANAGE_NICKNAMES);
    }
  }

  const hasManageRolesPerm = await botHasPermission(
    guildID,
    [Permissions.MANAGE_ROLES],
  );
  if (
    options.roles &&
    !hasManageRolesPerm
  ) {
    throw new Error(Errors.MISSING_MANAGE_ROLES);
  }

  if (options.mute) {
    const hasMuteMembersPerm = await botHasPermission(
      guildID,
      [Permissions.MUTE_MEMBERS],
    );
    // TODO: This should check if the member is in a voice channel
    if (
      !hasMuteMembersPerm
    ) {
      throw new Error(Errors.MISSING_MUTE_MEMBERS);
    }
  }

  const hasDeafenMembersPerm = await botHasPermission(
    guildID,
    [Permissions.DEAFEN_MEMBERS],
  );
  if (
    options.deaf &&
    !hasDeafenMembersPerm
  ) {
    throw new Error(Errors.MISSING_DEAFEN_MEMBERS);
  }

  // TODO: if channel id is provided check if the bot has CONNECT and MOVE in channel and current channel

  return RequestManager.patch(
    endpoints.GUILD_MEMBER(guildID, memberID),
    options,
  );
}

/**
 * Move a member from a voice channel to another.
 * @param guildID the id of the guild which the channel exists in
 * @param memberID the id of the member to move.
 * @param channelID id of channel to move user to (if they are connected to voice)
 */
export function moveMember(
  guildID: string,
  memberID: string,
  channelID: string,
) {
  return editMember(guildID, memberID, { channel_id: channelID });
}

/** Modifies the bot's username or avatar.
 * NOTE: username: if changed may cause the bot's discriminator to be randomized.
 */
export function editBotProfile(username?: string, avatarURL?: string) {
  // Nothing was edited
  if (!username && !avatarURL) return;
  // Check username requirements if username was provided
  if (username) {
    if (username.length > 32) {
      throw new Error(Errors.USERNAME_MAX_LENGTH);
    }
    if (username.length < 2) {
      throw new Error(Errors.USERNAME_MIN_LENGTH);
    }
    if (["@", "#", ":", "```"].some((char) => username.includes(char))) {
      throw new Error(Errors.USERNAME_INVALID_CHARACTER);
    }
    if (["discordtag", "everyone", "here"].includes(username)) {
      throw new Error(Errors.USERNAME_INVALID_USERNAME);
    }
  }

  RequestManager.patch(
    endpoints.USER_BOT,
    {
      username: username?.trim(),
      avatar: avatarURL ? urlToBase64(avatarURL) : undefined,
    },
  );
}
