import type { Bot } from "../../../bot.ts";

/** Delete your original response to a application command */
export async function deleteOriginalInteractionResponse(bot: Bot, token: string): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.INTERACTION_ORIGINAL_ID_TOKEN(bot.applicationId, token),
  );
}
