import { BotWithCache } from "../../../deps.ts";
import createForumPost from "./createForumPost.ts";

export default function setupThreadPermChecks(bot: BotWithCache) {
  createForumPost(bot);
}
