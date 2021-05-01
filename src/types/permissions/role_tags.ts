/** https://discord.com/developers/docs/topics/permissions#role-object-role-tags-structure */
export interface RoleTags {
  /** The id of the bot this role belongs to */
  botId?: string;
  /** The id of the integration this role belongs to */
  integrationId?: string;
  /** Whether this is the guild's premium subscriber role */
  premiumSubscriber?: null;
}
