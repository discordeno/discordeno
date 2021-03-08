import { DiscordTeamMembers } from "./members.ts";

/** https://discord.com/developers/docs/topics/teams#data-models-team-object */
export interface DiscordTeam {
  /** a hash of the image of the team's icon */
  icon: string | null;
  /** the unique id of the team */
  id: string;
  /** the members of the team */
  members: DiscordTeamMembers[];
  /** the user id of the current team owner */
  // deno-lint-ignore camelcase
  owner_user_id: string;
}
