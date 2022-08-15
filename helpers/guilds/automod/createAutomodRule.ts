import { Bot } from "../../../bot.ts";
import {
  AutoModerationActionType,
  AutoModerationEventTypes,
  AutoModerationTriggerTypes,
  DiscordAutoModerationRule,
  DiscordAutoModerationRuleTriggerMetadataPresets,
} from "../../../types/discord.ts";

/** Get a rule currently configured for guild. */
export async function createAutomodRule(bot: Bot, guildId: bigint, options: CreateAutoModerationRuleOptions) {
  const rule = await bot.rest.runMethod<DiscordAutoModerationRule>(
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
    },
  );

  return bot.transformers.automodRule(bot, rule);
}

export interface CreateAutoModerationRuleOptions {
  /** The name of the rule. */
  name: string;
  /** The type of event to trigger the rule on. */
  eventType: AutoModerationEventTypes;
  /** The type of trigger to use for the rule. */
  triggerType: AutoModerationTriggerTypes;
  /** The metadata to use for the trigger. */
  triggerMetadata: {
    // TODO: discord is considering renaming this before release
    /** The keywords needed to match. Only present when TriggerType.Keyword */
    keywordFilter?: string[];
    /** The pre-defined lists of words to match from. Only present when TriggerType.KeywordPreset */
    presets?: DiscordAutoModerationRuleTriggerMetadataPresets[];
  };
  /** The actions that will trigger for this rule */
  actions: {
    /** The type of action to take when a rule is triggered */
    type: AutoModerationActionType;
    /** additional metadata needed during execution for this specific action type */
    metadata?: {
      /** The id of channel to which user content should be logged. Only in SendAlertMessage */
      channelId?: bigint;
      /** Timeout duration in seconds. Max is 2419200(4 weeks). Only supported for TriggerType.Keyword */
      durationSeconds?: number;
    };
  }[];
  /** Whether the rule should be enabled, true by default. */
  enabled?: boolean;
  /** The role ids that should not be effected by the rule */
  exemptRoles?: bigint[];
  /** The channel ids that should not be effected by the rule. */
  exemptChannels?: bigint[];
}
