import type { Bot } from "../../../bot.ts";
import { InteractionResponse, Message } from "../../../mod.ts";
import { DiscordMessage } from "../../../types/discord.ts";

/**
 * Sends a follow-up message to an interaction.
 *
 * @param bot - The bot instance to use to make the request.
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
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message}
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
