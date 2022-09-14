import type { Bot } from "../../../bot.ts";

/**
 * Deletes the initial message response to an interaction.
 *
 * @param bot - The bot instance to use to make the request.
 * @param token - The interaction token to use, provided in the original interaction.
 *
 * @remarks
 * Unlike `deleteMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
 *
 * Does not support ephemeral follow-up messages due to these being stateless.
 *
 * Fires a _Message Delete_ event.
 *
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response}
 */
export async function deleteOriginalInteractionResponse(bot: Bot, token: string): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.INTERACTION_ORIGINAL_ID_TOKEN(bot.applicationId, token),
  );
}
