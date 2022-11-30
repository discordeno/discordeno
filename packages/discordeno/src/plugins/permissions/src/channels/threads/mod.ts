import { BotWithCache } from "../../../deps.ts";
import { addThreadMember } from "./addThreadMember.ts";
import { getPrivateArchivedThreads } from "./getPrivateArchivedThreads.ts";
import { getPrivateJoinedArchivedThreads } from "./getPrivateJoinedArchivedThreads.ts";
import { getPublicArchivedThreads } from "./getPublicArchivedThreads.ts";
import { joinThread } from "./joinThread.ts";
import { leaveThread } from "./leaveThread.ts";
import { removeThreadMember } from "./removeThreadMember.ts";

export function threads(bot: BotWithCache) {
  addThreadMember(bot);
  getPublicArchivedThreads(bot);
  getPrivateArchivedThreads(bot);
  getPrivateJoinedArchivedThreads(bot);
  joinThread(bot);
  leaveThread(bot);
  removeThreadMember(bot);
}
