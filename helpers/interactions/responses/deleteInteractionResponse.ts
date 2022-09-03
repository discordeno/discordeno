import type { Bot } from "../../../bot.ts";

/** To delete a response to a application command by its message id. */
export async function deleteInteractionResponse(bot: Bot, token: string, messageId: bigint): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.INTERACTION_ID_TOKEN_MESSAGE_ID(bot.applicationId, token, messageId),
  );
}
