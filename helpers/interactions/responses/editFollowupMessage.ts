import type { Bot } from "../../../bot.ts";
import { InteractionCallbackData } from "../../../mod.ts";
import { Message } from "../../../transformers/message.ts";
import { DiscordMessage } from "../../../types/discord.ts";
import { InteractionResponseTypes } from "../../../types/shared.ts";

/** To edit your response to a application command. If a messageId is not provided it will default to editing the original response. */
export async function editFollowupMessage(
  bot: Bot,
  token: string,
  messageId: bigint,
  options: InteractionCallbackData,
): Promise<Message | undefined> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "PATCH",
    bot.constants.routes.WEBHOOK_MESSAGE(bot.applicationId, token, messageId),
    {
      messageId,
      ...bot.transformers.reverse.interactionResponse(bot, {
        type: InteractionResponseTypes.UpdateMessage,
        data: options,
      }).data,
    },
  );

  return bot.transformers.message(bot, result);
}
