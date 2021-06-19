import { cacheHandlers } from "../../../cache.ts";
import { rest } from "../../../rest/rest.ts";
import { Errors } from "../../../types/discordeno/errors.ts";
import { DiscordGatewayIntents } from "../../../types/gateway/gateway_intents.ts";
import { endpoints } from "../../../util/constants.ts";
import { botHasChannelPermissions } from "../../../util/permissions.ts";
import { ws } from "../../../ws/ws.ts";

/** Returns thread members objects that are members of the thread. */
export async function getThreadMembers(threadId: bigint) {
  // Check if intents is not 0 as proxy ws won't set intents in other instances
  if (ws.identifyPayload.intents && !(ws.identifyPayload.intents & DiscordGatewayIntents.GuildMembers)) {
    throw new Error(Errors.MISSING_INTENT_GUILD_MEMBERS);
  }

  const thread = await cacheHandlers.get("threads", threadId);
  if (thread?.isPrivate) {
    const channel = await cacheHandlers.get("channels", thread.parentId);
    if (channel && !(await botHasChannelPermissions(channel, ["MANAGE_THREADS"])) && !thread.botIsMember)
      throw new Error(Errors.CANNOT_GET_MEMBERS_OF_AN_UNJOINED_PRIVATE_THREAD);
  }

  return await rest.runMethod("get", endpoints.THREAD_MEMBERS(threadId));
}
