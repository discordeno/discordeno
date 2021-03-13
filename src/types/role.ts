/** https://discord.com/developers/docs/topics/permissions#role-object-role-structure */
export interface DiscordRole {
  /** role id */
  id: string;
  /** role name */
  name: string;
  /** number representation of hexadecimal color code */
  color: number;
  /** if this role is pinned in the user listing */
  hoist: boolean;
  /** position of this role */
  position: number;
  /** permission bit set */
  permissions: string;
  /** whether this role is managed by an integration */
  managed: boolean;
  /** whether this role is mentionable */
  mentionable: boolean;
  /** the tags this role has */
  tags?: DiscordRoleTags;
}

/** https://discord.com/developers/docs/topics/permissions#role-object-role-tags-structure */
export interface DiscordRoleTags {
  /** the id of the bot this role belongs to */
  bot_id?: string;
  /** the id of the integration this role belongs to */
  integration_id?: string;
  /** whether this is the guild's premium subscriber role */
  premium_subscriber?: null;
}
