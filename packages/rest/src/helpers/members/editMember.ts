import { routes } from '@discordeno/constant'
import type { BigString, DiscordMemberWithUser, DiscordModifyGuildMember } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { Member } from '../../transformers/member.js'

/**
 * Edits a member's properties.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to edit the member of.
 * @param userId - The user ID of the member to edit.
 * @param options - The parameters for the edit of the user.
 *
 * @remarks
 * This endpoint requires various permissions depending on what is edited about the member.
 * To find out the required permission to enact a change, read the documentation of this endpoint's {@link ModifyGuildMember | parameters}.
 *
 * Fires a _Guild Member Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild-member}
 */
export async function editMember (
  rest: RestManager,
  guildId: BigString,
  userId: BigString,
  options: ModifyGuildMember
): Promise<Member> {
  const result = await rest.runMethod<DiscordMemberWithUser>(
    rest,
    'PATCH',
    routes.GUILD_MEMBER(guildId, userId),
    {
      nick: options.nick,
      roles: options.roles?.map((id) => id.toString()),
      mute: options.mute,
      deaf: options.deaf,
      channel_id: options.channelId?.toString(),
      communication_disabled_until: options.communicationDisabledUntil
        ? new Date(options.communicationDisabledUntil).toISOString()
        : options.communicationDisabledUntil
    } as DiscordModifyGuildMember
  )

  return rest.transformers.member(
    rest,
    result,
    rest.transformers.snowflake(guildId),
    rest.transformers.snowflake(userId)
  )
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-member */
export interface ModifyGuildMember {
  /** Value to set users nickname to. Requires the `MANAGE_NICKNAMES` permission */
  nick?: string | null
  /** Array of role ids the member is assigned. Requires the `MANAGE_ROLES` permission */
  roles?: BigString[] | null
  /** Whether the user is muted in voice channels. Will throw a 400 if the user is not in a voice channel. Requires the `MUTE_MEMBERS` permission */
  mute?: boolean | null
  /** Whether the user is deafened in voice channels. Will throw a 400 if the user is not in a voice channel. Requires the `MOVE_MEMBERS` permission */
  deaf?: boolean | null
  /** Id of channel to move user to (if they are connected to voice). Requires the `MOVE_MEMBERS` permission */
  channelId?: BigString | null
  /** when the user's timeout will expire and the user will be able to communicate in the guild again (up to 28 days in the future), set to null to remove timeout. Requires the `MODERATE_MEMBERS` permission */
  communicationDisabledUntil?: number | null
}
