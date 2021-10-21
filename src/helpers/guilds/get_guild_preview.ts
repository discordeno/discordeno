import type { GuildPreview } from "../../types/guilds/guild_preview.ts";
import type { Bot } from "../../bot.ts";

/** Returns the guild preview object for the given id. If the bot is not in the guild, then the guild must be Discoverable. */
export async function getGuildPreview(bot: Bot, guildId: bigint) {
  return await bot.rest.runMethod<GuildPreview>(bot.rest,"get", bot.constants.endpoints.GUILD_PREVIEW(guildId));
}
