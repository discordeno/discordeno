/** Types for: https://discord.com/developers/docs/resources/user */

import type { BigString } from '../shared.js';

/** https://discord.com/developers/docs/resources/user#get-current-user-guilds-query-string-params */
export interface GetUserGuilds {
  /** Get guilds before this guild ID */
  before?: BigString;
  /** Get guilds after this guild ID */
  after?: BigString;
  /** Maximum number of entries (between 1-200) to return, defaults to 200 */
  limit?: number;
  /** Include approximate member and presence counts in response, defaults to false */
  withCounts?: boolean;
}

/** https://discord.com/developers/docs/resources/user#create-group-dm-json-params */
export interface CreateGroupDmOptions {
  /** Access tokens of users that have granted your app the `gdm.join` scope */
  accessTokens: string[];
  /** A mapping of user ids to their respective nicknames */
  nicks: Record<string, string>;
}
