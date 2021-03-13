import { cacheHandlers } from "../../cache.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import {
  EditMemberOptions,
  Errors,
  MemberCreatePayload,
  Permission,
} from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import {
  requireBotChannelPermissions,
  requireBotGuildPermissions,
} from "../../util/permissions.ts";

/** Edit the member */
export async function editMember(
  guildID: string,
  memberID: string,
  options: EditMemberOptions,
) {
  const requiredPerms: Set<Permission> = new Set();

  if (options.nick) {
    if (options.nick.length > 32) {
      throw new Error(Errors.NICKNAMES_MAX_LENGTH);
    }
    requiredPerms.add("MANAGE_NICKNAMES");
  }

  if (options.roles) requiredPerms.add("MANAGE_ROLES");

  if (
    typeof options.mute !== "undefined" ||
    typeof options.deaf !== "undefined" ||
    (typeof options.channel_id !== "undefined" || "null")
  ) {
    const memberVoiceState = (await cacheHandlers.get("guilds", guildID))
      ?.voiceStates.get(memberID);

    if (!memberVoiceState?.channelID) {
      throw new Error(Errors.MEMBER_NOT_IN_VOICE_CHANNEL);
    }

    if (typeof options.mute !== "undefined") {
      requiredPerms.add("MUTE_MEMBERS");
    }

    if (typeof options.deaf !== "undefined") {
      requiredPerms.add("DEAFEN_MEMBERS");
    }

    if (options.channel_id) {
      const requiredVoicePerms: Set<Permission> = new Set([
        "CONNECT",
        "MOVE_MEMBERS",
      ]);
      if (memberVoiceState) {
        await requireBotChannelPermissions(
          memberVoiceState?.channelID,
          [...requiredVoicePerms],
        );
      }
      await requireBotChannelPermissions(
        options.channel_id,
        [...requiredVoicePerms],
      );
    }
  }

  await requireBotGuildPermissions(guildID, [...requiredPerms]);

  const result = await RequestManager.patch(
    endpoints.GUILD_MEMBER(guildID, memberID),
    options,
  ) as MemberCreatePayload;
  const member = await structures.createMemberStruct(result, guildID);

  return member;
}
