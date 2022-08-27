import { Bot } from "../../bot.ts";

/** Kick a member from the server */
export async function kickMember(bot: Bot, guildId: bigint, memberId: bigint, reason?: string): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.GUILD_MEMBER(guildId, memberId),
    {
      reason,
    },
  );
}
