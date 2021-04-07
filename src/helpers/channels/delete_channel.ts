import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import { Errors } from "../../types/misc/errors.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Delete a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
export async function deleteChannel(
  guildId: string,
  channelId: string,
  reason?: string,
): Promise<undefined> {
  await requireBotGuildPermissions(guildId, ["MANAGE_CHANNELS"]);

  const guild = await cacheHandlers.get("guilds", guildId);
  if (!guild) throw new Error(Errors.GUILD_NOT_FOUND);

  if (guild?.rulesChannelId === channelId) {
    throw new Error(Errors.RULES_CHANNEL_CANNOT_BE_DELETED);
  }

  if (guild?.publicUpdatesChannelId === channelId) {
    throw new Error(Errors.UPDATES_CHANNEL_CANNOT_BE_DELETED);
  }

  const result = await rest.runMethod(
    "delete",
    endpoints.CHANNEL_BASE(channelId),
    { reason },
  );

  return result;
}
