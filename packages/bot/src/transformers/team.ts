import type { DiscordTeam, DiscordTeamMember } from '@discordeno/types';
import { iconHashToBigInt } from '@discordeno/utils';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { Team, TeamMember } from './types.js';

export function transformTeam(bot: Bot, payload: Partial<DiscordTeam>, extra?: { partial?: boolean }) {
  const team = {} as SetupDesiredProps<Team, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.id !== undefined) team.id = bot.transformers.snowflake(payload.id);
  if (payload.name !== undefined) team.name = payload.name;
  if (payload.icon) team.icon = iconHashToBigInt(payload.icon);
  if (payload.owner_user_id !== undefined) team.ownerUserId = bot.transformers.snowflake(payload.owner_user_id);
  if (payload.members !== undefined) team.members = payload.members.map((member) => bot.transformers.teamMember(bot, member));

  return callCustomizer('team', bot, payload, team, {
    partial: extra?.partial ?? false,
  });
}

export function transformTeamMember(bot: Bot, payload: Partial<DiscordTeamMember>, extra?: { partial?: boolean }) {
  const teamMember = {} as SetupDesiredProps<TeamMember, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.membership_state !== undefined) teamMember.membershipState = payload.membership_state;
  if (payload.team_id !== undefined) teamMember.teamId = bot.transformers.snowflake(payload.team_id);
  if (payload.user !== undefined) teamMember.user = bot.transformers.user(bot, payload.user);
  if (payload.role !== undefined) teamMember.role = payload.role;

  return callCustomizer('teamMember', bot, payload, teamMember, {
    partial: extra?.partial ?? false,
  });
}
