/** Types for: https://docs.discord.com/developers/resources/lobby */

import type { DiscordChannel } from './channel.js';

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
