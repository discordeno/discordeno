import { BotWithCache, PermissionStrings } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function editMember(bot: BotWithCache) {
  const editMemberOld = bot.helpers.editMember;

  bot.helpers.editMember = function (guildId, memberId, options) {
    const requiredPerms: PermissionStrings[] = [];
    if (options.roles) requiredPerms.push("MANAGE_ROLES");
    // NULL IS ALLOWED
    if (options.nick !== undefined) requiredPerms.push("MANAGE_NICKNAMES");
    if (options.channelId !== undefined) requiredPerms.push("MOVE_MEMBERS");
    if (options.mute !== undefined) requiredPerms.push("MUTE_MEMBERS");
    if (options.deaf !== undefined) requiredPerms.push("DEAFEN_MEMBERS");

    if (requiredPerms.length) {
      requireBotGuildPermissions(bot, guildId, requiredPerms);
    }

    return editMemberOld(guildId, memberId, options);
  };
}
