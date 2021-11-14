/** https://discord.com/developers/docs/resources/invite#get-invite */
export interface GetInvite {
  /** Whether the invite should contain approximate member counts */
  withCounts?: boolean;
  /** Whether the invite should contain the expiration date */
  withExpiration?: boolean;
}
