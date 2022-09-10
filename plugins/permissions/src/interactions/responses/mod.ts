import { BotWithCache } from "../../../deps.ts";
import { editFollowupMessage } from "./editFollowupMessage.ts";
import { editOriginalInteractionResponse } from "./editOriginalInteractionResponse.ts";
import { sendInteractionResponse } from "./sendInteractionResponse.ts";

export function responses(bot: BotWithCache) {
  editFollowupMessage(bot);
  editOriginalInteractionResponse(bot);
  sendInteractionResponse(bot);
}
