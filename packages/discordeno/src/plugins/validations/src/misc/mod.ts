import { Bot } from "../../deps.ts";
import { editBotProfile } from "./editBotProfile.ts";

export function misc(bot: Bot) {
  editBotProfile(bot);
}
