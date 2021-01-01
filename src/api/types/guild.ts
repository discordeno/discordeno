export interface GuildMember {
  /** The user's guild nickname if one is set. */
  nick?: string;
  /** Array of role ids that the member has */
  roles: string[];
  /** When the user joined the guild. */
  joinedAt: number;
  /** When the user used their nitro boost on the server. */
  premiumSince?: number;
  /** Whether the user is deafened in voice channels */
  deaf: boolean;
  /** Whether the user is muted in voice channels */
  mute: boolean;
  /** Whether the user has passed the guild's Membership Screening requirements */
  pending?: boolean;
}
