/** https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum */
export enum DiscordTeamMembershipStates {
  Invited = 1,
  Accepted,
}

export type TeamMembershipStates = DiscordTeamMembershipStates;
export const TeamMembershipStates = DiscordTeamMembershipStates;
