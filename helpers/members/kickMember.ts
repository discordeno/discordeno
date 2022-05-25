import { Bot } from "../../bot.ts";

/** Kick a member from the server */
export async function kickMember(bot: Bot, guildId: bigint, memberId: bigint, reason?: string) {
  await bot.rest.runMethod<undefined>(bot.rest, "delete", bot.constants.routes.GUILD_MEMBER(guildId, memberId), {
    reason,
  });
}
