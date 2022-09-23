import { BotWithCache, PermissionStrings } from "../../deps.ts";
import { requireBotChannelPermissions, requireBotGuildPermissions } from "../permissions.ts";

export function editMember(bot: BotWithCache) {
  const editMember = bot.helpers.editMember;

  bot.helpers.editMember = async function (guildId, memberId, options) {
    const requiredPerms: PermissionStrings[] = [];

    if (options.nick) requiredPerms.push("MANAGE_NICKNAMES");

    if (options.roles) requiredPerms.push("MANAGE_ROLES");

    if (
      options.mute !== undefined || options.deaf !== undefined ||
      options.channelId !== undefined
    ) {
      const memberVoiceState = (bot.guilds.get(bot.transformers.snowflake(guildId)))
        ?.voiceStates.get(bot.transformers.snowflake(memberId));

      if (!memberVoiceState?.channelId) throw new Error("MEMBER_NOT_IN_VOICE_CHANNEL");

      if (options.mute !== undefined) requiredPerms.push("MUTE_MEMBERS");

      if (options.deaf !== undefined) requiredPerms.push("DEAFEN_MEMBERS");

      if (options.channelId) {
        const requiredVoicePerms: PermissionStrings[] = ["CONNECT", "MOVE_MEMBERS"];
        if (memberVoiceState) requireBotChannelPermissions(bot, memberVoiceState?.channelId, requiredVoicePerms);
        requireBotChannelPermissions(bot, bot.transformers.snowflake(options.channelId), requiredVoicePerms);
      }
    }

    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), requiredPerms);

    return await editMember(guildId, memberId, options);
  };
}
