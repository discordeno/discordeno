/** Types for: https://docs.discord.com/developers/resources/lobby */

import type { DiscordChannel } from './channel.js';
import type { MessageFlags, MessageTypes } from './message.js';
import type { DiscordUser } from './user.js';

/** https://docs.discord.com/developers/resources/lobby#lobby-object-lobby-structure */
export interface DiscordLobby {
  /** The id of this channel */
  id: string;
  /** application that created the lobby */
  application_id: string;
  /** dictionary of string key/value pairs. The max total length is 1000. */
  metadata: Record<string, string> | null;
  /** members of the lobby */
  members: DiscordLobbyMember[];
  /** the guild channel linked to the lobby */
  linked_channel?: DiscordChannel;
}

/** https://docs.discord.com/developers/resources/lobby#lobby-member-object-lobby-member-structure */
export interface DiscordLobbyMember {
  /** The id of the user */
  id: string;
  /** dictionary of string key/value pairs. The max total length is 1000. */
  metadata?: Record<string, string> | null;
  /** lobby member flags combined as as bitfield */
  flags?: number;
}

/** https://docs.discord.com/developers/resources/lobby#lobby-member-object-lobby-member-flags */
export enum DiscordLobbyMemberFlags {
  /** User can link a text channel to a lobby */
  CanLinkLobby = 1 << 0,
}

/** https://docs.discord.com/developers/resources/lobby#lobby-message-object */
export interface DiscordLobbyMessage {
  /** id of the message */
  id: string;
  /** Message type */
  type: MessageTypes;
  /** Message content */
  content: string;
  /** id of the lobby this message was sent to */
  lobby_id: string;
  /** Included for compatibility with the messages interface; equal to lobby_id */
  channel_id: string;
  /** The user who sent the message */
  author: DiscordUser;
  /** Dispatch-only metadata sent with the message */
  metadata?: Record<string, string> | null;
  /** Moderation metadata set via Update Lobby Message Moderation Metadata */
  moderation_metadata?: Record<string, string> | null;
  /**
   * Message flags bitfield
   *
   * @see {@link MessageFlags}
   */
  flags: number;
  /** The application that sent the message */
  application_id: string;
}

/** https://docs.discord.com/developers/resources/lobby#lobby-invite-object */
export interface DiscordLobbyInvite {
  /** The invite code for the lobby's linked channel */
  code: string;
}
