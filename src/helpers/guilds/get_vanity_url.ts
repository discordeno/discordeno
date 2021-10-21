import type { InviteMetadata } from "../../types/invites/invite_metadata.ts";
import type { Bot } from "../../bot.ts";

/** Returns the code and uses of the vanity url for this server if it is enabled else `code` will be null. Requires the `MANAGE_GUILD` permission. */
export async function getVanityURL(bot: Bot, guildId: bigint) {
  return await bot.rest.runMethod<
    | (Partial<InviteMetadata> & Pick<InviteMetadata, "uses" | "code">)
    | {
        code: null;
      }
  >(bot.rest, "get", bot.constants.endpoints.GUILD_VANITY_URL(guildId));
}
