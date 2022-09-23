import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function banMember(bot: BotWithCache) {
  const banMember = bot.helpers.banMember;

  bot.helpers.banMember = async function (guildId, id, options) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ["BAN_MEMBERS"]);

    return await banMember(guildId, id, options);
  };
}
