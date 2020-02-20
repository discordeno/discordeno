import { Role_Data } from '../types/role'

export const create_role = (data: Role_Data) => ({
  /** The entire raw Role data */
  raw: () => data,
  /** role id */
  id: () => data.id,
  /** role name */
  name: () => data.name,
  /** integer representation of hexadecimal color code */
  color: () => data.color,
  /** if this role is pinned in the user listing */
  hoist: () => data.hoist,
  /** position of this role */
  position: () => data.position,
  /** permission bit set */
  permissions: () => data.permissions,
  /** whether this role is managed by an integration */
  managed: () => data.managed,
  /** whether this role is mentionable */
  mentionable: () => data.mentionable,
  /** The @ mention of the role in a string. */
  mention: () => `<@&${data.id}>`
})

export type Role = ReturnType<typeof create_role>
