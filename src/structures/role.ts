import { Unpromise } from "../types/misc.ts";
import { RoleData } from "../types/role.ts";

export async function createRole(data: RoleData) {
  const { tags, ...rest } = data;

  const roleTags = {
    botID: tags?.bot_id,
    premiumSubscriber: "premium_subscriber" in (data.tags ?? {}),
    integrationID: data.tags?.integration_id,
  };

  return {
    ...rest,
    /** The @ mention of the role in a string. */
    mention: `<@&${data.id}>`,
    tags: roleTags,
  };
}

export interface Role extends Unpromise<ReturnType<typeof createRole>> {}
