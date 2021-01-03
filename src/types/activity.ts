export interface ActivityPayload {
  /** the activity's id */
  id?: string;
  /** the activity's name */
  name: string;
  /** activity type */
  type: number;
  /** stream url, is validated when type is 1 */
  url?: string;
  /** unix timestamp of when the activity was added to the user's session */
  created_at: number;
  /** unix timestamp of when the activity was added to the user's session */
  timestamps?: ActivityTimestamps;
  /** the id of the song on Spotify */
  sync_id?: string;
  /** the platform the game is being played on ("desktop", "samsung", or "xbox") */
  platform?: string;
  /** application id for the game */
  application_id?: string;
  /** what the player is currently doing */
  details?: string;
  /** the user's current party status */
  state?: string;
  /** the emoji used for a custom status */
  emoji?: ActivityEmoji;
  /** information for the current party of the player */
  party?: ActivityParty;
  /** images for the presence and their hover texts */
  assets?: ActivityAssets;
  /** secrets for Rich Presence joining and spectating */
  secrets?: ActivitySecrets;
  /** whether or not the activity is an instanced game session */
  instance?: boolean;
  /**  activity flags `OR`d together, describes what the payload includes */
  flags?: number;
  /** the custom buttons shown in the Rich Presence (max 2) */
  buttons?: ActivityButton[];
}

export interface ActivityButton {
  /** the text shown on the button (1-32 characters) */
  label: string;
  /** the url opened when clicking the button (1-512 characters) */
  url: string;
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
