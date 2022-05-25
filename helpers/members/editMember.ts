import type { Bot } from "../../bot.ts";
import { DiscordMemberWithUser } from "../../types/discord.ts";

/** Edit the member */
export async function editMember(bot: Bot, guildId: bigint, memberId: bigint, options: ModifyGuildMember) {
  const result = await bot.rest.runMethod<DiscordMemberWithUser>(
    bot.rest,
    "patch",
    bot.constants.routes.GUILD_MEMBER(guildId, memberId),
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

/** https://discord.com/developers/docs/resources/guild#modify-guild-member */
export interface ModifyGuildMember {
  /** Value to set users nickname to. Requires the `MANAGE_NICKNAMES` permission */
  nick?: string | null;
  /** Array of role ids the member is assigned. Requires the `MANAGE_ROLES` permission */
  roles?: bigint[] | null;
  /** Whether the user is muted in voice channels. Will throw a 400 if the user is not in a voice channel. Requires the `MUTE_MEMBERS` permission */
  mute?: boolean | null;
  /** Whether the user is deafened in voice channels. Will throw a 400 if the user is not in a voice channel. Requires the `MOVE_MEMBERS` permission */
  deaf?: boolean | null;
  /** Id of channel to move user to (if they are connected to voice). Requires the `MOVE_MEMBERS` permission */
  channelId?: bigint | null;
  /** when the user's timeout will expire and the user will be able to communicate in the guild again (up to 28 days in the future), set to null to remove timeout. Requires the `MODERATE_MEMBERS` permission */
  communicationDisabledUntil?: number;
}
