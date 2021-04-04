import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns the code and uses of the vanity url for this server if it is enabled. Requires the MANAGE_GUILD permission. */
export async function getVanityURL(guildId: string) {
  const result = await rest.runMethod(
    "get",
    endpoints.GUILD_VANITY_URL(guildId),
  );

  return result;
}
