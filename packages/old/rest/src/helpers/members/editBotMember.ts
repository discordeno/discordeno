import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type {
  BigString,
  Camelize,
  DiscordEditBotMemberOptions,
  DiscordMember,
  WithReason
} from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Edits the nickname of the bot user.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to edit the nickname of the bot user in.
 * @param options - The parameters for the edit of the nickname.
 * @returns An instance of the edited {@link DiscordMember}
 *
 * @remarks
 * Fires a _Guild Member Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#modify-current-member}
 */
export async function editBotMember (
  rest: RestManager,
  guildId: BigString,
  options: EditBotMemberOptions
): Promise<Camelize<DiscordMember>> {
  const result = await rest.runMethod<DiscordMember>(
    'PATCH',
    routes.USER_NICK(guildId),
    {
      nick: options.nick,
      reason: options.reason
    } as DiscordEditBotMemberOptions
  )

  return TRANSFORMERS.member(result)
}

export interface EditBotMemberOptions extends WithReason {
  nick?: string | null
}
