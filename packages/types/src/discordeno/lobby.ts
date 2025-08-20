/** Types for: https://discord.com/developers/docs/resources/lobby */

import type { DiscordLobbyMemberFlags } from '../discord/lobby.js'
import type { BigString } from '../shared.js'

/** https://discord.com/developers/docs/resources/lobby#create-lobby */
export interface CreateLobby {
  /** Optional dictionary of string key/value pairs. The max total length is 1000. */
  metadata?: Record<string, string> | null
  /** Optional array of up to 25 users to be added to the lobby */
  members?: CreateLobbyMember[]
  /** Seconds to wait before shutting down a lobby after it becomes idle. Value can be between 5 and 604800 (7 days). */
  idleTimeoutSeconds?: number
}

/** https://discord.com/developers/docs/resources/lobby#create-lobby */
export interface CreateLobbyMember {
  /** Discord user id of the user to add to the lobby */
  id: BigString
  /** Optional dictionary of string key/value pairs. The max total length is 1000. */
  metadata?: Record<string, string> | null
  /**
   * Lobby member flags combined as a bitfield
   *
   * @see {@link DiscordLobbyMemberFlags}
   */
  flags?: number
}

/** https://discord.com/developers/docs/resources/lobby#add-a-member-to-a-lobby */
export interface ModifyLobby {
  /** Optional dictionary of string key/value pairs. The max total length is 1000. Overwrites any existing metadata. */
  metadata?: Record<string, string> | null
  /** Optional array of up to 25 users to replace the lobby members with. If provided, lobby members not in this list will be removed from the lobby. */
  members?: CreateLobbyMember[]
  /** Seconds to wait before shutting down a lobby after it becomes idle. Value can be between 5 and 604800 (7 days). */
  idleTimeoutSeconds?: number
}

/** https://discord.com/developers/docs/resources/lobby#add-a-member-to-a-lobby */
export interface AddLobbyMember {
  /** Optional dictionary of string key/value pairs. The max total length is 1000. */
  metadata?: Record<string, string> | null
  /** Lobby member flags combined as a bitfield */
  flags?: number
}

/** https://discord.com/developers/docs/resources/lobby#link-channel-to-lobby */
export interface LinkChannelToLobby {
  /** The id of the channel to link to the lobby. If not provided, will unlink any currently linked channels from the lobby. */
  channelId?: BigString
}
