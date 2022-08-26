import { Bot } from "../../bot.ts";

/** Kick a member from the server */
export async function kickMember(bot: Bot, guildId: bigint, memberId: bigint, reason?: string): Promise<void> {
  return void await bot.rest.runMethod(
    bot.rest,
    "DELETE",
    bot.constants.routes.GUILD_MEMBER(guildId, memberId),
    {
      reason,
    },
  );
}
