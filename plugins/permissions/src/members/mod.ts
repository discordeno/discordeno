import { BotWithCache } from "../../deps.ts";
import setupBanPermChecks from "./ban.ts";
import editBotNickname from "./editBot.ts";
import editMember from "./editMember.ts";
import kickMember from "./kickMember.ts";
import pruneMembers from "./pruneMembers.ts";

export default function setupMemberPermChecks(bot: BotWithCache) {
  setupBanPermChecks(bot);
  editBotNickname(bot);
  editMember(bot);
  kickMember(bot);
  pruneMembers(bot);
}
