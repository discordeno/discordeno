import type { Bot } from "../../bot.ts";
import type { Message } from "../../types/messages/message.ts";
import type { SnakeCasedPropertiesDeep } from "../../types/util.ts";

/** Returns the initial Interaction response. Functions the same as Get Webhook Message */
export async function getOriginalInteractionResponse(bot: Bot, token: string) {
  const result = await bot.rest.runMethod<SnakeCasedPropertiesDeep<Message>>(
    bot.rest,
    "get",
    bot.constants.endpoints.INTERACTION_ORIGINAL_ID_TOKEN(bot.applicationId, token)
  );

  return bot.transformers.message(bot, result);
}
