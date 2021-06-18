import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import { Errors } from "../../types/discordeno/errors.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Delete a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
export async function deleteChannel(channelId: bigint, reason?: string) {
  const channel = await cacheHandlers.get("channels", channelId);

  if (channel?.guildId) {
    const guild = await cacheHandlers.get("guilds", channel.guildId);
    if (!guild) throw new Error(Errors.GUILD_NOT_FOUND);

    if (guild.rulesChannelId === channelId) {
      throw new Error(Errors.RULES_CHANNEL_CANNOT_BE_DELETED);
    }

    if (guild.publicUpdatesChannelId === channelId) {
      throw new Error(Errors.UPDATES_CHANNEL_CANNOT_BE_DELETED);
    }

    // TODO(threads): check if this requires guild perms or channel is enough
    await requireBotGuildPermissions(guild, ["MANAGE_CHANNELS"]);
  }

  return await rest.runMethod<undefined>("delete", endpoints.CHANNEL_BASE(channelId), { reason });
}
