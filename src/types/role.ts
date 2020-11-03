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
  /**  */
  tags: RoleTags | null;
}

export interface RoleTags {
  bot_id?: string;
  premium_subscriber?: boolean;
  integration_id?: string;
}
