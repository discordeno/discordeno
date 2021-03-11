/** https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure */
export interface DiscordBaseMember {
  /** this users guild nickname */
  nick: string | null;
  /** array of role payload ids */
  roles: string[];
  /** when the user joined the guild */
  // deno-lint-ignore camelcase
  joined_at: string;
  /** when the user started boosting the guild */
  // deno-lint-ignore camelcase
  premium_since?: string | null;
  /** whether the user is deafened in voice channels */
  deaf: boolean;
  /** whether the user is muted in voice channels */
  mute: boolean;
  /** whether the user has not yet passed the guild's Membership Screening requirements */
  pending?: boolean;
}
