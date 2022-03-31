import { BotWithCache, PermissionStrings } from "../../deps.ts";
import { hasGuildPermissions, requireBotGuildPermissions, requireGuildPermissions } from "../permissions.ts";

export default function editMember(bot: BotWithCache) {
  const editMemberOld = bot.helpers.editMember;

  bot.helpers.editMember = async function (guildId, memberId, options) {
    const requiredPerms: PermissionStrings[] = [];
    if (options.roles) requiredPerms.push("MANAGE_ROLES");
    // NULL IS ALLOWED
    if (options.nick !== undefined) requiredPerms.push("MANAGE_NICKNAMES");
    if (options.channelId !== undefined) requiredPerms.push("MOVE_MEMBERS");
    if (options.mute !== undefined) requiredPerms.push("MUTE_MEMBERS");
    if (options.deaf !== undefined) requiredPerms.push("DEAFEN_MEMBERS");

    if (options.communicationDisabledUntil) {
      const guild = bot.guilds.get(guildId);
      if (guild) {
        if (guild.ownerId === memberId) throw new Error("You can not timeout the servers owner.");
      }

      if (hasGuildPermissions(bot, guildId, memberId, ["ADMINISTRATOR"])) {
        throw new Error("You can not timeout a server administrator.");
      }
    }

    if (requiredPerms.length) {
      requireBotGuildPermissions(bot, guildId, requiredPerms);
    }

    return await editMemberOld(guildId, memberId, options);
  };
}
