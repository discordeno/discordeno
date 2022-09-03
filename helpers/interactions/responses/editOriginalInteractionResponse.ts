import type { Bot } from "../../../bot.ts";
import { Message } from "../../../transformers/message.ts";
import { DiscordMessage } from "../../../types/discord.ts";
import { EditWebhookMessage } from "../../webhooks/editWebhookMessage.ts";
import { transformEditInteractionResponse } from "./editInteractionResponse.ts";

/** To edit your response to a application command. If a messageId is not provided it will default to editing the original response. */
export async function editOriginalInteractionResponse(
  bot: Bot,
  token: string,
  options: EditWebhookMessage,
): Promise<Message | undefined> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "PATCH",
    bot.constants.routes.INTERACTION_ORIGINAL_ID_TOKEN(bot.applicationId, token),
    transformEditInteractionResponse(bot, options),
  );

  return bot.transformers.message(bot, result);
}
