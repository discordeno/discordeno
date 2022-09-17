import type { Bot } from "../../../bot.ts";
import { InteractionResponse } from "../../../types/discordeno.ts";
import { BigString } from "../../../types/shared.ts";

/**
 * Sends a response to an interaction.
 *
 * @param bot - The bot instance to use to make the request.
 * @param interactionId - The ID of the interaction to respond to.
 * @param token - The interaction token to use, provided in the original interaction.
 * @param options - The parameters for the creation of the message.
 * @returns An instance of the created {@link Message}.
 *
 * @remarks
 * ⚠️ Interaction tokens are only valid for _15 minutes_.
 *
 * By default, mentions are suppressed. To enable mentions, pass a mention object with the callback data.
 *
 * Unlike `sendMessage()`, this endpoint allows the bot user to act without:
 * - Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
 * - Requiring the `MESSAGE_CONTENT` intent.
 *
 * Fires a _Message Create_ event.
 *
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response}
 */
export async function sendInteractionResponse(
  bot: Bot,
  interactionId: BigString,
  token: string,
  options: InteractionResponse,
): Promise<void> {
  return await bot.rest.sendRequest<void>(bot.rest, {
    url: bot.constants.routes.INTERACTION_ID_TOKEN(interactionId, token),
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
