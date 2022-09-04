import type { Bot } from "../../../bot.ts";
import { InteractionResponse, Message } from "../../../mod.ts";
import { DiscordMessage } from "../../../types/discord.ts";

/**
 * Interaction `tokens` are valid for **15 minutes** and can be used to send followup messages.
 *
 * NOTE: By default we will suppress mentions. To enable mentions, just pass any mentions object.
 */
export async function sendFollowupMessage(
  bot: Bot,
  token: string,
  options: InteractionResponse,
): Promise<Message> {
  const result = await bot.rest.sendRequest<DiscordMessage>(bot.rest, {
    url: bot.constants.routes.WEBHOOK(bot.applicationId, token),
    method: "POST",
    payload: bot.rest.createRequestBody(bot.rest, {
      method: "POST",
      body: {
        ...bot.transformers.reverse.interactionResponse(bot, options).data,
        file: options.data?.file,
      },
      // remove authorization header
      headers: { Authorization: "" },
    }),
  });

  return bot.transformers.message(bot, result);
}
