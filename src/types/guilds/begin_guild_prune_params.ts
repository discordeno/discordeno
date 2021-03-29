import { SnakeCaseProps } from "../util.ts";

export interface BeginGuildPruneParams {
  /** Number of days to prune (1 or more), default: 7 */
  days?: number;
  /** Whether 'pruned' is returned, discouraged for large guilds, default: true */
  computePruneCount?: boolean;
  /** Role(s) ro include, default: none */
  includeRoles?: string[];
}

/** https://discord.com/developers/docs/resources/guild#begin-guild-prune */
export type DiscordBeginGuildPruneParams = SnakeCaseProps<
  BeginGuildPruneParams
>;
