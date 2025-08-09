/** Types for: https://discord.com/developers/docs/topics/teams */

import type { DiscordUser } from './user.js'

/* https://discord.com/developers/docs/topics/teams#team-member-roles-team-member-role-types */
export enum DiscordTeamMemberRole {
  /**
   * Owners are the most permissiable role, and can take destructive, irreversible actions like deleting the team itself.
   *
   * Teams are limited to 1 owner.
   *
   * @remarks
   * Despite this having a value, discord does not document any value for this.
   * */
  Owner = 'owner',
  /** Admins have similar access as owners, except they cannot take destructive actions on the team or team-owned apps. */
  Admin = 'admin',
  /**
   * Developers can access information about team-owned apps, like the client secret or public key.
   * They can also take limited actions on team-owned apps, like configuring interaction endpoints or resetting the bot token.
   * Members with the Developer role *cannot* manage the team or its members, or take destructive actions on team-owned apps.
   */
  Developer = 'developer',
  /** Read-only members can access information about a team and any team-owned apps. Some examples include getting the IDs of applications and exporting payout records. */
  ReadOnly = 'read_only',
}

/** https://discord.com/developers/docs/topics/teams#data-models-team-object */
export interface DiscordTeam {
  /** Hash of the image of the team's icon */
  icon: string | null
  /** Unique ID of the team */
  id: string
  /** Members of the team */
  members: DiscordTeamMember[]
  /** Name of the team */
  name: string
  /** User ID of the current team owner */
  owner_user_id: string
}

/** https://discord.com/developers/docs/topics/teams#data-models-team-member-object */
export interface DiscordTeamMember {
  /** The user's membership state on the team */
  membership_state: TeamMembershipStates
  /** The id of the parent team of which they are a member */
  team_id: string
  /** The avatar, discriminator, id, username, and global_name of the user */
  user: Partial<DiscordUser> & Pick<DiscordUser, 'avatar' | 'discriminator' | 'id' | 'username' | 'global_name'>
  /** Role of the team member */
  role: DiscordTeamMemberRole
}

/** https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum */
export enum TeamMembershipStates {
  Invited = 1,
  Accepted,
}
