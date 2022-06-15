import { AutoModerationActionType, BotWithCache, PermissionStrings } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function getAutomodRule(bot: BotWithCache) {
  const getAutomodRuleOld = bot.helpers.getAutomodRule;

  bot.helpers.getAutomodRule = async function (guildId, ruleId) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return await getAutomodRuleOld(guildId, ruleId);
  };
}

export function getAutomodRules(bot: BotWithCache) {
  const getAutomodRulesOld = bot.helpers.getAutomodRules;

  bot.helpers.getAutomodRules = async function (guildId) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return await getAutomodRulesOld(guildId);
  };
}

export function createAutomodRule(bot: BotWithCache) {
  const createAutomodRuleOld = bot.helpers.createAutomodRule;

  bot.helpers.createAutomodRule = async function (guildId, options) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    for (const action of options.actions) {
      // Check for maximum duration seconds
      if (action.metadata?.durationSeconds && action.metadata.durationSeconds > 2419200) {
        console.log(
          `[Warning] Automod action duration seconds is too high: ${action.metadata.durationSeconds}. Setting to Discord's allowed maximum.`,
        );
        // Discords max is 4 weeks
        action.metadata.durationSeconds = 2419200;
      }

      // Timeout actions require perm check
      if (action.type === AutoModerationActionType.Timeout) {
        requireBotGuildPermissions(bot, guildId, ["MODERATE_MEMBERS"]);
      }
    }

    return await createAutomodRuleOld(guildId, options);
  };
}

export function editAutomodRule(bot: BotWithCache) {
  const editAutomodRuleOld = bot.helpers.editAutomodRule;

  bot.helpers.editAutomodRule = async function (guildId, options) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    for (const action of options.actions ?? []) {
      // Check for maximum duration seconds
      if (action.metadata?.durationSeconds && action.metadata.durationSeconds > 2419200) {
        console.log(
          `[Warning] Automod action duration seconds is too high: ${action.metadata.durationSeconds}. Setting to Discord's allowed maximum.`,
        );
        // Discords max is 4 weeks
        action.metadata.durationSeconds = 2419200;
      }

      // Timeout actions require perm check
      if (action.type === AutoModerationActionType.Timeout) {
        requireBotGuildPermissions(bot, guildId, ["MODERATE_MEMBERS"]);
      }
    }

    return await editAutomodRuleOld(guildId, options);
  };
}

export function deleteAutomodRule(bot: BotWithCache) {
  const deleteAutomodRuleOld = bot.helpers.deleteAutomodRule;

  bot.helpers.deleteAutomodRule = async function (guildId, options) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return await deleteAutomodRuleOld(guildId, options);
  };
}

export default function setupAutoModerationPermChecks(bot: BotWithCache) {
  getAutomodRule(bot);
  getAutomodRules(bot);
  createAutomodRule(bot);
  editAutomodRule(bot);
  deleteAutomodRule(bot);
}
