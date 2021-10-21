import type { ModifyGuildMember } from "../../types/guilds/modify_guild_member.ts";
import type { GuildMemberWithUser } from "../../types/members/guild_member.ts";
import type { PermissionStrings } from "../../types/permissions/permission_strings.ts";
import type { Bot } from "../../bot.ts";
import type { SnakeCasedPropertiesDeep } from "../../types/util.ts";

/** Edit the member */
export async function editMember(bot: Bot, guildId: bigint, memberId: bigint, options: ModifyGuildMember) {
  const requiredPerms: Set<PermissionStrings> = new Set();

  if (options.nick) {
    if (options.nick.length > 32) {
      throw new Error(bot.constants.Errors.NICKNAMES_MAX_LENGTH);
    }
    requiredPerms.add("MANAGE_NICKNAMES");
  }

  if (options.roles) requiredPerms.add("MANAGE_ROLES");

  if (options.mute !== undefined || options.deaf !== undefined || options.channelId !== undefined) {
    const memberVoiceState = (await bot.cache.guilds.get(guildId))?.voiceStates.get(memberId);

    if (!memberVoiceState?.channelId) {
      throw new Error(bot.constants.Errors.MEMBER_NOT_IN_VOICE_CHANNEL);
    }

    if (options.mute !== undefined) {
      requiredPerms.add("MUTE_MEMBERS");
    }

    if (options.deaf !== undefined) {
      requiredPerms.add("DEAFEN_MEMBERS");
    }

    if (options.channelId) {
      const requiredVoicePerms: Set<PermissionStrings> = new Set(["CONNECT", "MOVE_MEMBERS"]);
      if (memberVoiceState) {
        await bot.utils.requireBotChannelPermissions(bot, memberVoiceState?.channelId, [...requiredVoicePerms]);
      }
      await bot.utils.requireBotChannelPermissions(bot, options.channelId, [...requiredVoicePerms]);
    }
  }

  await bot.utils.requireBotGuildPermissions(bot, guildId, [...requiredPerms]);

  const result = await bot.rest.runMethod<SnakeCasedPropertiesDeep<GuildMemberWithUser>>(
    bot.rest,
    "patch",
    bot.constants.endpoints.GUILD_MEMBER(guildId, memberId),
    {
      nick: options.nick,
      roles: options.roles,
      mute: options.mute,
      deaf: options.deaf,
      channel_id: options.channelId,
    }
  );

  return bot.transformers.member(bot, result, guildId);
}
