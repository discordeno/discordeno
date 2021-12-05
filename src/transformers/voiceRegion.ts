import { Bot } from "../bot.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { VoiceRegion } from "../types/voice/voiceRegion.ts";

export function transformVoiceRegion(bot: Bot, payload: SnakeCasedPropertiesDeep<VoiceRegion>): DiscordenoVoiceRegion {
  return {
    id: bot.transformers.snowflake(payload.id),
    name: payload.name,
    optimal: payload.optimal,
    deprecated: payload.deprecated,
    custom: payload.custom,
  };
}

export interface DiscordenoVoiceRegion {
  /** Unique Id for the region */
  id: bigint;
  /** Name of the region */
  name: string;
  /** true for a single server that is closest to the current user's client */
  optimal: boolean;
  /** Whether this is a deprecated voice region (avoid swithing to these) */
  deprecated: boolean;
  /** Whether this is a custom voice region (used for events/etc) */
  custom: boolean;
}
