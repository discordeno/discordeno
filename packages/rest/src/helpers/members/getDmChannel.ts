import type { BigString, DiscordChannel, DiscordGetDMChannel } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { Channel } from '../../transformers/channel.js'

/**
 * Gets or creates a DM channel with a user.
 *
 * @param rest - The rest manager to use to make the request.
 * @param userId - The ID of the user to create the DM channel with.
 * @returns An instance of {@link Channel}.
 *
 * @see {@link https://discord.com/developers/docs/resources/user#create-dm}
 */
export async function getDmChannel (
  rest: RestManager,
  userId: BigString
): Promise<Channel> {
  if (userId === rest.id) {
    throw new Error(rest.constants.Errors.YOU_CAN_NOT_DM_THE_BOT_ITSELF)
  }

  const result = await rest.runMethod<DiscordChannel>(
    rest,
    'POST',
    rest.constants.routes.USER_DM(),
    {
      recipient_id: userId.toString()
    } as DiscordGetDMChannel
  )

  return rest.transformers.channel(rest, { channel: result })
}
