import { Bot } from "../../deps.ts";
import { createInvite } from "./createInvite.ts";

export function invites(bot: Bot) {
  createInvite(bot);
}
