import type { Bot } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import type { Message } from "../../types/messages/message.ts";
import type { SnakeCasedPropertiesDeep } from "../../types/util.ts";

/** Suppress all the embeds in this message */
export async function suppressEmbeds(bot: Bot, channelId: bigint, messageId: bigint) {
  const message = await cacheHandlers.get("messages", messageId);

  await bot.utils.requireBotChannelPermissions(bot, channelId, message ? ["MANAGE_MESSAGES"] : ["SEND_MESSAGES"]);

  const result = await bot.rest.runMethod<SnakeCasedPropertiesDeep<Message>>(
    bot.rest,
    "patch",
    bot.constants.endpoints.CHANNEL_MESSAGE(channelId, messageId),
    { flags: 4 }
  );

  return await bot.transformers.message(bot, result);
}
