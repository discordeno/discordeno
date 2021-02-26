export interface RoleData {
  /** role id */
  id: string;
  /** role name */
  name: string;
  /** integer representation of hexadecimal color code */
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
  /** Certain roles may have tags that allow you to determine if this role is related to a bot, an integration, or the booster role. */
  tags?: RoleTags;
}

export interface RoleTags {
  /** the id of the bot who has this role */
  "bot_id"?: string;
  /** whether this is the premium subscriber role for this guild */
  "premium_subscriber"?: null;
  /** the id of the integration this role belongs to */
  "integration_id"?: string;
}
