import { BotWithCache } from "../../../deps.ts";
import { addReaction } from "./addReaction.ts";
import { addReactions } from "./addReactions.ts";
import { deleteReactionsAll } from "./deleteReactionsAll.ts";
import { deleteReactionsEmoji } from "./deleteReactionsEmoji.ts";
import { deleteUserReaction } from "./deleteUserReaction.ts.ts";

export function reactions(bot: BotWithCache) {
  addReaction(bot);
  addReactions(bot);
  deleteReactionsAll(bot);
  deleteReactionsEmoji(bot);
  deleteUserReaction(bot);
}
