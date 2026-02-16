/** Types for: https://docs.discord.com/developers/resources/stage-instance */

import type { DiscordStageInstancePrivacyLevel } from '../discord/stageInstance.js';
import type { BigString } from '../shared.js';

/** https://docs.discord.com/developers/resources/stage-instance#create-stage-instance-json-params */
export interface CreateStageInstance {
  /** The id of the Stage channel */
  channelId: BigString;
  /** The topic of the Stage instance (1-120 characters) */
  topic: string;
  /** The privacy level of the Stage instance */
  privacyLevel?: DiscordStageInstancePrivacyLevel;
  /** Notify \@everyone that the stage instance has started. Requires the MENTION_EVERYONE permission. */
  sendStartNotification?: boolean;
  /** The guild scheduled event associated with this Stage instance */
  guildScheduledEventId?: BigString;
}

/** https://docs.discord.com/developers/resources/stage-instance#modify-stage-instance-json-params */
export interface EditStageInstanceOptions {
  /** The topic of the Stage instance (1-120 characters) */
  topic?: string;
  /** The privacy level of the Stage instance */
  privacyLevel?: DiscordStageInstancePrivacyLevel;
}
