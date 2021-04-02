import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import {
  CreateGuildChannel,
  DiscordChannel,
  DiscordChannelTypes,
  PermissionStrings,
} from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import {
  calculateBits,
  requireBotGuildPermissions,
} from "../../util/permissions.ts";

/** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
export async function createChannel(
  guildId: string,
  name: string,
  options?: CreateGuildChannel,
) {
  const requiredPerms: Set<PermissionStrings> = new Set(["MANAGE_CHANNELS"]);

  options?.permissionOverwrites?.forEach((overwrite) => {
    overwrite.allow.forEach(requiredPerms.add, requiredPerms);
    overwrite.deny.forEach(requiredPerms.add, requiredPerms);
  });

  await requireBotGuildPermissions(guildId, [...requiredPerms]);

  const result =
    (await rest.runMethod("post", endpoints.GUILD_CHANNELS(guildId), {
      ...options,
      name,
      permission_overwrites: options?.permissionOverwrites?.map((perm) => ({
        ...perm,

        allow: calculateBits(perm.allow),
        deny: calculateBits(perm.deny),
      })),
      type: options?.type || DiscordChannelTypes.GUILD_TEXT,
    })) as DiscordChannel;

  const channelStruct = await structures.createChannelStruct(result);
  await cacheHandlers.set("channels", channelStruct.id, channelStruct);

  return channelStruct;
}
