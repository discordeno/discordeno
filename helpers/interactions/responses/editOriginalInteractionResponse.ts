import type { Bot } from "../../../bot.ts";
import { Message } from "../../../transformers/message.ts";
import { DiscordMessage } from "../../../types/discord.ts";
import { InteractionCallbackData, InteractionResponseTypes } from "../../../types/mod.ts";

/**
 * Edits the initial message response to an interaction.
 *
 * @param bot - The bot instance to use to make the request.
 * @param token - The interaction token to use, provided in the original interaction.
 * @param options - The parameters for the edit of the response.
 * @returns An instance of the edited {@link Message}.
 *
 * @remarks
 * Unlike `editMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
 *
 * Does not support ephemeral follow-up messages due to these being stateless.
 *
 * Fires a _Message Update_ event.
 *
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response}
 */
export async function editOriginalInteractionResponse(
  bot: Bot,
  token: string,
  options: InteractionCallbackData,
): Promise<Message | undefined> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "PATCH",
    bot.constants.routes.INTERACTION_ORIGINAL_ID_TOKEN(bot.applicationId, token),
    {
      ...bot.transformers.reverse.interactionResponse(bot, {
        type: InteractionResponseTypes.UpdateMessage,
        data: options,
      }).data,
      file: options.file,
    },
  );

  return bot.transformers.message(bot, result);
}
