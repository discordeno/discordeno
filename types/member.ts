import { User_Payload } from "../structures/user.ts"
import { create_member } from "../structures/member.ts"

export interface Edit_Member_Options {
  /** Value to set users nickname to. Requires MANAGE_NICKNAMES permission. */
  nick?: string
  /** Array of role ids the member is assigned. Requires MANAGE_ROLES permission. */
  roles?: string[]
  /** Whether the user is muted in voice channels. Requires MUTE_MEMBERS permission. */
  mute?: boolean
  /** Whether the user is deafened in voice channels. Requires DEAFEN_MEMBERS permission. */
  deaf?: boolean
  /** The id of the channel to move user to if they are connected to voice. To kick the user from their current channel, set to null. Requires MOVE_MEMBERS permission. When moving members to channels, must have permissions to both CONNECT to the channel and have the MOVE_MEMBER permission. */
  channel_id?: string | null
}

export interface Member_Create_Payload {
  /** The user this guild member represents */
  user: User_Payload
  /** The user's guild nickname if one is set. */
  nick?: string
  /** Array of role ids that the member has */
  roles: string[]
  /** When the user joined the guild. */
  joined_at: string
  /** When the user used their nitro boost on the server. */
  premium_since?: string
  /** Whether the user is deafened in voice channels */
  deaf: boolean
  /** Whether the user is muted in voice channels */
  mute: boolean
}

export type Member = ReturnType<typeof create_member>
