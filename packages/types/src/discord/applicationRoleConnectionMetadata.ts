/** Types for: https://discord.com/developers/docs/resources/application-role-connection-metadata */

import type { Localization } from './reference.js'

/** https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object-application-role-connection-metadata-structure */
export interface DiscordApplicationRoleConnectionMetadata {
  /** Type of metadata value */
  type: DiscordApplicationRoleConnectionMetadataType
  /**
   * Dictionary key for the metadata field
   *
   * @remarks
   * Must be a-z, 0-9, or _ characters; 1-50 characters
   */
  key: string
  /**
   * Name of the metadata field
   *
   * @remarks
   * 1-100 characters
   */
  name: string
  /** Translations of the name */
  name_localizations?: Localization
  /**
   * Description of the metadata field
   *
   * @remarks
   * 1-200 characters
   */
  description: string
  /** Translations of the description */
  description_localizations: Localization
}

/** https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object-application-role-connection-metadata-type */
export enum DiscordApplicationRoleConnectionMetadataType {
  /** The metadata value (integer) is less than or equal to the guild's configured value (integer) */
  IntegerLessThanOrEqual = 1,
  /** The metadata value (integer) is greater than or equal to the guild's configured value (integer) */
  IntegerGreaterThanOrEqual = 2,
  /** The metadata value (integer) is equal to the guild's configured value (integer) */
  IntegerEqual = 3,
  /** The metadata value (integer) is not equal to the guild's configured value (integer) */
  IntegerNotEqual = 4,
  /** The metadata value (ISO8601 string) is less than or equal to the guild's configured value (integer; days before current date) */
  DatetimeLessThanOrEqual = 5,
  /** The metadata value (ISO8601 string) is greater than or equal to the guild's configured value (integer; days before current date) */
  DatetimeGreaterThanOrEqual = 6,
  /** The metadata value (integer) is equal to the guild's configured value (integer; 1) */
  BooleanEqual = 7,
  /** The metadata value (integer) is not equal to the guild's configured value (integer; 1) */
  BooleanNotEqual = 8,
}
