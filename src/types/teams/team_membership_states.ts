/** https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum */
export enum DiscordTeamMembershipStates {
  INVITED = 1,
  ACCEPTED,
}

export type TeamMembershipStates = DiscordTeamMembershipStates;
export const TeamMembershipStates = DiscordTeamMembershipStates;
