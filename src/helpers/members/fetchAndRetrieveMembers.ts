import { Bot } from "../../bot.ts";
import { RequestGuildMembers } from "../../types/members/request_guild_members.ts";

export async function fetchAndRetrieveMembers(bot: Bot, shardId: number, options: RequestGuildMembers) {
  await bot.helpers.fetchMembers(options.guildId, shardId, options);
  return await bot.cache.execute("GET_ALL_MEMBERS", { guildId: options.guildId });
}
