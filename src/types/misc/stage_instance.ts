// TODO: add resource link
export interface StageInstance {
  /** The id of this Stage instance. */
  id: string;
  /** The guild id of the associated Stage channel. */
  guildId: string;
  /** The id of the associated Stage channel. */
  channelId: string;
  /** The topic of the Stage instance (1-120 characters) */
  topic: string;
}

// Example:
// {
//   guildId: "838659849071230997",
//   channelId: "841612765089234946",
//   topic: "test",
//   privacyLevel: 2,
//   id: "841615532243025932",
//   discoverableDisabled: false,
//   guildScheduledEventId: null
// }
