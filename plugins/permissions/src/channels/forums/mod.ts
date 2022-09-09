import { BotWithCache } from "../../../deps.ts";
import createForumThread from "./createForumThread.ts";

export default function setupThreadPermChecks(bot: BotWithCache) {
  createForumThread(bot);
}
