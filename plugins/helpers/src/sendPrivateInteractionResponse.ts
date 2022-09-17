import type { BigString, Bot, InteractionResponse } from "../deps.ts";

/** sendInteractionResponse with ephemeral reply */
export async function sendPrivateInteractionResponse(
  bot: Bot,
  id: BigString,
  token: string,
  options: InteractionResponse,
) {
  if (options.data && !options.data?.flags) options.data.flags = 64; // private: true
  return await bot.helpers.sendInteractionResponse(id, token, options);
}
