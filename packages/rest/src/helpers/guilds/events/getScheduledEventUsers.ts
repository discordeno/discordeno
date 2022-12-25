import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, DiscordMember, DiscordUser, GetScheduledEventUsers } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'

// TODO: This endpoint discards certain data from the result.
//  Create `ScheduledEventUser` type and parse the data to it.

/**
 * Gets the list of subscribers to a scheduled event from a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the subscribers to the scheduled event from.
 * @param eventId - The ID of the scheduled event to get the subscribers of.
 * @param options - The parameters for the fetching of the subscribers.
 * @returns A collection of {@link User} objects assorted by user ID.
 *
 * @remarks
 * Requires the `MANAGE_EVENTS` permission.
 *
 * Users are ordered by their IDs in _ascending_ order.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users}
 */
export async function getScheduledEventUsers (
  rest: RestManager,
  guildId: BigString,
  eventId: BigString,
  options?: GetScheduledEventUsers & { withMember?: false }
): Promise<Collection<string, Camelize<DiscordUser>>>
export async function getScheduledEventUsers (
  rest: RestManager,
  guildId: BigString,
  eventId: BigString,
  options?: GetScheduledEventUsers & { withMember: true }
): Promise<Collection<string, { user: Camelize<DiscordUser>, member: Camelize<DiscordMember> }>>
export async function getScheduledEventUsers (
  rest: RestManager,
  guildId: BigString,
  eventId: BigString,
  options?: GetScheduledEventUsers
): Promise<
  Collection<string, Camelize<DiscordUser>> | Collection<string, { user: Camelize<DiscordUser>, member: Camelize<DiscordMember> }>
  > {
  const url = routes.GUILD_SCHEDULED_EVENT_USERS(
    guildId,
    eventId,
    options
  )

  const results = await rest.runMethod<
  Array<{ user: DiscordUser, member?: DiscordMember }>
  >('GET', url)

  if (!options?.withMember) {
    return new Collection(
      results.map((result) => {
        const user = TRANSFORMERS.user(result.user)
        return [user.id, user]
      })
    )
  }

  return new Collection(
    results.map((result) => {
      const user = TRANSFORMERS.user(result.user)
      const member = TRANSFORMERS.member(result.member!)

      return [user.id, { member, user }]
    })
  )
}
