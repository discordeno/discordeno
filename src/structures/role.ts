import { Unpromise } from "../types/misc.ts";
import { RoleData } from "../types/role.ts";

export async function createRole(data: RoleData) {
  return {
    ...data,
    /** The @ mention of the role in a string. */
    mention: `<@&${data.id}>`,
  };
}

export interface Role extends Unpromise<ReturnType<typeof createRole>> {}
