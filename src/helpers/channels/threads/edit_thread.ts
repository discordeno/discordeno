import type { ModifyThread } from "../../../types/channels/threads/modify_thread.ts";
import type { Bot } from "../../../bot.ts";
import {channelToThread} from "../../../util/transformers/channel_to_thread.ts";

/** Update a thread's settings. Requires the `MANAGE_CHANNELS` permission for the guild. */
export async function editThread(bot: Bot, threadId: bigint, options: ModifyThread, reason?: string) {
    // const thread = await cacheHandlers.get("threads", threadId);

    // TODO: permission checking

    const result = await bot.rest.runMethod(
        bot.rest,
        "patch",
        bot.constants.endpoints.CHANNEL_BASE(threadId),
        {
            name: options.name,
            archived: options.archived,
            auto_archive_duration: options.autoArchiveDuration,
            locked: options.locked,
            rate_limit_per_user: options.rateLimitPerUser,
            reason,
        }
    );

    return channelToThread(result);
}
