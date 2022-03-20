import type { Bot, InteractionResponse, Message } from "../deps.ts";

/**  sendInteractionResponse with ephemeral reply */
export function sendPrivateInteractionResponse(
  bot: Bot,
  id: bigint,
  token: string,
  options: InteractionResponse,
): Promise<Message | undefined> {
  if (options.data && !options.data?.flags) options.data.flags = 64; // private: true
  return bot.helpers.sendInteractionResponse(id, token, options);
}
