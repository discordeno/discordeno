import type { Bot, DiscordenoInteractionResponse, DiscordenoMessage } from "../deps.ts";

/**  sendInteractionResponse with ephemeral reply */
export function sendPrivateInteractionResponse(
  bot: Bot,
  id: bigint,
  token: string,
  options: DiscordenoInteractionResponse,
): Promise<DiscordenoMessage | undefined> {
  if (options.data && !options.data?.flags) options.data.flags = 64; // private: true
  return bot.helpers.sendInteractionResponse(id, token, options);
}
