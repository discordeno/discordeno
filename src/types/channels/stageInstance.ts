import { PrivacyLevel } from "./privacyLevel.ts";

/** https://discord.com/developers/docs/resources/stage-instance#auto-closing-stage-instance-structure */
export interface StageInstance {
  /** The id of this Stage instance */
  id: string;
  /** The guild id of the associated Stage channel */
  guildId: string;
  /** The id of the associated Stage channel */
  channelId: string;
  /** The topic of the Stage instance (1-120 characters) */
  topic: string;
  /** The privacy level of the Stage instance */
  privacyLevel: PrivacyLevel;
  /** Whether or not Stage Discovery is disabled (deprecated) */
  discoverableDisabled: boolean;
}
