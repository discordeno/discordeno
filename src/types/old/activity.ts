export interface ActivityPayload {
  name: string;
  type: number;
  url?: string;
  created_at: number;
  timestamps?: ActivityTimestamps;
  application_id?: string;
  details?: string;
  state?: string;
  emoji?: ActivityEmoji;
  party?: ActivityParty;
  assets?: ActivityAssets;
  secrets?: ActivitySecrets;
  instance?: boolean;
  flags?: number;
}

export enum ActivityType {
  /** Example: "Playing Rocket League" */
  Game,
  /** Example: "Streaming Rocket League" */
  Streaming,
  /** Example: "Listening to spotify" */
  Listening,
  /** Example: ":smiley: I am cool" */
  Custom = 4,
  /** Example: "Competing in Arena World Champions" */
  Competing,
}

export interface ActivityTimestamps {
  start?: number;
  end?: number;
}

export interface ActivityEmoji {
  name: string;
  id?: string;
  animated?: boolean;
}

export interface ActivityParty {
  id?: string;
  size?: [number, number];
}

export interface ActivityAssets {
  large_image?: string;
  large_text?: string;
  small_image?: string;
  small_text?: string;
}

export interface ActivitySecrets {
  join?: string;
  spectate?: string;
  match?: string;
}

export enum ActivityFlags {
  INSTANCE = 1 << 0,
  JOIN = 1 << 1,
  SPECTATE = 1 << 2,
  JOIN_REQUEST = 1 << 3,
  SYNC = 1 << 4,
  PLAY = 1 << 5,
}
