import { rest } from "../../rest/rest.ts";
import { DiscordInvite, Invite } from "../../types/invites/invite.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/** Get all the invites for this guild. Requires MANAGE_GUILD permission */
export async function getInvites(guildId: string) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  const result = (await rest.runMethod(
    "get",
    endpoints.GUILD_INVITES(guildId)
  )) as DiscordInvite[];

  return new Collection(
    result.map((invite) => [invite.code, snakeKeysToCamelCase<Invite>(invite)])
  );
}
