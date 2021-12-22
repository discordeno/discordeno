import { Bot } from "../bot.ts";
import { StageInstance } from "../types/channels/stageInstance.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { PrivacyLevel } from "../types/channels/privacyLevel.ts";

export function transformStageInstance(
  bot: Bot,
  payload: SnakeCasedPropertiesDeep<StageInstance>
): DiscordenoStageInstance {
  return {
    id: bot.transformers.snowflake(payload.id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    channelId: bot.transformers.snowflake(payload.channel_id),
    topic: payload.topic,
    privacyLevel: payload.privacy_level,
    discoverableDisabled: payload.discoverable_disabled,
  };
}

export interface DiscordenoStageInstance {
  /** The id of this Stage instance */
  id: bigint;
  /** The guild id of the associated Stage channel */
  guildId: bigint;
  /** The id of the associated Stage channel */
  channelId: bigint;
  /** The topic of the Stage instance (1-120 characters) */
  topic: string;
  /** The privacy level of the Stage instance */
  privacyLevel: PrivacyLevel;
  /** Whether or not Stage discovery is disabled */
  discoverableDisabled: boolean;
}
