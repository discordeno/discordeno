import { BotWithCache } from "../../../deps.ts";
import { createForumThread } from "./createForumThread.ts";

export function forums(bot: BotWithCache) {
  createForumThread(bot);
}
