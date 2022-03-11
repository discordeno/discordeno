import type { Bot } from "../../bot.ts";
import { DiscordMemberWithUser } from "../../types/discord.ts";
import { ModifyGuildMember } from "../../types/discordeno.ts";

/** Edit the member */
export async function editMember(bot: Bot, guildId: bigint, memberId: bigint, options: ModifyGuildMember) {
  const result = await bot.rest.runMethod<DiscordMemberWithUser>(
    bot.rest,
    "patch",
    bot.constants.endpoints.GUILD_MEMBER(guildId, memberId),
    {
      nick: options.nick,
      roles: options.roles?.map((id) => id.toString()),
      mute: options.mute,
      deaf: options.deaf,
      channel_id: options.channelId?.toString(),
      communication_disabled_until: options.communicationDisabledUntil
        ? new Date(options.communicationDisabledUntil).toISOString()
        : undefined,
    },
  );

  return bot.transformers.member(bot, result, guildId, memberId);
}
