/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-emoji */
export interface ActivityEmoji {
  /** The name of the emoji */
  name: string;
  /** The id of the emoji */
  id?: string;
  /** Whether this emoji is animated */
  animated?: boolean;
}
