import { RoleData, Unpromise } from "../types/types.ts";

export async function createRole(data: RoleData) {
  const { tags, ...rest } = data;

  const roleTags = {
    botID: tags?.bot_id,
    premiumSubscriber: "premium_subscriber" in (tags ?? {}),
    integrationID: tags?.integration_id,
  };

  return {
    ...rest,
    /** The @ mention of the role in a string. */
    mention: `<@&${data.id}>`,
    tags: roleTags,
  };
}

export interface Role extends Unpromise<ReturnType<typeof createRole>> {}
