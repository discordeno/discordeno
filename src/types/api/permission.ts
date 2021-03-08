export interface DiscordOverwrite {
  /** role or user id */
  id: string;
  /** either 0 (role) or 1 (member) */
  type: number;
  /** permission bit set */
  allow: string;
  /** permission bit set */
  deny: string;
}
