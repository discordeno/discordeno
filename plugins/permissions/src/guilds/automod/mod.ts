import { BotWithCache } from "../../../deps.ts";
import { createAutomodRule } from "./createAutomodRule.ts";
import { deleteAutomodRule } from "./deleteAutomodRule.ts";
import { editAutomodRule } from "./editAutomodRule.ts";
import { getAutomodRule } from "./getAutomodRule.ts";
import { getAutomodRules } from "./getAutomodRules.ts";

export function automod(bot: BotWithCache) {
  createAutomodRule(bot);
  deleteAutomodRule(bot);
  editAutomodRule(bot);
  getAutomodRule(bot);
  getAutomodRules(bot);
}
