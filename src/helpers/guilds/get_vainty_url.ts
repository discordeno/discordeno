import { rest } from "../../rest/rest.ts";
import { InviteMetadata } from "../../types/invites/invite_metadata.ts";
import { endpoints } from "../../util/constants.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/** Returns the code and uses of the vanity url for this server if it is enabled else `code` will be null. Requires the `MANAGE_GUILD` permission. */
export async function getVanityURL(guildId: string) {
  const result = await rest.runMethod(
    "get",
    endpoints.GUILD_VANITY_URL(guildId),
  );

  return snakeKeysToCamelCase(result) as
    | (Partial<InviteMetadata> & Pick<InviteMetadata, "uses" | "code">)
    | { code: null };
}
