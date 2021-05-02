import { rest } from "../../rest/rest.ts";
import { ModifyGuildEmoji } from "../../types/emojis/modify_guild_emoji.ts";
import { Emoji } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Modify the given emoji. Requires the MANAGE_EMOJIS permission. */
export async function editEmoji(
  guildId: bigint,
  id: string,
  options: ModifyGuildEmoji,
) {
  await requireBotGuildPermissions(guildId, ["MANAGE_EMOJIS"]);

  return await rest.runMethod<Emoji>(
    "patch",
    endpoints.GUILD_EMOJI(guildId, id),
    {
      name: options.name,
      roles: options.roles,
    },
  );
}
