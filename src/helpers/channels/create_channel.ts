import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordChannel } from "../../types/channels/channel.ts";
import { DiscordChannelTypes } from "../../types/channels/channel_types.ts";
import { CreateGuildChannel } from "../../types/guilds/create_guild_channel.ts";
import { PermissionStrings } from "../../types/permissions/permission_strings.ts";
import { endpoints } from "../../util/constants.ts";
import {
  calculateBits,
  requireBotGuildPermissions,
} from "../../util/permissions.ts";

/** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
export async function createChannel(
  guildId: string,
  options?: CreateGuildChannel,
) {
  const requiredPerms: Set<PermissionStrings> = new Set(["MANAGE_CHANNELS"]);

  options?.permissionOverwrites?.forEach((overwrite) => {
    eventHandlers.debug(
      "loop",
      `Running forEach loop in create_channel file.`,
    );
    overwrite.allow.forEach(requiredPerms.add, requiredPerms);
    overwrite.deny.forEach(requiredPerms.add, requiredPerms);
  });

  await requireBotGuildPermissions(guildId, [...requiredPerms]);

  const result = (await rest.runMethod(
    "post",
    endpoints.GUILD_CHANNELS(guildId),
    {
      ...options,
      permission_overwrites: options?.permissionOverwrites?.map((perm) => ({
        ...perm,

        allow: calculateBits(perm.allow),
        deny: calculateBits(perm.deny),
      })),
      type: options?.type || DiscordChannelTypes.GUILD_TEXT,
    },
  )) as DiscordChannel;

  const channelStruct = await structures.createChannelStruct(result);
  await cacheHandlers.set("channels", channelStruct.id, channelStruct);

  return channelStruct;
}
