import { Permission, RoleData, Unpromise } from "../types/types.ts";
import { createNewProp } from "../utils/utils.ts";

const baseRole: any = {
  get hexColor() {
    return this.color.toString(16);
  },
  get mention() {
    return `<@&${this.id}>`;
  }
}

export async function createRole(data: RoleData) {
  const { tags, ...rest } = data;

  const restProps = {};
  for (const key of Object.keys(rest)) {
    // @ts-ignore
    restProps[key] = createNewProp(rest[key]);
  }

  const role = Object.create(baseRole, {
    ...restProps,
    botID: createNewProp(tags?.bot_id),
    isNitroBoostRole: createNewProp("premium_subscriber" in (tags ?? {})),
    integrationID: createNewProp(tags?.integration_id),
  })

  return role as Role;
}

export interface Role {
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
  /** The bot id that is associated with this role. */
  botID?: string;
  /** If this role is the nitro boost role. */
  isNitroBoostRole: boolean;
  /** The integration id that is associated with this role */
  integrationID: string;

  // GETTERS

  /** The hex color for this role. */
  hexColor: string;
  /** The @ mention of the role in a string. */
  mention: string;
}
