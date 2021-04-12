import { rest } from "../../rest/rest.ts";
import { GuildPreview } from "../../types/guilds/guild_preview.ts";
import { endpoints } from "../../util/constants.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/** Returns the guild preview object for the given id. If the bot is not in the guild, then the guild must be Discoverable. */
export async function getGuildPreview(guildId: string) {
  const result = await rest.runMethod("get", endpoints.GUILD_PREVIEW(guildId));

  return snakeKeysToCamelCase<GuildPreview>(result);
}
