import { GuildIntegration } from "./guild.ts";

export interface Connection {
  /** id of the connection account */
  id: string;
  /** the username of the connection account */
  name: string;
  /** the service of the connection (twitch, youtube) */
  type: string;
  /** whether the connection is revoked */
  revoked?: boolean;
  /** an array of partial server integration */
  integrations?: Partial<GuildIntegration>[];
  /** whether the connection is verified */
  verified: boolean;
  /** whhether friend sync is enabled for this connection */
  friend_sync: boolean;
  /** whether activities related to this connection will be shown in presence updates */
  show_activity: boolean;
  /** visibility of this connection */
  visibility: VisibilityTypes;
}

export enum VisibilityTypes {
  /** invisible to everyone except the user themselves */
  NONE = 0,
  /** visible to everyone */
  EVERYONE = 1,
}
