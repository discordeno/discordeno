import { BotCollection as Collection } from "../../util/collection.ts";
import { Bot } from "../../bot.ts";
import { DiscordInviteMetadata } from "../../deps.ts";

/** Gets the invites for this channel. Requires MANAGE_CHANNEL */
export async function getChannelInvites(bot: Bot, channelId: bigint) {
  const result = await bot.rest.runMethod<DiscordInviteMetadata[]>(
    bot.rest,
    "GET",
    bot.constants.routes.CHANNEL_INVITES(channelId),
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
