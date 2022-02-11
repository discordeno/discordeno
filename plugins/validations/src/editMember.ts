import { Bot, PermissionStrings } from "../deps.ts";

export default function editMember(bot: Bot) {
  const editMemberOld = bot.helpers.editMember;

  bot.helpers.editMember = async function (guildId, memberId, options) {
    if (options.nick && options.nick.length > 32) {
      throw new Error("NICKNAMES_MAX_LENGTH");
    }

    return editMemberOld(guildId, memberId, options);
  };
}
