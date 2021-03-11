/** https://discord.com/developers/docs/topics/permissions#role-object-role-tags-structure */
export interface DiscordRoleTags {
  /** the id of the bot this role belongs to */
  // deno-lint-ignore camelcase
  bot_id?: string;
  /** the id of the integration this role belongs to */
  // deno-lint-ignore camelcase
  integration_id?: string;
  /** whether this is the guild's premium subscriber role */
  // deno-lint-ignore camelcase
  premium_subscriber?: null;
}
