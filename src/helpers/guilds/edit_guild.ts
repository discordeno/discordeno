import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";
import { urlToBase64 } from "../../util/utils.ts";

/** Modify a guilds settings. Requires the MANAGE_GUILD permission. */
export async function editGuild(guildId: string, options: GuildEditOptions) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  if (options.icon && !options.icon.startsWith("data:image/")) {
    options.icon = await urlToBase64(options.icon);
  }

  if (options.banner && !options.banner.startsWith("data:image/")) {
    options.banner = await urlToBase64(options.banner);
  }

  if (options.splash && !options.splash.startsWith("data:image/")) {
    options.splash = await urlToBase64(options.splash);
  }

  const result = await rest.runMethod(
    "patch",
    endpoints.GUILDS_BASE(guildId),
    options,
  );

  return result;
}
