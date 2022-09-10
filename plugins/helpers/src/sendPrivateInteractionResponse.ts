import type { BigString, Bot, InteractionResponse, Message } from "../deps.ts";
import { BotWithHelpersPlugin } from "../mod.ts";

/**  sendInteractionResponse with ephemeral reply */
export function sendPrivateInteractionResponse(
  bot: BotWithHelpersPlugin,
  id: BigString,
  token: string,
  options: InteractionResponse,
): Promise<Message | undefined> {
  if (options.data && !options.data?.flags) options.data.flags = 64; // private: true
  return bot.helpers.replyToInteraction(id, token, options);
}
