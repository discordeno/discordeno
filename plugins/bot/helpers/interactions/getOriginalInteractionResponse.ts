import { Bot } from "../../bot.ts";
import { DiscordMessage } from "../../deps.ts";

/** Returns the initial Interaction response. Functions the same as Get Webhook Message */
export async function getOriginalInteractionResponse(bot: Bot, token: string) {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "GET",
    bot.constants.routes.INTERACTION_ORIGINAL_ID_TOKEN(bot.applicationId, token),
  );

  return bot.transformers.message(bot, result);
}
