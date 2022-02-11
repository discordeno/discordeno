import type { InviteMetadata } from "../../types/invites/inviteMetadata.ts";
import { Collection } from "../../util/collection.ts";
import type { Bot } from "../../bot.ts";

/** Get all the invites for this guild. Requires MANAGE_GUILD permission */
export async function getInvites(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<InviteMetadata[]>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_INVITES(guildId),
  );

  return new Collection(
    result.map((invite) => [
      invite.code,
      {
        uses: invite.uses,
        maxUses: invite.max_uses,
        maxAge: invite.max_age,
        temporary: invite.temporary,
        createdAt: Date.parse(invite.created_at),
      },
    ]),
  );
}
