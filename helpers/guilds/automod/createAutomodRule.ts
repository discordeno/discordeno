import { Bot } from "../../../bot.ts";
import { BigString, WithReason } from "../../../mod.ts";
import { AutoModerationRule } from "../../../transformers/automodRule.ts";
import {
  AutoModerationActionType,
  AutoModerationEventTypes,
  AutoModerationTriggerTypes,
  DiscordAutoModerationRule,
  DiscordAutoModerationRuleTriggerMetadataPresets,
} from "../../../types/discord.ts";

/**
 * Creates an automod rule in a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to create the rule in.
 * @param options - The parameters for the creation of the rule.
 * @returns An instance of the created {@link AutoModerationRule}.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * Fires an _Auto Moderation Rule Create_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule}
 */
export async function createAutomodRule(
  bot: Bot,
  guildId: BigString,
  options: CreateAutoModerationRuleOptions,
): Promise<AutoModerationRule> {
  const result = await bot.rest.runMethod<DiscordAutoModerationRule>(
    bot.rest,
    "POST",
    bot.constants.routes.AUTOMOD_RULES(guildId),
    {
      name: options.name,
      event_type: options.eventType,
      trigger_type: options.triggerType,
      trigger_metadata: {
        keyword_filter: options.triggerMetadata.keywordFilter,
        presets: options.triggerMetadata.presets,
        allow_list: options.triggerMetadata.allowList,
        mention_total_limit: options.triggerMetadata.mentionTotalLimit,
      },
      actions: options.actions.map((action) => ({
        type: action.type,
        metadata: action.metadata
          ? {
            channel_id: action.metadata.channelId?.toString(),
            duration_seconds: action.metadata.durationSeconds,
          }
          : undefined,
      })),
      enabled: options.enabled ?? true,
      exempt_roles: options.exemptRoles?.map((id) => id.toString()),
      exempt_channels: options.exemptChannels?.map((id) => id.toString()),
      reason: options.reason,
    },
  );

  return bot.transformers.automodRule(bot, result);
}

export interface CreateAutoModerationRuleOptions extends WithReason {
  /** The name of the rule. */
  name: string;
  /** The type of event to trigger the rule on. */
  eventType: AutoModerationEventTypes;
  /** The type of trigger to use for the rule. */
  triggerType: AutoModerationTriggerTypes;
  /** The metadata to use for the trigger. */
  triggerMetadata: {
    /** The keywords needed to match. Only present when TriggerType.Keyword */
    keywordFilter?: string[];
    /** The pre-defined lists of words to match from. Only present when TriggerType.KeywordPreset */
    presets?: DiscordAutoModerationRuleTriggerMetadataPresets[];
    /** The substrings which will exempt from triggering the preset trigger type. Only present when TriggerType.KeywordPreset */
    allowList?: string[];
    /** Total number of mentions (role & user) allowed per message (Maximum of 50). Only present when TriggerType.MentionSpam */
    mentionTotalLimit?: number;
  };
  /** The actions that will trigger for this rule */
  actions: {
    /** The type of action to take when a rule is triggered */
    type: AutoModerationActionType;
    /** additional metadata needed during execution for this specific action type */
    metadata?: {
      /** The id of channel to which user content should be logged. Only in SendAlertMessage */
      channelId?: BigString;
      /** Timeout duration in seconds. Max is 2419200(4 weeks). Only supported for TriggerType.Keyword */
      durationSeconds?: number;
    };
  }[];
  /** Whether the rule should be enabled, true by default. */
  enabled?: boolean;
  /** The role ids that should not be effected by the rule */
  exemptRoles?: BigString[];
  /** The channel ids that should not be effected by the rule. */
  exemptChannels?: BigString[];
}
