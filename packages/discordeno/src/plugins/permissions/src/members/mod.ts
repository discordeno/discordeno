import { BotWithCache } from "../../deps.ts";
import { banMember } from "./banMember.ts";
import { editBotMember } from "./editBotMember.ts";
import { editMember } from "./editMember.ts";
import { kickMember } from "./kickMember.ts";
import { pruneMembers } from "./pruneMembers.ts";
import { unbanMember } from "./unbanMember.ts";

export function members(bot: BotWithCache) {
  banMember(bot);
  editBotMember(bot);
  editMember(bot);
  kickMember(bot);
  pruneMembers(bot);
  unbanMember(bot);
}
