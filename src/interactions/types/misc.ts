export interface AllowedMentions {
  /** An array of allowed mention types to parse from the content. */
  parse: ("roles" | "users" | "everyone")[];
  /** Array of role_ids to mention (Max size of 100) */
  roles?: string[];
  /** Array of user_ids to mention (Max size of 100) */
  users?: string[];
}
