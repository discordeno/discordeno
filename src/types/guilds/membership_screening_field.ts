import { SnakeCaseProps } from "../util.ts";
import { MembershipScreeningFieldTypes } from "./membership_screening_field_types.ts";

export interface MembershipScreeningField {
  /** The type of field (currently "TERMS" is the only type) */
  fieldType: MembershipScreeningFieldTypes;
  /** The title of the field */
  label: string;
  /** The list of rules */
  values?: string[];
  /** Whether the user has to fill out this field */
  required: boolean;
}

export type DiscordMembershipScreeningField = SnakeCaseProps<
  MembershipScreeningField
>;
