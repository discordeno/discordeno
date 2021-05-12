// TODO: add resource link
export interface StageInstance {
  /** The id of this Stage instance */
  id: string;
  /** The guild id of the associated Stage channel */
  guildId: string;
  /** The id of the associated Stage channel */
  channelId: string;
  /** The topic of the Stage instance (1-120 characters) */
  topic: string;
}
