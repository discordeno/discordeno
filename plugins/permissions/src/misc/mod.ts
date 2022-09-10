import { BotWithCache } from "../../deps.ts";
import { editBotProfile } from "./editBotProfile.ts";

export function misc(bot: BotWithCache) {
  editBotProfile(bot);
}
