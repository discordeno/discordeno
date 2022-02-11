/** https://discord.com/developers/docs/resources/guild#begin-guild-prune */
export interface BeginGuildPrune {
  /** Number of days to prune (1 or more), default: 7 */
  days?: number;
  /** Whether 'pruned' is returned, discouraged for large guilds, default: true */
  computePruneCount?: boolean;
  /** Role(s) ro include, default: none */
  includeRoles?: string[];
}
