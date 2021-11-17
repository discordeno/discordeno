import type { Message } from "../../types/messages/message.ts";
import type { Bot } from "../../bot.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

/** Crosspost a message in a News Channel to following channels. */
export async function publishMessage(bot: Bot, channelId: bigint, messageId: bigint) {
  const data = await bot.rest.runMethod<Message>(
    bot.rest,
    "post",
    bot.constants.endpoints.CHANNEL_MESSAGE_CROSSPOST(channelId, messageId)
  );

  return bot.transformers.message(bot, data);
}
