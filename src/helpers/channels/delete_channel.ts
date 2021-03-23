import { cacheHandlers } from "../../cache.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Delete a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
export async function deleteChannel(
  guildID: string,
  channelID: string,
  reason?: string,
) {
  await requireBotGuildPermissions(guildID, ["MANAGE_CHANNELS"]);

  const guild = await cacheHandlers.get("guilds", guildID);
  if (!guild) throw new Error(Errors.GUILD_NOT_FOUND);

  if (guild?.rulesChannelID === channelID) {
    throw new Error(Errors.RULES_CHANNEL_CANNOT_BE_DELETED);
  }

  if (guild?.publicUpdatesChannelID === channelID) {
    throw new Error(Errors.UPDATES_CHANNEL_CANNOT_BE_DELETED);
  }

  const result = await RequestManager.delete(
    endpoints.CHANNEL_BASE(channelID),
    { reason },
  );

  return result;
}
