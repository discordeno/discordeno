import { Bot } from "../../../bot.ts";
import { DiscordMessage } from "../../../types/discord.ts";

/** Returns a followup message for an Interaction. Functions the same as get webhook message, however this uses your interaction token instead of bot token. Does not support ephemeral followups. */
export async function getFollowupMessage(bot: Bot, interactionToken: string, messageId: bigint) {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "GET",
    bot.constants.routes.WEBHOOK_MESSAGE(bot.applicationId, interactionToken, messageId),
  );

  return bot.transformers.message(bot, result);
}
