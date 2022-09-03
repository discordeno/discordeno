import type { Bot } from "../../../bot.ts";
import { InteractionResponse } from "../../../types/discordeno.ts";

/**
 * Send a response to a users application command. The command data will have the id and token necessary to respond.
 * Interaction `tokens` are valid for **15 minutes** and can be used to send followup messages.
 *
 * NOTE: By default we will suppress mentions. To enable mentions, just pass any mentions object.
 */
export async function sendInteractionResponse(
  bot: Bot,
  id: bigint,
  token: string,
  options: InteractionResponse,
): Promise<void> {
  return await bot.rest.sendRequest<void>(bot.rest, {
    url: bot.constants.routes.INTERACTION_ID_TOKEN(id, token),
    method: "POST",
    payload: bot.rest.createRequestBody(bot.rest, {
      method: "POST",
      body: {
        ...bot.transformers.reverse.interactionResponse(bot, options),
        file: options.data?.file,
      },
      // Remove authorization header
      headers: { Authorization: "" },
    }),
  });
}
