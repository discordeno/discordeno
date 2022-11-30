import { Bot } from "../../../bot.ts";
import { BigString, WithReason } from "../../../mod.ts";
import { AutoModerationRule } from "../../../transformers/automodRule.ts";
import {
  AutoModerationActionType,
  AutoModerationEventTypes,
  DiscordAutoModerationRule,
  DiscordAutoModerationRuleTriggerMetadataPresets,
} from "../../../types/discord.ts";

/**
 * Edits an automod rule.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to edit the rule in.
 * @param ruleId - The ID of the rule to edit.
 * @param options - The parameters for the edit of the rule.
 * @returns An instance of the edited {@link AutoModerationRule}.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * Fires an _Auto Moderation Rule Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule}
 */
export async function editAutomodRule(
  bot: Bot,
  guildId: BigString,
  ruleId: BigString,
  options: Partial<EditAutoModerationRuleOptions>,
): Promise<AutoModerationRule> {
  const result = await bot.rest.runMethod<DiscordAutoModerationRule>(
    bot.rest,
    "PATCH",
    bot.constants.routes.AUTOMOD_RULE(guildId, ruleId),
    {
      name: options.name,
      event_type: options.eventType,
      trigger_metadata: options.triggerMetadata
        ? {
          keyword_filter: options.triggerMetadata.keywordFilter,
          presets: options.triggerMetadata.presets,
          allow_list: options.triggerMetadata.allowList,
          mention_total_limit: options.triggerMetadata.mentionTotalLimit,
        }
        : undefined,
      actions: options.actions?.map((action) => ({
        type: action.type,
        metadata: {
          channel_id: action.metadata.channelId?.toString(),
          duration_seconds: action.metadata.durationSeconds,
        },
      })),
      enabled: options.enabled ?? true,
      exempt_roles: options.exemptRoles?.map((id) => id.toString()),
      exempt_channels: options.exemptChannels?.map((id) => id.toString()),
      reason: options.reason,
    },
  );

  return bot.transformers.automodRule(bot, result);
}

export interface EditAutoModerationRuleOptions extends WithReason {
  /** The name of the rule. */
  name: string;
  /** The type of event to trigger the rule on. */
  eventType: AutoModerationEventTypes;
  /** The metadata to use for the trigger. */
  triggerMetadata: {
    /** The keywords needed to match. Only present when TriggerType.Keyword */
    keywordFilter?: string[];
    // TODO: This may need a special type or enum
    /** The pre-defined lists of words to match from. Only present when TriggerType.KeywordPreset */
    presets?: DiscordAutoModerationRuleTriggerMetadataPresets[];
    /** The substrings which will exempt from triggering the preset trigger type. Only present when TriggerType.KeywordPreset */
    allowList?: string[];
    /** Total number of mentions (role & user) allowed per message (Maximum of 50) */
    mentionTotalLimit: number;
  };
  /** The actions that will trigger for this rule */
  actions: {
    /** The type of action to take when a rule is triggered */
    type: AutoModerationActionType;
    /** additional metadata needed during execution for this specific action type */
    metadata: {
      /** The id of channel to which user content should be logged. Only in SendAlertMessage */
      channelId?: BigString;
      /** Timeout duration in seconds. Only supported for TriggerType.Keyword */
      durationSeconds?: number;
    };
  }[];
  /** Whether the rule should be enabled. */
  enabled?: boolean;
  /** The role ids that should not be effected by the rule */
  exemptRoles?: BigString[];
  /** The channel ids that should not be effected by the rule. */
  exemptChannels?: BigString[];
}
