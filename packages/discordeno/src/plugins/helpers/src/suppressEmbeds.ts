import { BigString, Bot, DiscordMessage } from "../deps.ts";

/** Suppress all the embeds in this message */
export async function suppressEmbeds(
  bot: Bot,
  channelId: BigString,
  messageId: BigString,
) {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "PATCH",
    bot.constants.routes.CHANNEL_MESSAGE(channelId, messageId),
    { flags: 4 },
  );

  return bot.transformers.message(bot, result);
}
