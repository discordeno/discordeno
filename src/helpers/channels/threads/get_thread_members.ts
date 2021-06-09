import { cacheHandlers } from "../../../cache.ts";
import { rest } from "../../../rest/rest.ts";
import { ChannelTypes } from "../../../types/channels/channel_types.ts";
import { Errors } from "../../../types/discordeno/errors.ts";
import { DiscordGatewayIntents } from "../../../types/gateway/gateway_intents.ts";
import { endpoints } from "../../../util/constants.ts";
import { botHasChannelPermissions } from "../../../util/permissions.ts";
import { ws } from "../../../ws/ws.ts";

/** Returns array of thread members objects that are members of the thread. */
export async function getThreadMembers(channelId: bigint) {
  if (!(ws.identifyPayload.intents & DiscordGatewayIntents.GuildMembers)) {
    throw new Error(Errors.MISSING_INTENT_GUILD_MEMBERS);
  }

  const channel = await cacheHandlers.get("channels", channelId);
  if (channel) {
    if (
      ![ChannelTypes.GuildNewsThread, ChannelTypes.GuildPivateThread, ChannelTypes.GuildPublicThread].includes(
        channel.type
      )
    ) {
      throw new Error(Errors.NOT_A_THREAD_CHANNEL);
    }

    if (
      channel.type === ChannelTypes.GuildPivateThread &&
      !(await botHasChannelPermissions(channel, ["MANAGE_THREADS"])) &&
      !channel.member
    )
      throw new Error(Errors.CANNOT_GET_MEMBERS_OF_AN_UNJOINED_PRIVATE_THREAD);
  }

  // TODO: v12 map the result to a nice collection
  return await rest.runMethod("get", endpoints.THREAD_MEMBERS(channelId));
}
