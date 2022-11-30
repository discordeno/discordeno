import { Bot } from "../../../deps.ts";
import { addThreadMember } from "./addThreadMember.ts";
import { getThreadMembers } from "./getThreadMember.ts";
import { removeThreadMember } from "./removeThreadMember.ts";

export function threads(bot: Bot) {
  addThreadMember(bot);
  getThreadMembers(bot);
  removeThreadMember(bot);
}
