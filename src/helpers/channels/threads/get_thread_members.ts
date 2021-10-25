import type { Bot } from "../../../bot.ts";
import { ThreadMember } from "../../../types/channels/threads/thread_member.ts";
import { DiscordGatewayIntents } from "../../../types/gateway/gateway_intents.ts";
import { Collection } from "../../../util/collection.ts";
// import { threadMemberModified } from "../../../util/transformers/thread_member_modified.ts";

/** Returns thread members objects that are members of the thread. */
export async function getThreadMembers(bot: Bot, threadId: bigint) {
  // // Check if intents is not 0 as proxy ws won't set intents in other instances
  // if (
  //   bot.gateway.identifyPayload.intents &&
  //   !(bot.gateway.identifyPayload.intents & DiscordGatewayIntents.GuildMembers)
  // ) {
  //   throw new Error(bot.constants.Errors.MISSING_INTENT_GUILD_MEMBERS);
  // }
  // const thread = await bot.cache.threads.get(threadId);
  // if (thread?.isPrivate) {
  //   const channel = await bot.cache.channels.get(thread.parentId);
  //   if (channel && !(await bot.utils.botHasChannelPermissions(bot, channel, ["MANAGE_THREADS"])) && !thread.botIsMember)
  //     throw new Error(bot.constants.Errors.CANNOT_GET_MEMBERS_OF_AN_UNJOINED_PRIVATE_THREAD);
  // }
  // const result = await bot.rest.runMethod<ThreadMember[]>(
  //   bot.rest,
  //   "get",
  //   bot.constants.endpoints.THREAD_MEMBERS(threadId)
  // );
  // const members = result.map((member) => threadMemberModified(member));
  // return new Collection(members.map((member) => [member.id, member]));
}
