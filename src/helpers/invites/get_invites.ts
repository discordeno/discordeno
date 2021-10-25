import type { InviteMetadata } from "../../types/invites/invite_metadata.ts";
import { Collection } from "../../util/collection.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";
import type { Bot } from "../../bot.ts";

/** Get all the invites for this guild. Requires MANAGE_GUILD permission */
export async function getInvites(bot: Bot, guildId: bigint) {
  await bot.utils.requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

  const result = await bot.rest.runMethod<InviteMetadata[]>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_INVITES(guildId)
  );

  return new Collection(result.map((invite) => [invite.code, invite]));
}
