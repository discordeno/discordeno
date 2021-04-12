import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordGuildMember } from "../../types/guilds/guild_member.ts";
import { Errors } from "../../types/misc/errors.ts";
import { PermissionStrings } from "../../types/permissions/permission_strings.ts";
import { endpoints } from "../../util/constants.ts";
import {
  requireBotChannelPermissions,
  requireBotGuildPermissions,
} from "../../util/permissions.ts";

/** Edit the member */
export async function editMember(
  guildId: string,
  memberId: string,
  options: EditMember,
) {
  const requiredPerms: Set<PermissionStrings> = new Set();

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
    const memberVoiceState = (await cacheHandlers.get("guilds", guildId))
      ?.voiceStates.get(memberId);

    if (!memberVoiceState?.channelId) {
      throw new Error(Errors.MEMBER_NOT_IN_VOICE_CHANNEL);
    }

    if (typeof options.mute !== "undefined") {
      requiredPerms.add("MUTE_MEMBERS");
    }

    if (typeof options.deaf !== "undefined") {
      requiredPerms.add("DEAFEN_MEMBERS");
    }

    if (options.channel_id) {
      const requiredVoicePerms: Set<PermissionStrings> = new Set([
        "CONNECT",
        "MOVE_MEMBERS",
      ]);
      if (memberVoiceState) {
        await requireBotChannelPermissions(
          memberVoiceState?.channelId,
          [...requiredVoicePerms],
        );
      }
      await requireBotChannelPermissions(
        options.channel_id,
        [...requiredVoicePerms],
      );
    }
  }

  await requireBotGuildPermissions(guildId, [...requiredPerms]);

  const result = await rest.runMethod(
    "patch",
    endpoints.GUILD_MEMBER(guildId, memberId),
    options,
  ) as DiscordGuildMember;
  const member = await structures.createDiscordenoMember(result, guildId);

  return member;
}
