import { BotWithCache } from "../../deps.ts";
import { deleteIntegration } from "./deleteIntegrations.ts";
import { getIntegrations } from "./getIntegrations.ts";

export function integrations(bot: BotWithCache) {
  deleteIntegration(bot);
  getIntegrations(bot);
}
