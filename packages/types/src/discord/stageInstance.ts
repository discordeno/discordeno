/** Types for: https://discord.com/developers/docs/resources/stage-instance */

/** https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-stage-instance-structure */
export interface DiscordStageInstance {
  /** The id of this Stage instance */
  id: string
  /** The guild id of the associated Stage channel */
  guild_id: string
  /** The id of the associated Stage channel */
  channel_id: string
  /** The topic of the Stage instance (1-120 characters) */
  topic: string
  /** The privacy level of the Stage instance */
  privacy_level: DiscordStageInstancePrivacyLevel
  /**
   * Whether or not Stage Discovery is disabled
   * @deprecated
   */
  discoverable_disabled: boolean
  /** The id of the scheduled event for this Stage instance */
  guild_scheduled_event_id: string | null
}

/** https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level */
export enum DiscordStageInstancePrivacyLevel {
  Public = 1,
  GuildOnly = 2,
}
