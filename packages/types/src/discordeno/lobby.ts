/** Types for: https://docs.discord.com/developers/resources/lobby */

import type { DiscordLobbyMemberFlags } from '../discord/lobby.js';
import type { BigString } from '../shared.js';

/** https://docs.discord.com/developers/resources/lobby#create-lobby */
export interface CreateLobby {
  /** Optional dictionary of string key/value pairs. The max total length is 1000. */
  metadata?: Record<string, string> | null;
  /** Optional array of up to 25 users to be added to the lobby */
  members?: CreateLobbyMember[];
  /** Seconds to wait before shutting down a lobby after it becomes idle. Value can be between 5 and 604800 (7 days). */
  idleTimeoutSeconds?: number;
}

/** https://docs.discord.com/developers/resources/lobby#create-or-join-lobby */
export interface CreateOrJoinLobby {
  /**
   * Secret used to identify the lobby.
   * If a lobby for this application already exists with this secret, the caller joins it; otherwise a new lobby is created.
   *
   * @remarks
   * Max 250 characters
   */
  secret: string;
  /**
   * Seconds to wait before shutting down a lobby after it becomes idle.
   *
   * @remarks
   * Value can be between 5 and 604800 (7 days).
   */
  idleTimeoutSeconds?: number;
  /**
   * Optional dictionary of string key/value pairs.
   *
   * @remarks
   * The max total length is 1000.
   *
   * Overwrites any existing lobby metadata.
   */
  lobbyMetadata?: Record<string, string> | null;
  /**
   * Optional dictionary of string key/value pairs to set on the calling user’s lobby member
   *
   * @remarks
   * The max total length is 1000.
   */
  memberMetadata?: Record<string, string> | null;
}

/** https://docs.discord.com/developers/resources/lobby#create-lobby */
export interface CreateLobbyMember {
  /** Discord user id of the user to add to the lobby */
  id: BigString;
  /** Optional dictionary of string key/value pairs. The max total length is 1000. */
  metadata?: Record<string, string> | null;
  /**
   * Lobby member flags combined as a bitfield
   *
   * @see {@link DiscordLobbyMemberFlags}
   */
  flags?: number;
  /**
   * Additional display name for the member, such as an in-game character name. 1-80 characters.
   *
   * When updating an existing member, omit the field to preserve their current value, or send `null` to clear it.
   */
  additionalName?: string | null;
}

/** https://docs.discord.com/developers/resources/lobby#add-a-member-to-a-lobby */
export interface ModifyLobby {
  /** Optional dictionary of string key/value pairs. The max total length is 1000. Overwrites any existing metadata. */
  metadata?: Record<string, string> | null;
  /** Optional array of up to 25 users to replace the lobby members with. If provided, lobby members not in this list will be removed from the lobby. */
  members?: CreateLobbyMember[];
  /** Seconds to wait before shutting down a lobby after it becomes idle. Value can be between 5 and 604800 (7 days). */
  idleTimeoutSeconds?: number;
}

/** https://docs.discord.com/developers/resources/lobby#add-a-member-to-a-lobby */
export interface AddLobbyMember {
  /** Optional dictionary of string key/value pairs. The max total length is 1000. */
  metadata?: Record<string, string> | null;
  /** Lobby member flags combined as a bitfield */
  flags?: number;
}

/** https://docs.discord.com/developers/resources/lobby#bulk-update-lobby-members */
export interface BulkUpdateLobbyMember {
  /** Discord user id of the user to add, update, or remove */
  id: BigString;
  /** Optional dictionary of string key/value pairs. The max total length is 1000. */
  metadata?: Record<string, string> | null;
  /**
   * Lobby member flags combined as a bitfield
   *
   * @see {@link DiscordLobbyMemberFlags}
   */
  flags?: number;
  /**
   * if `true`, the user is removed from the lobby instead of upserted.
   *
   * @default false
   */
  removeMember?: boolean;
}

/** https://docs.discord.com/developers/resources/lobby#link-channel-to-lobby */
export interface LinkChannelToLobby {
  /** The id of the channel to link to the lobby. If not provided, will unlink any currently linked channels from the lobby. */
  channelId?: BigString;
}

/** https://docs.discord.com/developers/resources/lobby#send-lobby-message */
export interface SendLobbyMessage {
  /**
   * Message content
   *
   * @remarks
   * Must be non-empty
   */
  content: string;
  /**
   * Optional dictionary of string key/value pairs delivered alongside the message to active clients via the Social SDK.
   *
   * @remarks
   * Not persisted on the linked channel message.
   */
  metadata?: Record<string, string> | null;
  /**
   * Optional message flags combined as a bitfield.
   *
   * @remarks
   * Only flags creatable by the Social SDK are accepted.
   */
  flags?: number;
}

/** https://docs.discord.com/developers/resources/lobby#get-lobby-messages */
export interface GetLobbyMessages {
  /**
   * Max number of messages to return
   *
   * @remarks
   * Must be between 1 and 200
   *
   * @default 50
   */
  limit?: number;
}
