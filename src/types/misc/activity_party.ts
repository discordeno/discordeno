/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-party */
export interface ActivityParty {
  /** The id of the party */
  id?: string;
  /** Used to show the party's current and maximum size */
  size?: [currentSize: number, maxSize: number];
}
