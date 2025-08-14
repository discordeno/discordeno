/** Types for: https://discord.com/developers/docs/resources/auto-moderation */

import type {
  AutoModerationActionType,
  AutoModerationEventTypes,
  AutoModerationTriggerTypes,
  DiscordAutoModerationRuleTriggerMetadata,
} from '../discord/autoModeration.js'
import type { BigString, Camelize } from '../shared.js'

// This needs the prefix Discordeno to avoid conflicts with the @discordeno/bot types.
/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-auto-moderation-action-structure */
export interface DiscordenoAutoModerationAction {
  /** The type of action to take when a rule is triggered */
  type: AutoModerationActionType
  /** additional metadata needed during execution for this specific action type */
  metadata?: DiscordenoAutoModerationActionMetadata
}

// This needs the prefix Discordeno to avoid conflicts with the @discordeno/bot types.
/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-metadata */
export interface DiscordenoAutoModerationActionMetadata {
  /**
   * The id of channel to which user content should be logged.
   *
   * @remarks
   * Only for actions of type {@link AutoModerationActionType.SendAlertMessage}.
   */
  channelId?: BigString
  /**
   * Timeout duration in seconds.
   *
   * @remarks
   * Only for actions of type {@link AutoModerationActionType.Timeout}.
   *
   * Maximum of 2419200 seconds (4 weeks).
   */
  durationSeconds?: number
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
  customMessage?: string
}

/** https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule-json-params */
export interface CreateAutoModerationRuleOptions {
  /** The name of the rule. */
  name: string
  /** The type of event to trigger the rule on. */
  eventType: AutoModerationEventTypes
  /** The type of trigger to use for the rule. */
  triggerType: AutoModerationTriggerTypes
  /** The metadata to use for the trigger. */
  triggerMetadata: Camelize<DiscordAutoModerationRuleTriggerMetadata>
  /** The actions that will trigger for this rule */
  actions: DiscordenoAutoModerationAction[]
  /** Whether the rule should be enabled, true by default. */
  enabled?: boolean
  /** The role ids that should not be effected by the rule */
  exemptRoles?: BigString[]
  /** The channel ids that should not be effected by the rule. */
  exemptChannels?: BigString[]
}

/** https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule-json-params */
export interface EditAutoModerationRuleOptions {
  /** The name of the rule. */
  name?: string
  /** The type of event to trigger the rule on. */
  eventType?: AutoModerationEventTypes
  /** The metadata to use for the trigger. */
  triggerMetadata?: Camelize<DiscordAutoModerationRuleTriggerMetadata>
  /** The actions that will trigger for this rule */
  actions?: DiscordenoAutoModerationAction[]
  /** Whether the rule should be enabled. */
  enabled?: boolean
  /** The role ids that should not be effected by the rule */
  exemptRoles?: BigString[]
  /** The channel ids that should not be effected by the rule. */
  exemptChannels?: BigString[]
}
