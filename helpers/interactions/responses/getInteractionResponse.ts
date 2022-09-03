import type { Bot } from "../../../bot.ts";
import { Message } from "../../../transformers/message.ts";
import { DiscordMessage } from "../../../types/discord.ts";

/** Returns the initial Interaction response. Functions the same as Get Webhook Message */
export async function getInteractionResponse(bot: Bot, token: string, messageId: bigint): Promise<Message> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "GET",
    bot.constants.routes.INTERACTION_ID_TOKEN_MESSAGE_ID(bot.applicationId, token, messageId),
  );

  return bot.transformers.message(bot, result);
}
