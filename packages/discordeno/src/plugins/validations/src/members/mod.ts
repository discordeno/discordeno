import { Bot } from "../../deps.ts";
import { editMember } from "./editMember.ts";

export function members(bot: Bot) {
  editMember(bot);
}
