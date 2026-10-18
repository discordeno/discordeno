/** Types for: https://docs.discord.com/developers/resources/application-identity-profile */

/** https://docs.discord.com/developers/resources/application-identity-profile#application-identity-object-application-identity-structure */
export interface DiscordApplicationIdentity {
  /** The external account provider type */
  provider_type: string;
  /** Provider-specific identifier used to disambiguate identities; omitted when absent or empty */
  provider_id?: string;
  /** The user's ID in the external system */
  provider_issued_user_id: string;
}

/** https://docs.discord.com/developers/resources/application-identity-profile#application-identity-profile-object-application-identity-profile-structure */
export interface DiscordApplicationIdentityProfile {
  /** The user's username in the external system */
  username: string | null;
  /** Arbitrary game-defined data; not consumed by Discord, stored for the application's own use */
  metadata: Record<string, unknown> | null;
  /** The profile data containing game stats */
  data: DiscordProfileData | null;
}

/** https://docs.discord.com/developers/resources/application-identity-profile#profile-data-object-profile-data-structure */
export interface DiscordProfileData {
  /** Pre-configured game stat fields */
  primary?: DiscordPrimaryProfileData;
  /** Custom game stat fields */
  dynamic?: DiscordDynamicField[];
}

/** https://docs.discord.com/developers/resources/application-identity-profile#primary-profile-data-object-primary-profile-data-structure */
export interface DiscordPrimaryProfileData {
  /** Current season name (e.g. "Season 3") */
  season?: string;
  /** Current rank name (e.g. "Silver") */
  rank_name?: string;
  /** Image representing the current rank */
  rank_image?: DiscordApplicationIdentityProfileMedia | null;
  /** Highest rank achieved */
  highest_rank?: string;
  /** Image representing the highest rank achieved */
  highest_rank_image?: DiscordApplicationIdentityProfileMedia | null;
  /** Name of the featured played character */
  featured_played_character?: string;
  /** Image of the featured played character */
  featured_played_character_image?: DiscordApplicationIdentityProfileMedia | null;
  /** Total playtime in hours; accepts decimal values (e.g. `69.41`) */
  playtime_hours?: number;
  /** Total number of wins */
  total_wins?: number;
  /** Wins in the current period (e.g. season) */
  current_period_wins?: number;
  /** Total number of games played */
  total_games?: number;
  /** Games played in the current period */
  current_period_games?: number;
  /** Total number of kills */
  total_kills?: number;
  /** Kills in the current period */
  current_period_kills?: number;
  /** Total number of assists */
  total_assists?: number;
  /** Assists in the current period */
  current_period_assists?: number;
  /** Total number of deaths */
  total_deaths?: number;
  /** Deaths in the current period */
  current_period_deaths?: number;
}

/** https://docs.discord.com/developers/resources/application-identity-profile#dynamic-field-object */
export type DiscordDynamicField = DiscordDynamicFieldString | DiscordDynamicFieldNumber | DiscordDynamicFieldMedia;

/** https://docs.discord.com/developers/resources/application-identity-profile#dynamic-field-object-dynamic-field-types */
export enum DiscordDynamicFieldType {
  /** A text value */
  String = 1,
  /** A numeric value */
  Number = 2,
  /** A media object (image URL) */
  Media = 3,
}

/** https://docs.discord.com/developers/resources/application-identity-profile#dynamic-field-object-dynamic-string-field-structure */
export interface DiscordDynamicFieldString {
  type: DiscordDynamicFieldType.String;
  /** The field name */
  name: string;
  /** The text value */
  value: string;
}

/** https://docs.discord.com/developers/resources/application-identity-profile#dynamic-field-object-dynamic-number-field-structure */
export interface DiscordDynamicFieldNumber {
  type: DiscordDynamicFieldType.Number;
  /** The field name */
  name: string;
  /** The numeric value */
  value: number;
}

/** https://docs.discord.com/developers/resources/application-identity-profile#dynamic-field-object-dynamic-media-field-structure */
export interface DiscordDynamicFieldMedia {
  type: DiscordDynamicFieldType.Media;
  /** The field name */
  name: string;
  /** The media value */
  value: DiscordApplicationIdentityProfileMedia;
}

/** https://docs.discord.com/developers/resources/application-identity-profile#media-object-media-structure */
export interface DiscordApplicationIdentityProfileMedia {
  /** URL of the media asset */
  url: string;
}
