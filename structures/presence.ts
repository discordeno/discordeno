import { ActivityPayload } from "./activity.ts"
import { StatusType } from "../types/discord.ts"
import { User_Payload } from "../types/guild.ts"

export type PresencePayload = Partial<{
  /** The user presence is being updated for */
  user: User_Payload

  /** Roles this user is in */
  roles: string[]

  /** Null, or the user's current activity */
  game: ActivityPayload

  /** Id of the guild */
  guild_id: string

  // This is a deviation from the docs, as it pretty much says `: StatusType`.
  /** The updated status */
  status: StatusType

  /** User's current activities */
  activities: ActivityPayload[]

  /** User's platform-dependent status */
  client_status: ClientStatusPayload

  /** When the user used their Nitro boost on the server */
  premium_since: string

  /** This users guild nickname (if one is set) */
  nick: string
}> & { id: string }

export interface ClientStatusPayload {
  /** The user's status set for an active desktop (Windows, Linux, Mac) application session */
  desktop?: StatusType

  /** The user's status set for an active mobile (iOS, Android) application session */
  mobile?: StatusType

  /** The user's status set for an active web (browser, bot account) application session */
  web?: StatusType
}

export const createPresence = (data: unknown) => {
  console.log(data)
}
