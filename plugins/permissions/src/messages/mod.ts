import { BotWithCache } from "../../deps.ts";
import setupCreateMessagePermChecks from "./create.ts";
import setupDeleteMessagePermChecks from "./delete.ts";
import setupGetMessagePermChecks from "./get.ts";
import setupPinMessagePermChecks from "./pin.ts";
import setupReactionsPermChecks from "./reactions.ts";

export default function setupMessagesPermChecks(bot: BotWithCache) {
  setupReactionsPermChecks(bot);
  setupDeleteMessagePermChecks(bot);
  setupGetMessagePermChecks(bot);
  setupPinMessagePermChecks(bot);
  setupCreateMessagePermChecks(bot);
}
