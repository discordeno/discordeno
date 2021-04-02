import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Modify a guild widget object for the guild. Requires the MANAGE_GUILD permission. */
export async function editWidget(
  guildId: string,
  enabled: boolean,
  channelId?: string | null,
) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  const result = await rest.runMethod(
    "patch",
    endpoints.GUILD_WIDGET(guildId),
    {
      enabled,
      channel_id: channelId,
    },
  );

  return result;
}
