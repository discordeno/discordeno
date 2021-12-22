import type { ModifyGuildMember } from "../../types/guilds/modifyGuildMember.ts";
import type { GuildMemberWithUser } from "../../types/members/guildMember.ts";
import type { Bot } from "../../bot.ts";

/** Edit the member */
export async function editMember(bot: Bot, guildId: bigint, memberId: bigint, options: ModifyGuildMember) {
  const result = await bot.rest.runMethod<GuildMemberWithUser>(
    bot.rest,
    "patch",
    bot.constants.endpoints.GUILD_MEMBER(guildId, memberId),
    {
      nick: options.nick,
      roles: options.roles,
      mute: options.mute,
      deaf: options.deaf,
      channel_id: options.channelId,
    }
  );

  return bot.transformers.member(bot, result, guildId, memberId);
}
