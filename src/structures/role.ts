import { Unpromise } from "../types/misc.ts";
import { RoleData } from "../types/role.ts";

export async function createRole(data: RoleData) {
  return {
    ...data,
    /** The @ mention of the role in a string. */
    mention: `<@&${data.id}>`,
    tags: {
      botID: data.tags?.botID,
      premiumSubscriber: "premium_subscriber" in (data.tags ?? {}),
      integrationID: data.tags?.integrationID,
    },
  };
}

export interface Role extends Unpromise<ReturnType<typeof createRole>> {}
