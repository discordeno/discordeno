import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordChannel } from "../../types/channels/channel.ts";
import { DiscordChannelTypes } from "../../types/channels/channel_types.ts";
import {
  CreateGuildChannel,
  DiscordCreateGuildChannel,
} from "../../types/guilds/create_guild_channel.ts";
import { PermissionStrings } from "../../types/permissions/permission_strings.ts";
import { endpoints } from "../../util/constants.ts";
import {
  calculateBits,
  requireBotGuildPermissions,
} from "../../util/permissions.ts";
import { camelKeysToSnakeCase } from "../../util/utils.ts";

/** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
export async function createChannel(
  guildId: string,
  options?: CreateGuildChannel,
  reason?: string,
) {
  const requiredPerms: Set<PermissionStrings> = new Set(["MANAGE_CHANNELS"]);

  options?.permissionOverwrites?.forEach((overwrite) => {
    eventHandlers.debug?.(
      "loop",
      `Running forEach loop in create_channel file.`,
    );
    overwrite.allow.forEach(requiredPerms.add, requiredPerms);
    overwrite.deny.forEach(requiredPerms.add, requiredPerms);
  });

  await requireBotGuildPermissions(guildId, [...requiredPerms]);

  // BITRATES ARE IN THOUSANDS SO IF USER PROVIDES 32 WE CONVERT TO 32000
  if (options?.bitrate && options.bitrate < 1000) options.bitrate *= 1000;

  const result = (await rest.runMethod(
    "post",
    endpoints.GUILD_CHANNELS(guildId),
    {
      ...camelKeysToSnakeCase<DiscordCreateGuildChannel>(options ?? {}),
      permission_overwrites: options?.permissionOverwrites?.map((perm) => ({
        ...perm,
        allow: calculateBits(perm.allow),
        deny: calculateBits(perm.deny),
      })),
      type: options?.type || DiscordChannelTypes.GUILD_TEXT,
      reason,
    },
  )) as DiscordChannel;

  const discordenoChannel = await structures.createDiscordenoChannel(result);
  await cacheHandlers.set("channels", discordenoChannel.id, discordenoChannel);

  return discordenoChannel;
}
