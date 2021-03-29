import { cacheHandlers } from "../../cache.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import { endpoints } from "../../util/constants.ts";
import {
  calculateBits,
  requireBotGuildPermissions,
} from "../../util/permissions.ts";

/** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
export async function createChannel(
  guildId: string,
  name: string,
  options?: ChannelCreateOptions,
) {
  const requiredPerms: Set<Permission> = new Set(["MANAGE_CHANNELS"]);

  options?.permissionOverwrites?.forEach((overwrite) => {
    overwrite.allow.forEach(requiredPerms.add, requiredPerms);
    overwrite.deny.forEach(requiredPerms.add, requiredPerms);
  });

  await requireBotGuildPermissions(guildId, [...requiredPerms]);

  const result = (await RequestManager.post(
    endpoints.GUILD_CHANNELS(guildId),
    {
      ...options,
      name,
      permission_overwrites: options?.permissionOverwrites?.map((perm) => ({
        ...perm,

        allow: calculateBits(perm.allow),
        deny: calculateBits(perm.deny),
      })),
      type: options?.type || ChannelTypes.GUILD_TEXT,
    },
  )) as ChannelCreatePayload;

  const channelStruct = await structures.createChannelStruct(result);
  await cacheHandlers.set("channels", channelStruct.id, channelStruct);

  return channelStruct;
}
