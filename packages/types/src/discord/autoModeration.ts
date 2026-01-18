/** Types for: https://discord.com/developers/docs/resources/auto-moderation */

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-auto-moderation-rule-structure */
export interface DiscordAutoModerationRule {
  /** The id of this rule */
  id: string;
  /** The guild id of the rule */
  guild_id: string;
  /** The name of the rule */
  name: string;
  /** The id of the user who created this rule. */
  creator_id: string;
  /** Indicates in what event context a rule should be checked. */
  event_type: AutoModerationEventTypes;
  /** The type of trigger for this rule */
  trigger_type: AutoModerationTriggerTypes;
  /** The metadata used to determine whether a rule should be triggered. */
  trigger_metadata: DiscordAutoModerationRuleTriggerMetadata;
  /** Actions which will execute whenever a rule is triggered. */
  actions: DiscordAutoModerationAction[];
  /** Whether the rule is enabled. */
  enabled: boolean;
  /** The role ids that are whitelisted. Max 20. */
  exempt_roles: string[];
  /** The channel ids that are whitelisted. Max 50. */
  exempt_channels: string[];
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types */
export enum AutoModerationTriggerTypes {
  /** Check if content contains words from a user defined list of keywords. Max 6 per guild */
  Keyword = 1,
  /** Check if content represents generic spam. Max 1 per guild */
  Spam = 3,
  /** Check if content contains words from internal pre-defined word sets. Max 1 per guild */
  KeywordPreset,
  /** Check if content contains more unique mentions than allowed. Max 1 per guild */
  MentionSpam,
  /** Check if member profile contains words from a user defined list of keywords. Max 1 per guild */
  MemberProfile,
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata */
export interface DiscordAutoModerationRuleTriggerMetadata {
  /**
   * Substrings which will be searched for in content.
   *
   * @remarks
   * Only present with {@link AutoModerationTriggerTypes.Keyword} and {@link AutoModerationTriggerTypes.MemberProfile}.
   *
   * Can have up to 1000 elements in the array and each string can have up to 60 characters.
   */
  keyword_filter?: string[];
  /**
   * Regular expression patterns which will be matched against content.
   *
   * @remarks
   * Only present with {@link AutoModerationTriggerTypes.Keyword} and {@link AutoModerationTriggerTypes.MemberProfile}.
   *
   * Only Rust flavored regex is currently supported. Can have up to 10 elements in the array and each string can have up to 260 characters.
   */
  regex_patterns?: string[];
  /**
   * The Discord pre-defined wordsets which will be searched for in content.
   *
   * @remarks
   * Only present with {@link AutoModerationTriggerTypes.KeywordPreset}.
   */
  presets?: DiscordAutoModerationRuleTriggerMetadataPresets[];
  /**
   * The substrings which should not trigger the rule.
   *
   * @remarks
   * Only present with {@link AutoModerationTriggerTypes.Keyword}, {@link AutoModerationTriggerTypes.KeywordPreset} and {@link AutoModerationTriggerTypes.MemberProfile}.
   *
   * When used with {@link AutoModerationTriggerTypes.Keyword} and {@link AutoModerationTriggerTypes.MemberProfile}, there can be up to 100 elements in the array and each string can have up to 60 characters.
   * When used with {@link AutoModerationTriggerTypes.KeywordPreset}, there can be up to 1000 elements in the array and each string can have up to 60 characters.
   */
  allow_list?: string[];
  /**
   * Total number of unique role and user mentions allowed per message.
   *
   * @remarks
   * Only present with {@link AutoModerationTriggerTypes.MentionSpam}.
   *
   * Maximum of 50
   */
  mention_total_limit?: number;
  /**
   * Whether to automatically detect mention raids.
   *
   * @remarks
   * Only present with {@link AutoModerationTriggerTypes.MentionSpam}.
   */
  mention_raid_protection_enabled?: boolean;
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-keyword-preset-types */
export enum DiscordAutoModerationRuleTriggerMetadataPresets {
  /** Words that may be considered forms of swearing or cursing */
  Profanity = 1,
  /** Words that refer to sexually explicit behavior or activity */
  SexualContent,
  /** Personal insults or words that may be considered hate speech */
  Slurs,
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types */
export enum AutoModerationEventTypes {
  /** When a user sends a message */
  MessageSend = 1,
  /** Wen a member edits their profile */
  MemberUpdate,
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-auto-moderation-action-structure */
export interface DiscordAutoModerationAction {
  /** The type of action to take when a rule is triggered */
  type: AutoModerationActionType;
  /** additional metadata needed during execution for this specific action type */
  metadata?: DiscordAutoModerationActionMetadata;
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-types */
export enum AutoModerationActionType {
  /** Blocks the content of a message according to the rule */
  BlockMessage = 1,
  /** Logs user content to a specified channel */
  SendAlertMessage,
  /**
   * Times out user for specified duration
   *
   * @remarks
   * A timeout action can only be set up for {@link AutoModerationTriggerTypes.Keyword} and {@link AutoModerationTriggerTypes.MentionSpam} rules.
   *
   * The `MODERATE_MEMBERS` permission is required to use the timeout action type.
   */
  Timeout,
  /** prevents a member from using text, voice, or other interactions */
  BlockMemberInteraction,
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-metadata */
export interface DiscordAutoModerationActionMetadata {
  /**
   * The id of channel to which user content should be logged.
   *
   * @remarks
   * Only for actions of type {@link AutoModerationActionType.SendAlertMessage}.
   */
  channel_id?: string;
  /**
   * Timeout duration in seconds.
   *
   * @remarks
   * Only for actions of type {@link AutoModerationActionType.Timeout}.
   *
   * Maximum of 2419200 seconds (4 weeks).
   */
  duration_seconds?: number;
  /**
   * Additional explanation that will be shown to members whenever their message is blocked.
   *
   * This may set to undefined if no custom message is provided.
   *
   * @remarks
   * Only for actions of type {@link AutoModerationActionType.BlockMessage}.
   *
   * Maximum of 150 characters.
   */
  custom_message?: string;
}
