/** Types for: https://discord.com/developers/docs/resources/stage-instance */

/** https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-stage-instance-structure */
// TODO: this is missing a bunch of fields, including: privacy_level, discoverable_disabled
export interface DiscordStageInstance {
  /** The topic of the Stage instance (1-120 characters) */
  topic: string
  /** The id of this Stage instance */
  id: string
  /** The guild id of the associated Stage channel */
  guild_id: string
  /** The id of the associated Stage channel */
  channel_id: string
  /** The id of the scheduled event for this Stage instance */
  guild_scheduled_event_id?: string
}

// TODO: Add DiscordStageInstancePrivacyLevel https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level
